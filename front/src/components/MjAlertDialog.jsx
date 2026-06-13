import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";

export default function MjAlertDialog({ open, onClose, alertText, setAlertText, alertSeverity, setAlertSeverity, sendAlert, selectedCount }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Envoyer une alerte</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus fullWidth multiline minRows={3}
          label="Message"
          value={alertText}
          onChange={(e) => setAlertText(e.target.value)}
          sx={{ marginTop: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={sendAlert} disabled={!alertText.trim() || selectedCount === 0}>
          Envoyer ({selectedCount})
        </Button>
      </DialogActions>
    </Dialog>
  );
}
