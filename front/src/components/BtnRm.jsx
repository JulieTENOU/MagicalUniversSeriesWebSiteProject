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
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useState } from "react";

export default function BtnRm(props) {
  const [open, setOpen] = React.useState(false);
  const [change, setChange] = useState(0);
  var diff = 0;
  const manaToChange = props.manaName;

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
    diff = props.mana - nchange;
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
    fetch(`/gauges/api/updateGauges/${props.character.ID_character}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (props.onGaugeUpdate) {
          props.onGaugeUpdate(props.manaName, diff);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} sx={{ color: "white" }}>
        <RemoveCircleOutlineIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Perte</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Merci d'indiquer le nombre de point de {props.name} perdus :
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="points perdus"
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
