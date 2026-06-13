import { Typography, Box, Chip, IconButton, LinearProgress } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Btn from "./Btn";
import DynamicSkillSelector from "./DynamicSkillSelector";
import { isMobChar, GAUGE_FIELDS, CARAC_FIELDS } from "./jdrConstants";

export default function MjKanzyEntityCard({
  char, gauges, currentTurnCharId,
  isKO, isDead,
  openMJEdit,
  selectorVisibleFor, setSelectorVisibleFor,
  handleFinalSelection, skillScores,
}) {
  const mob = isMobChar(char);
  const activeGauges = GAUGE_FIELDS.filter((f) => Number(char[f.maxKey]) > 0);
  const activeCaracs = CARAC_FIELDS.filter((f) => Number(char[f.key]) > 0);
  const ko   = isKO(char);
  const dead = isDead(char);

  return (
    <Box sx={{
      border: currentTurnCharId === char.ID_character
        ? "2px solid #ffa726"
        : "1px solid rgba(255,165,0,0.4)",
      borderRadius: 2, p: 2, minWidth: 280, maxWidth: 380, flex: "1 1 280px",
      background: currentTurnCharId === char.ID_character
        ? "rgba(255,167,38,0.12)"
        : "rgba(255,100,0,0.05)",
      opacity: ko && !dead ? 0.4 : 1,
      position: "relative",
      transition: "border 0.3s, background 0.3s",
    }}>
      {dead && (
        <Box sx={{ position: "absolute", inset: 0, borderRadius: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.78)", zIndex: 2, gap: 0.5, pointerEvents: "none" }}>
          <Typography sx={{ fontSize: "2.5rem", lineHeight: 1 }}>💀</Typography>
          <Typography sx={{ color: "#f87171", fontWeight: "bold", letterSpacing: "0.3em", fontSize: "1.2rem" }}>MORT</Typography>
        </Box>
      )}

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        <Typography variant="h6" sx={{ color: "#ffa726", flex: 1 }}>{char.Name_character}</Typography>
        <Chip label={mob ? "MOB" : "PNJ"} size="small"
          sx={{ background: mob ? "#7f1d1d" : "#1e3a5f", color: "white", fontWeight: "bold" }} />
      </Box>

      {activeCaracs.length > 0 && (
        <>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)", display: "block", mb: 0.5, letterSpacing: 1 }}>
            CARACTÉRISTIQUES
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            {activeCaracs.map((f) => (
              <Box key={f.key} sx={{ textAlign: "center", minWidth: 56, background: "rgba(255,255,255,0.06)", borderRadius: 1, p: "4px 8px" }}>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)", display: "block" }}>{f.label}</Typography>
                <Typography sx={{ color: "white", fontWeight: "bold", fontSize: "1rem" }}>{char[f.key]}</Typography>
              </Box>
            ))}
          </Box>
        </>
      )}

      {activeGauges.length > 0 && (
        <>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)", display: "block", mb: 1, letterSpacing: 1 }}>
            JAUGES
          </Typography>
          {activeGauges.map((f) => {
            const current = Number(gauges?.[f.key] ?? char[f.maxKey]);
            const max     = Number(char[f.maxKey]);
            const pct     = Math.min(100, Math.max(0, (current / max) * 100));
            return (
              <Box key={f.key} sx={{ mb: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.25 }}>
                  <Typography variant="caption" sx={{ color: f.color, fontWeight: "bold" }}>{f.label}</Typography>
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
                <LinearProgress variant="determinate" value={pct}
                  sx={{ height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.1)", "& .MuiLinearProgress-bar": { backgroundColor: f.color } }} />
              </Box>
            );
          })}
        </>
      )}

      {!mob && (
        <Box sx={{ mt: 1.5, borderTop: "1px solid rgba(255,255,255,0.1)", pt: 1 }}>
          <Btn
            onClick={() => setSelectorVisibleFor(selectorVisibleFor === char.ID_character ? null : char.ID_character)}
            msg="Compétence"
          />
          {selectorVisibleFor === char.ID_character && (
            <DynamicSkillSelector onFinalSelect={(path) => handleFinalSelection(char.ID_character, path)} />
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
}
