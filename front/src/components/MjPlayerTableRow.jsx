import { Typography, TableRow, TableCell, LinearProgress } from "@mui/material";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Btn from "./Btn";
import DynamicSkillSelector from "./DynamicSkillSelector";

export default function MjPlayerTableRow({
  char, gauges,
  isKO, isDead,
  selected, toggleSelected, currentTurnCharId,
  selectorVisibleFor, setSelectorVisibleFor,
  handleFinalSelection, skillScores,
  openAlertDialogFor,
  theme,
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

  const dead = isDead(char);
  const ko   = isKO(char);
  const isCurrentTurn = currentTurnCharId === char.ID_character;

  return (
    <TableRow
      key={char.ID_character}
      sx={{
        border: "none", position: "relative",
        opacity: ko && !dead ? 0.35 : 1,
        outline: isCurrentTurn ? "2px solid #ffa726" : "none",
        background: isCurrentTurn ? "rgba(255,167,38,0.1)" : "transparent",
        transition: "background 0.3s",
        ...(dead && {
          "&::after": {
            content: '"💀  MORT"',
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.72)", color: "#f87171",
            fontWeight: "bold", letterSpacing: "0.35em", fontSize: "1rem",
            zIndex: 2, pointerEvents: "none",
          },
        }),
      }}
    >
      <TableCell sx={{ border: "none" }}>{char.Name_character}</TableCell>

      <TableCell sx={{ border: "none" }}>
        <div className="container" style={{ width: "120px", height: "60px", overflow: "hidden", margin: "0 auto" }}>
          <CircularProgressbar value={clampedManaVital} circleRatio={0.5}
            styles={buildStyles({ rotation: 0.75, strokeLinecap: "butt", pathTransitionDuration: 0.5, pathColor: "red", textColor: "#f88", trailColor: "#af8c8d", backgroundColor: "#3e98c7" })} />
        </div>
        <Typography className="label" variant="h5" sx={{ color: theme.custom.mymodal.text }} textAlign="center">
          {currentManaVital} points
        </Typography>
      </TableCell>

      <TableCell sx={{ border: "none" }}>
        <div className="container" style={{ width: "120px", height: "60px", overflow: "hidden", margin: "0 auto" }}>
          <CircularProgressbar value={clampedStamina} circleRatio={0.5}
            styles={buildStyles({ rotation: 0.75, strokeLinecap: "butt", pathTransitionDuration: 0.5, pathColor: "#4caf50", textColor: "#f88", trailColor: "#cfe9d2", backgroundColor: "#3e98c7" })} />
        </div>
        <Typography className="label" variant="h5" sx={{ color: theme.custom.mymodal.text }} textAlign="center">
          {currentStamina} points
        </Typography>
      </TableCell>

      <TableCell sx={{ border: "none" }}>
        <LinearProgress color="success" variant="determinate" value={clampedManaAir}
          sx={{ height: "5px", width: "60px", borderRadius: "25px", transform: "rotate(-90deg)", "& .MuiLinearProgress-bar": { backgroundColor: "#14b8a6" } }} />
        <Typography className="label" position="relative" top="5vh" variant="h5" sx={{ color: theme.custom.mymodal.text }} textAlign="center">
          {currentManaAir} points
        </Typography>
      </TableCell>

      <TableCell sx={{ border: "none" }}>
        <LinearProgress color="info" variant="determinate" value={clampedManaEau}
          sx={{ height: "5px", width: "60px", borderRadius: "25px", transform: "rotate(-90deg)" }} />
        <Typography className="label" position="relative" top="5vh" variant="h5" sx={{ color: theme.custom.mymodal.text }} textAlign="center">
          {currentManaEau} points
        </Typography>
      </TableCell>

      <TableCell sx={{ border: "none" }}>
        <LinearProgress color="warning" variant="determinate" value={clampedManaTerre}
          sx={{ height: "5px", width: "60px", borderRadius: "25px", transform: "rotate(-90deg)" }} />
        <Typography className="label" position="relative" top="5vh" variant="h5" sx={{ color: theme.custom.mymodal.text }} textAlign="center">
          {currentManaTerre} points
        </Typography>
      </TableCell>

      <TableCell sx={{ border: "none" }}>
        <LinearProgress color="error" variant="determinate" value={clampedManaFeu}
          sx={{ height: "5px", width: "60px", borderRadius: "25px", transform: "rotate(-90deg)", "& .MuiLinearProgress-bar": { backgroundColor: "#fb7185" }, backgroundColor: "#991b1b" }} />
        <Typography className="label" position="relative" top="5vh" variant="h5" sx={{ color: theme.custom.mymodal.text }} textAlign="center">
          {currentManaFeu} points
        </Typography>
      </TableCell>

      <TableCell sx={{ border: "none" }}>
        <LinearProgress color="primary" variant="determinate" value={clampedManaVolonte}
          sx={{ height: "5px", width: "60px", borderRadius: "25px", transform: "rotate(-90deg)", "& .MuiLinearProgress-bar": { backgroundColor: "#a855f7" }, backgroundColor: "#6b21a8" }} />
        <Typography className="label" position="relative" top="5vh" variant="h5" sx={{ color: theme.custom.mymodal.text }} textAlign="center">
          {currentManaVolonte} points
        </Typography>
      </TableCell>

      <TableCell sx={{ border: "none" }}>
        <Btn onClick={() => setSelectorVisibleFor(selectorVisibleFor === char.ID_character ? null : char.ID_character)} msg="Compétence" />
        {selectorVisibleFor === char.ID_character && (
          <DynamicSkillSelector onFinalSelect={(path) => handleFinalSelection(char.ID_character, path)} />
        )}
        {skillScores[char.ID_character] && (
          <h2 style={{ marginTop: "8px", fontSize: "1.2rem", color: "white" }}>
            {skillScores[char.ID_character].label} : {skillScores[char.ID_character].valeur}
          </h2>
        )}
      </TableCell>

      <TableCell sx={{ border: "none" }}>
        <input type="checkbox" checked={selected.has(char.ID_character)} onChange={() => toggleSelected(char.ID_character)} />
      </TableCell>

      <TableCell sx={{ border: "none" }}>
        <Btn msg="Envoyer" onClick={() => openAlertDialogFor([char.ID_character])} />
      </TableCell>
    </TableRow>
  );
}
