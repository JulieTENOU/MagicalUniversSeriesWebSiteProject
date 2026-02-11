import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { useState, useContext } from "react";
import { ConnexionContext } from "../components/provider";
// import Pencil from "../assets/img/pencil-outline.svg";
import { ReactComponent as Pencil } from "../assets/img/pencil-outline.svg";
import { useTheme } from "@mui/material/styles";
import { useCharacter } from "../context/CharacterContext";

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

export default function ModifierDialogs(data) {
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
    if (name === "force") {
      newDatas = {
        Force_character: text,
      };
    } else if (name === "dexte") {
      newDatas = {
        Dexte_character: text,
      };
    } else if (name === "resistance") {
      newDatas = {
        Resistance_character: text,
      };
    } else if (name === "resilience") {
      newDatas = {
        Resilience_character: text,
      };
    } else if (name === "intell") {
      newDatas = {
        Intell_character: text,
      };
    } else if (name === "charisme") {
      newDatas = {
        Charisme_character: text,
      };
    } else if (name === "bien") {
      newDatas = {
        Bien_character: text,
      };
    } else if (name === "mal") {
      newDatas = {
        Mal_character: text,
      };
    } else if (name === "instinct") {
      newDatas = {
        Instinct_character: text,
      };
    } else if (name === "survie") {
      newDatas = {
        Survie_character: text,
      };
    } else if (name === "démonique") {
      newDatas = {
        Demonique_character: text,
      };
    } else if (name === "draconique") {
      newDatas = {
        Draconique_character: text,
      };
    } else if (name === "xalytien") {
      newDatas = {
        Xalytien_character: text,
      };
    } else if (name === "xento") {
      newDatas = {
        Xento_character: text,
      };
    } else if (name === "zenolm") {
      newDatas = {
        Zenolm_character: text,
      };
    } else if (name === "justiccel") {
      newDatas = {
        Justiccel_character: text,
      };
    } else if (name === "cerebrov") {
      newDatas = {
        Cerebrov_character: text,
      };
    } else if (name === "xaArch") {
      newDatas = {
        XalytienArchaique_character: text,
      };
    } else if (name === "xenArch") {
      newDatas = {
        XentoArchaique_character: text,
      };
    } else if (name === "zenArch") {
      newDatas = {
        ZenolmArchaique_character: text,
      };
    } else if (name === "justiArch") {
      newDatas = {
        JusticcelArchaique_character: text,
      };
    } else if (name === "xaAnt") {
      newDatas = {
        XalytienAntique_character: text,
      };
    } else if (name === "xenAnt") {
      newDatas = {
        XentoAntique_character: text,
      };
    } else if (name === "zenAnt") {
      newDatas = {
        ZenolmAntique_character: text,
      };
    } else if (name === "justiAnt") {
      newDatas = {
        JusticcelAntique_character: text,
      };
    } else if (name === "xaDem") {
      newDatas = {
        XalytienDemonique_character: text,
      };
    } else if (name === "xenDem") {
      newDatas = {
        XentoDemonique_character: text,
      };
    } else if (name === "ZenDem") {
      newDatas = {
        ZenolmDemonique_character: text,
      };
    } else if (name === "JustiDem") {
      newDatas = {
        JusticcelDemonique_character: text,
      };
    } else if (name === "zombik") {
      newDatas = {
        Zombik_character: text,
      };
    } else if (name === "faerik") {
      newDatas = {
        Faerik_character: text,
      };
    } else if (name === "elfik") {
      newDatas = {
        Elfik_character: text,
      };
    } else if (name === "nanien") {
      newDatas = {
        Nanien_character: text,
      };
    } else if (name === "gnomik") {
      newDatas = {
        Gnomik_character: text,
      };
    } else if (name === "spectrale") {
      newDatas = {
        Spectrale_character: text,
      };
    } else if (name === "astrale") {
      newDatas = {
        Astrale_character: text,
      };
    } else if (name === "tenebriale") {
      newDatas = {
        Tenebriale_character: text,
      };
    } else if (name === "noyale") {
      newDatas = {
        Noyale_character: text,
      };
    } else if (name === "elementale") {
      newDatas = {
        Elementale_character: text,
      };
    } else if (name === "celeste") {
      newDatas = {
        Celeste_character: text,
      };
    } else if (name === "arcs") {
      newDatas = {
        Arcs_character: text,
      };
    } else if (name === "tir") {
      newDatas = {
        Tir_character: text,
      };
    } else if (name === "mainsNues") {
      newDatas = {
        MainsNues_character: text,
      };
    } else if (name === "jets") {
      newDatas = {
        Jets_character: text,
      };
    } else if (name === "hast") {
      newDatas = {
        ArmesHast_character: text,
      };
    } else if (name === "tranchantes") {
      newDatas = {
        Tranchantes_character: text,
      };
    } else if (name === "contondantes") {
      newDatas = {
        Contondantes_character: text,
      };
    } else if (name === "esquive") {
      newDatas = {
        Esquive_character: text,
      };
    } else if (name === "parade") {
      newDatas = {
        Parade_character: text,
      };
    } else if (name === "chant") {
      newDatas = {
        Chant_character: text,
      };
    } else if (name === "chasse") {
      newDatas = {
        Chasse_character: text,
      };
    } else if (name === "course") {
      newDatas = {
        Course_character: text,
      };
    } else if (name === "crochetage") {
      newDatas = {
        Crochetage_character: text,
      };
    } else if (name === "deguisement") {
      newDatas = {
        Deguisement_character: text,
      };
    } else if (name === "discretion") {
      newDatas = {
        Discretion_character: text,
      };
    } else if (name === "equitation") {
      newDatas = {
        Equitation_character: text,
      };
    } else if (name === "eloquance") {
      newDatas = {
        Eloquance_character: text,
      };
    } else if (name === "escalade") {
      newDatas = {
        Escalade_character: text,
      };
    } else if (name === "hypnose") {
      newDatas = {
        Hypnose_character: text,
      };
    } else if (name === "vigi") {
      newDatas = {
        Vigilence_character: text,
      };
    } else if (name === "nage") {
      newDatas = {
        Nage_character: text,
      };
    } else if (name === "observation") {
      newDatas = {
        Observation_character: text,
      };
    } else if (name === "pieges") {
      newDatas = {
        Pieges_character: text,
      };
    } else if (name === "professorat") {
      newDatas = {
        Professorat_character: text,
      };
    } else if (name === "saut") {
      newDatas = {
        Saut_character: text,
      };
    } else if (name === "soin") {
      newDatas = {
        Soin_character: text,
      };
    } else if (name === "telekine") {
      newDatas = {
        Telekinesie_character: text,
      };
    } else if (name === "magicotech") {
      newDatas = {
        MagicoTech_character: text,
      };
    } else if (name === "carto") {
      newDatas = {
        Cartographie_character: text,
      };
    } else if (name === "herbo") {
      newDatas = {
        Herboristerie_character: text,
      };
    } else if (name === "medecine") {
      newDatas = {
        Medecine_character: text,
      };
    } else if (name === "popo") {
      newDatas = {
        Potions_character: text,
      };
    } else if (name === "theoMag") {
      newDatas = {
        TheorieMagique_character: text,
      };
    } else if (name === "histoMag") {
      newDatas = {
        HistoireMagique_character: text,
      };
    } else if (name === "air") {
      newDatas = {
        MagieAir_character: text,
      };
    } else if (name === "eau") {
      newDatas = {
        MagieEau_character: text,
      };
    } else if (name === "feu") {
      newDatas = {
        MagieFeu_character: text,
      };
    } else if (name === "terre") {
      newDatas = {
        MagieTerre_character: text,
      };
    } else if (name === "elec") {
      newDatas = {
        MagieElec_character: text,
      };
    } else if (name === "crea") {
      newDatas = {
        Crea_character: text,
      };
    } else if (name === "animaturgie") {
      newDatas = {
        Animaturgie_character: text,
      };
    } else if (name === "vie") {
      newDatas = {
        MagieVie_character: text,
      };
    } else if (name === "mort") {
      newDatas = {
        Mort_character: text,
      };
    } else if (name === "temps") {
      newDatas = {
        Temps_character: text,
      };
    } else if (name === "lumiere") {
      newDatas = {
        Lumiere_character: text,
      };
    } else if (name === "tenebre") {
      newDatas = {
        Tenebres_character: text,
      };
    } else if (name === "cosmos") {
      newDatas = {
        Cosmos_character: text,
      };
    } else if (name === "invoc") {
      newDatas = {
        Invoc_character: text,
      };
    } else if (name === "aura") {
      newDatas = {
        Aura_character: text,
      };
    } else if (name === "magieAstrale") {
      newDatas = {
        MagieAstrale_character: text,
      };
    } else if (name === "magieSpectrale") {
      newDatas = {
        MagieSpectrale_character: text,
      };
    } else if (name === "magieDraconique") {
      newDatas = {
        MagieDraconique_character: text,
      };
    } else if (name === "signes") {
      newDatas = {
        Signes_character: text,
      };
    } else if (name === "bg") {
      newDatas = {
        Traits_character: text,
      };
    }
    console.log(newDatas);

    const value = Number(text);
    if (!Number.isFinite(value)) {
      alert("Valeur invalide");
      return;
    }

    const key = Object.keys(newDatas)[0];
    newDatas = { [key]: value };

    fetch(
      `/api/characters/updateCharacter/${character.character.ID_character}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDatas),
      },
    )
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
