import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import * as THREE from "three";

const Dice3D = forwardRef(function Dice3D(
  {
    sides, // 6 | 20 | 100
    dice = null,
    size = 220,
    color = "#f2f3f5",
    textColor = "#111",
    background = "transparent",
    durationMs = 1400,
    onRollEnd,
    initialValue,
    style,
    className,
  },
  ref,
) {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null); // d6/d20 => Mesh, d100 => Group
  const d100Ref = useRef(null); // { units: Mesh, tens: Mesh }
  const animRef = useRef(null);

  const currentValueRef = useRef(null);
  const targetQuatRef = useRef(null);
  const startQuatRef = useRef(null);
  const startTimeRef = useRef(0);

  const multiRef = useRef({
    instances: [], // [{ sides, mesh, extra, anim }]
  });

  // anim pour d100 (2 dés)
  const d100AnimRef = useRef({
    startUnits: null,
    targetUnits: null,
    startTens: null,
    targetTens: null,
  });

  const [overlay, setOverlay] = useState(null); // on ne l'utilise plus pour d100 “réel”

  // utils ---------------------------------------------------------
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const randInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const [viewport, setViewport] = useState({ w: 1, h: 1 });

  function makeNumberTexture(
    n,
    { size: texSize = 256, textColor: tc = textColor, bg = null } = {},
  ) {
    const canvas = document.createElement("canvas");
    canvas.width = texSize;
    canvas.height = texSize;
    const ctx = canvas.getContext("2d");
    if (bg && bg !== "transparent") {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, texSize, texSize);
    } else {
      ctx.clearRect(0, 0, texSize, texSize);
    }
    ctx.fillStyle = tc;
    ctx.font = `${Math.floor(
      texSize * 0.6,
    )}px system-ui, -apple-system, Segoe UI, Roboto, Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(n), texSize / 2, texSize / 2);
    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
  }

  // direction (objet -> caméra)
  const _tmpA = new THREE.Vector3();
  const _tmpB = new THREE.Vector3();
  function dirToCameraFrom(obj) {
    const cam = cameraRef.current;
    if (!cam) return new THREE.Vector3(0, 1, 0);
    obj.getWorldPosition(_tmpA);
    cam.getWorldPosition(_tmpB);
    return _tmpB.sub(_tmpA).normalize();
  }

  // Projette v sur le plan ⟂ à n
  function projectOnPlane(v, n) {
    const t = n.clone().multiplyScalar(v.dot(n));
    return v.clone().sub(t);
  }

  // up (vertical) de la caméra en monde
  function cameraWorldUp() {
    const cam = cameraRef.current;
    if (!cam) return new THREE.Vector3(0, 1, 0);
    return new THREE.Vector3(0, 1, 0)
      .applyQuaternion(cam.quaternion)
      .normalize();
  }

  /**
   * Quaternion qui:
   *  1) aligne la normale locale 'nLocal' sur 'toCam' (caméra)
   *  2) aligne l'axe vertical de la face (Up local projeté dans le plan de la face)
   *     sur l'up écran (up caméra projeté sur le plan perpendiculaire à 'toCam')
   * -> nombres à l'endroit et bien centrés vers joueur.
   */
  function quatFaceTowardCameraUpright(nLocal, toCam) {
    // Étape 1 : normale -> caméra
    const q1 = new THREE.Quaternion().setFromUnitVectors(nLocal, toCam);

    // Up local de la face = projection de l'axe Y de l'objet dans le plan de la face
    let upLocal = projectOnPlane(new THREE.Vector3(0, 1, 0), nLocal);
    if (upLocal.lengthSq() < 1e-8) upLocal.set(1, 0, 0); // fallback si parallèle
    upLocal.normalize();

    // Cet up après q1 (dans le monde, puisque q1 sera appliqué au mesh)
    const upAfter = upLocal.clone().applyQuaternion(q1).normalize();

    // Up désiré = up caméra projeté dans l'écran (plan ⟂ à toCam)
    const upScreen = projectOnPlane(cameraWorldUp(), toCam).normalize();
    if (upScreen.lengthSq() < 1e-8) return q1; // caméra très inclinée => on s'arrête à q1

    // rotation supplémentaire autour de l'axe 'toCam'
    const cosA = THREE.MathUtils.clamp(upAfter.dot(upScreen), -1, 1);
    const angle = Math.acos(cosA);
    const sign = Math.sign(
      new THREE.Vector3().crossVectors(upAfter, upScreen).dot(toCam),
    );
    const q2 = new THREE.Quaternion().setFromAxisAngle(toCam, sign * angle);

    return q2.multiply(q1);
  }

  function quatFaceTowardCameraUpright_LOCAL(nLocal, toCamLocal, upCamLocal) {
    // 1) normale -> caméra (tout en local)
    const q1 = new THREE.Quaternion().setFromUnitVectors(nLocal, toCamLocal);

    // 2) aligne l'“up” de la face sur l’up écran (tous deux projetés dans le plan ⟂ toCamLocal)
    let upLocalFace = projectOnPlane(new THREE.Vector3(0, 1, 0), nLocal);
    if (upLocalFace.lengthSq() < 1e-8) upLocalFace.set(1, 0, 0);
    upLocalFace.normalize();

    const upAfter = upLocalFace.clone().applyQuaternion(q1).normalize();
    const upScreenLocal = projectOnPlane(upCamLocal, toCamLocal).normalize();
    if (upScreenLocal.lengthSq() < 1e-8) return q1;

    const cosA = THREE.MathUtils.clamp(upAfter.dot(upScreenLocal), -1, 1);
    const angle = Math.acos(cosA);
    const sign = Math.sign(
      new THREE.Vector3().crossVectors(upAfter, upScreenLocal).dot(toCamLocal),
    );
    const q2 = new THREE.Quaternion().setFromAxisAngle(
      toCamLocal,
      sign * angle,
    );

    return q2.multiply(q1); // q2 ∘ q1
  }

  // D6 ------------------------------------------------------------
  function buildD6() {
    const geom = new THREE.BoxGeometry(1, 1, 1);
    const mats = [
      new THREE.MeshBasicMaterial({
        map: makeNumberTexture("2", { bg: color }),
      }), // +X
      new THREE.MeshBasicMaterial({
        map: makeNumberTexture("5", { bg: color }),
      }), // -X
      new THREE.MeshBasicMaterial({
        map: makeNumberTexture("1", { bg: color }),
      }), // +Y
      new THREE.MeshBasicMaterial({
        map: makeNumberTexture("6", { bg: color }),
      }), // -Y
      new THREE.MeshBasicMaterial({
        map: makeNumberTexture("3", { bg: color }),
      }), // +Z
      new THREE.MeshBasicMaterial({
        map: makeNumberTexture("4", { bg: color }),
      }), // -Z
    ];
    const mesh = new THREE.Mesh(geom, mats);
    const edges = new THREE.EdgesGeometry(geom);
    const line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0x333366 }),
    );
    mesh.add(line);
    return mesh;
  }

  // D20 (corps uni + panneaux numérotés) --------------------------
  function buildD20() {
    const geom = new THREE.IcosahedronGeometry(0.95, 0);
    const baseMat = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geom, baseMat);
    const edges = new THREE.EdgesGeometry(geom);
    mesh.add(
      new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0x333366 }),
      ),
    );

    const pos = geom.getAttribute("position");
    const faceCount = pos.count / 3;

    for (let i = 0; i < faceCount; i++) {
      const a = new THREE.Vector3().fromBufferAttribute(pos, i * 3 + 0);
      const b = new THREE.Vector3().fromBufferAttribute(pos, i * 3 + 1);
      const c = new THREE.Vector3().fromBufferAttribute(pos, i * 3 + 2);
      const center = new THREE.Vector3()
        .addVectors(a, b)
        .add(c)
        .multiplyScalar(1 / 3);
      const normal = new THREE.Vector3()
        .subVectors(b, a)
        .cross(new THREE.Vector3().subVectors(c, a))
        .normalize();

      const plate = new THREE.Mesh(
        new THREE.PlaneGeometry(0.7, 0.7),
        new THREE.MeshBasicMaterial({
          map: makeNumberTexture(String(i + 1), { bg: "transparent" }),
          transparent: true,
        }),
      );
      const quat = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        normal,
      );
      plate.quaternion.copy(quat);
      plate.position.copy(center.add(normal.clone().multiplyScalar(0.03)));
      plate.renderOrder = 2;
      mesh.add(plate);
    }

    return mesh;
  }

  function makePentagonalTrapezohedron() {
    // construit directement les 12 sommets exacts
    const phi = (2 * Math.PI) / 5; // 72°
    const twist = Math.PI / 5; // 36°
    const r = 1;
    const h = 0.5;

    const verts = [];

    // top ring (5 sommets)
    for (let i = 0; i < 5; i++) {
      const a = i * phi;
      verts.push([r * Math.cos(a), h, r * Math.sin(a)]);
    }

    // bottom ring (5 sommets, tournés de 36°)
    for (let i = 0; i < 5; i++) {
      const a = i * phi + twist;
      verts.push([r * Math.cos(a), -h, r * Math.sin(a)]);
    }

    // apex haut/bas
    verts.push([0, h * 3, 0]); // sommet haut
    verts.push([0, -h * 3, 0]); // sommet bas

    // faces losanges (indices des sommets, à relier en kites)
    const faces = [];
    for (let i = 0; i < 5; i++) {
      const topApex = 10; // index sommet haut
      const botApex = 11; // index sommet bas
      const A = i;
      const B = (i + 1) % 5;
      const C = 5 + ((i + 1) % 5);
      const D = 5 + i;

      // face "haut"
      faces.push([topApex, A, D, botApex]);
      // face "bas"
      faces.push([topApex, B, C, botApex]);
    }

    // on triangule les losanges (2 triangles par face)
    const indices = [];
    faces.forEach(([a, b, c, d]) => {
      indices.push(a, b, c);
      indices.push(a, c, d);
    });

    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(verts.flat(), 3),
    );
    geom.setIndex(indices);
    geom.computeVertexNormals();

    return geom;
  }

  // --- D10 : trapézoèdre pentagonal (dual antiprisme) + squash Y pour pointes ---
  function makeD10Geometry() {
    const R = 0.92; // rayon des pentagones de l'antiprisme (look)
    const Z = R; // écart vertical top/bottom
    const SQUASH_Y = 0.56; // <<< 0.80–0.95 : plus petit = pointes plus courtes
    const n = 5;
    const phi = (2 * Math.PI) / n;
    const twist = Math.PI / n; // 36°

    // 1) Antiprisme pentagonal
    const T = [],
      B = [];
    for (let i = 0; i < n; i++) {
      T.push(
        new THREE.Vector3(R * Math.cos(i * phi), +Z / 2, R * Math.sin(i * phi)),
      );
      B.push(
        new THREE.Vector3(
          R * Math.cos(i * phi + twist),
          -Z / 2,
          R * Math.sin(i * phi + twist),
        ),
      );
    }

    const faces = [];
    faces.push(T.map((v) => v.clone())); // pentagone haut
    faces.push(B.map((v) => v.clone()).reverse()); // pentagone bas (normale out)
    for (let i = 0; i < n; i++) {
      // 10 triangles latéraux
      faces.push([T[i].clone(), B[i].clone(), T[(i + 1) % n].clone()]);
      faces.push([
        B[i].clone(),
        T[(i + 1) % n].clone(),
        B[(i + 1) % n].clone(),
      ]);
    }

    // 2) Dual plan
    function planeFrom3(a, b, c) {
      const ab = new THREE.Vector3().subVectors(b, a);
      const ac = new THREE.Vector3().subVectors(c, a);
      const nrm = new THREE.Vector3().crossVectors(ab, ac).normalize();
      let d = nrm.dot(a);
      if (d < 0) {
        nrm.multiplyScalar(-1);
        d = -d;
      }
      return { n: nrm, d };
    }
    const dualVerts = faces.map((f) => {
      const { n: nrm, d } = planeFrom3(f[0], f[1], f[2]);
      return nrm.clone().divideScalar(d);
    });

    // >>> adoucit les pointes : compression verticale
    dualVerts.forEach((p) => {
      p.y *= SQUASH_Y;
    });

    // 3) Quads duaux (10 losanges)
    const dualFaces = [];
    const idxTri1 = (i) => 2 + 2 * ((i + n) % n);
    const idxTri2 = (i) => 3 + 2 * ((i + n) % n);

    for (let i = 0; i < n; i++) {
      // autour de T_i
      const v = T[i].clone().normalize();
      const ref =
        Math.abs(v.y) < 0.9
          ? new THREE.Vector3(0, 1, 0)
          : new THREE.Vector3(1, 0, 0);
      const u = new THREE.Vector3().crossVectors(v, ref).normalize();
      const w = new THREE.Vector3().crossVectors(v, u).normalize();
      const inc = [0, idxTri1(i), idxTri2(i - 1), idxTri1(i - 1)];
      const ordered = inc
        .map((j) => {
          const p = dualVerts[j];
          const proj = p.clone().sub(v.clone().multiplyScalar(p.dot(v)));
          return { j, ang: Math.atan2(proj.dot(w), proj.dot(u)) };
        })
        .sort((a, b) => a.ang - b.ang)
        .map((o) => o.j);
      dualFaces.push(ordered);
    }
    for (let i = 0; i < n; i++) {
      // autour de B_i
      const v = B[i].clone().normalize();
      const ref =
        Math.abs(v.y) < 0.9
          ? new THREE.Vector3(0, 1, 0)
          : new THREE.Vector3(1, 0, 0);
      const u = new THREE.Vector3().crossVectors(v, ref).normalize();
      const w = new THREE.Vector3().crossVectors(v, u).normalize();
      const inc = [1, idxTri2(i), idxTri1(i), idxTri2(i - 1)];
      const ordered = inc
        .map((j) => {
          const p = dualVerts[j];
          const proj = p.clone().sub(v.clone().multiplyScalar(p.dot(v)));
          return { j, ang: Math.atan2(proj.dot(w), proj.dot(u)) };
        })
        .sort((a, b) => a.ang - b.ang)
        .map((o) => o.j);
      dualFaces.push(ordered);
    }

    // 4) Géométrie + centres/normales (pour tes plaques)
    const positions = [];
    const facesCenters = [];
    const facesNormals = [];
    const pushTri = (A, B, C) =>
      positions.push(A.x, A.y, A.z, B.x, B.y, B.z, C.x, C.y, C.z);

    for (const q of dualFaces) {
      const A = dualVerts[q[0]],
        Bv = dualVerts[q[1]],
        C = dualVerts[q[2]],
        D = dualVerts[q[3]];
      pushTri(A, Bv, C);
      pushTri(A, C, D);

      const center = new THREE.Vector3()
        .add(A)
        .add(Bv)
        .add(C)
        .add(D)
        .multiplyScalar(0.25);
      const n1 = new THREE.Vector3().crossVectors(
        new THREE.Vector3().subVectors(Bv, A),
        new THREE.Vector3().subVectors(C, A),
      );
      const n2 = new THREE.Vector3().crossVectors(
        new THREE.Vector3().subVectors(C, A),
        new THREE.Vector3().subVectors(D, A),
      );
      const normal = new THREE.Vector3().addVectors(n1, n2).normalize();
      if (normal.dot(center) < 0) normal.multiplyScalar(-1);
      facesCenters.push(center);
      facesNormals.push(normal);
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geom.computeVertexNormals();

    return { geom, facesCenters, facesNormals };
  }

  function buildD10({ labels, baseColor = color }) {
    const { geom, facesCenters, facesNormals } = makeD10Geometry();

    // matériau lisible même si certaines faces sont proches du plan de vue
    const body = new THREE.Mesh(
      geom,
      new THREE.MeshBasicMaterial({ color: baseColor, side: THREE.FrontSide }),
    );

    // contour discret
    const edges = new THREE.EdgesGeometry(geom, 1);
    body.add(
      new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({
          color: 0x333366,
          // opacity: 0.6,
          // transparent: true,
        }),
      ),
    );

    // plaques numérotées : jamais de z-fighting
    const faceByLabel = {};
    for (let i = 0; i < 10; i++) {
      const lbl = String(labels[i]);
      faceByLabel[lbl] = { index: i, normal: facesNormals[i].clone() };

      const plate = new THREE.Mesh(
        new THREE.PlaneGeometry(0.6, 0.6),
        new THREE.MeshBasicMaterial({
          map: makeNumberTexture(lbl, { bg: "transparent" }),
          transparent: true,
          depthTest: true,
          depthWrite: false,
          polygonOffset: true,
          polygonOffsetFactor: -2,
          polygonOffsetUnits: -2,
        }),
      );
      const quat = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        facesNormals[i],
      );
      plate.quaternion.copy(quat);
      plate.position.copy(
        facesCenters[i]
          .clone()
          .add(facesNormals[i].clone().multiplyScalar(0.065)),
      );
      plate.renderOrder = 2;
      body.add(plate);
    }

    body.userData.d10 = { facesCenters, facesNormals, faceByLabel };
    return body;
  }

  function buildD100Group() {
    const group = new THREE.Group();

    const unitsLabels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const tensLabels = [
      "00",
      "10",
      "20",
      "30",
      "40",
      "50",
      "60",
      "70",
      "80",
      "90",
    ];

    const units = buildD10({ labels: unitsLabels, baseColor: color });
    const tens = buildD10({ labels: tensLabels, baseColor: color });

    units.position.set(-0.75, 1, -0.18);
    tens.position.set(1.15, -0.5, 0.5);

    units.scale.setScalar(0.75);
    tens.scale.setScalar(0.75);

    group.add(units);
    group.add(tens);
    return { group, units, tens };
  }

  function fitCameraToObject(camera, object, margin = 1.45) {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = (camera.fov * Math.PI) / 180;

    let dist = maxDim / 2 / Math.tan(fov / 2);
    dist *= margin;

    const xOffset = maxDim * 0.25;

    camera.position.set(center.x + xOffset, center.y + dist * 0.45, center.z + dist * 1.15);
    camera.lookAt(center);
  }

  // mapping -> quaternion (d6/d20) --------------------------------
  function targetQuatForValue(geometry, s, wanted) {
    const toCam = dirToCameraFrom(meshRef.current);

    if (s === 6) {
      const normalMap = {
        1: new THREE.Vector3(0, 1, 0),
        2: new THREE.Vector3(1, 0, 0),
        3: new THREE.Vector3(0, 0, 1),
        4: new THREE.Vector3(0, 0, -1),
        5: new THREE.Vector3(-1, 0, 0),
        6: new THREE.Vector3(0, -1, 0),
      };
      const n = (normalMap[wanted] || new THREE.Vector3(0, 1, 0)).clone();
      return quatFaceTowardCameraUpright(n, toCam);
    }

    if (s === 20) {
      const pos = geometry.getAttribute("position");
      const i = Math.max(0, Math.min(pos.count / 3 - 1, wanted - 1));
      const a = new THREE.Vector3().fromBufferAttribute(pos, i * 3 + 0);
      const b = new THREE.Vector3().fromBufferAttribute(pos, i * 3 + 1);
      const c = new THREE.Vector3().fromBufferAttribute(pos, i * 3 + 2);
      const n = new THREE.Vector3()
        .subVectors(b, a)
        .cross(new THREE.Vector3().subVectors(c, a))
        .normalize();
      return quatFaceTowardCameraUpright(n, toCam);
    }

    return new THREE.Quaternion();
  }

  // scene ----------------------------------------------------------
  function initScene() {
    if (!mountRef.current) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(size, size);
    renderer.setClearColor(
      new THREE.Color(background),
      background === "transparent" ? 0 : 1,
    );
    mountRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 3.2, 6);
    camera.lookAt(0, 0, 0);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x777777, 0.7);
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(hemi);
    scene.add(ambient);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(3.2, 48),
      new THREE.MeshBasicMaterial({
        color: 0x555a66,
        transparent: true,
        opacity: 0.35,
      }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.1;
    scene.add(ground);

    const isBoard = dice != null;

    const layoutPositions = (n, spacing = 2.1) => {
      const cols = Math.ceil(Math.sqrt(n));
      const rows = Math.ceil(n / cols);
      const out = [];
      const x0 = -((cols - 1) * spacing) / 2;
      const z0 = -((rows - 1) * spacing) / 2;

      for (let i = 0; i < n; i++) {
        const c = i % cols;
        const r = Math.floor(i / cols);
        out.push({ x: x0 + c * spacing, z: z0 + r * spacing });
      }
      return out;
    };

    const buildOneDie = (s) => {
      if (s === 6) return buildD6();
      if (s === 10)
        return buildD10({
          labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
          baseColor: color,
        });
      if (s === 20) return buildD20();
      if (s === 100) return buildD100Group(); // { group, units, tens }
      return buildD6();
    };

    let mesh;

    if (!isBoard) {
      // ✅ MODE HISTORIQUE : strictement ton comportement
      if (sides === 6) {
        mesh = buildD6();
      } else if (sides === 10) {
        mesh = buildD10({
          labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
          baseColor: color,
        });
      } else if (sides === 20) {
        mesh = buildD20();
      } else if (sides === 100) {
        const { group, units, tens } = buildD100Group();
        mesh = group;
        d100Ref.current = { units, tens };

        group.scale.setScalar(0.75);
        group.position.y = -0.12;
      } else {
        mesh = buildD6();
      }

      if (sides !== 100) mesh.scale.setScalar(1.3);
      if (mesh.rotation) mesh.rotation.set(0.7, 0.9, 0.2);

      scene.add(mesh);
      meshRef.current = mesh;
    } else {
      // ✅ MODE BOARD : 1 seul plateau, plusieurs dés sur la même scène
      // reset board state
      multiRef.current.instances = [];

      // fabrique la liste à afficher
      const flat = [];
      const n6 = Math.max(0, Number(dice.d6 ?? 0));
      const n10 = Math.max(0, Number(dice.d10 ?? 0));
      const n20 = Math.max(0, Number(dice.d20 ?? 0));
      const n100 = Math.max(0, Number(dice.d100 ?? 0));

      for (let i = 0; i < n6; i++) flat.push(6);
      for (let i = 0; i < n10; i++) flat.push(10); // si tu l’actives plus tard
      for (let i = 0; i < n20; i++) flat.push(20);
      for (let i = 0; i < n100; i++) flat.push(100);

      const parent = new THREE.Group();
      const pos = layoutPositions(flat.length, 2.2);

      for (let i = 0; i < flat.length; i++) {
        const s = flat[i];
        const p = pos[i];

        let dieMesh;
        let extra = null;

        if (s === 100) {
          const { group, units, tens } = buildD100Group();
          dieMesh = group;
          extra = { units, tens };
          group.scale.setScalar(0.75);
          group.position.y = -0.12;
        } else {
          dieMesh = buildOneDie(s);
          dieMesh.scale.setScalar(1.3);
        }

        dieMesh.position.set(p.x, 0, p.z);
        dieMesh.rotation.set(
          0.7 + (Math.random() * 0.25 - 0.125),
          0.9 + (Math.random() * 0.25 - 0.125),
          0.2 + (Math.random() * 0.25 - 0.125),
        );

        parent.add(dieMesh);
        multiRef.current.instances.push({
          sides: s,
          mesh: dieMesh,
          extra,
          anim: null,
        });
      }

      scene.add(parent);
      // Zoom out automatique pour tout voir
      fitCameraToObject(camera, parent);
      camera.updateProjectionMatrix();

      // ⚠️ IMPORTANT : en board on ne touche PAS d100Ref (réservé au single)
      d100Ref.current = null;

      // on peut stocker le root dans meshRef si tu veux, mais il ne sera pas traité comme “un dé”
      meshRef.current = parent;
    }

    // // orientation de départ
    // if (mesh.rotation) mesh.rotation.set(0.7, 0.9, 0.2);
    // scene.add(mesh);

    // rendererRef.current = renderer;
    // sceneRef.current = scene;
    // cameraRef.current = camera;
    // meshRef.current = mesh;

    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;

    const render = () => {
      animRef.current = requestAnimationFrame(render);

      if (sides === 100 && d100AnimRef.current.startUnits && d100Ref.current) {
        const now = performance.now();
        const elapsed = now - startTimeRef.current;
        const tNorm = Math.min(1, elapsed / durationMs);
        const ease = easeOutCubic(tNorm);

        const { units, tens } = d100Ref.current;
        const { startUnits, targetUnits, startTens, targetTens } =
          d100AnimRef.current;

        units.quaternion.slerpQuaternions(startUnits, targetUnits, ease);
        tens.quaternion.slerpQuaternions(startTens, targetTens, ease);

        if (tNorm >= 1) {
          units.quaternion.copy(targetUnits);
          tens.quaternion.copy(targetTens);

          d100AnimRef.current = {
            startUnits: null,
            targetUnits: null,
            startTens: null,
            targetTens: null,
          };
          startTimeRef.current = 0;
          if (onRollEnd && currentValueRef.current != null)
            onRollEnd(currentValueRef.current);
        }
      } else if (
        targetQuatRef.current &&
        startQuatRef.current &&
        startTimeRef.current
      ) {
        const now = performance.now();
        const elapsed = now - startTimeRef.current;
        const tNorm = Math.min(1, elapsed / durationMs);
        const ease = easeOutCubic(tNorm);

        const wobble = (1 - ease) * 6;
        meshRef.current.quaternion.slerpQuaternions(
          startQuatRef.current,
          targetQuatRef.current,
          ease,
        );
        meshRef.current.rotateX(wobble * 0.01);
        meshRef.current.rotateY(wobble * 0.013);
        meshRef.current.rotateZ(wobble * 0.008);

        if (tNorm >= 1) {
          targetQuatRef.current = null;
          startQuatRef.current = null;
          startTimeRef.current = 0;
          if (onRollEnd && currentValueRef.current != null)
            onRollEnd(currentValueRef.current);
        }
      } else {
        const isBoard = dice != null;

        if (isBoard && startTimeRef.current) {
          const now = performance.now();
          const elapsed = now - startTimeRef.current;
          const tNorm = Math.min(1, elapsed / durationMs);
          const ease = easeOutCubic(tNorm);

          for (const inst of multiRef.current.instances) {
            if (!inst.anim) continue;

            if (inst.anim.kind === "d100" && inst.extra) {
              const { units, tens } = inst.extra;
              units.quaternion.slerpQuaternions(
                inst.anim.startUnits,
                inst.anim.targetUnits,
                ease,
              );
              tens.quaternion.slerpQuaternions(
                inst.anim.startTens,
                inst.anim.targetTens,
                ease,
              );
            } else if (inst.anim.kind === "single") {
              inst.mesh.quaternion.slerpQuaternions(
                inst.anim.startQuat,
                inst.anim.targetQuat,
                ease,
              );
            }
          }

          if (tNorm >= 1) {
            startTimeRef.current = 0;
            for (const inst of multiRef.current.instances) inst.anim = null;
            if (onRollEnd && currentValueRef.current != null)
              onRollEnd(currentValueRef.current);
          }
        }
      }

      renderer.render(scene, camera);
    };
    render();
  }

  function disposeScene() {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = null;

    if (rendererRef.current) {
      rendererRef.current.dispose();
      const el = rendererRef.current.domElement;
      if (el && el.parentElement) el.parentElement.removeChild(el);
    }
    sceneRef.current = null;
    cameraRef.current = null;
    meshRef.current = null;
    d100Ref.current = null;
  }


  useLayoutEffect(() => {
    disposeScene();
    initScene();
    return () => disposeScene();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    sides,
    size,
    color,
    textColor,
    background,
    durationMs,
    JSON.stringify(dice),
  ]);

  useEffect(() => {
    if (initialValue != null) {
      doRoll(initialValue);
    } else {
      const tid = setTimeout(() => doRoll(undefined), 200);
      return () => clearTimeout(tid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // roll ----------------------------------------------------------
  function doRoll(force) {
    const isBoard = dice != null;

    if (isBoard) {
      if (!multiRef.current.instances.length) return [];

      const results = [];
      // anime tout le monde avec un startTime unique
      startTimeRef.current = performance.now();

      for (const inst of multiRef.current.instances) {
        const s = inst.sides;

        if (s === 100 && inst.extra) {
          const val =
            force != null ? Math.max(1, Math.min(100, force)) : randInt(1, 100);
          results.push(val);

          const { units, tens } = inst.extra;

          const tensVal =
            val === 100
              ? "00"
              : String(Math.floor(val / 10) * 10).padStart(2, "0");
          const unitsVal = val === 100 ? "0" : String(val % 10);

          const mapUnits = units.userData.d10.faceByLabel;
          const mapTens = tens.userData.d10.faceByLabel;

          const nUnitsLocal = mapUnits[unitsVal].normal.clone();
          const nTensLocal = mapTens[tensVal].normal.clone();

          // caméra -> local (même logique que ton single d100)
          const invU = units.parent
            .getWorldQuaternion(new THREE.Quaternion())
            .invert();
          const invT = tens.parent
            .getWorldQuaternion(new THREE.Quaternion())
            .invert();

          const toCamU = dirToCameraFrom(units)
            .applyQuaternion(invU)
            .normalize();
          const toCamT = dirToCameraFrom(tens)
            .applyQuaternion(invT)
            .normalize();

          const upW = cameraWorldUp();
          const upU = upW.clone().applyQuaternion(invU).normalize();
          const upT = upW.clone().applyQuaternion(invT).normalize();

          const qU = quatFaceTowardCameraUpright_LOCAL(
            nUnitsLocal,
            toCamU,
            upU,
          );
          const qT = quatFaceTowardCameraUpright_LOCAL(nTensLocal, toCamT, upT);

          const spinAmp = 1.6;
          const preU = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(
              (Math.random() * 2 - 1) * spinAmp,
              (Math.random() * 2 - 1) * spinAmp,
              (Math.random() * 2 - 1) * spinAmp,
            ),
          );
          const preT = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(
              (Math.random() * 2 - 1) * spinAmp,
              (Math.random() * 2 - 1) * spinAmp,
              (Math.random() * 2 - 1) * spinAmp,
            ),
          );

          inst.anim = {
            kind: "d100",
            startUnits: units.quaternion.clone().multiply(preU),
            targetUnits: qU,
            startTens: tens.quaternion.clone().multiply(preT),
            targetTens: qT,
          };
        } else {
          // d6 / d20
          const val =
            s === 10
              ? force != null
                ? Math.max(0, Math.min(9, force))
                : randInt(0, 9)
              : force != null
                ? Math.max(1, Math.min(s, force))
                : randInt(1, s);

          results.push(val);

          const geom = inst.mesh.geometry;
          const toCam = dirToCameraFrom(inst.mesh);

          let target;
          if (s === 6) {
            const normalMap = {
              1: new THREE.Vector3(0, 1, 0),
              2: new THREE.Vector3(1, 0, 0),
              3: new THREE.Vector3(0, 0, 1),
              4: new THREE.Vector3(0, 0, -1),
              5: new THREE.Vector3(-1, 0, 0),
              6: new THREE.Vector3(0, -1, 0),
            };
            target = quatFaceTowardCameraUpright(normalMap[val].clone(), toCam);
          } else if (s === 20) {
            // d20
            const pos = geom.getAttribute("position");
            const i = Math.max(0, Math.min(pos.count / 3 - 1, val - 1));
            const a = new THREE.Vector3().fromBufferAttribute(pos, i * 3 + 0);
            const b = new THREE.Vector3().fromBufferAttribute(pos, i * 3 + 1);
            const c = new THREE.Vector3().fromBufferAttribute(pos, i * 3 + 2);
            const n = new THREE.Vector3()
              .subVectors(b, a)
              .cross(new THREE.Vector3().subVectors(c, a))
              .normalize();
            target = quatFaceTowardCameraUpright(n, toCam);
          } else if (s === 10) {
            const die = inst.mesh;
            const lbl = String(val);
            const map = die.userData.d10?.faceByLabel;
            if (!map || !map[lbl]) {
              // fallback (au cas où)
              target = die.quaternion.clone();
            } else {
              const nLocal = map[lbl].normal.clone();

              // caméra -> local du D10 (comme ton D100)
              const parentQuat = die.parent
                ? die.parent.getWorldQuaternion(new THREE.Quaternion())
                : new THREE.Quaternion();
              const invParent = parentQuat.clone().invert();

              const toCamLocal = dirToCameraFrom(die)
                .applyQuaternion(invParent)
                .normalize();
              const upCamLocal = cameraWorldUp()
                .clone()
                .applyQuaternion(invParent)
                .normalize();

              target = quatFaceTowardCameraUpright_LOCAL(
                nLocal,
                toCamLocal,
                upCamLocal,
              );
            }
          }

          const preSpin = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(
              Math.random() * 1.2,
              Math.random() * 1.2,
              Math.random() * 1.2,
            ),
          );

          inst.anim = {
            kind: "single",
            startQuat: inst.mesh.quaternion.clone().multiply(preSpin),
            targetQuat: target,
          };
        }
      }

      currentValueRef.current = results;
      return results;
    }

    if (!meshRef.current) return -1;

    if (sides === 100) {
      // valeur 1..100
      const val =
        force != null ? Math.max(1, Math.min(100, force)) : randInt(1, 100);
      currentValueRef.current = val;

      const { units, tens } = d100Ref.current;

      const tensVal =
        val === 100 ? "00" : String(Math.floor(val / 10) * 10).padStart(2, "0");
      const unitsVal = val === 100 ? "0" : String(val % 10);

      const mapUnits = units.userData.d10.faceByLabel;
      const mapTens = tens.userData.d10.faceByLabel;
      const nUnitsLocal = mapUnits[unitsVal].normal.clone();
      const nTensLocal = mapTens[tensVal].normal.clone();

      // >>> transforme caméra (dir + up) dans l'espace *local* de chaque D10
      const parentQuatU = units.parent
        ? units.parent.getWorldQuaternion(new THREE.Quaternion())
        : new THREE.Quaternion();
      const parentQuatT = tens.parent
        ? tens.parent.getWorldQuaternion(new THREE.Quaternion())
        : new THREE.Quaternion();
      const invParentU = parentQuatU.clone().invert();
      const invParentT = parentQuatT.clone().invert();

      const toCamU_LOCAL = dirToCameraFrom(units)
        .applyQuaternion(invParentU)
        .normalize();
      const toCamT_LOCAL = dirToCameraFrom(tens)
        .applyQuaternion(invParentT)
        .normalize();

      const upCamWorld = cameraWorldUp();
      const upCamU_LOCAL = upCamWorld
        .clone()
        .applyQuaternion(invParentU)
        .normalize();
      const upCamT_LOCAL = upCamWorld
        .clone()
        .applyQuaternion(invParentT)
        .normalize();

      // cibles *locales* : face vers caméra + texte droit
      const qUnitsLocal = quatFaceTowardCameraUpright_LOCAL(
        nUnitsLocal,
        toCamU_LOCAL,
        upCamU_LOCAL,
      );
      const qTensLocal = quatFaceTowardCameraUpright_LOCAL(
        nTensLocal,
        toCamT_LOCAL,
        upCamT_LOCAL,
      );

      // on fait TOUJOURS bouger les deux dés (pré-spin), même si la valeur ne change pas
      const spinAmp = 1.6;
      const preU = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          (Math.random() * 2 - 1) * spinAmp,
          (Math.random() * 2 - 1) * spinAmp,
          (Math.random() * 2 - 1) * spinAmp,
        ),
      );
      const preT = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          (Math.random() * 2 - 1) * spinAmp,
          (Math.random() * 2 - 1) * spinAmp,
          (Math.random() * 2 - 1) * spinAmp,
        ),
      );

      d100AnimRef.current.startUnits = units.quaternion.clone().multiply(preU);
      d100AnimRef.current.targetUnits = qUnitsLocal; // << locale
      d100AnimRef.current.startTens = tens.quaternion.clone().multiply(preT);
      d100AnimRef.current.targetTens = qTensLocal; // << locale

      startTimeRef.current = performance.now();
      setOverlay(null);
      return val;
    }

    if (sides === 10) {
      const val =
        force != null ? Math.max(0, Math.min(9, force)) : randInt(0, 9);
      currentValueRef.current = val;

      const die = meshRef.current;
      const lbl = String(val);
      const map = die.userData.d10.faceByLabel;
      const nLocal = map[lbl].normal.clone();

      const toCam = dirToCameraFrom(die);
      // en single, die est directement dans la scène => local == world ok
      const target = quatFaceTowardCameraUpright(nLocal, toCam);

      const preSpin = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          Math.random() * 1.2,
          Math.random() * 1.2,
          Math.random() * 1.2,
        ),
      );

      startQuatRef.current = die.quaternion.clone().multiply(preSpin);
      targetQuatRef.current = target;
      startTimeRef.current = performance.now();
      return val;
    }

    // d6 / d20
    const max = sides;
    const val =
      force != null ? Math.max(1, Math.min(max, force)) : randInt(1, max);
    currentValueRef.current = val;
    setOverlay(null);

    const geom = meshRef.current.geometry;
    const target = targetQuatForValue(geom, sides, val);

    const preSpin = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        Math.random() * 1.2,
        Math.random() * 1.2,
        Math.random() * 1.2,
      ),
    );
    startQuatRef.current = meshRef.current.quaternion.clone().multiply(preSpin);
    targetQuatRef.current = target;
    startTimeRef.current = performance.now();
    return val;
  }

  useImperativeHandle(ref, () => ({
    roll: doRoll,
    value: () => currentValueRef.current,
    dispose: disposeScene,
  }));

  useEffect(() => {
    if (!rendererRef.current || !cameraRef.current) return;
    rendererRef.current.setSize(size, size);
    cameraRef.current.aspect = 1;
    cameraRef.current.updateProjectionMatrix();
  }, [size]);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ width: "100%", height: "100%", position: "relative", ...style }}
    >
      {/* overlay retiré pour d100 réel */}
    </div>
  );
});

export default Dice3D;
