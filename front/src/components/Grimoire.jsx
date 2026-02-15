import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// import Grimoire from '../assets/img/grimoire.jpg';
import { useState, useEffect } from 'react';

function BootstrapDialogTitle(props) {
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

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(data) {

  const API_BASE = process.env.REACT_APP_API_BASE || window.location.origin;
  const Grimoire = `${API_BASE}/api/media/getOneMedia/4`;
  const character = data.data;
  console.log(character);
  const [inventaires, setInventaires] = useState({})
  const [simple, setSimple] = useState(true);
  const [combinaison, setCombinaison] = useState(false);
  const [notes, setNotes] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [text, setText] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    fetch(`/api/inventories/getOneInventories/${character.Name_character}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setInventaires(data.data);
      });;
  }, [character.ID_character]);
  var autres = inventaires?.autres_inventory ?? "";
  useEffect(() => {
    console.log("autres", autres)

  }, [autres]);

  const handleSave = (NewAutres) => {
    const data = {
      autres_inventory: NewAutres,
    };
    console.log(data);
    fetch(`/api/inventories/updateInventory/${character.Name_character}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }


  // function handleInventaireUpdate(newText) {
  //   setInventaires((prev) => ({
  //     ...prev,
  //     autres_inventory: prev.autres_inventory
  //       ? `${prev.autres_inventory}\n${newText}`
  //       : newText,
  //   }));
  // }

  return (
    <div>
      <Button sx={{ position: 'fixed', bottom: 16, right: 5 }} variant="outlined" onClick={handleClickOpen}>
        <img src={Grimoire} height={'75px'} alt='grimoire' />
      </Button>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{ style: { minWidth: '70vw', minHeight: '70vh', backgroundColor: 'beige', color: "black" }, }}
      >
        <DialogTitle onClose={handleClose} sx={{ outerWidth: '50vw' }}>
          Grimoire
        </DialogTitle>
        <DialogContent>

          <Typography gutterBottom>
            {/* Exemples d'utilisations magiques  */}
            {/* <button onClick={() => { setSimple(true); setCombinaison(false); setNotes(false); }}>simples</button> / <button onClick={() => { setSimple(false); setCombinaison(true); setNotes(false); }}>combinées</button> /  */}
            <button onClick={() => { setSimple(false); setCombinaison(false); setNotes(true); }}>Mes notes</button>
          </Typography>
          {
            // simple ?
            //  <Box>
            //   <Typography gutterBottom>
            //     <table>
            //       <thead>
            //         <th>Air</th>
            //         <th>Eau</th>
            //         <th>Terre</th>
            //         <th>Feu</th>
            //         <th>Electricité</th>
            //         <th>Consomation <br />(minimum selon dimensions)</th>
            //       </thead>
            //       <tbody>
            //         <tr>
            //           <td>Vol/Flying</td>
            //           <td>Projection d'eau</td>
            //           <td>Dôme de terre</td>
            //           <td>Etincelles</td>
            //           <td>Déséquilibre électrostatique</td>
            //           <td>25 pts</td>
            //         </tr>
            //         <tr>
            //           <td>Tornade</td>
            //           <td>Déluge</td>
            //           <td>(Re)construction osseuse</td>
            //           <td>Boule de feu</td>
            //           <td>Décharge électrique <br />(faible à moyen)</td>
            //           <td>45 pts</td>
            //         </tr>
            //         <tr>
            //           <td>Onde sonore</td>
            //           <td>Repérage marin</td>
            //           <td>Mouvements tectoniques</td>
            //           <td>Lance flammes</td>
            //           <td>Eclaire</td>
            //           <td>70 pts</td>
            //         </tr>
            //       </tbody>
            //     </table>
            //     <div style={{ height: '25px' }}></div>
            //     <table>
            //       <thead>
            //         <th>Psychique Interne</th>
            //         <th>Psychique Personnel</th>
            //         <th>Psychique Externe</th>
            //         <th>Psychique Interpersonnel</th>
            //         <th>Consomation <br />(minimum selon durée)</th>
            //       </thead>
            //       <tbody>
            //         <tr>
            //           <td>Déblocages magiques internes</td>
            //           <td>Introspection<br />(ex: Surveillance d'intrusion mental)</td>
            //           <td>Déplacement d'objets</td>
            //           <td>Transmission de pensées</td>
            //           <td>30 pts</td>
            //         </tr>
            //         <tr>
            //           <td>...</td>
            //           <td>...</td>
            //           <td>Déplacement d'être vivants</td>
            //           <td>Imposition de pensées</td>
            //           <td>60 pts</td>
            //         </tr>
            //         <tr>
            //           <td>...</td>
            //           <td>...</td>
            //           <td>...</td>
            //           <td>Manipulation mentale</td>
            //           <td>85 pts</td>
            //         </tr>
            //       </tbody>
            //     </table>
            //     <div style={{ height: '25px' }}></div>
            //   </Typography>
            //   <Typography gutterBottom>
            //   </Typography>
            // </Box>
            //  :
            //   combinaison ? <Box>
            //   <Typography gutterBottom>
            //     <table>
            //       <thead>
            //         <th>Air & Terre</th>
            //         <th>Air & Feu</th>
            //         <th>Air & Electricité</th>
            //         <th>Feu & Electricité</th>
            //         <th>Eau & Terre</th>
            //         <th>Eau & Feu</th>
            //         <th>Eau & Electricité</th>
            //         <th>Terre & Feu</th>
            //         <th>Terre & Electricité</th>
            //         <th>Consomation <br />(minimum selon dimensions)</th>
            //       </thead>
            //       <tbody>
            //         <tr>
            //           <td>Flying</td>
            //           <td>Chaleur</td>
            //           <td>Oxygène</td>
            //           <td>Foudre</td>
            //           <td>Vie/Temps/Mort</td>
            //           <td>Vapeur</td>
            //           <td>Molécule</td>
            //           <td>Métaux</td>
            //           <td>Magnétisme</td>
            //           <td>45 pts de chaque mana</td>
            //         </tr>
            //       </tbody>
            //     </table>
            //     <div style={{ height: '25px' }}></div>
            //     <table>
            //       <thead>
            //         <th>Terre & Création</th>
            //         <th>Electricité & Création</th>
            //         <th>Air & Création</th>
            //         <th>Feu & Création</th>
            //         <th>Eau & Création</th>
            //         <th>Vie & Création</th>
            //         <th>Vie & Création</th>
            //         <th>Mort & Création</th>
            //         <th>Mort & Création</th>
            //         <th>Temps & Création</th>
            //         <th>Temps & Espace</th>
            //         <th>Consomation <br />(minimum selon durée)</th>
            //       </thead>
            //       <tbody>
            //         <tr>
            //           <td>Genbu <br />(Manipulation de l'espace)</td>
            //           <td>Oiseau-Tonnerre <br />(Colère des esprits)</td>
            //           <td>Ginnungagap<br />(Yawning Void)</td>
            //           <td>Phoînix<br />(Flammes éternelles)</td>
            //           <td>Klabautermann<br />(Mahlstrom)</td>
            //           <td>T'hiyat Hamètim<br />(Résurection des morts)</td>
            //           <td>Mortem Rejiciunt<br />(Rejet de mort)</td>
            //           <td>Yom HaDim<br />(Mort de masse)</td>
            //           <td>Vita brevis est, brevi finietur<br />(Armée d'outre tombe)</td>
            //           <td>Lost Age<br />(Retour dans le temps)</td>
            //           <td>Sungan Idong<br />(Téléportation)</td>
            //           <td>65 pts de chaque mana</td>
            //         </tr>
            //       </tbody>
            //     </table>
            //     <div style={{ height: '25px' }}></div>
            //   </Typography>
            //   <Typography gutterBottom>
            //   </Typography>
            // </Box> 
            // :
            notes && <div>
              <TextField autoFocus id="newNotes" multiline sx={{ minHeight: '20vh', minWidth: '20vw', border: 'solid black 3px ' }} onChange={(e) => setText(e.target.value)} inputProps={{ style: { height: "150px", color: 'black' } }} />
              <Button onClick={() => {
                // autres += text;
                // console.log(autres);
                // handleSave();
                // handleInventaireUpdate();
                const old = inventaires?.autres_inventory ?? "";
                const add = text ?? "";
                const newOne = old ? `${old}\n${add}` : add;
                handleSave(newOne);
                setInventaires(prev => ({ ...prev, autres_inventory: newOne }));
                setText("");
              }
              }> Save new notes</Button>
              <div style={{ whiteSpace: "pre-wrap" }}><h3>Notes saved</h3>
                <br />{inventaires?.autres_inventory ?? "Aucune note enregistrées"}
                <br />{text}
              </div>
            </div>
          }
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>
  );
}