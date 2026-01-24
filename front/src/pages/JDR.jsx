import { useState, useContext } from "react";
import "../index.css";
import "../general.css";
import Btn from "../components/Btn";
import Top from "../components/Header";
import BG from "../components/Background";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context";
import { Typography } from "@mui/material";
import { ConnexionContext } from "../components/provider.jsx";
import { useTheme } from "@mui/material/styles";
import BtnRtn from "../components/BtnRtn.jsx";

function JDR() {
  let navigate = useNavigate();
  const {
    state: isConnected,
    setState: setIsConnected,
    loading,
  } = useContext(ConnexionContext);
  const { stats, setCurrentCharacter } = useAppContext();

  const theme = useTheme();

  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const toggleCharacter = (character) => {
    setSelectedCharacters((prev) =>
      prev.some((c) => c.ID_character === character.ID_character)
        ? prev.filter((c) => c.ID_character !== character.ID_character)
        : [...prev, character]
    );
  };

  console.log("characters list : ", stats);
  console.log("isConnected :", isConnected);
  return (
    <div className="main">
      <BG />
      <Top started={isConnected} />
      <div
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            color: theme.custom.mycustomblur.text,
            mb: 4,
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {isConnected.users_status === "a" &&
            "Choose the characters for this game"}
          {isConnected.users_status === "p" &&
            "Choose your character for this game"}
        </Typography>
        <Btn
          onClick={() => navigate("/jdr/create_character")}
          msg="Créer un personnage"
          sx={{
            color: theme.custom.mymodal.text,
            backgroundColor: theme.custom.mymodal.button,
            marginBottom: 4,
            fontWeight: "bold",
          }}
        />
        {stats.map((stat) => {
          const player = `${stat?.Name_character}`;
          if (
            isConnected.users_status === "p" &&
            stat.users_ID === isConnected.users_ID
          ) {
            return (
              <Btn
                key={stat.ID_character}
                onClick={() => {
                  setCurrentCharacter(stat);
                  navigate(`/jdr/connectGame/${stat.ID_character}`);
                }}
                msg={`${player}`}
                sx={{
                  color: theme.custom.mymodal.text,
                  backgroundColor: theme.custom.mymodal.button,
                  marginBottom: 2,
                  fontWeight: "bold",
                }}
              />
            );
          } else if (isConnected.users_status === "a") {
            const isSelected = selectedCharacters.some(
              (c) => c.ID_character === stat.ID_character
            );
            return (
              <div
                key={stat.ID_character}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleCharacter(stat)}
                  style={{ marginRight: 8 }}
                />
                <Btn
                  msg={player}
                  sx={{
                    color: theme.custom.mymodal.text,
                    backgroundColor: isSelected
                      ? theme.custom.mymodal.selected ??
                        theme.custom.mymodal.button
                      : theme.custom.mymodal.button,
                    marginBottom: 2,
                    fontWeight: "bold",
                  }}
                />
              </div>
            );
          }
        })}
        {isConnected.users_status === "a" && selectedCharacters.length > 0 && (
          <Btn
            onClick={() => {
              const ids = selectedCharacters
                .map((c) => c.ID_character)
                .join("&&");
              navigate(`/jdr/connectGame/admin/${ids}`);
            }}
            msg={`Lancer la partie pour ${selectedCharacters
              .map((chara) => chara.Name_character)
              .join(", ")}`}
            sx={{
              color: theme.custom.mymodal.text,
              backgroundColor:
                theme.custom.mymodal.selected ?? theme.custom.mymodal.button,
              marginTop: 20,
              marginBottom: 4,
              fontWeight: "bold",
            }}
          />
        )}
      </div>
      {/* Bouton Go Back en bas à gauche */}
      <div
        style={{
          position: "fixed",
          bottom: "4vh",
          left: "4vw",
          zIndex: 3,
          display: "flex",
        }}
      >
        <BtnRtn
          msg={"Go back"}
          sx={{
            color: theme.custom.mymodal.text,
            backgroundColor: theme.custom.mymodal.button,
            fontWeight: "bold",
          }}
        />
      </div>
    </div>
  );
}
export default JDR;
