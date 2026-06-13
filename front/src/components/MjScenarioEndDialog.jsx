import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Box, MenuItem } from "@mui/material";
import { GAUGE_FIELDS } from "./jdrConstants";

export default function MjScenarioEndDialog({
  open, onClose,
  characters, selected,
  successLog, gaugesByCharId, scenarioSnapshot,
  rewardsByCharId,
  statOptions,
  buildFieldLabel,
  ensureRewardRows, addRewardRow, removeRewardRow, updateRewardRow,
  onConfirm,
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
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
            const rows   = rewardsByCharId[charId] || [];

            return (
              <div key={charId} style={{ border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: 12 }}>
                <Typography variant="h6">{char.Name_character}</Typography>

                {/* Résumé des réussites */}
                {(() => {
                  const log = successLog[charId] || {};
                  const entries = Object.entries(log);
                  if (entries.length === 0) return null;
                  return (
                    <Box sx={{ mt: 1, mb: 0.5, p: 1, background: "rgba(255,255,255,0.04)", borderRadius: 1 }}>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)", display: "block", mb: 0.5, fontWeight: "bold" }}>
                        Réussites pendant le scénario :
                      </Typography>
                      {entries.map(([fieldKey, counts]) => {
                        const flagged = counts.r >= 3 || counts.c >= 1;
                        return (
                          <Box key={fieldKey} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.25 }}>
                            {flagged && <Typography sx={{ fontSize: "0.8rem" }}>⬆</Typography>}
                            <Typography variant="caption" sx={{ flex: 1, color: flagged ? "#ffa726" : "rgba(255,255,255,0.55)" }}>
                              {buildFieldLabel(fieldKey)}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#90caf9" }}>{counts.r}R</Typography>
                            <Typography variant="caption" sx={{ color: "#fbbf24", ml: 0.5 }}>{counts.c}★</Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  );
                })()}

                {/* Mana consommé */}
                {(() => {
                  const gauges   = gaugesByCharId[charId] || {};
                  const consumed = GAUGE_FIELDS.filter((f) => {
                    const max     = Number(char[f.maxKey]);
                    const current = Number(gauges[f.key] ?? max);
                    return max > 0 && current < max;
                  });
                  if (consumed.length === 0) return null;
                  return (
                    <Box sx={{ mt: 0.5, mb: 0.5, p: 1, background: "rgba(255,255,255,0.04)", borderRadius: 1 }}>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)", display: "block", mb: 0.5, fontWeight: "bold" }}>
                        Mana consommé :
                      </Typography>
                      {consumed.map((f) => {
                        const max     = Number(char[f.maxKey]);
                        const current = Number(gauges[f.key] ?? max);
                        const used    = max - current;
                        return (
                          <Box key={f.key} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.25 }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: f.color, flexShrink: 0 }} />
                            <Typography variant="caption" sx={{ flex: 1, color: "rgba(255,255,255,0.55)" }}>{f.label}</Typography>
                            <Typography variant="caption" sx={{ color: f.color }}>-{used} pts ({current}/{max})</Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  );
                })()}

                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <Button size="small" onClick={() => { ensureRewardRows(charId); addRewardRow(charId); }}>
                    + Ajouter une stat
                  </Button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
                  {rows.map((row, idx) => {
                    const snap    = scenarioSnapshot?.[charId];
                    const valAvant = row.field && snap ? snap[row.field] : undefined;
                    const valApres = valAvant !== undefined ? valAvant + (row.delta ?? 0) : undefined;
                    return (
                      <div key={idx} style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                        <TextField
                          select fullWidth label="Stat / Compétence"
                          value={row.field || ""}
                          onChange={(e) => updateRewardRow(charId, idx, { field: e.target.value })}
                          sx={{ minWidth: 180, flex: 1 }}
                        >
                          <MenuItem value="">— Choisir —</MenuItem>
                          {statOptions.map((opt) => (
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
                          label="delta" type="number"
                          value={row.delta ?? 0}
                          onChange={(e) => updateRewardRow(charId, idx, { delta: Number(e.target.value) })}
                          sx={{ width: 100 }}
                        />

                        <Button size="small" color="error"
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
        <Button onClick={onClose}>Annuler</Button>
        <Button variant="contained" onClick={onConfirm} disabled={selected.size === 0}>
          Valider fin de scénario
        </Button>
      </DialogActions>
    </Dialog>
  );
}
