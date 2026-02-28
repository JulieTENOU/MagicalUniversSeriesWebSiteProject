import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import "../../src/styles/responsive.css"

import { LinearProgress, Typography, useMediaQuery } from "@mui/material";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import GrassIcon from "@mui/icons-material/Grass";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import CasinoIcon from '@mui/icons-material/Casino';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";

import { CharacterProvider } from "../context/CharacterContext";
import { socket } from "../service/socket";
import { uploadImage, attachMediaToCharacter } from "../service/mediaApi";
import { useSnack } from "../hooks/useSnack";
import { useCharacterMedia } from "../hooks/useCharacterMedia";
import { ConnexionContext } from "../components/provider";

import BG from "../components/Background";
import Top from "../components/Header";
import Btn from "../components/Btn";
import BtnAdd from "../components/BtnAdd";
import BtnRm from "../components/BtnRm";
import PageLoader from "../components/PageLoader.jsx";

import SideMenu from "../components/SideMenu";
import CustomizedDialogs from "../components/Grimoire";
import Inventory from "../components/Inventory";
import Combat from "../components/Combat";
import Ingredients from "../components/Ingredients";
import Crystals from "../components/Crystals";
import Creatures from "../components/Creatures";
import ModifierIdDialogs from "../components/ModifierIdChara.jsx";
import DiceChoice from "../components/DiceChoice.jsx";
import DiceD20Icon from "../components/icons/Dice20Icon.jsx";


