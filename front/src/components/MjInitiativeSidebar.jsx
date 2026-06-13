import { Box, Typography, Button, Chip } from "@mui/material";

export default function MjInitiativeSidebar({
  characters, combatInactives, initiativeOrder,
  combatActive, activeTurnOrder, currentTurnIdx,
  isKO, isDead,
  setCombatInactives, setInitiativeOrder,
  handleStartCombat, handleNextTurn, handleEndCombat,
}) {
  return (
    <Box sx={{ position: "fixed", left: "10vh", top: "20vw", width: 200, maxHeight: "70vh", overflowY: "auto", background: "rgba(8,8,18,0.93)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 2, zIndex: 40, p: 1.5, display: "flex", flexDirection: "column", gap: 0.75 }}>
      <Typography variant="subtitle1" sx={{ color: "#90caf9", textAlign: "center", fontWeight: "bold", mb: 0.5, borderBottom: "1px solid rgba(255,255,255,0.1)", pb: 0.75 }}>
        ⚔️ Initiative
      </Typography>

      {!combatActive && (
        <>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.35)", textAlign: "center", display: "block", mb: 0.5 }}>
            Ordre · Actif/Inactif
          </Typography>
          {characters.map((char) => {
            const inactive = combatInactives.has(char.ID_character);
            return (
              <Box key={char.ID_character} sx={{ display: "flex", alignItems: "center", gap: 0.75, opacity: inactive ? 0.35 : 1 }}>
                <input
                  type="number" min="1" max={characters.length}
                  value={initiativeOrder[char.ID_character] || ""}
                  disabled={inactive}
                  onChange={(e) => setInitiativeOrder((prev) => ({ ...prev, [char.ID_character]: e.target.value }))}
                  style={{ width: 36, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 4, color: "white", textAlign: "center", padding: "2px 4px", fontSize: "0.85rem" }}
                />
                <Typography variant="body2" sx={{ flex: 1, color: "white", fontSize: "0.78rem", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {char.Name_character}
                </Typography>
                <Chip
                  label={inactive ? "Off" : "On"} size="small"
                  onClick={() => setCombatInactives((prev) => {
                    const next = new Set(prev);
                    next.has(char.ID_character) ? next.delete(char.ID_character) : next.add(char.ID_character);
                    return next;
                  })}
                  sx={{ cursor: "pointer", fontSize: "0.6rem", height: 16, px: 0.25, background: inactive ? "rgba(255,255,255,0.08)" : "rgba(76,175,80,0.25)", color: inactive ? "rgba(255,255,255,0.4)" : "#4caf50" }}
                />
              </Box>
            );
          })}
          <Button variant="contained" color="warning" size="small" onClick={handleStartCombat} sx={{ mt: 1.5 }} disabled={characters.length === 0}>
            ▶ Démarrer combat
          </Button>
        </>
      )}

      {combatActive && (
        <>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.35)", textAlign: "center", display: "block", mb: 0.5 }}>
            Tour en cours
          </Typography>
          {activeTurnOrder.map((char, idx) => {
            const ko   = isKO(char);
            const dead = isDead(char);
            const isCurrent = idx === currentTurnIdx % activeTurnOrder.length;
            return (
              <Box key={char.ID_character} sx={{ display: "flex", alignItems: "center", gap: 0.75, p: "3px 6px", borderRadius: 1, border: isCurrent ? "1px solid #ffa726" : "1px solid transparent", background: isCurrent ? "rgba(255,167,38,0.15)" : "transparent", opacity: (ko || dead) ? 0.35 : 1 }}>
                <Typography sx={{ color: "#ffa726", fontWeight: "bold", minWidth: 16, fontSize: "0.78rem" }}>
                  {initiativeOrder[char.ID_character]}
                </Typography>
                <Typography sx={{ flex: 1, color: dead ? "#f87171" : "white", fontSize: "0.78rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textDecoration: dead ? "line-through" : "none" }}>
                  {char.Name_character}
                </Typography>
                {dead && <Typography sx={{ color: "#f87171", fontSize: "0.6rem", fontWeight: "bold" }}>💀</Typography>}
                {ko && !dead && <Typography sx={{ color: "#fb923c", fontSize: "0.6rem", fontWeight: "bold" }}>KO</Typography>}
              </Box>
            );
          })}
          {characters.filter((c) => combatInactives.has(c.ID_character)).map((char) => (
            <Box key={char.ID_character} sx={{ display: "flex", alignItems: "center", gap: 0.75, p: "3px 6px", opacity: 0.25 }}>
              <Typography sx={{ color: "rgba(255,255,255,0.3)", minWidth: 16, fontSize: "0.78rem" }}>—</Typography>
              <Typography sx={{ flex: 1, color: "rgba(255,255,255,0.3)", fontSize: "0.78rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {char.Name_character}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.3)", fontSize: "0.6rem" }}>inactif</Typography>
            </Box>
          ))}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75, mt: 1.5 }}>
            <Button variant="contained" color="warning" size="small" onClick={handleNextTurn}>Suivant →</Button>
            <Button variant="outlined" color="error" size="small" onClick={handleEndCombat}>Fin de combat</Button>
          </Box>
        </>
      )}
    </Box>
  );
}
