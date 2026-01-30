import { useState, useContext, useEffect } from "react";
import BG from "../components/Background";
import Top from "../components/Header";
import { ConnexionContext } from "../components/provider";
import SideMenu from "../components/SideMenu";
import Loader from "../components/Loader";
import { LinearProgress, Typography } from "@mui/material";
import BtnAdd from "../components/BtnAdd";
import BtnRm from "../components/BtnRm";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CustomizedDialogs from "../components/Grimoire";
import Inventory from "../components/Inventory";
import Combat from "../components/Combat";
import Ingredients from "../components/Ingredients";
import Crystals from "../components/Crystals";
import Creatures from "../components/Creatures";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import GrassIcon from "@mui/icons-material/Grass";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

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
    (currentGauges.currentVolonte / maxGauges.ManaVolonte) * 100;
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

  const [comps, setComps] = useState({});

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

  function handleCompUpdate(name, newValue) {
    const field = compFieldByName[name];
    if (!field) {
      console.warn("Comp inconnue :", name);
      return;
    }
    setComps((prev) => ({ ...prev, [field]: newValue }));
  }

  console.log("character datas : ", character);

  const isInvalidUser =
    !currentUser ||
    (Array.isArray(currentUser) && currentUser.length === 0) ||
    (typeof currentUser === "object" && Object.keys(currentUser).length === 0);

  if (!loading && isInvalidUser) {
    navigate("/", { replace: true });
    return null;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="main">
      <BG />
      <Top started={currentUser} />
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
              <div
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
                  <Typography
                    variant="h6"
                    position={"fixed"}
                    top={"45vh"}
                    left={"35vw"}
                    sx={{ color: theme.custom.mycustomblur.text }}
                  >
                    <AirIcon />
                    <br />
                    {currentGauges.currentManaAir} pts
                  </Typography>
                  <LinearProgress
                    color="success"
                    id="manaAir"
                    variant="determinate"
                    value={clampedManaAir}
                    sx={{
                      position: "fixed",
                      top: "25vh",
                      height: "18px",
                      width: "200px",
                      borderRadius: "25px",
                      rotate: "-90deg",
                    }}
                  />
                  <div
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
              <br />
              <div
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
                  <Typography
                    variant="h6"
                    position={"fixed"}
                    top={"45vh"}
                    left={"40vw"}
                    sx={{ color: theme.custom.mycustomblur.text }}
                  >
                    {" "}
                    <WaterDropIcon />
                    <br />
                    {currentGauges.currentManaEau} pts
                  </Typography>
                  <LinearProgress
                    color="info"
                    id="manaEau"
                    variant="determinate"
                    value={clampedManaEau}
                    sx={{
                      position: "fixed",
                      top: "25vh",
                      height: "18px",
                      width: "200px",
                      borderRadius: "25px ",
                      rotate: "-90deg",
                    }}
                  />
                  <div
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
              <br />
              <div
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
                  <Typography
                    variant="h6"
                    position={"fixed"}
                    left={"45vw"}
                    top={"45vh"}
                    sx={{ color: theme.custom.mycustomblur.text }}
                  >
                    <GrassIcon />
                    <br />
                    {currentGauges.currentManaTerre} pts
                  </Typography>
                  <LinearProgress
                    color="warning"
                    id="manaTerre"
                    variant="determinate"
                    value={clampedManaTerre}
                    sx={{
                      position: "fixed",
                      top: "25vh",
                      height: "18px",
                      width: "200px",
                      borderRadius: "25px ",
                      rotate: "-90deg",
                    }}
                  />
                  <div
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
              <br />
              <div
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
                  <Typography
                    variant="h6"
                    position={"fixed"}
                    left={"50vw"}
                    top={"45vh"}
                    sx={{ color: theme.custom.mycustomblur.text }}
                  >
                    <LocalFireDepartmentIcon /> <br />{" "}
                    {currentGauges.currentManaFeu} pts
                  </Typography>
                  <LinearProgress
                    color="error"
                    id="manaFeu"
                    variant="determinate"
                    value={clampedManaFeu}
                    sx={{
                      position: "fixed",
                      top: "25vh",
                      height: "18px",
                      width: "200px",
                      borderRadius: "25px ",
                      rotate: "-90deg",
                    }}
                  />
                  <div
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
              <div
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
                  style={{
                    position: "fixed",
                    display: "flex",
                    left: "50vw",
                    top: "15vh",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "auto",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    position={"fixed"}
                    // postion={"relative"}
                    left={"55vw"}
                    top={"45vh"}
                    sx={{ color: theme.custom.mycustomblur.text }}
                  >
                    <SelfImprovementIcon />
                    <br />
                    {currentGauges.currentManaVolonte} pts
                  </Typography>
                  <LinearProgress
                    id="manaVolonte"
                    variant="determinate"
                    value={clampedManaVolonte}
                    sx={{
                      position: "fixed",
                      top: "25vh",
                      height: "18px",
                      width: "200px",
                      borderRadius: "25px ",
                      rotate: "-90deg",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      position: "fixed",
                      left: "52vw",
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
              <div width={"250px"}>
                <div
                  className="container"
                  style={{
                    position: "fixed",
                    bottom: "-12vh",
                    left: "30vw",
                    width: "200px",
                    height: "300px",
                  }}
                >
                  <Typography
                    className="label"
                    variant="h5"
                    position={"fixed"}
                    left={"4vw"}
                    top={"58vh"}
                    sx={{ color: theme.custom.mycustomblur.text }}
                    textAlign={"center"}
                  >
                    Mana Vital
                  </Typography>

                  <CircularProgressbar
                    value={
                      (currentGauges.currentManaVital / maxGauges.ManaVital) *
                      100
                    }
                    circleRatio={0.5}
                    text={`${currentGauges.currentManaVital} points`}
                    styles={buildStyles({
                      rotation: 0.75,
                      strokeLinecap: "butt",
                      textSize: "14px",
                      pathTransitionDuration: 0.5,
                      pathColor: `red`,
                      textColor: "#f88",
                      trailColor: "#af8c8d",
                      backgroundColor: "#3e98c7",
                    })}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      position: "fixed",
                      left: "32vw",
                      bottom: "1vh",
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
                  style={{
                    position: "fixed",
                    display: "flex",
                    left: "33vw",
                    bottom: "5vh",
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "auto",
                    textAlign: "center",
                  }}
                >
                  <div
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
                    <div
                      id="tram"
                      style={{
                        position: "fixed",
                        left: "30vw",
                        bottom: "10vh",
                        height: "18px",
                        width: "200px",
                        background: "none",
                        border: "solid white 2px",
                        borderRadius: "5px ",
                      }}
                    >
                      <div
                        id="survie-"
                        style={{
                          position: "relative",
                          height: "18px",
                          background: "linear-gradient(to left, grey, black",
                          borderLeft: "solid white 1px",
                        }}
                      />
                      <div
                        id="survie+"
                        style={{
                          position: "relative",
                          left: "100px",
                          top: "-100%",
                          height: "18px",
                          width: "83px",
                          background: "linear-gradient(to right, grey, white",
                          borderRight: "solid black 1px",
                        }}
                      />
                    </div>
                  </div>
                  <Typography
                    className="label"
                    sx={{ color: theme.custom.mycustomblur.text }}
                    id="manaVolonte"
                  >
                    {t("jdr.transition")}
                  </Typography>
                </div>
                <div
                  className="container"
                  style={{
                    position: "fixed",
                    bottom: "-12vh",
                    left: "50vw",
                    width: "200px",
                    height: "300px",
                  }}
                >
                  <Typography
                    className="label"
                    variant="h5"
                    position={"fixed"}
                    left={" 18vw"}
                    top={"42vh"}
                    sx={{ color: theme.custom.mycustomblur.text }}
                    textAlign={"center"}
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
                      textSize: "14px",
                      pathTransitionDuration: 0.5,
                      pathColor: `#42d750`,
                      textColor: "#f88",
                      trailColor: "#cfe9d2",
                      backgroundColor: "#3e98c7",
                    })}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      position: "fixed",
                      left: "52.5vw",
                      bottom: "1vh",
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
                <div style={{ position: "fixed", bottom: "5vh", left: "53vw" }}>
                  <p
                    contentEditable="true"
                    style={{
                      color: theme.custom.mycustomblur.text,
                      fontSize: "1.3em",
                      border: "solid whitesmoke 1px",
                      borderRadius: "5px",
                      paddingLeft: "1vw",
                      paddingRight: "1vw",
                    }}
                  >
                    {t("jdr.bm")}
                    <br />
                    ...................
                    <br />
                  </p>
                  <Typography
                    sx={{ color: theme.custom.mycustomblur.text }}
                    id="chance"
                  >
                    {t("jdr.luck")}
                  </Typography>
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
          </div>

          <div
            id="idCard"
            style={{
              position: "fixed",
              top: "17vh",
              borderRadius: "5px",
              padding: "10px",
              width: "25vw",
              fontWeight: "normal",
              backgroundColor: theme.custom.mycustomblur.main,
              backdropFilter: theme.custom.mycustomblur.blur,
              color: "lightblue",
              display: "flex",
              flexDirection: "column",
              textAlign: "start",
              justifyContent: "start",
              border: "solid gray 3px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
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
            </div>
            <div id="idBottom" style={{ padding: "10px" }}>
              <p style={{ color: theme.custom.mycustomblur.text }}>
                {t("jdr.trait")}{" "}
                <span id="particularity">{character.Signes_character}</span>
              </p>
              <br />
              <p style={{ color: theme.custom.mycustomblur.text }}>
                {t("jdr.background")}{" "}
                <span id="caracter">{character.Traits_character}</span>
              </p>
            </div>
          </div>
        </div>
        <SideMenu character={character} />
        <Inventory data={character} />
        <Combat data={character} />
        <Crystals data={character} />
        <Ingredients data={character} />
        <Creatures data={character} />
        <CustomizedDialogs data={character} />
      </div>
      {/* <Btn style={{ position: "fixed", bottom: "-5vh", left: "50vw", display: "flex", flexDirection: "row", textAlign: "center", justifyContent: "center" }} onClick={navigate(-1)} msg="Close Holocom" sx={{ color: 'white', position: "absolute", fontSize: '20px', bottom: "5vh" }} /> */}
    </div>
  );
}

export default ConnectGame;
