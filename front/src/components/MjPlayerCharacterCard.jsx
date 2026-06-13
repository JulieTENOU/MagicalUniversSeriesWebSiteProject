import { LinearProgress } from "@mui/material";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Btn from "./Btn";
import DynamicSkillSelector from "./DynamicSkillSelector";

export default function MjPlayerCharacterCard({
  char, gauges,
  isKO, isDead,
  selected, toggleSelected, currentTurnCharId,
  selectorVisibleFor, setSelectorVisibleFor,
  handleFinalSelection, skillScores,
  openAlertDialogFor,
}) {
  const n = (v) => Number(v);
  const clamp = (v) => Math.min(100, Math.max(0, v));

  const currentManaVital   = n(gauges?.currentManaVital   ?? char.ManaVital_character);
  const currentStamina     = n(gauges?.currentStamina     ?? char.Stamina_character);
  const currentManaAir     = n(gauges?.currentManaAir     ?? char.ManaAir_character);
  const currentManaEau     = n(gauges?.currentManaEau     ?? char.ManaEau_character);
  const currentManaTerre   = n(gauges?.currentManaTerre   ?? char.ManaTerre_character);
  const currentManaFeu     = n(gauges?.currentManaFeu     ?? char.ManaFeu_character);
  const currentManaVolonte = n(gauges?.currentManaVolonte ?? char.ManaVolonte_character);

  const clampedManaVital   = clamp((currentManaVital   / char.ManaVital_character)   * 100);
  const clampedStamina     = clamp((currentStamina     / char.Stamina_character)     * 100);
  const clampedManaAir     = clamp((currentManaAir     / char.ManaAir_character)     * 100);
  const clampedManaEau     = clamp((currentManaEau     / char.ManaEau_character)     * 100);
  const clampedManaTerre   = clamp((currentManaTerre   / char.ManaTerre_character)   * 100);
  const clampedManaFeu     = clamp((currentManaFeu     / char.ManaFeu_character)     * 100);
  const clampedManaVolonte = clamp((currentManaVolonte / char.ManaVolonte_character) * 100);

  const ko   = isKO(char);
  const dead = isDead(char);
  const isCurrentTurn = currentTurnCharId === char.ID_character;
  const isSelected    = selected.has(char.ID_character);

  return (
    <div style={{
      border: isCurrentTurn ? "2px solid #ffa726" : isSelected ? "2px solid #90caf9" : "1px solid rgba(255,255,255,0.2)",
      borderRadius: 10, padding: 12,
      background: isCurrentTurn ? "rgba(255,167,38,0.1)" : isSelected ? "rgba(144,202,249,0.1)" : "rgba(0,0,0,0.3)",
      transition: "border 0.2s, background 0.2s",
      position: "relative", zIndex: 1,
      opacity: ko && !dead ? 0.4 : 1,
    }}>
      {dead && (
        <div style={{ position: "absolute", inset: 0, borderRadius: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.78)", zIndex: 3, gap: 4, pointerEvents: "none" }}>
          <span style={{ fontSize: "2rem" }}>💀</span>
          <span style={{ color: "#f87171", fontWeight: "bold", letterSpacing: "0.3em", fontSize: "1.1rem" }}>MORT</span>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <p style={{ color: "lightblue", fontSize: "1.1rem", fontWeight: "bold", margin: 0 }}>{char.Name_character}</p>
        <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
          <span style={{ color: "lightblue", fontSize: "0.85rem" }}>{isSelected ? "Sélectionné ✓" : "Sélectionner"}</span>
          <input type="checkbox" checked={isSelected} onChange={() => toggleSelected(char.ID_character)} style={{ width: 22, height: 22, cursor: "pointer" }} />
        </label>
      </div>

      {/* Barres mana ligne 1 */}
      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 8 }}>
        {[
          { label: "Air",   value: currentManaAir,   clamped: clampedManaAir,   color: "success", barSx: { "& .MuiLinearProgress-bar": { backgroundColor: "#14b8a6" } } },
          { label: "Eau",   value: currentManaEau,   clamped: clampedManaEau,   color: "info",    barSx: {} },
          { label: "Terre", value: currentManaTerre, clamped: clampedManaTerre, color: "warning", barSx: {} },
        ].map(({ label, value, clamped, color, barSx }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 15, width: "30%" }}>
            <div style={{ position: "relative", width: "8px", height: "25vw" }}>
              <LinearProgress variant="determinate" value={clamped} color={color}
                sx={{ position: "absolute", bottom: 0, left: "8px", width: "25vw", height: "8px", borderRadius: "25px", transformOrigin: "bottom left", transform: "rotate(-90deg)", ...barSx }} />
            </div>
            <p style={{ color: "lightblue", fontSize: "0.85rem", textAlign: "center", margin: 0, whiteSpace: "nowrap" }}>{label}<br />{value} pts</p>
          </div>
        ))}
      </div>

      {/* Barres mana ligne 2 */}
      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 20 }}>
        {[
          { label: "Feu",     value: currentManaFeu,     clamped: clampedManaFeu,     color: "error",   barSx: { "& .MuiLinearProgress-bar": { backgroundColor: "#fb7185" }, backgroundColor: "#991b1b" } },
          { label: "Volonté", value: currentManaVolonte, clamped: clampedManaVolonte, color: "primary", barSx: { "& .MuiLinearProgress-bar": { backgroundColor: "#a855f7" }, backgroundColor: "#6b21a8" } },
        ].map(({ label, value, clamped, color, barSx }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 15, width: "30%" }}>
            <div style={{ position: "relative", width: "8px", height: "25vw" }}>
              <LinearProgress variant="determinate" value={clamped} color={color}
                sx={{ position: "absolute", bottom: 0, left: "8px", width: "25vw", height: "8px", borderRadius: "25px", transformOrigin: "bottom left", transform: "rotate(-90deg)", ...barSx }} />
            </div>
            <p style={{ color: "lightblue", fontSize: "0.85rem", textAlign: "center", margin: 0, whiteSpace: "nowrap" }}>{label}<br />{value} pts</p>
          </div>
        ))}
      </div>

      {/* CircularProgressbar Vital + Stamina */}
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <p style={{ color: "lightblue", fontSize: "0.9rem", margin: 0 }}>Mana Vital</p>
          <div style={{ width: "40dvw" }}>
            <CircularProgressbar value={clampedManaVital} circleRatio={0.5} text={`${currentManaVital} pts`}
              styles={buildStyles({ rotation: 0.75, strokeLinecap: "butt", textSize: "1em", pathTransitionDuration: 0.5, pathColor: "red", textColor: "#f88", trailColor: "#af8c8d" })} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <p style={{ color: "lightblue", fontSize: "0.9rem", margin: 0 }}>Stamina</p>
          <div style={{ width: "40dvw" }}>
            <CircularProgressbar value={clampedStamina} circleRatio={0.5} text={`${currentStamina} pts`}
              styles={buildStyles({ rotation: 0.75, strokeLinecap: "butt", textSize: "1em", pathTransitionDuration: 0.5, pathColor: "#42d750", textColor: "#f88", trailColor: "#cfe9d2" })} />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginTop: 8 }}>
        <Btn onClick={() => setSelectorVisibleFor(selectorVisibleFor === char.ID_character ? null : char.ID_character)} msg="Compétence" />
        <Btn msg="Alerte" onClick={() => openAlertDialogFor([char.ID_character])} />
      </div>
      {selectorVisibleFor === char.ID_character && (
        <DynamicSkillSelector onFinalSelect={(path) => handleFinalSelection(char.ID_character, path)} />
      )}
      {skillScores[char.ID_character] && (
        <p style={{ marginTop: 8, fontSize: "1.1rem", color: "lightblue" }}>
          {skillScores[char.ID_character].label} : {skillScores[char.ID_character].valeur}
        </p>
      )}
    </div>
  );
}
