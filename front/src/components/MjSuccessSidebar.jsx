import { Box, Typography, TextField, Button, MenuItem, IconButton } from "@mui/material";

export default function MjSuccessSidebar({
  playerChars, pnjChars,
  successCharFocus, setSuccessCharFocus,
  successSearchTerm, setSuccessSearchTerm,
  successLog, logSuccess, removeSuccess,
  statOptions,
}) {
  const buildLabel = (fieldKey) => statOptions.find((o) => o.field === fieldKey)?.label ?? fieldKey;

  return (
    <Box sx={{ position: "fixed", right: "10vh", top: "20vw", width: 220, maxHeight: "70vh", overflowY: "auto", background: "rgba(8,8,18,0.93)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 2, zIndex: 40, p: 1.5, display: "flex", flexDirection: "column", gap: 0.75 }}>
      <Typography variant="subtitle2" sx={{ color: "#a78bfa", textAlign: "center", fontWeight: "bold", borderBottom: "1px solid rgba(255,255,255,0.1)", pb: 0.75 }}>
        📋 Réussites
      </Typography>

      <TextField
        select size="small" label="Personnage"
        value={successCharFocus ?? ""}
        onChange={(e) => setSuccessCharFocus(Number(e.target.value))}
        SelectProps={{ MenuProps: { PaperProps: { sx: { maxHeight: 200 } } } }}
        sx={{ "& .MuiInputBase-input": { fontSize: "0.78rem", py: 0.5 } }}
      >
        {[...playerChars, ...pnjChars].map((c) => (
          <MenuItem key={c.ID_character} value={c.ID_character} sx={{ fontSize: "0.8rem" }}>
            {c.Name_character}
          </MenuItem>
        ))}
      </TextField>

      {successCharFocus != null && (() => {
        const log    = successLog[successCharFocus] || {};
        const search = successSearchTerm[successCharFocus] || "";
        const sl = search.toLowerCase();
        const matches = search.length >= 3
          ? statOptions
              .filter((o) => o.label?.toLowerCase().includes(sl))
              .slice(0, 8)
          : [];

        return (
          <>
            <TextField
              size="small" placeholder="Rechercher une compétence..."
              value={search}
              onChange={(e) => setSuccessSearchTerm((prev) => ({ ...prev, [successCharFocus]: e.target.value }))}
              sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", py: 0.5 } }}
            />

            {matches.map((opt) => (
              <Box key={opt.field} sx={{ display: "flex", alignItems: "center", gap: 0.5, p: "2px 6px", background: "rgba(255,255,255,0.05)", borderRadius: 1 }}>
                <Typography sx={{ flex: 1, color: "rgba(255,255,255,0.8)", fontSize: "0.72rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {opt.label}
                </Typography>
                <Button size="small" sx={{ minWidth: 0, p: "1px 6px", fontSize: "0.65rem", color: "#90caf9" }}
                  onClick={() => { logSuccess(successCharFocus, opt.field, false); setSuccessSearchTerm((prev) => ({ ...prev, [successCharFocus]: "" })); }}>
                  R
                </Button>
                <Button size="small" sx={{ minWidth: 0, p: "1px 6px", fontSize: "0.65rem", color: "#fbbf24" }}
                  onClick={() => { logSuccess(successCharFocus, opt.field, true); setSuccessSearchTerm((prev) => ({ ...prev, [successCharFocus]: "" })); }}>
                  ★
                </Button>
              </Box>
            ))}

            {Object.entries(log).length > 0 && (
              <>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.35)", mt: 0.25, display: "block" }}>
                  Enregistré :
                </Typography>
                {Object.entries(log).map(([fieldKey, counts]) => {
                  const flagged = counts.r >= 3 || counts.c >= 1;
                  return (
                    <Box key={fieldKey} sx={{ display: "flex", alignItems: "center", gap: 0.5, p: "2px 4px", borderRadius: 1, background: flagged ? "rgba(255,167,38,0.12)" : "rgba(255,255,255,0.04)", border: flagged ? "1px solid rgba(255,167,38,0.35)" : "1px solid transparent" }}>
                      <Typography sx={{ flex: 1, color: "white", fontSize: "0.7rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {buildLabel(fieldKey)}
                      </Typography>
                      <Typography sx={{ color: "#90caf9", fontSize: "0.65rem" }}>{counts.r}R</Typography>
                      <Typography sx={{ color: "#fbbf24", fontSize: "0.65rem", ml: 0.25 }}>{counts.c}★</Typography>
                      {flagged && <Typography sx={{ fontSize: "0.7rem" }}>⬆</Typography>}
                      <IconButton size="small" sx={{ p: 0, color: "rgba(255,255,255,0.3)", ml: 0.25 }}
                        onClick={() => removeSuccess(successCharFocus, fieldKey)}>
                        <Typography sx={{ fontSize: "0.65rem", lineHeight: 1 }}>✕</Typography>
                      </IconButton>
                    </Box>
                  );
                })}
              </>
            )}
            {Object.entries(log).length === 0 && search.length === 0 && (
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.25)", textAlign: "center", display: "block" }}>
                Aucune réussite enregistrée
              </Typography>
            )}
          </>
        );
      })()}
    </Box>
  );
}
