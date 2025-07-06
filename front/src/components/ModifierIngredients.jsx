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
    const ingredients = data.inventaire;
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

  console.log("ingredients", ingredients)

  const handleSave = () => {
    if(name === 'ingredient1'){
      newDatas = {
        ingredient1: text,
    };
  } else if (name === 'ingredient1Q'){
    newDatas = {
      ingredient1Quantite: text,
    };
  } else if (name === 'ingredient2'){
    newDatas = {
      ingredient2: text,
    };
  } else if (name === 'ingredient2Q'){
    newDatas = {
      ingredient2Quantite: text,
    };
  } else if (name ==='ingredient3'){
    newDatas = {
      ingredient3: text,
    };
  } else if (name ==='ingredient3Q'){
    newDatas = {
      ingredient3Quantite: text,
    };
  } else if (name ==='ingredient4'){
    newDatas = {
      ingredient4: text,
    };
  } else if (name ==='ingredient4Q'){
    newDatas = {
      ingredient4Quantite: text,
    };
  } else if (name ==='ingredient5'){
    newDatas = {
      ingredient5: text,
    };
  } else if (name ==='ingredient5Q'){
    newDatas = {
      ingredient5Quantite: text,
    };
  } else if (name ==='ingredient6'){
    newDatas = {
      ingredient6: text,
    };
  } else if (name ==='ingredient6Q'){
    newDatas = {
      ingredient6Quantite: text,
    };
  } else if (name ==='ingredient7'){
    newDatas = {
      ingredient7: text,
    };
  } else if (name ==='ingredient7Q'){
    newDatas = {
      ingredient7Quantite: text,
    };
  }else if (name ==='ingredient8'){
    newDatas = {
      ingredient8: text,
    };
  } else if (name ==='ingredient8Q'){
    newDatas = {
      ingredient8Quantite: text,
    };
  } else if (name ==='ingredient9'){
    newDatas = {
      ingredient9: text,
    };
  } else if (name ==='ingredient9Q'){
    newDatas = {
      ingredient9Quantite: text,
    };
  } else if (name ==='ingredient10'){
    newDatas = {
      ingredient10: text,
    };
  } else if (name ==='ingredient10Q'){
    newDatas = {
      ingredient10Quantite: text,
    };
  } else if (name ==='ingredient11'){
    newDatas = {
      ingredient11: text,
    };
  } else if (name ==='ingredient11Q'){
    newDatas = {
      ingredient11Quantite: text,
    };
  } else if (name ==='ingredient12'){
    newDatas = {
      ingredient12: text,
    };
  } else if (name ==='ingredient12Q'){
    newDatas = {
      ingredient12Quantite: text,
    };
  }else if (name ==='ingredient13'){
    newDatas = {
      ingredient13: text,
    };
  } else if (name ==='ingredient13Q'){
    newDatas = {
      ingredient13Quantite: text,
    };
  } else if (name ==='ingredient14'){
    newDatas = {
      ingredient14: text,
    };
  } else if (name ==='ingredient14Q'){
    newDatas = {
      ingredient14Quantite: text,
    };
  } else if (name ==='ingredient15'){
    newDatas = {
      ingredient15: text,
    };
  } else if (name ==='ingredient15Q'){
    newDatas = {
      ingredient15Quantite: text,
    };
  } 
    console.log(newDatas);
    fetch(`/ingredients/api/updateIngredients/${ingredients.ID_character}`,{
      method: "PUT",
      headers:{
        "content-type": "application/json",
      },
      body: JSON.stringify(newDatas),
    })
      .then((response) => response.json())
      .then((newDatas) => {
        console.log("Success:", newDatas);
      })
      .catch((error)=>{
        console.error("Error:", error);
      });
  }

  return (
    <div style={{position: 'relative', height:'0px'}}>
      <Button sx={{ position:'relative', display: 'flex', left:{left}, top:'-2.3vh' , border:'none'}} variant="outlined" onClick={handleClickOpen}>
        <img src={Pencil} height={'15px'} color={theme.custom.mycustomblur.text} alt="Modifier" id='modifier'/>
      </Button>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{style:{minWidth:'30vw', minHeight:'30vh', backgroundColor:'beige'},}}
      >
        <DialogTitle onClose={handleClose} sx={{outerWidth:'50vw'}}>
          Entrez la nouvelle valeur de {dataToUpdate}
        </DialogTitle>
        <DialogContent>

            <div>
              <TextField id="newNotes" multiline sx={{minHeight:'30px', minWidth:'30px'}} onChange={(e) => setText(e.target.value)} inputProps={{style:{ height:"150px"}}}/>
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