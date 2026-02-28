import * as React from "react";
import { useState, useContext } from "react";
import { ConnexionContext } from "./provider";
import { useCharacter } from "../context/CharacterContext";
import PropTypes from "prop-types";

import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { ReactComponent as Pencil } from "../assets/svg/pencil-outline.svg";
import { useTheme } from "@mui/material/styles";

function ModifierTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

ModifierTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ModifierIdDialogs(data) {
  const theme = useTheme();
  const { patchCharacter } = useCharacter();

  const {
    state: currentUser,
    setState: setCurrentUser,
    loading,
  } = useContext(ConnexionContext);

  console.log(data);
  const character = data.character;
  const left = data.left;
  const name = data.name;
  const dataToUpdate = data.dataToUpdate;
  const [open, setOpen] = React.useState(false);
  const [text, setText] = useState("");
  let newDatas = {};
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  console.log("character", character);
  console.log("character.character", character.character);

  const handleSave = () => {
    if (name === "signes") {
      newDatas = {
        Signes_character: text,
      };
    } else if (name === "bg") {
      newDatas = {
        Traits_character: text,
      };
    }
    console.log(newDatas);

    const value = text.trim();
    if (value.length === 0) {
      alert("Valeur invalide (vide)");
      return;
    }

    const key = Object.keys(newDatas)[0];
    newDatas = { [key]: value };

    fetch(`/api/characters/updateCharacter/${character.ID_character}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDatas),
    })
      .then(async (res) => {
        const body = await res.json().catch(() => null);
        if (!res.ok)
          throw new Error(`HTTP ${res.status}: ${JSON.stringify(body)}`);
        return body;
      })
      .then(() => {
        // ✅ EXACTEMENT ICI
        patchCharacter(newDatas); // met à jour `character` global
        setOpen(false);
      })
      .catch(console.error);
  };

  return (
    <div style={{ position: "relative", height: "0px" }}>
      <Button
        sx={{
          position: "relative",
          display: "flex",
          left: { left },
          top: "-2.3vh",
          border: "none",
        }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        <Pencil
          style={{ color: theme.custom.mycustomblur.text }}
          height={"15px"}
          alt="Modifier"
          id="modifier"
        />
      </Button>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{
          style: {
            minWidth: "30vw",
            minHeight: "30vh",
            backgroundColor: "beige",
            color: "black",
          },
        }}
      >
        <DialogTitle onClose={handleClose} sx={{ outerWidth: "50vw" }}>
          Entrez la nouvelle valeur de {dataToUpdate}
        </DialogTitle>
        <DialogContent>
          <div>
            <TextField
              autoFocus
              id="newCompetences"
              multiline
              sx={{
                minHeight: "10vh",
                minWidth: "10vw",
                border: "solid black 3px ",
              }}
              onChange={(e) => setText(e.target.value)}
              inputProps={{ style: { height: "150px", color: "black" } }}
            />
            <Button
              onClick={() => {
                handleSave();
              }}
            >
              {" "}
              Save new value
            </Button>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
