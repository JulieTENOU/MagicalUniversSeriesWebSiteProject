import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Pencil from '../assets/svg/pencil-outline.svg';
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
            position: 'absolute',
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

export default function ModifierDialogs(data) {
  const theme = useTheme();
  console.log(data);
  const crystals = data.inventaire;
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

  console.log("crystals:", crystals)

  const handleSave = () => {
    if (name === 'crystal_verre') {
      newDatas = {
        crystal_verre: text,
      };
    } else if (name === 'crystal_plasma') {
      newDatas = {
        crystal_plasma: text,
      };
    } else if (name === 'crystal_eau') {
      newDatas = {
        crystal_eau: text,
      };
    } else if (name === 'lapis') {
      newDatas = {
        lapis: text,
      };
    } else if (name === 'diams_violet') {
      newDatas = {
        diams_violet: text,
      };
    } else if (name === 'diams_vert') {
      newDatas = {
        diams_vert: text,
      };
    } else if (name === 'diams_turquoise') {
      newDatas = {
        diams_turquoise: text,
      };
    } else if (name === 'diams_carmin') {
      newDatas = {
        diams_carmin: text,
      };
    } else if (name === 'diams_ocre') {
      newDatas = {
        diams_ocre: text,
      };
    } else if (name === 'bille_arc') {
      newDatas = {
        bille_arc: text,
      };
    } else if (name === 'crystal_ange') {
      newDatas = {
        crystal_ange: text,
      };
    } else if (name === 'crystal_dem') {
      newDatas = {
        crystal_dem: text,
      };
    } else if (name === 'crystal_liquide') {
      newDatas = {
        crystal_liquide: text,
      };
    } else if (name === 'pierre_lune') {
      newDatas = {
        pierre_lune: text,
      };
    } else if (name === 'crystal_feu') {
      newDatas = {
        crystal_feu: text,
      };
    } else if (name === 'crystal_or') {
      newDatas = {
        crystal_or: text,
      };
    }


    fetch(`/api/crystals/updateCrystals/${crystals.Name_character}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newDatas),
    })
      .then(async (res) => {
        const body = await res.json().catch(() => null);
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${JSON.stringify(body)}`);
        return body;
      })
      .then(() => {
        data.onCrystalUpdate?.(newDatas);
        setOpen(false);
      })
      .catch(console.error);
  }

  return (
    <div style={{ position: 'relative', height: '0px' }}>
      <Button sx={{ position: 'relative', display: 'flex', left: { left }, top: '-2.3vh', border: 'none' }} variant="outlined" onClick={handleClickOpen}>
        <img src={Pencil} height={'15px'} color={theme.custom.mycustomblur.text} alt="Modifier" id='modifier' />
      </Button>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{ style: { minWidth: '30vw', minHeight: '30vh', backgroundColor: 'beige', color: "black" }, }}
      >
        <DialogTitle onClose={handleClose} sx={{ outerWidth: '50vw' }}>
          Entrez la nouvelle valeur de {dataToUpdate}
        </DialogTitle>
        <DialogContent>

          <div>
            <TextField autoFocus id="newCrystals" multiline sx={{ minHeight: '10vh', minWidth: '10vw', border: 'solid black 3px ' }} onChange={(e) => setText(e.target.value)} inputProps={{ style: { height: "150px", color: 'black' } }} />
            <Button onClick={() => {
              handleSave();
            }
            }> Save new value</Button>
          </div>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>
  );
}