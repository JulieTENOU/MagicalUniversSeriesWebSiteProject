import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from "@mui/material";

export default function MjGaugeEditDialog({ dialog, onClose, delta, setDelta, onConfirm }) {
  return (
    <Dialog open={!!dialog} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {dialog?.sign === 1 ? "➕ Gain" : "➖ Perte"} — {dialog?.label}
        <Typography variant="caption" sx={{ display: "block", opacity: 0.6 }}>
          {dialog?.charName} · actuel : {dialog?.current} / {dialog?.max}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus fullWidth
          label="Nombre de points (valeur absolue)"
          type="number"
          inputProps={{ min: 0 }}
          value={delta}
          onChange={(e) => setDelta(e.target.value)}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button variant="contained" onClick={onConfirm} disabled={delta === "" || Number(delta) < 0}>
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
}
