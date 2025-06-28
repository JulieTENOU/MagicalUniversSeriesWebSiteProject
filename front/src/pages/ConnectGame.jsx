import React, { useState, useContext, useEffect } from "react";
import BG from "../components/Background";
import Top from "../components/Header";
import { ConnexionContext } from "../components/provider";
import SideMenu from "../components/SideMenu";
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

function ConnectGame() {
  const [currentUser, setCurrentUser] = useContext(ConnexionContext);
  console.log(currentUser.login.users_ID);

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

  const [maxManaAir, setMaxManaAir] = useState(character.ManaAir_character);
  const [currentManaAir, setCurrentManaAir] = useState(
    character.ManaAir_character
  );
  const [maxManaEau, setMaxManaEau] = useState(character.ManaEau_character);
  const [currentManaEau, setCurrentManaEau] = useState(
    character.ManaEau_character
  );
  const [maxManaTerre, setMaxManaTerre] = useState(
    character.ManaTerre_character
  );
  const [currentManaTerre, setCurrentManaTerre] = useState(
    character.ManaTerre_character
  );
  const [maxManaFeu, setMaxManaFeu] = useState(character.ManaFeu_character);
  const [currentManaFeu, setCurrentManaFeu] = useState(
    character.ManaFeu_character
  );
  const [maxManaVolonte, setMaxManaVolonte] = useState(
    character.ManaVolonte_character
  );
  const [currentManaVolonte, setCurrentManaVolonte] = useState(
    character.ManaVolonte_character
  );
  const [maxManaVital, setMaxManaVital] = useState(
    character.ManaVital_character
  );
  const [currentManaVital, setCurrentManaVital] = useState(
    character.ManaVital_character
  );
  const [maxStamina, setMaxStamina] = useState(character.Stamina_character);
  const [currentStamina, setCurrentStamina] = useState(
    character.Stamina_character
  );

  useEffect(() => {
    fetch(`/characters/api/getOneCharacter/${currentUser.login.users_ID}`)
      .then((res) => res.json())
      .then((data) => {
        const chara = data.data;
        if (chara && chara.ID_character) {
          console.log("Personnage trouvé :", chara);
          setCharacter(chara);
          setMaxManaAir(chara.ManaAir_character);
          setMaxManaEau(chara.ManaEau_character);
          setMaxManaTerre(chara.ManaTerre_character);
          setMaxManaFeu(chara.ManaFeu_character);
          setMaxManaVolonte(chara.ManaVolonte_character);
          setMaxManaVital(chara.ManaVital_character);
          setMaxStamina(chara.Stamina_character);
        } else {
          console.warn("Aucun personnage trouvé, affichage du Visiteur.");
        }
      })
      .catch((err) => {
        console.error(
          "Erreur récupération personnage, fallback Visiteur :",
          err
        );
      });
  }, [currentUser.login.users_ID]);

  useEffect(() => {
    if (!character || character.ID_character === 0) {
      // Reste sur les valeurs par défaut du Visiteur
      setCurrentManaAir(character.ManaAir_character);
      setCurrentManaEau(character.ManaEau_character);
      setCurrentManaTerre(character.ManaTerre_character);
      setCurrentManaFeu(character.ManaFeu_character);
      setCurrentManaVolonte(character.ManaVolonte_character);
      setCurrentManaVital(character.ManaVital_character);
      setCurrentStamina(character.Stamina_character);
      return;
    }

    fetch(`/gauges/api/getOneGauges/${character.ID_character}`) // permet d'aller chercher un URL spécifique
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        const gauges = data.data;
        setCurrentManaAir(gauges.currentManaAir);
        console.log(currentManaAir);
        setCurrentManaEau(gauges.currentManaEau);
        console.log(currentManaEau);
        setCurrentManaTerre(gauges.currentManaTerre);
        console.log(currentManaTerre);
        setCurrentManaFeu(gauges.currentManaFeu);
        console.log(currentManaFeu);
        setCurrentManaVolonte(gauges.currentManaVolonte);
        console.log(currentManaVolonte);
        setCurrentManaVital(gauges.currentManaVital);
        console.log(currentManaVital);
        setCurrentStamina(gauges.currentStamina);
        console.log(currentStamina);
      })
      .catch((err) => {
        console.log(
          "Erreur récupération jauges, fallback sur valeurs max :",
          err
        );
        setCurrentManaAir(character.ManaAir_character);
        setCurrentManaEau(character.ManaEaucharacter);
        setCurrentManaTerre(character.ManaTerre_character);
        setCurrentManaFeu(character.ManaFeu_character);
        setCurrentManaVolonte(character.ManaVolonte_character);
        setCurrentManaVital(character.ManaVital_character);
        setCurrentStamina(character.Stamina_character);
      });
  }, [character]);

  function handleGaugeUpdate(manaName, newValue) {
    switch (manaName) {
      case "currentManaAir":
        setCurrentManaAir(newValue);
        break;
      case "currentManaEau":
        setCurrentManaEau(newValue);
        break;
      case "currentManaTerre":
        setCurrentManaTerre(newValue);
        break;
      case "currentManaFeu":
        setCurrentManaFeu(newValue);
        break;
      case "currentManaVolonte":
        setCurrentManaVolonte(newValue);
        break;
      case "currentManaVital":
        setCurrentManaVital(newValue);
        break;
      case "currentStamina":
        setCurrentStamina(newValue);
        break;
      default:
        console.warn("Mana inconnue : ", manaName);
    }
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
                    top={"37vh"}
                    left={"33vw"}
                    color={"white"}
                  >
                    {currentManaAir} pts
                  </Typography>
                  <LinearProgress
                    color="success"
                    id="manaAir"
                    variant="determinate"
                    value={(currentManaAir / maxManaAir) * 100}
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
                    }}
                  >
                    <BtnAdd
                      name={"mana d'air"}
                      mana={currentManaAir}
                      manaName={"currentManaAir"}
                      character={character}
                    />
                    <BtnRm
                      name={"mana d'air"}
                      mana={currentManaAir}
                      manaName={"currentManaAir"}
                      character={character}
                    />
                  </div>
                </div>
                <label
                  className="label"
                  style={{ color: "white" }}
                  htmlFor="manaAir"
                >
                  Air
                </label>
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
                    top={"37vh"}
                    left={"38vw"}
                    color={"white"}
                  >
                    {currentManaEau} pts
                  </Typography>
                  <LinearProgress
                    color="info"
                    id="manaEau"
                    variant="determinate"
                    value={(currentManaEau / maxManaEau) * 100}
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
                    }}
                  >
                    <BtnAdd
                      name={"mana d'eau"}
                      mana={currentManaEau}
                      manaName={"currentManaEau"}
                      character={character}
                      onGaugeUpdate={handleGaugeUpdate}
                    />
                    <BtnRm
                      name={"mana d'eau"}
                      mana={currentManaEau}
                      manaName={"currentManaEau"}
                      character={character}
                      onGaugeUpdate={handleGaugeUpdate}
                    />
                  </div>
                </div>
                <label
                  className="label"
                  style={{ color: "white" }}
                  htmlFor="manaEau"
                >
                  Eau
                </label>
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
                    left={"43vw"}
                    top={"37vh"}
                    color={"white"}
                  >
                    {currentManaTerre} pts
                  </Typography>
                  <LinearProgress
                    color="warning"
                    id="manaTerre"
                    variant="determinate"
                    value={(currentManaTerre / maxManaTerre) * 100}
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
                      mana={currentManaTerre}
                      manaName={"currentManaTerre"}
                      character={character}
                      onGaugeUpdate={handleGaugeUpdate}
                    />
                    <BtnRm
                      name={"mana de terre"}
                      mana={currentManaTerre}
                      manaName={"currentManaTerre"}
                      character={character}
                      onGaugeUpdate={handleGaugeUpdate}
                    />
                  </div>
                </div>
                <label
                  className="label"
                  style={{ color: "white" }}
                  htmlFor="manaTerre"
                >
                  Terre
                </label>
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
                    left={"48vw"}
                    top={"37vh"}
                    color={"white"}
                  >
                    {currentManaFeu} pts
                  </Typography>
                  <LinearProgress
                    color="error"
                    id="manaFeu"
                    variant="determinate"
                    value={(currentManaFeu / maxManaFeu) * 100}
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
                      mana={currentManaFeu}
                      manaName={"currentManaFeu"}
                      character={character}
                      onGaugeUpdate={handleGaugeUpdate}
                    />
                    <BtnRm
                      name={"mana de feu"}
                      mana={currentManaFeu}
                      manaName={"currentManaFeu"}
                      character={character}
                      onGaugeUpdate={handleGaugeUpdate}
                    />
                  </div>
                </div>
                <label
                  className="label"
                  style={{ color: "white" }}
                  htmlFor="manaFeu"
                >
                  Feu
                </label>
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
                    left={"53vw"}
                    top={"37vh"}
                    color={"white"}
                  >
                    {currentManaVolonte} pts
                  </Typography>
                  <LinearProgress
                    id="manaVolonte"
                    variant="determinate"
                    value={(currentManaVolonte / maxManaVolonte) * 100}
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
                      mana={currentManaVolonte}
                      manaName={"currentManaVolonte"}
                      character={character}
                      onGaugeUpdate={handleGaugeUpdate}
                    />
                    <BtnRm
                      name={"mana de volonté"}
                      mana={currentManaVolonte}
                      manaName={"currentManaVolonte"}
                      character={character}
                      onGaugeUpdate={handleGaugeUpdate}
                    />
                  </div>
                </div>
                <label
                  className="label"
                  style={{ color: "white" }}
                  htmlFor="manaVolonte"
                >
                  Volonté
                </label>
              </div>
              <div width={"250px"}>
                <div
                  className="container"
                  style={{
                    position: "fixed",
                    top: "46vh",
                    left: "1vw",
                    width: "200px",
                    height: "300px",
                  }}
                >
                  <Typography
                    className="label"
                    variant="h5"
                    position={"fixed"}
                    left={"4vw"}
                    top={"42vh"}
                    color={"white"}
                    textAlign={"center"}
                  >
                    Mana Vital
                  </Typography>

                  <CircularProgressbar
                    value={(currentManaVital / maxManaVital) * 100}
                    circleRatio={0.5}
                    text={`${currentManaVital} points`}
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
                      left: "3vw",
                      top: "50vh",
                    }}
                  >
                    <BtnAdd
                      name={"mana Vital"}
                      mana={currentManaVital}
                      manaName={"currentManaVital"}
                      character={character}
                      onGaugeUpdate={handleGaugeUpdate}
                    />
                    <BtnRm
                      name={"mana Vital"}
                      mana={currentManaVital}
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
                    left: "2vw",
                    top: "65vh",
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
                      left: "5vw",
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
                        left: "1vw",
                        top: "60vh",
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
                      />{" "}
                      {/*left=200px-width */}
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
                    style={{ color: "white" }}
                    id="manaVolonte"
                  >
                    Etat transitionnel
                  </Typography>
                </div>
                <div
                  className="container"
                  style={{
                    position: "fixed",
                    top: "46vh",
                    left: " 15vw",
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
                    color={"white"}
                    textAlign={"center"}
                  >
                    Stamina
                  </Typography>

                  <CircularProgressbar
                    value={(currentStamina / maxStamina) * 100}
                    circleRatio={0.5}
                    text={`${currentStamina} points`}
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
                      left: "17vw",
                      top: "50vh",
                    }}
                  >
                    <BtnAdd
                      name={"Stamina"}
                      mana={currentStamina}
                      manaName={"currentStamina"}
                      character={character}
                      onGaugeUpdate={handleGaugeUpdate}
                    />
                    <BtnRm
                      name={"Stamina"}
                      mana={currentStamina}
                      manaName={"currentStamina"}
                      character={character}
                      onGaugeUpdate={handleGaugeUpdate}
                    />
                  </div>
                </div>
                <div style={{ position: "fixed", top: "60vh", left: "16vw" }}>
                  <p
                    contentEditable="true"
                    style={{
                      color: " #1abc9c ",
                      fontSize: "1.3em",
                      border: "solid whitesmoke 1px",
                      borderRadius: "5px",
                      paddingLeft: "1vw",
                      paddingRight: "1vw",
                    }}
                  >
                    Bonus/Malus
                    <br />
                    ...................
                    <br />
                  </p>
                  <Typography style={{ color: "white" }} id="chance">
                    Chance
                  </Typography>
                </div>
              </div>
            </div>
            <div style={{ height: "3em" }}>
              <h2 style={{ color: "whitesmoke" }}>
                Welcom back {character.Name_character}
              </h2>
              <br />
            </div>
          </div>

          <div
            id="idCard"
            style={{
              position: "fixed",
              borderRadius: "5px",
              padding: "10px",
              width: "25vw",
              fontWeight: "normal",
              backdropFilter: "blur(10px)",
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
                <p>
                  Nom : <span id="name">{character.Name_character}</span>
                </p>
                <p>
                  Métier : <span id="job">{character.Metier_character}</span>{" "}
                </p>
                <p>
                  Race : <span id="race">{character.Race_character}</span>{" "}
                </p>
                <p>
                  Planète :{" "}
                  <span id="planet">{character.Planete_character}</span>{" "}
                </p>
                <p>
                  Niveau : <span id="lvl">{character.Niveau_character}</span>{" "}
                </p>
                <p>
                  Agence : <span id="agence">{character.Agence_character}</span>{" "}
                </p>
              </div>
              <div id="idRight" style={{ paddingRight: "10px" }}>
                <p>
                  Age : <span id="age">{character.Age_character}</span> ans
                </p>
                <p>
                  Taille : <span id="height">{character.Taille_character}</span>{" "}
                  cm
                </p>
                <p>
                  Poids : <span id="pounds">{character.Poids_character}</span>{" "}
                  kg
                </p>
                <p>
                  Sexe : <span id="sex">{character.Sexe_character}</span>{" "}
                </p>
                <p>
                  Oeil droit :{" "}
                  <span id="rightEye">{character.OeilD_character}</span>
                </p>
                <p>
                  Oeil gauche :{" "}
                  <span id="leftEye">{character.OeilG_character}</span>
                </p>
                <p>
                  Cheveux : <span id="hair">{character.Cheveux_character}</span>
                </p>
              </div>
            </div>
            <div id="idBottom" style={{ padding: "10px" }}>
              <p>
                Signes distinctif :{" "}
                <span id="particularity">{character.Signes_character}</span>
              </p>
              <br />
              <p>
                Traits de caractère :{" "}
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
