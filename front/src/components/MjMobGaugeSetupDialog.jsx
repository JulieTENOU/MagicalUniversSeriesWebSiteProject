import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Box, MenuItem } from "@mui/material";
import { GAUGE_FIELDS } from "./jdrConstants";

export default function MjMobGaugeSetupDialog({
  open, onClose,
  mobGaugeSetup, setMobGaugeSetup,
  mobKoGauge, setMobKoGauge,
  mobDeathGauge, setMobDeathGauge,
  onConfirmStart,
}) {
  const allConfigured = mobGaugeSetup.every((e) => e.ko && e.death);

  const handleConfirm = () => {
    const newKo = { ...mobKoGauge };
    const newDeath = { ...mobDeathGauge };
    mobGaugeSetup.forEach((e) => { newKo[e.charId] = e.ko; newDeath[e.charId] = e.death; });
    setMobKoGauge(newKo);
    setMobDeathGauge(newDeath);
    onConfirmStart();
  };

  return (
    <Dialog open={open} onClose={() => {}} maxWidth="sm" fullWidth>
      <DialogTitle>Configuration des MOBs pour ce combat</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Choisir la jauge KO (grisé) et la jauge Mort (💀) pour chaque MOB actif.
        </Typography>
        {mobGaugeSetup.map((entry, idx) => (
          <Box key={entry.charId} sx={{ border: "1px solid rgba(248,113,113,0.3)", borderRadius: 1, p: 1.5 }}>
            <Typography variant="subtitle2" sx={{ color: "#f87171", mb: 1, fontWeight: "bold" }}>
              {entry.charName}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <TextField
                select size="small" label="Jauge KO (→ grisé)" value={entry.ko} sx={{ flex: 1, minWidth: 155 }}
                onChange={(e) => setMobGaugeSetup((prev) => prev.map((x, i) => i === idx ? { ...x, ko: e.target.value } : x))}
              >
                <MenuItem value="">— Choisir —</MenuItem>
                {GAUGE_FIELDS.map((f) => <MenuItem key={f.key} value={f.key}>{f.label}</MenuItem>)}
              </TextField>
              <TextField
                select size="small" label="Jauge Mort (→ 💀)" value={entry.death} sx={{ flex: 1, minWidth: 155 }}
                onChange={(e) => setMobGaugeSetup((prev) => prev.map((x, i) => i === idx ? { ...x, death: e.target.value } : x))}
              >
                <MenuItem value="">— Choisir —</MenuItem>
                {GAUGE_FIELDS.map((f) => <MenuItem key={f.key} value={f.key}>{f.label}</MenuItem>)}
              </TextField>
            </Box>
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button variant="contained" color="warning" disabled={!allConfigured} onClick={handleConfirm}>
          Confirmer et démarrer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
