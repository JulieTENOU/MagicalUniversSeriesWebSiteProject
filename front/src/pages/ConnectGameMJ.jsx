import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { socket } from "../service/socket";

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { ConnexionContext } from "../components/provider";
import { useTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import { LinearProgress, Typography, TableRow, TableCell, Table, TableBody, TableHead, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, useMediaQuery, Box, Chip, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import "../../src/styles/responsive.css";

import BG from "../components/Background";
import Top from "../components/Header";
import Btn from "../components/Btn";
import DynamicSkillSelector from "../components/DynamicSkillSelector";
import PageLoader from "../components/PageLoader";


// ── Kanzy / MOB / PNJ ──────────────────────────────────────────
const KANZY_ID = 8;
const isKanzyChar = (char) => Number(char?.users_ID) === KANZY_ID;
const isMobChar   = (char) => char?.Name_character?.slice(0, 3).toUpperCase() === "MOB";

const GAUGE_FIELDS = [
  { key: "currentStamina",     label: "Stamina",       maxKey: "Stamina_character",      color: "#4caf50" },
  { key: "currentManaVital",   label: "Mana Vital",    maxKey: "ManaVital_character",    color: "#f87171" },
  { key: "currentManaAir",     label: "Mana Air",      maxKey: "ManaAir_character",      color: "#14b8a6" },
  { key: "currentManaEau",     label: "Mana Eau",      maxKey: "ManaEau_character",      color: "#60a5fa" },
  { key: "currentManaTerre",   label: "Mana Terre",    maxKey: "ManaTerre_character",    color: "#fb923c" },
  { key: "currentManaFeu",     label: "Mana Feu",      maxKey: "ManaFeu_character",      color: "#fb7185" },
  { key: "currentManaVolonte", label: "Mana Volonté",  maxKey: "ManaVolonte_character",  color: "#a855f7" },
];

const CARAC_FIELDS = [
  { key: "Force_character",      label: "Force" },
  { key: "Dexte_character",      label: "Dextérité" },
  { key: "Resistance_character", label: "Résistance" },
  { key: "Resilience_character", label: "Résilience" },
  { key: "Intell_character",     label: "Intelligence" },
  { key: "Charisme_character",   label: "Charisme" },
  { key: "Chance_character",     label: "Chance" },
];
// ───────────────────────────────────────────────────────────────

function ConnectGameMJ() {
  const { ids } = useParams();
  const idArray = ids.split("&&");
  const theme = useTheme();
  const {
    state: currentUser,
    setState: setCurrentUser,
    loading,
  } = useContext(ConnexionContext);

  let navigate = useNavigate();

  console.log(currentUser?.users_ID);
  const [characters, setCharacters] = useState([]);
  console.log(characters);

  useEffect(() => {
    Promise.all(
      idArray.map((id) =>
        fetch(`/api/characters/getOneCharacterById/${id}`)
          .then((res) => res.json())
          .then((data) => data.data),
      ),
    ).then((list) => setCharacters(list.filter(Boolean)));
  }, [ids]);

  const [selectorVisibleFor, setSelectorVisibleFor] = useState(null); // contient l’ID du joueur sélectionné
  const [skillScores, setSkillScores] = useState({});

  const [allCompetences, setAllCompetences] = useState([]);

  const [selected, setSelected] = useState(() => new Set());
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");

  // ── Édition directe des jauges Kanzy par le MJ ──
  const [mjEditDialog, setMjEditDialog] = useState(null);
  // { charName, charId, field, label, current, max, sign }
  const [mjEditDelta, setMjEditDelta] = useState("");

  const toggleSelected = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () =>
    setSelected(new Set(characters.map((c) => c.ID_character)));
  const clearAll = () => setSelected(new Set());

  const openEndDialog = () => {
    // Si rien n'est sélectionné, on prend tout le monde
    const targets = selected.size > 0
      ? [...selected]
      : characters.map((c) => c.ID_character);
    if (selected.size === 0) setSelected(new Set(targets));
    // Initialise une vraie ligne dans l'état pour chaque personnage concerné
    targets.forEach((id) => ensureRewardRows(id));
    setEndOpen(true);
  };

  const openAlertDialogFor = (targets) => {
    setSelected(new Set(targets));
    setAlertOpen(true);
  };

  const sendAlert = () => {
    const targets = [...selected];
    if (!targets.length || !alertText.trim()) return;

    socket.emit("mj:sendAlert", {
      targets,
      message: alertText,
      severity: alertSeverity,
    });

    setAlertText("");
    setAlertOpen(false);
  };

  useEffect(() => {
    fetch(`/api/competences/findAllComp`)
      .then((res) => res.json())
      .then(setAllCompetences)
      .catch(console.error);
  }, []);

  const handleFinalSelection = (charId, path) => {
    const selectedId = path.at(-1);
    const comp = allCompetences.find((c) => c.id === selectedId);
    console.log("Compétence sélectionnée :", comp);

    if (!comp?.code) return;

    const fieldName = `${comp.code}_character`;
    const char = characters.find((c) => c.ID_character === charId);
    if (!char) return;

    const valeur = char[fieldName] ?? "N/A";

    setSkillScores((prev) => ({
      ...prev,
      [charId]: { valeur, label: comp.nom },
    }));

    setSelectorVisibleFor(null); // ferme le sélecteur après sélection
    console.log("Champ utilisé :", fieldName, "| Valeur :", valeur);
  };

  const [gaugesByCharId, setGaugesByCharId] = useState({});

  // snapshot persisté en base : { [charId]: { ...statsAvant } } ou null si aucun scénar en cours
  const [scenarioSnapshot, setScenarioSnapshot] = useState(null);

  useEffect(() => {
    if (!characters.length) return;

    let cancelled = false;

    async function loadAllGaugesOnce() {
      try {
        const results = await Promise.all(
          characters.map(async (char) => {
            const name = encodeURIComponent(char.Name_character);
            const res = await fetch(`/api/gauges/getOneGauges/${name}`);
            const json = await res.json().catch(() => null);

            if (!res.ok || !json?.data) {
              return [
                char.ID_character,
                {
                  currentManaAir: char.ManaAir_character,
                  currentManaEau: char.ManaEau_character,
                  currentManaTerre: char.ManaTerre_character,
                  currentManaFeu: char.ManaFeu_character,
                  currentManaVolonte: char.ManaVolonte_character,
                  currentManaVital: char.ManaVital_character,
                  currentStamina: char.Stamina_character,
                },
              ];
            }

            return [char.ID_character, json.data];
          }),
        );

        if (cancelled) return;
        setGaugesByCharId(Object.fromEntries(results));
      } catch (e) {
        console.error("Erreur loadAllGauges:", e);
      }
    }

    loadAllGaugesOnce();


    return () => {
      cancelled = true;
    };
  }, [characters]);

  // Chargement des snapshots de début de scénario (persistés en base)
  useEffect(() => {
    if (!characters.length) return;
    const ids = characters.map((c) => c.ID_character).join(",");
    fetch(`/api/scenario/snapshots?ids=${ids}`)
      .then((r) => r.json())
      .then((json) => {
        if (json?.ok && Object.keys(json.data).length) {
          setScenarioSnapshot(json.data);
        }
      })
      .catch(console.error);
  }, [characters]);

  useEffect(() => {
    // ✅ écoute streaming (1 seule fois tant que characters est stable)
    const onGaugeUpdate = ({ name, patch }) => {
      console.log("MJ RECEIVED UPDATE", name, patch);

      if (!name || !patch) return;

      const char = characters.find(
        (c) => c.Name_character === name
      );

      if (!char) {
        console.log("No character found for", name);
        return;
      }

      const id = char.ID_character;

      setGaugesByCharId((prev) => ({
        ...prev,
        [id]: { ...(prev[id] || {}), ...patch },
      }));
    };


    socket.on("gauges:update", onGaugeUpdate);

    return () => {
      socket.off("gauges:update", onGaugeUpdate);
    };
  }, [characters]);

  useEffect(() => {
    console.log("MJ socket before");

    const joinRoom = () => {
      console.log("MJ socket connected");
      socket.emit("join:mj");
    };

    if (socket.connected) {
      // Cas 1 : déjà connecté
      joinRoom();
    } else {
      // Cas 2 : pas encore connecté
      socket.on("connect", joinRoom);
    }

    return () => {
      socket.off("connect", joinRoom);
    };
  }, []);



  const BASE_STAT_OPTIONS = [
    { label: "Force", field: "Force_character" },
    { label: "Dextérité", field: "Dexte_character" },
    { label: "Résistance", field: "Resistance_character" },
    { label: "Résilience", field: "Resilience_character" },
    { label: "Intelligence", field: "Intell_character" },
    { label: "Charisme", field: "Charisme_character" },
    { label: "Chance", field: "Chance_character" },

    { label: "Mana Vital (max)", field: "ManaVital_character" },
    { label: "Mana Air (max)", field: "ManaAir_character" },
    { label: "Mana Eau (max)", field: "ManaEau_character" },
    { label: "Mana Terre (max)", field: "ManaTerre_character" },
    { label: "Mana Feu (max)", field: "ManaFeu_character" },
    { label: "Mana Volonté (max)", field: "ManaVolonte_character" },
    { label: "Stamina (max)", field: "Stamina_character" },
  ];

  const COMP_OPTIONS = (allCompetences || [])
    .filter((c) => !!c.code)
    .map((c) => ({
      label: c.nom,
      field: `${c.code}_character`,
    }));

  const STAT_OPTIONS = [...BASE_STAT_OPTIONS, ...COMP_OPTIONS];

  const isMobile = useMediaQuery("(max-width: 768px)");

  const [endOpen, setEndOpen] = useState(false);

  // { [charId]: [{ field: string, delta: number }, ...] }
  const [rewardsByCharId, setRewardsByCharId] = useState({});

  const ensureRewardRows = (charId) => {
    setRewardsByCharId((prev) => {
      if (prev[charId]?.length) return prev;
      return { ...prev, [charId]: [{ field: "", delta: 0 }] };
    });
  };

  const addRewardRow = (charId) => {
    setRewardsByCharId((prev) => ({
      ...prev,
      [charId]: [...(prev[charId] || [{ field: "", delta: 0 }]), { field: "", delta: 0 }],
    }));
  };

  const removeRewardRow = (charId, idx) => {
    setRewardsByCharId((prev) => ({
      ...prev,
      [charId]: (prev[charId] || []).filter((_, i) => i !== idx),
    }));
  };

  const updateRewardRow = (charId, idx, patch) => {
    setRewardsByCharId((prev) => ({
      ...prev,
      [charId]: (prev[charId] || []).map((row, i) => (i === idx ? { ...row, ...patch } : row)),
    }));
  };

  const buildFieldLabel = (field) => {
    const found = STAT_OPTIONS.find((o) => o.field === field);
    return found?.label || field;
  };

  const handleStartScenario = async () => {
    const targets = characters.map((c) => c.ID_character);
    const res = await fetch("/api/scenario/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targets }),
    });
    const json = await res.json().catch(() => null);
    if (res.ok && json?.ok) {
      // Construire le snapshot local depuis les données déjà chargées
      const snapshot = {};
      for (const char of characters) {
        snapshot[char.ID_character] = { ...char };
      }
      setScenarioSnapshot(snapshot);
    }
  };

  const handleEndScenario = async () => {
    const targets = [...selected].map(Number).filter(Boolean);
    if (!targets.length) return;

    // Nettoyage du payload (on enlève lignes vides / delta 0)
    const rewardsByChar = {};
    for (const id of targets) {
      const rows = rewardsByCharId[id] || [];
      rewardsByChar[id] = rows
        .filter((r) => r?.field && Number(r.delta))
        .map((r) => ({ field: r.field, delta: Number(r.delta) }));
    }

    const hasAny = Object.values(rewardsByChar).some((arr) => arr.length);
    if (!hasAny) return;

    const res = await fetch("/api/scenario/end", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // si ton verifyToken lit un cookie => OK
      // si c'est un Bearer token => il faudra ajouter Authorization ici
      body: JSON.stringify({ targets, rewardsByChar }),
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("end scenario error:", json);
      return;
    }

    // Construire summaryByTarget pour le socket (pop-up joueur)
    // On se base sur ce que tu as envoyé (rewardsByChar),
    // pas besoin d'attendre le result pour ça.
    const summaryByTarget = {};
    for (const id of targets) {
      const rows = rewardsByChar[id] || [];
      summaryByTarget[id] = {
        title: "Fin de scénario",
        lines: rows.map((r) => `+${r.delta} ${buildFieldLabel(r.field)}`),
      };
    }

    socket.emit("mj:scenarioEnd", { targets, summaryByTarget });

    setEndOpen(false);
    // Effacement local du snapshot (le backend l'a déjà supprimé en base)
    setScenarioSnapshot((prev) => {
      if (!prev) return null;
      const next = { ...prev };
      for (const id of targets) delete next[id];
      return Object.keys(next).length ? next : null;
    });
    // setRewardsByCharId({}); // si tu veux tout vider
  };

  // ── Handlers édition jauges Kanzy ──────────────────────────────
  const openMJEdit = (char, gaugeField, sign) => {
    const gauges = gaugesByCharId[char.ID_character] || {};
    const current = Number(gauges[gaugeField.key] ?? char[gaugeField.maxKey]);
    const max = Number(char[gaugeField.maxKey]);
    setMjEditDelta("");
    setMjEditDialog({
      charName: char.Name_character,
      charId:   char.ID_character,
      field:    gaugeField.key,
      label:    gaugeField.label,
      current,
      max,
      sign,
    });
  };

  const confirmMJEdit = async () => {
    if (!mjEditDialog || mjEditDelta === "") return;
    const { charName, charId, field, current, max, sign } = mjEditDialog;
    const newValue = Math.max(0, Math.min(max, current + Math.abs(Number(mjEditDelta)) * sign));
    try {
      const res = await fetch(`/api/gauges/updateGauges/${encodeURIComponent(charName)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: newValue }),
      });
      if (res.ok) {
        setGaugesByCharId((prev) => ({
          ...prev,
          [charId]: { ...(prev[charId] || {}), [field]: newValue },
        }));
      }
    } catch (e) {
      console.error("MJ gauge update error:", e);
    }
    setMjEditDialog(null);
  };
  // ───────────────────────────────────────────────────────────────

  const isInvalidUser =
    !currentUser ||
    (Array.isArray(currentUser) && currentUser.length === 0) ||
    (typeof currentUser === "object" && Object.keys(currentUser).length === 0);

  if (!loading && isInvalidUser) {
    navigate("/", { replace: true });
    return null;
  }

  const getCharGauges = (char) => {
    const gauges = gaugesByCharId[char.ID_character];
    const n = (v) => Number(v);
    const clamp = (v) => Math.min(100, Math.max(0, v));
    const currentManaVital = n(gauges?.currentManaVital ?? char.ManaVital_character);
    const currentStamina = n(gauges?.currentStamina ?? char.Stamina_character);
    const currentManaAir = n(gauges?.currentManaAir ?? char.ManaAir_character);
    const currentManaEau = n(gauges?.currentManaEau ?? char.ManaEau_character);
    const currentManaTerre = n(gauges?.currentManaTerre ?? char.ManaTerre_character);
    const currentManaFeu = n(gauges?.currentManaFeu ?? char.ManaFeu_character);
    const currentManaVolonte = n(gauges?.currentManaVolonte ?? char.ManaVolonte_character);
    return {
      currentManaVital, currentStamina, currentManaAir, currentManaEau,
      currentManaTerre, currentManaFeu, currentManaVolonte,
      clampedManaVital: clamp((currentManaVital / char.ManaVital_character) * 100),
      clampedStamina: clamp((currentStamina / char.Stamina_character) * 100),
      clampedManaAir: clamp((currentManaAir / char.ManaAir_character) * 100),
      clampedManaEau: clamp((currentManaEau / char.ManaEau_character) * 100),
      clampedManaTerre: clamp((currentManaTerre / char.ManaTerre_character) * 100),
      clampedManaFeu: clamp((currentManaFeu / char.ManaFeu_character) * 100),
      clampedManaVolonte: clamp((currentManaVolonte / char.ManaVolonte_character) * 100),
    };
  };

  if (loading) return <PageLoader />;

  // Sépare les joueurs des entités Kanzy (MOB / PNJ)
  const kanzyChars  = characters.filter(isKanzyChar);
  const playerChars = characters.filter((c) => !isKanzyChar(c));

  // Section "Entités en jeu" (MOB / PNJ) — réutilisée mobile + desktop
  const kanzySection = kanzyChars.length > 0 && (
    <Box sx={{ mt: 3, pt: 2, borderTop: "1px dashed rgba(255,165,0,0.35)" }}>
      <Typography variant="h6" sx={{ color: "#ffa726", mb: 2, textAlign: "center" }}>
        ⚔️ Entités en jeu
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
        {kanzyChars.map((char) => {
          const mob    = isMobChar(char);
          const gauges = gaugesByCharId[char.ID_character] || {};
          const activeGauges = GAUGE_FIELDS.filter((f) => Number(char[f.maxKey]) > 0);
          const activeCaracs = CARAC_FIELDS.filter((f) => Number(char[f.key])    > 0);

          return (
            <Box
              key={char.ID_character}
              sx={{
                border: "1px solid rgba(255,165,0,0.4)",
                borderRadius: 2,
                p: 2,
                minWidth: 280,
                maxWidth: 380,
                flex: "1 1 280px",
                background: "rgba(255,100,0,0.05)",
              }}
            >
              {/* En-tête */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                <Typography variant="h6" sx={{ color: "#ffa726", flex: 1 }}>
                  {char.Name_character}
                </Typography>
                <Chip
                  label={mob ? "MOB" : "PNJ"}
                  size="small"
                  sx={{ background: mob ? "#7f1d1d" : "#1e3a5f", color: "white", fontWeight: "bold" }}
                />
              </Box>

              {/* Caractéristiques */}
              {activeCaracs.length > 0 && (
                <>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)", display: "block", mb: 0.5, letterSpacing: 1 }}>
                    CARACTÉRISTIQUES
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                    {activeCaracs.map((f) => (
                      <Box key={f.key} sx={{ textAlign: "center", minWidth: 56, background: "rgba(255,255,255,0.06)", borderRadius: 1, p: "4px 8px" }}>
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)", display: "block" }}>
                          {f.label}
                        </Typography>
                        <Typography sx={{ color: "white", fontWeight: "bold", fontSize: "1rem" }}>
                          {char[f.key]}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </>
              )}

              {/* Jauges éditables */}
              {activeGauges.length > 0 && (
                <>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)", display: "block", mb: 1, letterSpacing: 1 }}>
                    JAUGES
                  </Typography>
                  {activeGauges.map((f) => {
                    const current = Number(gauges[f.key] ?? char[f.maxKey]);
                    const max     = Number(char[f.maxKey]);
                    const pct     = Math.min(100, Math.max(0, (current / max) * 100));
                    return (
                      <Box key={f.key} sx={{ mb: 1.5 }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.25 }}>
                          <Typography variant="caption" sx={{ color: f.color, fontWeight: "bold" }}>
                            {f.label}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
                            <IconButton size="small" onClick={() => openMJEdit(char, f, -1)} sx={{ color: "#f87171", p: "2px" }}>
                              <RemoveCircleOutlineIcon fontSize="small" />
                            </IconButton>
                            <Typography variant="body2" sx={{ color: "white", minWidth: 72, textAlign: "center", fontSize: "0.85rem" }}>
                              {current} / {max}
                            </Typography>
                            <IconButton size="small" onClick={() => openMJEdit(char, f, 1)} sx={{ color: "#4ade80", p: "2px" }}>
                              <AddCircleOutlineIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={pct}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: "rgba(255,255,255,0.1)",
                            "& .MuiLinearProgress-bar": { backgroundColor: f.color },
                          }}
                        />
                      </Box>
                    );
                  })}
                </>
              )}

              {/* Compétences — PNJ uniquement */}
              {!mob && (
                <Box sx={{ mt: 1.5, borderTop: "1px solid rgba(255,255,255,0.1)", pt: 1 }}>
                  <Btn
                    onClick={() => setSelectorVisibleFor(
                      selectorVisibleFor === char.ID_character ? null : char.ID_character
                    )}
                    msg="Compétence"
                  />
                  {selectorVisibleFor === char.ID_character && (
                    <DynamicSkillSelector
                      onFinalSelect={(path) => handleFinalSelection(char.ID_character, path)}
                    />
                  )}
                  {skillScores[char.ID_character] && (
                    <Typography sx={{ mt: 1, fontSize: "1.05rem", color: "lightblue" }}>
                      {skillScores[char.ID_character].label} : {skillScores[char.ID_character].valeur}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );

  const actionButtons = (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 10 }}>
      <Btn msg="Tout sélectionner" onClick={selectAll} />
      <Btn msg="Vider sélection" onClick={clearAll} />
      <Btn msg="Alerte sélection" onClick={() => setAlertOpen(true)} />
      <Btn msg="Alerte à tous" onClick={() => openAlertDialogFor(characters.map((c) => c.ID_character))} />
    </div>
  );

  return (
    <div className="main">
      <BG />
      <Top started={currentUser} />
      {isMobile ? (
        <>
          <div style={{
            position: "fixed",
            top: "56px",
            left: 0,
            right: 0,
            zIndex: 50,
            background: "rgba(10,10,20,0.92)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            padding: "8px 12px",
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            justifyContent: "center",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}>
            <Btn msg="Tout sélectionner" onClick={selectAll} />
            <Btn msg="Vider sélection" onClick={clearAll} />
            <Btn msg="Alerte sélection" onClick={() => setAlertOpen(true)} />
            <Btn msg="Alerte à tous" onClick={() => openAlertDialogFor(characters.map((c) => c.ID_character))} />
          </div>
          <div style={{ padding: "130px 12px 100px", display: "flex", flexDirection: "column", gap: 16 }}>
          {playerChars.map((char) => {
            const {
              currentManaVital, currentStamina, currentManaAir, currentManaEau,
              currentManaTerre, currentManaFeu, currentManaVolonte,
              clampedManaVital, clampedStamina, clampedManaAir, clampedManaEau,
              clampedManaTerre, clampedManaFeu, clampedManaVolonte,
            } = getCharGauges(char);
            return (
              <div
                key={char.ID_character}
                style={{
                  border: selected.has(char.ID_character)
                    ? "2px solid #90caf9"
                    : "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 10,
                  padding: 12,
                  background: selected.has(char.ID_character)
                    ? "rgba(144,202,249,0.1)"
                    : "rgba(0,0,0,0.3)",
                  transition: "border 0.2s, background 0.2s",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* En-tête : nom + checkbox */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <p style={{ color: "lightblue", fontSize: "1.1rem", fontWeight: "bold", margin: 0 }}>
                    {char.Name_character}
                  </p>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                    <span style={{ color: "lightblue", fontSize: "0.85rem" }}>
                      {selected.has(char.ID_character) ? "Sélectionné ✓" : "Sélectionner"}
                    </span>
                    <input
                      type="checkbox"
                      checked={selected.has(char.ID_character)}
                      onChange={() => toggleSelected(char.ID_character)}
                      style={{ width: 22, height: 22, cursor: "pointer" }}
                    />
                  </label>
                </div>

                {/* Barres verticales - ligne 1 : Air, Eau, Terre */}
                <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 8 }}>
                  {[
                    { label: "Air", value: currentManaAir, clamped: clampedManaAir, color: "success", barSx: { "& .MuiLinearProgress-bar": { backgroundColor: "#14b8a6" } } },
                    { label: "Eau", value: currentManaEau, clamped: clampedManaEau, color: "info", barSx: {} },
                    { label: "Terre", value: currentManaTerre, clamped: clampedManaTerre, color: "warning", barSx: {} },
                  ].map(({ label, value, clamped, color, barSx }) => (
                    <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 15, width: "30%" }}>
                      <div style={{ position: "relative", width: "8px", height: "25vw" }}>
                        <LinearProgress variant="determinate" value={clamped} color={color}
                          sx={{ position: "absolute", bottom: 0, left: "8px", width: "25vw", height: "8px", borderRadius: "25px", transformOrigin: "bottom left", transform: "rotate(-90deg)", ...barSx }} />
                      </div>
                      <p style={{ color: "lightblue", fontSize: "0.85rem", textAlign: "center", margin: 0, whiteSpace: "nowrap" }}>
                        {label}<br />{value} pts
                      </p>
                    </div>
                  ))}
                </div>

                {/* Barres verticales - ligne 2 : Feu, Volonté */}
                <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 20 }}>
                  {[
                    { label: "Feu", value: currentManaFeu, clamped: clampedManaFeu, color: "error", barSx: { "& .MuiLinearProgress-bar": { backgroundColor: "#fb7185" }, backgroundColor: "#991b1b" } },
                    { label: "Volonté", value: currentManaVolonte, clamped: clampedManaVolonte, color: "primary", barSx: { "& .MuiLinearProgress-bar": { backgroundColor: "#a855f7" }, backgroundColor: "#6b21a8" } },
                  ].map(({ label, value, clamped, color, barSx }) => (
                    <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 15, width: "30%" }}>
                      <div style={{ position: "relative", width: "8px", height: "25vw" }}>
                        <LinearProgress variant="determinate" value={clamped} color={color}
                          sx={{ position: "absolute", bottom: 0, left: "8px", width: "25vw", height: "8px", borderRadius: "25px", transformOrigin: "bottom left", transform: "rotate(-90deg)", ...barSx }} />
                      </div>
                      <p style={{ color: "lightblue", fontSize: "0.85rem", textAlign: "center", margin: 0, whiteSpace: "nowrap" }}>
                        {label}<br />{value} pts
                      </p>
                    </div>
                  ))}
                </div>

                {/* CircularProgressbar Vital + Stamina */}
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <p style={{ color: "lightblue", fontSize: "0.9rem", margin: 0 }}>Mana Vital</p>
                    <div style={{ width: "40dvw" }}>
                      <CircularProgressbar
                        value={clampedManaVital}
                        circleRatio={0.5}
                        text={`${currentManaVital} pts`}
                        styles={buildStyles({ rotation: 0.75, strokeLinecap: "butt", textSize: "1em", pathTransitionDuration: 0.5, pathColor: "red", textColor: "#f88", trailColor: "#af8c8d" })}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <p style={{ color: "lightblue", fontSize: "0.9rem", margin: 0 }}>Stamina</p>
                    <div style={{ width: "40dvw" }}>
                      <CircularProgressbar
                        value={clampedStamina}
                        circleRatio={0.5}
                        text={`${currentStamina} pts`}
                        styles={buildStyles({ rotation: 0.75, strokeLinecap: "butt", textSize: "1em", pathTransitionDuration: 0.5, pathColor: "#42d750", textColor: "#f88", trailColor: "#cfe9d2" })}
                      />
                    </div>
                  </div>
                </div>

                {/* Actions : Compétence + Alerte */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginTop: 8 }}>
                  <Btn
                    onClick={() => setSelectorVisibleFor(selectorVisibleFor === char.ID_character ? null : char.ID_character)}
                    msg="Compétence"
                  />
                  <Btn msg="Alerte" onClick={() => openAlertDialogFor([char.ID_character])} />
                </div>

                {selectorVisibleFor === char.ID_character && (
                  <DynamicSkillSelector
                    onFinalSelect={(path) => handleFinalSelection(char.ID_character, path)}
                  />
                )}
                {skillScores[char.ID_character] && (
                  <p style={{ marginTop: 8, fontSize: "1.1rem", color: "lightblue" }}>
                    {skillScores[char.ID_character].label} : {skillScores[char.ID_character].valeur}
                  </p>
                )}
              </div>
            );
          })}
          {/* Entités Kanzy — mobile */}
          <Box sx={{ px: 1, pb: "100px" }}>{kanzySection}</Box>

          <Button
            variant="contained"
            color={scenarioSnapshot ? "success" : "primary"}
            onClick={handleStartScenario}
            disabled={!!scenarioSnapshot}
            sx={{ position: "fixed", left: 16, bottom: 16, zIndex: 9999 }}
          >
            {scenarioSnapshot ? "Scénario en cours" : "Début de scénario"}
          </Button>
          <Button variant="contained" onClick={openEndDialog} sx={{ position: "fixed", right: 16, bottom: 16, zIndex: 9999 }}>
            Fin de scénario
          </Button>
        </div>
        </>
      ) : (
        <div
          id="holocom"
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            justifyContent: "space-around",
          }}
        >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              position: "fixed",
              width: "70vw",
              alignSelf: "end",
              alignItems: "start",
              display: "flex",
              flexDirection: "column",
              textAlign: "right",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                position: "fixed",
                display: "flex",
                flexDirection: "column",
                justifyContent: "inherit",
                bottom: "45vh",
                width: "auto",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  position: "fixed",
                  display: "flex",
                  left: "34vw",
                  top: "10vh",
                  flexDirection: "row",
                  justifyContent: "center",
                  width: "auto",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    position: "fixed",
                    display: "flex",
                    left: "15vw",
                    top: "15vh",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "auto",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      justifyContent: "center",
                      marginBottom: 10,
                    }}
                  >
                    <Btn msg="Tout sélectionner" onClick={selectAll} />
                    <Btn msg="Vider sélection" onClick={clearAll} />
                    <Btn
                      msg="Alerte sélection"
                      onClick={() => setAlertOpen(true)}
                    />
                    <Btn
                      msg="Alerte à tous"
                      onClick={() =>
                        openAlertDialogFor(
                          characters.map((c) => c.ID_character),
                        )
                      }
                    />
                  </div>

                  <Table sx={{ border: "none" }}>
                    <TableHead sx={{ border: "none" }}>
                      <TableRow variant="head" sx={{ border: "none" }}>
                        <TableCell sx={{ border: "none" }}></TableCell>
                        <TableCell sx={{ border: "none" }}>
                          {" "}
                          <Typography
                            className="label"
                            variant="h5"
                            sx={{ color: theme.custom.mymodal.text }}
                            s
                            textAlign={"center"}
                          >
                            Mana Vital
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Typography
                            className="label"
                            variant="h5"
                            sx={{ color: theme.custom.mymodal.text }}
                            s
                            textAlign={"center"}
                          >
                            Stamina
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Typography
                            className="label"
                            variant="h5"
                            sx={{ color: theme.custom.mymodal.text }}
                            s
                            textAlign={"center"}
                          >
                            Mana Air
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Typography
                            className="label"
                            variant="h5"
                            sx={{ color: theme.custom.mymodal.text }}
                            s
                            textAlign={"center"}
                          >
                            Mana Eau
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Typography
                            className="label"
                            variant="h5"
                            sx={{ color: theme.custom.mymodal.text }}
                            s
                            textAlign={"center"}
                          >
                            Mana Terre
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Typography
                            className="label"
                            variant="h5"
                            sx={{ color: theme.custom.mymodal.text }}
                            s
                            textAlign={"center"}
                          >
                            Mana Feu
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Typography
                            className="label"
                            variant="h5"
                            sx={{ color: theme.custom.mymodal.text }}
                            s
                            textAlign={"center"}
                          >
                            Mana Volonté
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Typography
                            className="label"
                            variant="h5"
                            sx={{ color: theme.custom.mymodal.text }}
                            s
                            textAlign={"center"}
                          >
                            Compétence
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Typography
                            className="label"
                            variant="h5"
                            sx={{ color: theme.custom.mymodal.text }}
                            textAlign="center"
                          >
                            Sélection
                          </Typography>
                        </TableCell>

                        <TableCell sx={{ border: "none" }}>
                          <Typography
                            className="label"
                            variant="h5"
                            sx={{ color: theme.custom.mymodal.text }}
                            textAlign="center"
                          >
                            Alerte
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {playerChars.map((char) => {
                        // 1) je récupère les gauges courantes de CE perso
                        const gauges = gaugesByCharId[char.ID_character];
                        // console.log("char:", char);
                        // 2) je crée des valeurs "courantes" avec fallback si pas encore chargé
                        const n = (v) => Number(v);
                        // utilitaire clamp identique à la page joueur
                        const currentManaVital = n(
                          gauges?.currentManaVital ?? char.ManaVital_character,
                        );
                        // console.log("currentManaVital: ", currentManaVital);
                        const currentStamina = n(
                          gauges?.currentStamina ?? char.Stamina_character,
                        );
                        // console.log("currentStamina: ", currentStamina);
                        const currentManaAir = n(
                          gauges?.currentManaAir ?? char.ManaAir_character,
                        );
                        // console.log("currentManaAir: ", currentManaAir);

                        const currentManaEau = n(
                          gauges?.currentManaEau ?? char.ManaEau_character,
                        );
                        // console.log("currentManaEau: ", currentManaEau);

                        const currentManaTerre = n(
                          gauges?.currentManaTerre ?? char.ManaTerre_character,
                        );
                        // console.log("currentManaTerre: ", currentManaTerre);

                        const currentManaFeu = n(
                          gauges?.currentManaFeu ?? char.ManaFeu_character,
                        );
                        // console.log("currentManaFeu: ", currentManaFeu);

                        const currentManaVolonte = n(
                          gauges?.currentManaVolonte ??
                          char.ManaVolonte_character,
                        );
                        // console.log("currentManaVolonte: ", currentManaVolonte);

                        const clamp = (v) => Math.min(100, Math.max(0, v));

                        // Mana Vital
                        const percentManaVital =
                          (currentManaVital / char.ManaVital_character) * 100;
                        // console.log("maxManaVital: ", char.ManaVital_character);
                        const clampedManaVital = clamp(percentManaVital);
                        // console.log("clampedManaVital: ", clampedManaVital);

                        // Stamina
                        const percentStamina =
                          (currentStamina / char.Stamina_character) * 100;
                        // console.log("maxStamina: ", char.Stamina_character);
                        const clampedStamina = clamp(percentStamina);
                        // console.log("clampedStamina: ", clampedStamina);

                        // Mana Air
                        const percentManaAir =
                          (currentManaAir / char.ManaAir_character) * 100;
                        // console.log("maxManaAir: ", char.ManaAir_character);
                        const clampedManaAir = clamp(percentManaAir);
                        // console.log("clampedManaAir: ", clampedManaAir);

                        // Mana Eau
                        const percentManaEau =
                          (currentManaEau / char.ManaEau_character) * 100;
                        // console.log("maxManaEau: ", char.ManaEau_character);
                        const clampedManaEau = clamp(percentManaEau);
                        // console.log("clampedManaEau: ", clampedManaEau);

                        // Mana Terre
                        const percentManaTerre =
                          (currentManaTerre / char.ManaTerre_character) * 100;
                        // console.log("maxManaTerre: ", char.ManaTerre_character);
                        const clampedManaTerre = clamp(percentManaTerre);
                        // console.log("clampedManaTerre: ", clampedManaTerre);

                        // Mana Feu
                        const percentManaFeu =
                          (currentManaFeu / char.ManaFeu_character) * 100;

                        // console.log("maxManaFeu: ", char.ManaFeu_character);
                        const clampedManaFeu = clamp(percentManaFeu);
                        // console.log("clampedManaFeu: ", clampedManaFeu);

                        // Mana Volonté
                        const percentManaVolonte =
                          (currentManaVolonte / char.ManaVolonte_character) *
                          100;
                        // console.log("maxManaVolonte: ",char.ManaVolonte_character);
                        const clampedManaVolonte = clamp(percentManaVolonte);
                        // console.log("clampedManaVolonte: ", clampedManaVolonte);

                        return (
                          <TableRow
                            key={char.ID_character}
                            sx={{ border: "none" }}
                          >
                            <TableCell sx={{ border: "none" }}>
                              {char.Name_character}
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <div
                                className="container"
                                style={{
                                  width: "120px",
                                  height: "60px",
                                  overflow: "hidden",
                                  margin: "0 auto",
                                }}
                              >
                                <CircularProgressbar
                                  value={clampedManaVital}
                                  circleRatio={0.5}
                                  styles={buildStyles({
                                    rotation: 0.75,
                                    strokeLinecap: "butt",
                                    pathTransitionDuration: 0.5,
                                    pathColor: `red`,
                                    textColor: "#f88",
                                    trailColor: "#af8c8d",
                                    backgroundColor: "#3e98c7",
                                  })}
                                />
                              </div>
                              <Typography
                                className="label"
                                variant="h5"
                                sx={{ color: theme.custom.mymodal.text }}
                                textAlign={"center"}
                              >
                                {currentManaVital} points
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <div
                                className="container"
                                style={{
                                  width: "120px",
                                  height: "60px",
                                  overflow: "hidden",
                                  margin: "0 auto",
                                }}
                              >
                                <CircularProgressbar
                                  value={clampedStamina}
                                  circleRatio={0.5}
                                  styles={buildStyles({
                                    rotation: 0.75,
                                    strokeLinecap: "butt",
                                    pathTransitionDuration: 0.5,
                                    pathColor: "#4caf50",
                                    textColor: "#f88",
                                    trailColor: "#cfe9d2",
                                    backgroundColor: "#3e98c7",
                                  })}
                                />
                              </div>
                              <Typography
                                className="label"
                                variant="h5"
                                sx={{ color: theme.custom.mymodal.text }}
                                textAlign={"center"}
                              >
                                {currentStamina} points
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <LinearProgress
                                color="success"
                                id="manaAir"
                                variant="determinate"
                                value={clampedManaAir}
                                sx={{
                                  height: "5px",
                                  width: "60px",
                                  borderRadius: "25px",
                                  transform: "rotate(-90deg)",
                                  "& .MuiLinearProgress-bar": { backgroundColor: "#14b8a6" },
                                }}
                              />
                              <Typography
                                className="label"
                                position={"relative"}
                                top={"5vh"}
                                variant="h5"
                                sx={{ color: theme.custom.mymodal.text }}
                                textAlign={"center"}
                              >
                                {currentManaAir} points
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <LinearProgress
                                color="info"
                                id="manaEau"
                                variant="determinate"
                                value={clampedManaEau}
                                sx={{
                                  height: "5px",
                                  width: "60px",
                                  borderRadius: "25px",
                                  transform: "rotate(-90deg)",
                                }}
                              />
                              <Typography
                                className="label"
                                position={"relative"}
                                top={"5vh"}
                                variant="h5"
                                sx={{ color: theme.custom.mymodal.text }}
                                textAlign={"center"}
                              >
                                {currentManaEau} points
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <LinearProgress
                                color="warning"
                                id="manaTerre"
                                variant="determinate"
                                value={clampedManaTerre}
                                sx={{
                                  height: "5px",
                                  width: "60px",
                                  borderRadius: "25px",
                                  transform: "rotate(-90deg)",
                                }}
                              />
                              <Typography
                                className="label"
                                position={"relative"}
                                top={"5vh"}
                                variant="h5"
                                sx={{ color: theme.custom.mymodal.text }}
                                textAlign={"center"}
                              >
                                {currentManaTerre} points
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <LinearProgress
                                color="error"
                                id="manaFeu"
                                variant="determinate"
                                value={clampedManaFeu}
                                sx={{
                                  height: "5px",
                                  width: "60px",
                                  borderRadius: "25px",
                                  transform: "rotate(-90deg)",
                                  "& .MuiLinearProgress-bar": { backgroundColor: "#fb7185" },
                                  backgroundColor: "#991b1b",
                                }}
                              />
                              <Typography
                                className="label"
                                position={"relative"}
                                top={"5vh"}
                                variant="h5"
                                sx={{ color: theme.custom.mymodal.text }}
                                textAlign={"center"}
                              >
                                {currentManaFeu} points
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <LinearProgress
                                color="primary"
                                id="manaVolonte"
                                variant="determinate"
                                value={clampedManaVolonte}
                                sx={{
                                  height: "5px",
                                  width: "60px",
                                  borderRadius: "25px",
                                  transform: "rotate(-90deg)",
                                  "& .MuiLinearProgress-bar": { backgroundColor: "#a855f7" },
                                  backgroundColor: "#6b21a8",
                                }}
                              />
                              <Typography
                                className="label"
                                position={"relative"}
                                top={"5vh"}
                                variant="h5"
                                sx={{ color: theme.custom.mymodal.text }}
                                textAlign={"center"}
                              >
                                {currentManaVolonte} points
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <Btn
                                onClick={() =>
                                  setSelectorVisibleFor(
                                    selectorVisibleFor === char.ID_character
                                      ? null
                                      : char.ID_character,
                                  )
                                }
                                msg="Compétence"
                              />

                              {selectorVisibleFor === char.ID_character && (
                                <DynamicSkillSelector
                                  onFinalSelect={(path) =>
                                    handleFinalSelection(
                                      char.ID_character,
                                      path,
                                    )
                                  }
                                />
                              )}

                              {skillScores[char.ID_character] && (
                                <h2
                                  style={{
                                    marginTop: "8px",
                                    fontSize: "1.2rem",
                                    color: "white",
                                  }}
                                >
                                  {skillScores[char.ID_character].label} :{" "}
                                  {skillScores[char.ID_character].valeur}
                                </h2>
                              )}
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <input
                                type="checkbox"
                                checked={selected.has(char.ID_character)}
                                onChange={() =>
                                  toggleSelected(char.ID_character)
                                }
                              />
                            </TableCell>

                            <TableCell sx={{ border: "none" }}>
                              <Btn
                                msg="Envoyer"
                                onClick={() =>
                                  openAlertDialogFor([char.ID_character])
                                }
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>

                  {/* Entités Kanzy — desktop */}
                  <Box sx={{ mt: 2, mb: "80px" }}>{kanzySection}</Box>

                  <Button
                    variant="contained"
                    color={scenarioSnapshot ? "success" : "primary"}
                    onClick={handleStartScenario}
                    disabled={!!scenarioSnapshot}
                    sx={{ position: "fixed", left: 16, bottom: 16, zIndex: 9999 }}
                  >
                    {scenarioSnapshot ? "Scénario en cours" : "Début de scénario"}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={openEndDialog}
                    sx={{ position: "fixed", right: 16, bottom: 16, zIndex: 9999 }}
                  >
                    Fin de scénario
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      <Dialog
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Envoyer une alerte</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            multiline
            minRows={3}
            label="Message"
            value={alertText}
            onChange={(e) => setAlertText(e.target.value)}
            sx={{ marginTop: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAlertOpen(false)}>Annuler</Button>
          <Button
            onClick={sendAlert}
            disabled={!alertText.trim() || selected.size === 0}
          >
            Envoyer ({selected.size})
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={endOpen} onClose={() => setEndOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Fin de scénario</DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Les joueurs concernés = ta sélection actuelle. Ajoute les gains, puis valide.
            Les jauges seront remises au max (après augmentation éventuelle des max).
          </Typography>

          {characters
            .filter((c) => selected.has(c.ID_character))
            .map((char) => {
              const charId = char.ID_character;
              const rows = rewardsByCharId[charId] || [];

              return (
                <div
                  key={charId}
                  style={{
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 10,
                    padding: 12,
                  }}
                >
                  <Typography variant="h6">{char.Name_character}</Typography>

                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <Button
                      size="small"
                      onClick={() => {
                        ensureRewardRows(charId);
                        addRewardRow(charId);
                      }}
                    >
                      + Ajouter une stat
                    </Button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
                    {rows.map((row, idx) => {
                      const snap = scenarioSnapshot?.[charId];
                      const valAvant = row.field && snap ? snap[row.field] : undefined;
                      const valApres = valAvant !== undefined ? valAvant + (row.delta ?? 0) : undefined;
                      return (
                        <div key={idx} style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                          <TextField
                            select
                            fullWidth
                            label="Stat / Compétence"
                            value={row.field || ""}
                            onChange={(e) => updateRewardRow(charId, idx, { field: e.target.value })}
                            sx={{ minWidth: 180, flex: 1 }}
                          >
                            <MenuItem value="">— Choisir —</MenuItem>
                            {STAT_OPTIONS.map((opt) => (
                              <MenuItem key={opt.field} value={opt.field}>
                                {opt.label}
                                {scenarioSnapshot?.[charId]?.[opt.field] !== undefined && (
                                  <span style={{ opacity: 0.55, fontSize: "0.8em", marginLeft: 6 }}>
                                    (avant : {scenarioSnapshot[charId][opt.field]})
                                  </span>
                                )}
                              </MenuItem>
                            ))}
                          </TextField>

                          {valAvant !== undefined && (
                            <Typography variant="body2" sx={{ whiteSpace: "nowrap", opacity: 0.7, minWidth: 90 }}>
                              {valAvant} → {valApres}
                            </Typography>
                          )}

                          <TextField
                            label="delta"
                            type="number"
                            value={row.delta ?? 0}
                            onChange={(e) => updateRewardRow(charId, idx, { delta: Number(e.target.value) })}
                            sx={{ width: 100 }}
                          />

                          <Button
                            size="small"
                            color="error"
                            onClick={() => removeRewardRow(charId, idx)}
                            disabled={(rewardsByCharId[charId] || []).length <= 1}
                          >
                            Supprimer
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

          {selected.size === 0 && (
            <Typography sx={{ opacity: 0.8 }}>
              Aucun joueur sélectionné. Coche des joueurs dans le tableau avant.
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEndOpen(false)}>Annuler</Button>
          <Button variant="contained" onClick={handleEndScenario} disabled={selected.size === 0}>
            Valider fin de scénario
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog édition jauge MJ (entités Kanzy) */}
      <Dialog open={!!mjEditDialog} onClose={() => setMjEditDialog(null)} maxWidth="xs" fullWidth>
        <DialogTitle>
          {mjEditDialog?.sign === 1 ? "➕ Gain" : "➖ Perte"} — {mjEditDialog?.label}
          <Typography variant="caption" sx={{ display: "block", opacity: 0.6 }}>
            {mjEditDialog?.charName} · actuel : {mjEditDialog?.current} / {mjEditDialog?.max}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Nombre de points (valeur absolue)"
            type="number"
            inputProps={{ min: 0 }}
            value={mjEditDelta}
            onChange={(e) => setMjEditDelta(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMjEditDialog(null)}>Annuler</Button>
          <Button
            variant="contained"
            onClick={confirmMJEdit}
            disabled={mjEditDelta === "" || Number(mjEditDelta) < 0}
          >
            Valider
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default ConnectGameMJ;
