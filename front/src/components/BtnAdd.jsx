import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";

export default function BtnAdd(props) {
  const [open, setOpen] = React.useState(false);
  const [change, setChange] = useState(0);
  var diff = 0;
  const manaToChange = props.manaName;
  // const updateMana = (newValue) => {
  //   setManaValue(newValue);
  // }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let data = {};
  const handleValid = () => {
    if (props.character.ID_character === 0) {
      alert("Le personnage Visiteur ne peut pas être modifié !");
      setOpen(false);
      return;
    }

    const nchange = parseInt(change);
    diff = props.mana + nchange;
    if (manaToChange === "currentManaAir") {
      data = {
        currentManaAir: diff,
      };
    } else if (props.manaName === "currentManaEau") {
      data = {
        currentManaEau: diff,
      };
    } else if (props.manaName === "currentManaTerre") {
      data = {
        currentManaTerre: diff,
      };
    } else if (props.manaName === "currentManaFeu") {
      data = {
        currentManaFeu: diff,
      };
    } else if (props.manaName === "currentManaVolonte") {
      data = {
        currentManaVolonte: diff,
      };
    } else if (props.manaName === "currentManaVital") {
      data = {
        currentManaVital: diff,
      };
    } else if (props.manaName === "currentStamina") {
      data = {
        currentStamina: diff,
      };
    }
    console.log(data);
 fetch(`/api/gauges/updateGauges/${encodeURIComponent(props.character.Name_character)}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
})
  .then(async (res) => {
    const body = await res.json().catch(() => null);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${JSON.stringify(body)}`);
    return body;
  })
  .then((data) => {
    console.log("Success:", data);
    props.onGaugeUpdate?.(props.manaName, diff);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} sx={{ color: "white" }}>
        <AddCircleOutlineIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Gain</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Merci d'indiquer le nombre de point de {props.name} gagnés :
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="points gagnés"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setChange(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleValid}>Valider</Button>
          <Button onClick={handleClose}>Annuler</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
