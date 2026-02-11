import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import Dice3D from "./Dice3D";

export default function DiceChoice({
  hidden = false,
  maxDice = 20,
  dieSize = 180,
  color = "#eeeeee",
  background = "#0b102a",
  textColor = "#111",
  durationMs = 1400,
  allowD10 = true,
  className,
  style,
  onResultsChange,
}) {
  // compteurs par type
  const [counts, setCounts] = useState({ 6: 0, 10: 0, 20: 0, 100: 0 });

  // valeurs par type (tableaux)
  const [values, setValues] = useState({ 6: [], 10: [], 20: [], 100: [] });

  // 4 refs max (une par type)
  const boardRef = useRef(null);

  const totalDice = counts[6] + counts[10] + counts[20] + counts[100];

  const countsText = useMemo(() => {
    const parts = [];
    if (counts[6]) parts.push(`${counts[6]}d6`);
    if (counts[10]) parts.push(`${counts[10]}d10`);
    if (counts[20]) parts.push(`${counts[20]}d20`);
    if (counts[100]) parts.push(`${counts[100]}d100`);
    return parts.join(", ");
  }, [counts]);

  const valuesList = useMemo(
    () =>
      [...values[6], ...values[10], ...values[20], ...values[100]].filter(
        (v) => typeof v === "number",
      ),
    [values],
  );

  const total = useMemo(
    () => valuesList.reduce((a, b) => a + b, 0),
    [valuesList],
  );

  const addDie = (sides) => {
    setCounts((prev) => {
      const total = prev[6] + prev[10] + prev[20] + prev[100];
      if (total >= maxDice) return prev;
      return { ...prev, [sides]: prev[sides] + 1 };
    });

    setValues((prev) => ({
      ...prev,
      [sides]: [...prev[sides], null],
    }));
  };

  const removeDie = (sides) => {
    setCounts((prev) => {
      if (prev[sides] <= 0) return prev;
      return { ...prev, [sides]: prev[sides] - 1 };
    });

    setValues((prev) => ({
      ...prev,
      [sides]: prev[sides].slice(0, Math.max(0, prev[sides].length - 1)),
    }));
  };

  const reroll = () => {
    const v = boardRef.current?.roll?.();
    if (!v) return;
    // affichage immédiat
    const next = { 6: [], 10: [], 20: [], 100: [] };
    let k = 0;
    for (let i = 0; i < counts[6]; i++) next[6].push(v[k++]);
    for (let i = 0; i < counts[10]; i++) next[10].push(v[k++]);
    for (let i = 0; i < counts[20]; i++) next[20].push(v[k++]);
    for (let i = 0; i < counts[100]; i++) next[100].push(v[k++]);
    setValues(next);
  };

  const reset = () => {
    setCounts({ 6: 0, 10: 0, 20: 0, 100: 0 });
    setValues({ 6: [], 10: [], 20: [], 100: [] });
    onResultsChange?.({ dice: [], values: [], total: 0, countsText: "" });
  };

  useEffect(() => {
    if (!onResultsChange) return;

    const dicePayload = [
      ...values[6].map((v, i) => ({
        id: `6-${i}`,
        sides: 6,
        value: v ?? null,
      })),
      ...values[10].map((v, i) => ({
        id: `10-${i}`,
        sides: 10,
        value: v ?? null,
      })),
      ...values[20].map((v, i) => ({
        id: `20-${i}`,
        sides: 20,
        value: v ?? null,
      })),
      ...values[100].map((v, i) => ({
        id: `100-${i}`,
        sides: 100,
        value: v ?? null,
      })),
    ];

    onResultsChange({
      dice: dicePayload,
      values: valuesList,
      total,
      countsText,
    });
  }, [values, valuesList, total, countsText, onResultsChange]);

  function getDieSizeForScreen(width, baseDieSize) {
    if (width >= 1600) return baseDieSize;        // desktop large
    if (width >= 1200) return Math.round(baseDieSize * 0.8);
    if (width >= 900) return Math.round(baseDieSize * 0.65);
    if (width >= 600) return Math.round(baseDieSize * 0.5);
    return Math.round(baseDieSize * 0.4);         // petit écran
  }
  const [effectiveDieSize, setEffectiveDieSize] = useState(dieSize);

  useEffect(() => {
    const update = () => {
      setEffectiveDieSize(
        getDieSizeForScreen(window.innerWidth, dieSize)
      );
    };

    update(); // au montage
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [dieSize]);
  const plateRef = useRef(null);
  if (hidden) return null;
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 3fr) max-content",
        gap: 12,
        padding: 12,
        maxHeight: "45vh",
        overflow: "auto",
        border: "2px dashed rgba(255,255,255,0.18)",
        borderRadius: 12,
        background: "rgba(0,0,0,0.12)",
        ...style,
      }}
    >
      {/* Gauche : infos + plateau */}
      <div style={{ display: "grid", gap: 10, minWidth: 0, width: "100%" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, width: "fit-content" }}>
          <div style={{ fontWeight: 700 }}>Plateau</div>
          <div style={{ opacity: 0.85 }}>{countsText || "—"}</div>
        </div>

        {/* Plateau */}
        <div
          ref={plateRef}
          style={{
            // display: "block",
            width: "100%",
            // gap: 5,
            maxHeight: "25vh",
            height: "25vh",
            // maxWidth: "100%",
            overflow: "hidden",
            paddingRight: 6,
          }}
        >
          {/* Le “plateau owner”: showGround true même si count=0 */}
          <Dice3D
            ref={boardRef}
            dice={{
              d6: counts[6],
              d10: counts[10],
              d20: counts[20],
              d100: counts[100],
            }}
            size={effectiveDieSize}
            color={color}
            textColor={textColor}
            background={background}
            durationMs={durationMs}
            autoRoll={false}
            onRollEnd={(v) => {
              // v = tableau des résultats (un par dé dans l’ordre d’affichage)
              // on reconstruit tes arrays par type :
              if (!Array.isArray(v)) return;
              const next = { 6: [], 10: [], 20: [], 100: [] };
              let k = 0;
              for (let i = 0; i < counts[6]; i++) next[6].push(v[k++]);
              for (let i = 0; i < counts[10]; i++) next[10].push(v[k++]);
              for (let i = 0; i < counts[20]; i++) next[20].push(v[k++]);
              for (let i = 0; i < counts[100]; i++) next[100].push(v[k++]);
              setValues(next);
            }}
          />
        </div>

        <div
          style={{
            padding: 10,
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.14)",
            width: "fit-content"
          }}
        >
          <div style={{ fontSize: 13, opacity: 0.9 }}>
            <b>Jets</b> : {totalDice ? valuesList.join(" · ") : "—"}
          </div>
          <div style={{ marginTop: 6, fontSize: 13 }}>
            <b>Total</b> : {totalDice ? total : "—"}
          </div>
        </div>
      </div>

      {/* Droite : boutons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "max-content max-content",
          gap: 6,
          columnGap: 10,
          alignContent: "start",
          justifyItems: "stretch",
        }}
      >
        {/* D6 */}
        <button onClick={() => addDie(6)} disabled={totalDice >= maxDice}>
          + D6
        </button>
        <button onClick={() => removeDie(6)} disabled={counts[6] === 0}>
          - D6
        </button>

        {/* D10 */}
        <button
          onClick={() => addDie(10)}
          disabled={!allowD10 || totalDice >= maxDice}
        >
          + D10
        </button>
        <button onClick={() => removeDie(10)} disabled={counts[10] === 0}>
          - D10
        </button>

        {/* D20 */}
        <button onClick={() => addDie(20)} disabled={totalDice >= maxDice}>
          + D20
        </button>
        <button onClick={() => removeDie(20)} disabled={counts[20] === 0}>
          - D20
        </button>

        {/* D100 */}
        <button onClick={() => addDie(100)} disabled={totalDice >= maxDice}>
          + D100
        </button>
        <button onClick={() => removeDie(100)} disabled={counts[100] === 0}>
          - D100
        </button>

        {/* spacer */}
        <div style={{ height: 8, gridColumn: "1 / -1" }} />

        {/* Actions */}
        <button onClick={reroll} disabled={!totalDice} style={{ gridColumn: "1 / -1" }}>
          Relancer
        </button>
        <button
          onClick={reset}
          disabled={!totalDice}
          style={{
            marginTop: "auto",
            gridColumn: "1 / -1"
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