function ConnectGame() {
  const { t } = useTranslation();
  const { characterId } = useParams();
  const theme = useTheme();
  const {
    state: currentUser,
    setState: setCurrentUser,
    loading,
  } = useContext(ConnexionContext);
  // console.log(currentUser.users_ID);
  console.log(`currentUser : ${currentUser}`);

  const { avatar, gallery, refresh } = useCharacterMedia(Number(characterId));
  const [rollDice, setRollDice] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showIdCard, setShowIdCard] = useState(false);
  const [isAnyDrawerOpen, setIsAnyDrawerOpen] = useState(false);


  const boardRef = useRef(null);

  let navigate = useNavigate();

  const defaultCharacter = {
    ID_character: 0,
    Name_character: "Visiteur",
    Metier_character: "Aucun",
    Race_character: "Inconnue",
    Sexe_character: "Indéfini",
    Planete_character: "N/A",
    Niveau_character: 1,
    Agence_character: "Libre",
    Age_character: "??",
    Taille_character: "??",
    Poids_character: "??",
    OeilD_character: "??",
    OeilG_character: "??",
    Cheveux_character: "??",
    Signes_character: "Aucun",
    Traits_character: "Curieux / Observateur",
    ManaAir_character: 30,
    ManaEau_character: 30,
    ManaTerre_character: 30,
    ManaFeu_character: 30,
    ManaVolonte_character: 30,
    ManaVital_character: 100,
    Stamina_character: 100,
  };

  const [character, setCharacter] = useState(defaultCharacter);

  const [maxGauges, setMaxGauges] = useState({
    ManaAir: defaultCharacter.ManaAir_character,
    ManaEau: defaultCharacter.ManaEau_character,
    ManaTerre: defaultCharacter.ManaTerre_character,
    ManaFeu: defaultCharacter.ManaFeu_character,
    ManaVolonte: defaultCharacter.ManaVolonte_character,
    ManaVital: defaultCharacter.ManaVital_character,
    Stamina: defaultCharacter.Stamina_character,
  });

  const [currentGauges, setCurrentGauges] = useState({
    currentManaAir: defaultCharacter.ManaAir_character, // fallback temporaire
    currentManaEau: defaultCharacter.ManaEau_character,
    currentManaTerre: defaultCharacter.ManaTerre_character,
    currentManaFeu: defaultCharacter.ManaFeu_character,
    currentManaVolonte: defaultCharacter.ManaVolonte_character,
    currentManaVital: defaultCharacter.ManaVital_character,
    currentStamina: defaultCharacter.Stamina_character,
  });

  const percentManaAir =
    (currentGauges.currentManaAir / maxGauges.ManaAir) * 100;
  const clampedManaAir = Math.min(100, Math.max(0, percentManaAir));

  const percentManaEau =
    (currentGauges.currentManaEau / maxGauges.ManaEau) * 100;
  const clampedManaEau = Math.min(100, Math.max(0, percentManaEau));

  const percentManaTerre =
    (currentGauges.currentManaTerre / maxGauges.ManaTerre) * 100;
  const clampedManaTerre = Math.min(100, Math.max(0, percentManaTerre));

  const percentManaFeu =
    (currentGauges.currentManaFeu / maxGauges.ManaFeu) * 100;
  const clampedManaFeu = Math.min(100, Math.max(0, percentManaFeu));

  const percentManaVolonte =
    (currentGauges.currentManaVolonte / maxGauges.ManaVolonte) * 100;
  const clampedManaVolonte = Math.min(100, Math.max(0, percentManaVolonte));

  const compFieldByName = {
    force: "Force_character",
    dexte: "Dexte_character",
    resistance: "Resistance_character",
    resilience: "Resilience_character",
    intell: "Intell_character",
    charsime: "Charisme_character",
    bien: "Bien_character",
    mal: "Mal_character",
    instinct: "Instinct_character",
    survie: "Survie_character",

    démonique: "Demonique_character",
    draconique: "Draconique_character",
    xalytien: "Xalytien_character",
    xento: "Xento_character",
    zenolm: "Zenolm_character",
    justiccel: "Justiccel_character",
    cerebrov: "Cerebrov_character",

    xaArch: "XalytienArchaique_character",
    xenArch: "XentoArchaique_character",
    zenArch: "ZenolmArchaique_character",
    justiArch: "JusticcelArchaique_character",

    xaAnt: "XalytienAntique_character",
    d4q: "XentoAntique_character",
    xenAnt: "XentoAntique_character",
    zenAnt: "ZenolmAntique_character",
    justiAnt: "JusticcelAntique_character",

    xaDem: "XalytienDemonique_character",
    xenDem: "XentoDemonique_character",
    ZenDem: "ZenolmDemonique_character",
    JustiDem: "JusticcelDemonique_character",

    zombik: "Zombik_character",
    faerik: "Faerik_character",
    elfik: "Elfik_character",
    nanien: "Nanien_character",
    gnomik: "Gnomik_character",

    spectrale: "Spectrale_character",
    astrale: "Astrale_character",
    tenebriale: "Tenebriale_character",
    noyale: "Noyale_character",
    elementale: "Elementale_character",
    celeste: "Celeste_character",

    arcs: "Arcs_character",
    tir: "Tir_character",
    mainsNues: "MainsNues_character",
    jets: "Jets_character",
    hast: "ArmesHast_character",
    tranchantes: "Tranchantes_character",
    contondantes: "Contondantes_character",
    esquive: "Esquive_character",
    parade: "Parade_character",

    magicotech: "MagicoTech_character",
    carto: "Cartographie_character",
    herbo: "Herboristerie_character",
    medecine: "Medecine_character",
    popo: "Potions_character",
    theoMag: "TheorieMagique_character",
    histoMag: "HistoireMagique_character",

    air: "MagieAir_character",
    eau: "MagieEau_character",
    feu: "MagieFeu_character",
    terre: "MagieTerre_character",
    elec: "MagieElec_character",

    crea: "Crea_character",
    animaturgie: "Animaturgie_character",

    vie: "MagieVie_character",
    mort: "Mort_character",
    temps: "Temps_character",
    lumiere: "Lumiere_character",
    tenebre: "Tenebres_character",
    cosmos: "Cosmos_character",

    invoc: "Invoc_character",
    aura: "Aura_character",
    magieAstrale: "MagieAstrale_character",
    magieSpectrale: "MagieSpectrale_character",
    magieDraconique: "MagieDraconique_character",
  };

  // const [comps, setComps] = useState({});

  useEffect(() => {
    fetch(`/api/characters/getOneCharacterById/${characterId}`)
      .then((res) => res.json())
      .then((data) => {
        const chara = data.data;
        if (chara && chara.ID_character) {
          console.log("Personnage trouvé :", chara);
          setCharacter(chara);
          setMaxGauges({
            ManaAir: chara.ManaAir_character,
            ManaEau: chara.ManaEau_character,
            ManaTerre: chara.ManaTerre_character,
            ManaFeu: chara.ManaFeu_character,
            ManaVolonte: chara.ManaVolonte_character,
            ManaVital: chara.ManaVital_character,
            Stamina: chara.Stamina_character,
          });
        } else {
          console.warn("Aucun personnage trouvé, affichage du Visiteur.");
        }
      })
      .catch((err) => {
        console.error(
          "Erreur récupération personnage, fallback Visiteur :",
          err,
        );
      });
  }, [currentUser?.users_ID]);

  useEffect(() => {
    if (!character || character.ID_character === 0) {
      // Reste sur les valeurs par défaut du Visiteur
      setCurrentGauges({
        currentManaAir: character.ManaAir_character,
        currentManaEau: character.ManaEau_character,
        currentManaTerre: character.ManaTerre_character,
        currentManaFeu: character.ManaFeu_character,
        currentManaVolonte: character.ManaVolonte_character,
        currentManaVital: character.ManaVital_character,
        currentStamina: character.Stamina_character,
      });
      return;
    }

    const name = encodeURIComponent(character.Name_character);

    fetch(`/api/gauges/getOneGauges/${name}`) // permet d'aller chercher un URL spécifique
      .then(async (res) => {
        const body = await res.json().catch(() => null);

        if (!res.ok) {
          console.log("Gauges API error: ", res.status, body);
          throw new Error(`HTTP ${res.status}`);
        }

        return body;
      })
      .then((data) => {
        console.log("data: ", data);
        const gauges = data?.data;
        if (!gauges)
          throw new Error("Réponse API invalide: data.data manquant");

        setCurrentGauges({
          currentManaAir: gauges.currentManaAir,
          currentManaEau: gauges.currentManaEau,
          currentManaTerre: gauges.currentManaTerre,
          currentManaFeu: gauges.currentManaFeu,
          currentManaVolonte: gauges.currentManaVolonte,
          currentManaVital: gauges.currentManaVital,
          currentStamina: gauges.currentStamina,
        });
      })
      .catch((err) => {
        console.log(
          "Erreur récupération jauges, fallback sur valeurs max :",
          err,
        );
        setCurrentGauges({
          currentManaAir: character.ManaAir_character,
          currentManaEau: character.ManaEau_character,
          currentManaTerre: character.ManaTerre_character,
          currentManaFeu: character.ManaFeu_character,
          currentManaVolonte: character.ManaVolonte_character,
          currentManaVital: character.ManaVital_character,
          currentStamina: character.Stamina_character,
        });
      });
  }, [character]);

  function handleGaugeUpdate(manaName, newValue) {
    setCurrentGauges((prev) => ({ ...prev, [manaName]: newValue }));
  }

  const { showSnack, Snack } = useSnack();

  useEffect(() => {
    if (!characterId) return;

    socket.emit("join:character", { characterId: Number(characterId) });

    const onAlert = ({ message, severity }) => {
      showSnack(message, severity);
    };

    const onScenarioEnd = async ({ title, lines }) => {
      // lines = ["+5 Force", "+3 Course", ...]
      const msg = `${title || "Fin de scénario"}\n${(lines || []).join("\n")}`;
      showSnack(msg, "success");

      try {
        const resChar = await fetch(
          `/api/characters/getOneCharacterById/${characterId}`
        );
        const jsonChar = await resChar.json();
        const updatedChar = jsonChar?.data ?? jsonChar;

        if (updatedChar) {
          setCharacter(updatedChar);
        }

        const name = updatedChar?.Name_character;
        if (name) {
          const resG = await fetch(
            `/api/gauges/getOneGauges/${encodeURIComponent(name)}`
          );
          const jsonG = await resG.json();
          const updatedG = jsonG?.data ?? jsonG;

          if (updatedG) {
            const g = updatedG?.data ?? updatedG;

            setCurrentGauges({
              currentManaAir: g.currentManaAir,
              currentManaEau: g.currentManaEau,
              currentManaTerre: g.currentManaTerre,
              currentManaFeu: g.currentManaFeu,
              currentManaVolonte: g.currentManaVolonte,
              currentManaVital: g.currentManaVital,
              currentStamina: g.currentStamina,
            });
          }
        }
      } catch (e) {
        console.error("refresh after scenario end failed:", e);
      }

    };


    socket.on("mj:alert", onAlert);
    socket.on("player:scenarioEnd", onScenarioEnd);


    return () => {
      socket.off("mj:alert", onAlert);
      socket.off("player:scenarioEnd", onScenarioEnd);
    };


  }, [characterId, showSnack]);

  // console.log("character datas : ", character);

  const isInvalidUser =
    !currentUser ||
    (Array.isArray(currentUser) && currentUser.length === 0) ||
    (typeof currentUser === "object" && Object.keys(currentUser).length === 0);

  const API_BASE = process.env.REACT_APP_API_BASE || window.location.origin;

  async function uploadImage(file, zone = "gallery") {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      `${API_BASE}/api/media/upload?zone=${zone}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data.ID_media;
  }

  async function loadCharacterMedia(ID_character) {
    const response = await fetch(
      `${API_BASE}/api/character_media/characters/${ID_character}/media`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return await response.json();
  }
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    async function load() {
      // Ancien code sans gestion d'erreur : si l'API renvoie une erreur (ex: 401),
      // media n'est pas un tableau et media.find() lève une TypeError non gérée
      // const media = await loadCharacterMedia(characterId);
      // const avatar = media.find(m => m.slot === "avatar");
      // if (avatar) {
      //   setAvatarUrl(avatar.url);
      // }
      try {
        const media = await loadCharacterMedia(characterId);
        const avatar = Array.isArray(media) ? media.find(m => m.slot === "avatar") : null;
        if (avatar) {
          setAvatarUrl(avatar.url);
        }
      } catch (err) {
        console.warn("Impossible de charger le média du personnage :", err);
      }
    }

    load();
  }, [characterId]);


  // Ancien pattern useEffect + navigate (peut causer une page blanche car le rendu complet
  // se produit avant la redirection, et des effets avec des erreurs non gérées s'exécutent)
  // useEffect(() => {
  //   if (!loading && isInvalidUser) {
  //     navigate("/", { replace: true });
  //     return null;
  //   }
  // }, [loading, isInvalidUser, navigate]);

  if (loading) {
    return <PageLoader />;
  }

  // Pattern React Router v6 idiomatique : retour anticipé avec <Navigate>
  // Évite le rendu du JSX complet (et tous ses effets) quand l'utilisateur n'est pas connecté
  if (isInvalidUser) {
    return <Navigate to="/" replace />;
  }



  return (
    <div className="main">

      <BG />
      <Top started={currentUser} />
      {Snack}
      <div
        id="holocom"
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          justifyContent: "space-around",
        }}
      >
        {!isMobile &&
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                position: "fixed",
                width: "70vw",
                alignSelf: "end",
                alignItems: "start",
                display: "flex",
                flexDirection: "column",
                textAlign: "right",
                justifyContent: "space-around",
              }}
            >
              <div
                className="manaBars"
                style={{
                  position: "fixed",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "inherit",
                  bottom: "45vh",
                  width: "auto",
                  textAlign: "center",
                }}
              >
                <div className="mana-group mana-air"
                  style={{
                    position: "fixed",
                    display: "flex",
                    left: "34vw",
                    top: "10vh",
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "auto",
                    textAlign: "center",
                  }}
                >
                  <div
                    class="manaComplet"
                    style={{
                      position: "fixed",
                      display: "flex",
                      left: "30vw",
                      top: "15vh",
                      flexDirection: "column",
                      justifyContent: "center",
                      width: "auto",
                      textAlign: "center",
                    }}
                  >
                    <Typography className="mana-icon-air"
                      variant="h6"
                      position={"fixed"}
                      top={"38vh"}
                      left={"34vw"}
                      sx={{ color: "lightblue" }}
                      textSize="1rem"
                    >
                      <AirIcon />
                      <br />
                      {currentGauges.currentManaAir} pts
                    </Typography>

                    <div
                      class="manaTest"
                      style={{ display: "felx", flexDirection: "row" }}
                    >
                      <LinearProgress
                        color="success"
                        id="manaAir"
                        variant="determinate"
                        value={clampedManaAir}
                        sx={{
                          position: "fixed",
                          top: "25vh",
                          height: "1vh",
                          width: "10vw",
                          borderRadius: "25px",
                          rotate: "-90deg",
                        }}
                      />
                      <div className="mana-btns-air"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          position: "fixed",
                          left: "32vw",
                          top: "22vh",
                          color: theme.custom.mycustomblur.text,
                        }}
                      >
                        <BtnAdd
                          name={"mana d'air"}
                          mana={currentGauges.currentManaAir}
                          manaName={"currentManaAir"}
                          character={character}
                          onGaugeUpdate={handleGaugeUpdate}
                        />
                        <BtnRm
                          name={"mana d'air"}
                          mana={currentGauges.currentManaAir}
                          manaName={"currentManaAir"}
                          character={character}
                          onGaugeUpdate={handleGaugeUpdate}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="mana-group mana-eau"
                  style={{
                    position: "fixed",
                    display: "flex",
                    left: "39vw",
                    top: "10vh",
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "auto",
                    textAlign: "center",
                  }}
                >
                  <div
                    class="manaComplet"
                    style={{
                      position: "fixed",
                      display: "flex",
                      left: "35vw",
                      top: "15vh",
                      flexDirection: "column",
                      justifyContent: "center",
                      width: "auto",
                      textAlign: "center",
                    }}
                  >
                    <Typography className="mana-icon-eau"
                      variant="h6"
                      position={"fixed"}
                      top={"38vh"}
                      left={"39vw"}
                      sx={{ color: "lightblue" }}
                      textSize="1rem"
                    >
                      {" "}
                      <WaterDropIcon />
                      <br />
                      {currentGauges.currentManaEau} pts
                    </Typography>

                    <div
                      class="manaTest"
                      style={{ display: "felx", flexDirection: "row" }}
                    >
                      <LinearProgress
                        color="info"
                        id="manaEau"
                        variant="determinate"
                        value={clampedManaEau}
                        sx={{
                          position: "fixed",
                          top: "25vh",
                          height: "1vh",
                          width: "10vw",
                          borderRadius: "25px ",
                          rotate: "-90deg",
                        }}
                      />
                      <div className="mana-btns-eau"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          position: "fixed",
                          left: "37vw",
                          top: "22vh",
                          color: theme.custom.mycustomblur.text,
                        }}
                      >
                        <BtnAdd
                          name={"mana d'eau"}
                          mana={currentGauges.currentManaEau}
                          manaName={"currentManaEau"}
                          character={character}
                          onGaugeUpdate={handleGaugeUpdate}
                        />
                        <BtnRm
                          name={"mana d'eau"}
                          mana={currentGauges.currentManaEau}
                          manaName={"currentManaEau"}
                          character={character}
                          onGaugeUpdate={handleGaugeUpdate}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="mana-group mana-terre"
                  style={{
                    position: "fixed",
                    display: "flex",
                    left: "44vw",
                    top: "10vh",
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "auto",
                    textAlign: "center",
                  }}
                >
                  <div
                    class="manaComplet"
                    style={{
                      position: "fixed",
                      display: "flex",
                      left: "40vw",
                      top: "15vh",
                      flexDirection: "column",
                      justifyContent: "center",
                      width: "auto",
                      textAlign: "center",
                    }}
                  >
                    <Typography className="mana-icon-terre"
                      variant="h6"
                      position={"fixed"}
                      left={"44vw"}
                      top={"38vh"}
                      sx={{ color: "lightblue" }}
                      textSize="1rem"
                    >
                      <GrassIcon />
                      <br />
                      {currentGauges.currentManaTerre} pts
                    </Typography>

                    <div
                      class="manaTest"
                      style={{ display: "felx", flexDirection: "row" }}
                    >
                      <LinearProgress
                        color="warning"
                        id="manaTerre"
                        variant="determinate"
                        value={clampedManaTerre}
                        sx={{
                          position: "fixed",
                          top: "25vh",
                          height: "1vh",
                          width: "10vw",
                          borderRadius: "25px ",
                          rotate: "-90deg",
                        }}
                      />
                      <div className="mana-btns-terre"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          position: "fixed",
                          left: "42vw",
                          top: "22vh",
                        }}
                      >
                        <BtnAdd
                          name={"mana de terre"}
                          mana={currentGauges.currentManaTerre}
                          manaName={"currentManaTerre"}
                          character={character}
                          onGaugeUpdate={handleGaugeUpdate}
                        />
                        <BtnRm
                          name={"mana de terre"}
                          mana={currentGauges.currentManaTerre}
                          manaName={"currentManaTerre"}
                          character={character}
                          onGaugeUpdate={handleGaugeUpdate}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="mana-group mana-feu"
                  style={{
                    position: "fixed",
                    display: "flex",
                    left: "49vw",
                    top: "10vh",
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "auto",
                    textAlign: "center",
                  }}
                >
                  <div
                    class="manaComplet"
                    style={{
                      position: "fixed",
                      display: "flex",
                      left: "45vw",
                      top: "15vh",
                      flexDirection: "column",
                      justifyContent: "center",
                      width: "auto",
                      textAlign: "center",
                    }}
                  >
                    <Typography className="mana-icon-feu"
                      variant="h6"
                      position={"fixed"}
                      left={"49vw"}
                      top={"38vh"}
                      sx={{ color: "lightblue" }}
                      textSize="1rem"
                    >
                      <LocalFireDepartmentIcon /> <br />{" "}
                      {currentGauges.currentManaFeu} pts
                    </Typography>

                    <div
                      class="manaTest"
                      style={{ display: "felx", flexDirection: "row" }}
                    ></div>
                    <LinearProgress
                      color="error"
                      id="manaFeu"
                      variant="determinate"
                      value={clampedManaFeu}
                      sx={{
                        position: "fixed",
                        top: "25vh",
                        height: "1vh",
                        width: "10vw",
                        borderRadius: "25px ",
                        rotate: "-90deg",
                      }}
                    />
                    <div className="mana-btns-feu"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        position: "fixed",
                        left: "47vw",
                        top: "22vh",
                      }}
                    >
                      <BtnAdd
                        name={"mana de feu"}
                        mana={currentGauges.currentManaFeu}
                        manaName={"currentManaFeu"}
                        character={character}
                        onGaugeUpdate={handleGaugeUpdate}
                      />
                      <BtnRm
                        name={"mana de feu"}
                        mana={currentGauges.currentManaFeu}
                        manaName={"currentManaFeu"}
                        character={character}
                        onGaugeUpdate={handleGaugeUpdate}
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div className="mana-group mana-volonte"
                  style={{
                    position: "fixed",
                    display: "flex",
                    left: "53vw",
                    top: "10vh",
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "auto",
                    textAlign: "center",
                  }}
                >
                  <div
                    class="manaComplet"
                    style={{
                      position: "fixed",
                      display: "flex",
                      left: "50vw",
                      top: "15vh",
                      flexDirection: "row",
                      justifyContent: "center",
                      width: "auto",
                      textAlign: "center",
                    }}
                  >
                    <Typography className="mana-icon-volonte"
                      variant="h6"
                      position={"fixed"}
                      left={"54vw"}
                      top={"38vh"}
                      sx={{ color: "lightblue" }}
                      textSize="1rem"
                    >
                      <SelfImprovementIcon />
                      <br />
                      {currentGauges.currentManaVolonte} pts
                    </Typography>
                    <div
                      class="manaTest"
                      style={{ display: "felx", flexDirection: "row" }}
                    >
                      <LinearProgress
                        id="manaVolonte"
                        variant="determinate"
                        value={clampedManaVolonte}
                        sx={{
                          position: "fixed",
                          top: "25vh",
                          height: "1vh",
                          width: "10vw",
                          borderRadius: "25px ",
                          rotate: "-90deg",
                        }}
                      />
                      <div className="mana-btns-volonte"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          position: "fixed",
                          left: "54vw",
                          top: "22vh",
                        }}
                      >
                        <BtnAdd
                          name={"mana de volonté"}
                          mana={currentGauges.currentManaVolonte}
                          manaName={"currentManaVolonte"}
                          character={character}
                          onGaugeUpdate={handleGaugeUpdate}
                        />
                        <BtnRm
                          name={"mana de volonté"}
                          mana={currentGauges.currentManaVolonte}
                          manaName={"currentManaVolonte"}
                          character={character}
                          onGaugeUpdate={handleGaugeUpdate}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div width={"250px"}>
                <div
                  className="container"
                  style={{
                    position: "fixed",
                    bottom: "10vh",
                    left: "30vw",
                    width: "15vw",
                    height: "20vh",
                  }}
                >
                  <Typography
                    className="circular-label-vital label"
                    variant="h5"
                    position={"fixed"}
                    left={"36vw"}
                    top={"68vh"}
                    sx={{ color: "lightblue" }}
                    textAlign={"center"}
                    textSize="1rem"
                  >
                    Mana Vital
                  </Typography>

                  <CircularProgressbar
                    value={
                      (currentGauges.currentManaVital / maxGauges.ManaVital) * 100
                    }
                    circleRatio={0.5}
                    text={`${currentGauges.currentManaVital} points`}
                    styles={buildStyles({
                      rotation: 0.75,
                      strokeLinecap: "butt",
                      textSize: "1.3em",
                      pathTransitionDuration: 0.3,
                      pathColor: `red`,
                      textColor: "#f88",
                      trailColor: "#af8c8d",
                      backgroundColor: "#3e98c7",
                    })}
                  />
                  <div className="circular-btns-vital"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      position: "fixed",
                      left: "34.5vw",
                      bottom: "20vh",
                    }}
                  >
                    <BtnAdd
                      name={"mana Vital"}
                      mana={currentGauges.currentManaVital}
                      manaName={"currentManaVital"}
                      character={character}
                      onGaugeUpdate={handleGaugeUpdate}
                    />
                    <BtnRm
                      name={"mana Vital"}
                      mana={currentGauges.currentManaVital}
                      manaName={"currentManaVital"}
                      character={character}
                      onGaugeUpdate={handleGaugeUpdate}
                    />
                  </div>
                </div>

                <div
                  className="container"
                  style={{
                    position: "fixed",
                    bottom: "10vh",
                    left: "50vw",
                    width: "15vw",
                    height: "20vh",
                  }}
                >
                  <Typography
                    className="label circular-label-stamina"
                    variant="h5"
                    position={"fixed"}
                    left={" 56vw"}
                    top={"68vh"}
                    sx={{ color: "lightblue" }}
                    textAlign={"center"}
                    textSize="1rem"
                  >
                    {t("jdr.stamina")}
                  </Typography>

                  <CircularProgressbar
                    value={
                      (currentGauges.currentStamina / maxGauges.Stamina) * 100
                    }
                    circleRatio={0.5}
                    text={`${currentGauges.currentStamina} points`}
                    styles={buildStyles({
                      rotation: 0.75,
                      strokeLinecap: "butt",
                      textSize: "1.3em",
                      pathTransitionDuration: 0.3,
                      pathColor: `#42d750`,
                      textColor: "#f88",
                      trailColor: "#cfe9d2",
                      backgroundColor: "#3e98c7",
                    })}
                  />
                  <div className="circular-btns-stamina"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      position: "fixed",
                      left: "54.5vw",
                      bottom: "20vh",
                    }}
                  >
                    <BtnAdd
                      name={"Stamina"}
                      mana={currentGauges.currentStamina}
                      manaName={"currentStamina"}
                      character={character}
                      onGaugeUpdate={handleGaugeUpdate}
                    />
                    <BtnRm
                      name={"Stamina"}
                      mana={currentGauges.currentStamina}
                      manaName={"currentStamina"}
                      character={character}
                      onGaugeUpdate={handleGaugeUpdate}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                height: "3em",
                position: "fixed",
                left: "2vw",
                top: "12vh",
              }}
            >
              <h2 style={{ color: theme.custom.mycustomblur.text }}>
                {t("login.title")} {character.Name_character}
              </h2>
              <br />

            </div>
            {/* </div> */}

          </div>
        }
        {(!isMobile || showIdCard) && (
          <div className={showIdCard && isMobile ? "idcard-open" : ""}
            id="idCard"
            style={{
              position: "fixed",
              top: "17dvh",
              borderRadius: "5px",
              padding: "10px",
              width: "25dvw",
              fontWeight: "normal",
              backgroundColor: theme.custom.mycustomblur.main,
              backdropFilter: theme.custom.mycustomblur.blur,
              WebkitBackdropFilter: theme.custom.mycustomblur.blur,
              color: "lightblue",
              display: "flex",
              flexDirection: "column",
              textAlign: "start",
              justifyContent: "start",
              border: "solid gray 3px",
              maxHeight: isMobile ? "99dvh" : "75dvh",
              overflowY: "auto",
              textAlign: "justify",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <div id="idLeft" style={{ padding: "10px" }}>
                <p style={{ color: theme.custom.mycustomblur.text }}>
                  {t("jdr.name")}{" "}
                  <span id="name">{character.Name_character}</span>
                </p>
                <p style={{ color: theme.custom.mycustomblur.text }}>
                  {t("jdr.job")}{" "}
                  <span id="job">{character.Metier_character}</span>{" "}
                </p>
                <p style={{ color: theme.custom.mycustomblur.text }}>
                  {t("jdr.race")}{" "}
                  <span id="race">{character.Race_character}</span>{" "}
                </p>
                <p style={{ color: theme.custom.mycustomblur.text }}>
                  {t("jdr.planet")}{" "}
                  <span id="planet">{character.Planete_character}</span>{" "}
                </p>
                <p style={{ color: theme.custom.mycustomblur.text }}>
                  {t("jdr.lvl")}{" "}
                  <span id="lvl">{character.Niveau_character}</span>{" "}
                </p>
                <p style={{ color: theme.custom.mycustomblur.text }}>
                  {t("jdr.agency")}{" "}
                  <span id="agence">{character.Agence_character}</span>{" "}
                </p>
              </div>
              <div id="idRight" style={{ paddingRight: "10px" }}>
                <p style={{ color: theme.custom.mycustomblur.text }}>
                  {t("jdr.age")} <span id="age">{character.Age_character}</span>{" "}
                  ans
                </p>
                <p style={{ color: theme.custom.mycustomblur.text }}>
                  {t("jdr.height")}{" "}
                  <span id="height">{character.Taille_character}</span> cm
                </p>
                <p style={{ color: theme.custom.mycustomblur.text }}>
                  {t("jdr.weight")}{" "}
                  <span id="pounds">{character.Poids_character}</span> kg
                </p>
                <p style={{ color: theme.custom.mycustomblur.text }}>
                  {t("jdr.gender")}{" "}
                  <span id="sex">{character.Sexe_character}</span>{" "}
                </p>
                <p style={{ color: theme.custom.mycustomblur.text }}>
                  {t("jdr.rEye")}{" "}
                  <span id="rightEye">{character.OeilD_character}</span>
                </p>
                <p style={{ color: theme.custom.mycustomblur.text }}>
                  {t("jdr.lEye")}{" "}
                  <span id="leftEye">{character.OeilG_character}</span>
                </p>
                <p style={{ color: theme.custom.mycustomblur.text }}>
                  {t("jdr.hair")}
                  <span id="hair">{character.Cheveux_character}</span>
                </p>
              </div>

              <div id="idAvatar">
                <Box
                  sx={{
                    position: "relative",
                    width: 80,   // adapte (ou mets width: 80 / height: 80 pour un carré)
                    height: 80,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                    display: "inline-block",
                  }}
                >
                  {/* Image */}
                  {avatar?.url ? (
                    <Box
                      component="img"
                      src={avatar.url}
                      alt="avatar"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ) : (
                    // fallback si pas d'avatar
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        bgcolor: "action.hover",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <PersonIcon
                        sx={{
                          fontSize: 40,
                          color: "text.secondary",
                          opacity: 0.6,
                        }}
                      />
                    </Box>

                  )}

                  {/* Bouton "éditer" overlay */}
                  <Tooltip title="Modifier l’avatar">
                    <IconButton
                      component="label"
                      size="small"
                      sx={{
                        position: "absolute",
                        right: 6,
                        bottom: 6,
                        bgcolor: (theme) => alpha(theme.palette.background.paper, 0.6),
                        backdropFilter: "blur(6px)",
                        border: "1px solid",
                        borderColor: "divider",
                        "&:hover": {
                          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.85),
                        },
                      }}
                    >
                      <EditIcon fontSize="small" />

                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file || !character?.ID_character) return;

                          try {
                            const ID_media = await uploadImage(file, "avatar");
                            const r = await attachMediaToCharacter(
                              character.ID_character,
                              ID_media,
                              "avatar"
                            );
                            await refresh();
                          } catch (err) {
                            console.error("AVATAR ERROR:", err);
                            alert(String(err?.message || err));
                          } finally {
                            e.target.value = "";
                          }
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
              </div>
            </div>

            <CharacterProvider
              character={character}
              setCharacter={setCharacter}
            >
              <div id="idBottom" style={{ padding: "10px", }}>
                <div id="bottomText"
                  style={{
                    overflowY: "auto",
                    overflowX: "hidden",
                    maxHeight: isMobile ? "55dvh" : "40dvh",
                    paddingRight: "4px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}>
                  <p style={{ color: theme.custom.mycustomblur.text }}>
                    {t("jdr.trait")}{" "}
                    <span id="particularity">{character.Signes_character}</span>
                    <span>
                      <ModifierIdDialogs
                        character={character}
                        name={"signes"}
                        left={"90%"}
                        dataToUpdate={"signe"}
                      />
                    </span>
                  </p>
                  <br />
                  <p style={{ color: theme.custom.mycustomblur.text }}>
                    {t("jdr.background")}{" "}
                    <span id="caracter">{character.Traits_character}</span>
                    <span>
                      <ModifierIdDialogs
                        character={character}
                        name={"bg"}
                        left={"90%"}
                        dataToUpdate={"bg"}
                      />
                    </span>
                  </p>
                </div>
                {!isMobile && (<div>
                  <Btn
                    msg={<DiceD20Icon />}
                    onClick={() => setRollDice(!rollDice)}
                  />
                  {rollDice &&
                    <DiceChoice />
                  }
                </div>)}
              </div>
            </CharacterProvider>
          </div>
        )}
        {showIdCard && isMobile && (
          <Btn
            msg="✕"
            onClick={() => setShowIdCard(false)}
            style={{
              position: "fixed",
              top: "1dvh",
              right: "2dvw",
              zIndex: 1600,
              width: "40px",
              flex: "none",
            }}
          />
        )}
        {isMobile && !isAnyDrawerOpen && !showIdCard && (<div style={{
          position: "fixed",
          top: "20dvh",
          left: "1dvw",
          zIndex: 1500,
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          width: "50px",
        }}>
          <Btn width="50px"
            msg={<PersonIcon />}
            onClick={() => { if (isMobile) setShowIdCard(!showIdCard); }}
          />
          <Btn width="50px" msg={<DiceD20Icon />} onClick={() => setRollDice(!rollDice)} />
        </div>)}

        {isMobile && (
          <div style={{
            position: "fixed",
            top: "12dvh",
            left: "18dvw",
            height: "70dvh",
            overflowY: "auto",
            padding: "0.5rem",
            display: "flex",
            paddingBottom: "5rem",
            flexDirection: "column",
            gap: "4rem",
          }}>
            {/* Ligne 1 : Air, Eau, Terre */}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {[
                { label: "Air", icon: <AirIcon />, value: currentGauges.currentManaAir, clamped: clampedManaAir, color: "success", name: "currentManaAir" },
                { label: "Eau", icon: <WaterDropIcon />, value: currentGauges.currentManaEau, clamped: clampedManaEau, color: "info", name: "currentManaEau" },
                { label: "Terre", icon: <GrassIcon />, value: currentGauges.currentManaTerre, clamped: clampedManaTerre, color: "warning", name: "currentManaTerre" },
              ].map(({ label, icon, value, clamped, color, name }) => (
                <div key={label}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, width: "30%" }}>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 1, width: "30px" }}>
                      <BtnAdd name={label} mana={value} manaName={name} character={character} onGaugeUpdate={handleGaugeUpdate} />
                      <BtnRm name={label} mana={value} manaName={name} character={character} onGaugeUpdate={handleGaugeUpdate} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 15, width: "50px" }}>
                      <LinearProgress variant="determinate" value={clamped} color={color}
                        sx={{ alignSelf: "center", width: "8px", height: "35dvw", borderRadius: "25px", rotate: "180deg", "& .MuiLinearProgress-bar": { transformOrigin: "bottom" } }} />
                      <Typography sx={{
                        whiteSpace: "nowrap", color: "lightblue", fontSize: "0.8rem", textAlign: "center", width: "100%", fontSize: "1.2rem"
                      }}>{icon} <br />{`${value} pts`}</Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ligne 2 : Feu, Volonté */}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {[
                { label: "Feu", icon: <LocalFireDepartmentIcon />, value: currentGauges.currentManaFeu, clamped: clampedManaFeu, color: "error", name: "currentManaFeu" },
                { label: "Volonté", icon: <SelfImprovementIcon />, value: currentGauges.currentManaVolonte, clamped: clampedManaVolonte, color: "primary", name: "currentManaVolonte" },
              ].map(({ label, icon, value, clamped, color, name }) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, width: "30%" }}>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 1, width: "30px" }}>
                      <BtnAdd name={label} mana={value} manaName={name} character={character} onGaugeUpdate={handleGaugeUpdate} />
                      <BtnRm name={label} mana={value} manaName={name} character={character} onGaugeUpdate={handleGaugeUpdate} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 15, width: "50px" }}>
                      <LinearProgress variant="determinate" value={clamped} color={color}
                        sx={{ alignSelf: "center", width: "8px", height: "35dvw", borderRadius: "25px", rotate: "180deg" }} />
                      <Typography sx={{
                        whiteSpace: "nowrap", color: "lightblue", fontSize: "0.8rem", textAlign: "center", width: "100%", fontSize: "1.2rem"
                      }}>{icon} <br />{`${value} pts`}</Typography>
                    </div>
                  </div>

                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "45dvw" }} >
              {/* Mana Vital */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <Typography sx={{ color: "lightblue", fontSize: "1.8rem" }}>Mana Vital</Typography>
                <div style={{ width: "60dvw" }}>
                  <CircularProgressbar value={(currentGauges.currentManaVital / maxGauges.ManaVital) * 100}
                    circleRatio={0.5} text={`${currentGauges.currentManaVital} pts`}
                    styles={buildStyles({ rotation: 0.75, strokeLinecap: "butt", textSize: "1em", pathColor: "red", textColor: "#f88", trailColor: "#af8c8d" })} />
                </div>
                <div style={{ marginTop: "-47vw", display: "flex", gap: 8 }}>
                  <BtnAdd name="mana Vital" mana={currentGauges.currentManaVital} manaName="currentManaVital" character={character} onGaugeUpdate={handleGaugeUpdate} />
                  <BtnRm name="mana Vital" mana={currentGauges.currentManaVital} manaName="currentManaVital" character={character} onGaugeUpdate={handleGaugeUpdate} />
                </div>
              </div>

              {/* Stamina */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <Typography sx={{ color: "lightblue", fontSize: "1.8rem" }}>{t("jdr.stamina")}</Typography>
                <div style={{ width: "60dvw" }}>
                  <CircularProgressbar value={(currentGauges.currentStamina / maxGauges.Stamina) * 100}
                    circleRatio={0.5} text={`${currentGauges.currentStamina} pts`}
                    styles={buildStyles({ rotation: 0.75, strokeLinecap: "butt", textSize: "1em", pathColor: "#42d750", textColor: "#f88", trailColor: "#cfe9d2" })} />
                </div>
                <div style={{ marginTop: "-47vw", display: "flex", gap: 8 }}>
                  <BtnAdd name="Stamina" mana={currentGauges.currentStamina} manaName="currentStamina" character={character} onGaugeUpdate={handleGaugeUpdate} />
                  <BtnRm name="Stamina" mana={currentGauges.currentStamina} manaName="currentStamina" character={character} onGaugeUpdate={handleGaugeUpdate} />
                </div>
              </div>
            </div>
          </div>
        )
        }
        {
          rollDice && isMobile && (
            <div className="dice-overlay" style={{ height: "95dvh", paddingBottom: "3rem" }} >
              <Btn msg="✕" onClick={() => setRollDice(false)} sx={{
                position: "fixed",
                top: "1dvh",
                right: "2dvw",
                zIndex: 2100,
                width: "40px",
                height: "fit-content",
              }} />
              <DiceChoice />
            </div>
          )
        }

        <CharacterProvider character={character} setCharacter={setCharacter}>
          <SideMenu character={character} onDrawerChange={setIsAnyDrawerOpen} />
          <Inventory data={character} onDrawerChange={setIsAnyDrawerOpen} />
          <Combat data={character} onDrawerChange={setIsAnyDrawerOpen} />
          <Crystals data={character} onDrawerChange={setIsAnyDrawerOpen} />
          <Ingredients data={character} onDrawerChange={setIsAnyDrawerOpen} />
          <Creatures data={character} onDrawerChange={setIsAnyDrawerOpen} />
          <CustomizedDialogs data={character} onDrawerChange={setIsAnyDrawerOpen} />
        </CharacterProvider>
      </div>


    </div >
  );
}

export default ConnectGame;
