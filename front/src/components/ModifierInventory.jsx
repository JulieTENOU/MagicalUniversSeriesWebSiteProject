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
import Pencil from '../assets/img/pencil-outline.svg';
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
  const inventaire = data.inventaire;
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
  console.log("inventaire", inventaire)

  const handleSave = () => {
    if (name === 'repas') {
      newDatas = {
        repas_inventory: text,
      };
    } else if (name === 'PPU') {
      newDatas = {
        PPU: text,
      };
    } else if (name === 'POU') {
      newDatas = {
        POU: text,
      };
    } else if (name === 'PAU') {
      newDatas = {
        PAU: text,
      };
    } else if (name === 'important1') {
      newDatas = {
        important1: text,
      };
    } else if (name === 'important2') {
      newDatas = {
        important2: text,
      };
    } else if (name === 'important3') {
      newDatas = {
        important3: text,
      };
    } else if (name === 'important4') {
      newDatas = {
        important4: text,
      };
    } else if (name === 'important5') {
      newDatas = {
        important5: text,
      };
    } else if (name === 'd1') {
      newDatas = {
        divers1_inventory: text,
      };
    } else if (name === 'd2') {
      newDatas = {
        divers2_inventory: text,
      };
    } else if (name === 'd3') {
      newDatas = {
        divers3_inventory: text,
      };
    } else if (name === 'd4') {
      newDatas = {
        divers4_inventory: text,
      };
    } else if (name === 'd5') {
      newDatas = {
        divers5_inventory: text,
      };
    } else if (name === 'd6') {
      newDatas = {
        divers6_inventory: text,
      };
    } else if (name === 'd7') {
      newDatas = {
        divers7_inventory: text,
      };
    } else if (name === 'd8') {
      newDatas = {
        divers8_inventory: text,
      };
    } else if (name === 'd9') {
      newDatas = {
        divers9_inventory: text,
      };
    } else if (name === 'd10') {
      newDatas = {
        divers10_inventory: text,
      };
    } else if (name === 'd1q') {
      newDatas = {
        divers1Quantite: text,
      };
    } else if (name === 'd2q') {
      newDatas = {
        divers2Quantite: text,
      };
    } else if (name === 'd3q') {
      newDatas = {
        divers3Quantite: text,
      };
    } else if (name === 'd4q') {
      newDatas = {
        divers4Quantite: text,
      };
    } else if (name === 'd5q') {
      newDatas = {
        divers5Quantite: text,
      };
    } else if (name === 'd6q') {
      newDatas = {
        divers6Quantite: text,
      };
    } else if (name === 'd7q') {
      newDatas = {
        divers7Quantite: text,
      };
    } else if (name === 'd8q') {
      newDatas = {
        divers8Quantite: text,
      };
    } else if (name === 'd9q') {
      newDatas = {
        divers9Quantite: text,
      };
    } else if (name === 'd10q') {
      newDatas = {
        divers10Quantite: text,
      };
    } else if (name === 'arme1Name') {
      newDatas = {
        arme1Name: text,
      };
    } else if (name === 'arme1Damage') {
      newDatas = {
        arme1Damage: text,
      };
    } else if (name === 'arme1Scope') {
      newDatas = {
        arme1Scope: text,
      };
    } else if (name === 'arme1Ammunition') {
      newDatas = {
        arme1Ammunition: text,
      };
    } else if (name === 'arme2Name') {
      newDatas = {
        arme2Name: text,
      };
    } else if (name === 'arme2Damage') {
      newDatas = {
        arme2Damage: text,
      };
    } else if (name === 'arme2Scope') {
      newDatas = {
        arme2Scope: text,
      };
    } else if (name === 'arme2Ammunition') {
      newDatas = {
        arme2Ammunition: text,
      };
    } else if (name === 'arme3Name') {
      newDatas = {
        arme3Name: text,
      };
    } else if (name === 'arme3Damage') {
      newDatas = {
        arme3Damage: text,
      };
    } else if (name === 'arme3Scope') {
      newDatas = {
        arme3Scope: text,
      };
    } else if (name === 'arme3Ammunition') {
      newDatas = {
        arme3Ammunition: text,
      };
    } else if (name === 'armure1Name') {
      newDatas = {
        armure1Name: text,
      };
    } else if (name === 'armure1Cac') {
      newDatas = {
        armure1Cac: text,
      };
    } else if (name === 'armure1Dist') {
      newDatas = {
        armure1Dist: text,
      };
    } else if (name === 'armure1Effect') {
      newDatas = {
        armure1Effect: text,
      };
    } else if (name === 'armure2Name') {
      newDatas = {
        armure2Name: text,
      };
    } else if (name === 'armure2Cac') {
      newDatas = {
        armure2Cac: text,
      };
    } else if (name === 'armure2Dist') {
      newDatas = {
        armure2Dist: text,
      };
    } else if (name === 'armure2Effect') {
      newDatas = {
        armure2Effect: text,
      };
    } else if (name === 'armure3Name') {
      newDatas = {
        armure3Name: text,
      };
    } else if (name === 'armure3Cac') {
      newDatas = {
        armure3Cac: text,
      };
    } else if (name === 'armure3Scope') {
      newDatas = {
        armure3Dist: text,
      };
    } else if (name === 'armure3Effect') {
      newDatas = {
        armure3Effect: text,
      };
    }

    fetch(`/api/inventories/updateInventory/${inventaire.Name_character}`, {
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
        data.onInventoryUpdate?.(newDatas);
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
        PaperProps={{ style: { minWidth: '30vw', minHeight: '30vh', backgroundColor: 'beige' }, }}
      >
        <DialogTitle onClose={handleClose} sx={{ outerWidth: '50vw' }}>
          Entrez la nouvelle valeur de {dataToUpdate}
        </DialogTitle>
        <DialogContent>

          <div>
            <TextField id="newNotes" multiline sx={{ minHeight: '30px', minWidth: '30px' }} onChange={(e) => setText(e.target.value)} inputProps={{ style: { height: "150px" } }} />
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