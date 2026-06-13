import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";
import { isMobChar } from "./jdrConstants";

export default function MjConfirmInactiveDialog({
  open, onClose,
  confirmInactiveChars, characters,
  combatInactives, setCombatInactives,
  mobKoGauge, mobDeathGauge,
  setMobGaugeSetup, setMobGaugeSetupOpen,
  setCombatActive, setCurrentTurnIdx,
}) {
  const handleConfirm = () => {
    const newInactives = new Set(combatInactives);
    confirmInactiveChars.forEach((c) => newInactives.add(c.ID_character));
    setCombatInactives(newInactives);
    onClose();

    const activeChars = characters.filter((c) => !newInactives.has(c.ID_character));
    const needSetup = activeChars
      .filter(isMobChar)
      .filter((c) => !mobKoGauge[c.ID_character] || !mobDeathGauge[c.ID_character]);

    if (needSetup.length > 0) {
      setMobGaugeSetup(needSetup.map((c) => ({
        charId: c.ID_character, charName: c.Name_character,
        ko: mobKoGauge[c.ID_character] || "",
        death: mobDeathGauge[c.ID_character] || "",
      })));
      setMobGaugeSetupOpen(true);
    } else {
      setCurrentTurnIdx(0);
      setCombatActive(true);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Initiative manquante</DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 1.5 }}>
          Ces personnages n'ont pas d'ordre d'initiative. Sont-ils inactifs pour ce combat ?
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mb: 1 }}>
          {confirmInactiveChars.map((c) => (
            <Typography key={c.ID_character} sx={{ color: "#ffa726", fontWeight: "bold" }}>
              • {c.Name_character}
            </Typography>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Non — je vais corriger les initiatives</Button>
        <Button variant="contained" onClick={handleConfirm}>Oui, ils sont inactifs</Button>
      </DialogActions>
    </Dialog>
  );
}
