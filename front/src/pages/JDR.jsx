import { useState, useContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "../index.css";
import "../general.css";
import { useAppContext } from "../context";
import { ConnexionContext } from "../components/provider.jsx";
import Btn from "../components/Btn";
import Top from "../components/Header";
import BG from "../components/Background";
import BtnRtn from "../components/BtnRtn.jsx";
import PageLoader from "../components/PageLoader.jsx";

const KANZY_ID = 8;
const isKanzyChar = (c) => Number(c?.users_ID) === KANZY_ID;
const isMobChar   = (c) => c?.Name_character?.slice(0, 3).toUpperCase() === "MOB";

function JDR() {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const {
    state: isConnected,
    setState: setIsConnected,
    loading,
  } = useContext(ConnexionContext);
  const { stats, setCurrentCharacter, fetchStat } = useAppContext();

  // Refetch les personnages à chaque visite de la page (évite la page vide si le premier
  // chargement au boot de l'app a échoué ou n'était pas encore terminé)
  useEffect(() => {
    fetchStat();
  }, [fetchStat]);

  const theme = useTheme();

  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const toggleCharacter = (character) => {
    setSelectedCharacters((prev) =>
      prev.some((c) => c.ID_character === character.ID_character)
        ? prev.filter((c) => c.ID_character !== character.ID_character)
        : [...prev, character],
    );
  };
  // Ancien pattern useEffect + navigate (peut causer une page blanche car le rendu complet
  // se produit avant la redirection)
  // useEffect(() => {
  //   if (!loading && !isConnected) {
  //     navigate("/", { replace: true });
  //     return null;
  //   }
  // }, [loading, isConnected, navigate]);

  // isConnected === undefined = état initial du provider (state pas encore résolu)
  if (loading || isConnected === undefined) {
    return <PageLoader />;
  }

  // Pattern React Router v6 idiomatique : retour anticipé avec <Navigate>
  if (!isConnected) {
    return <Navigate to="/" replace />;
  }

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
          {isConnected?.users_status === "a" && t("jdr.selectCharas")}
          {isConnected?.users_status === "p" && t("jdr.selectChara")}
        </Typography>
        {isConnected?.users_status === "p" && (
          <Btn
            onClick={() => navigate("/jdr/create_character")}
            msg={t("jdr.newChara")}
            sx={{
              color: theme.custom.mymodal.text,
              backgroundColor: theme.custom.mymodal.button,
              marginBottom: 4,
              fontWeight: "bold",
            }}
          />
        )}

        {isConnected?.users_status === "a" && (
          <Btn
            onClick={() => navigate("/jdr/admin/create_character")}
            msg={"Créer / importer un personnage (Admin)"}
            sx={{
              color: theme.custom.mymodal.text,
              backgroundColor: theme.custom.mymodal.button,
              marginBottom: 4,
              fontWeight: "bold",
            }}
          />
        )}
        {/* Vue joueur : ses propres personnages */}
        {isConnected?.users_status === "p" &&
          (stats ?? [])
            .filter((stat) => stat.users_ID === isConnected?.users_ID)
            .map((stat) => (
              <Btn
                key={stat.ID_character}
                onClick={() => {
                  setCurrentCharacter(stat);
                  navigate(`/jdr/connectGame/${stat.ID_character}`);
                }}
                msg={stat.Name_character}
                sx={{
                  color: theme.custom.mymodal.text,
                  backgroundColor: theme.custom.mymodal.button,
                  marginBottom: 2,
                  fontWeight: "bold",
                }}
              />
            ))}

        {/* Vue admin : 3 colonnes PJ / PNJ / MOB */}
        {isConnected?.users_status === "a" && (() => {
          const allStats = stats ?? [];
          const pjList  = allStats.filter((s) => !isKanzyChar(s));
          const pnjList = allStats.filter((s) => isKanzyChar(s) && !isMobChar(s));
          const mobList = allStats.filter((s) => isKanzyChar(s) && isMobChar(s));

          const renderColumn = (chars, title, accentColor) => (
            <Box sx={{ flex: "1 1 220px", minWidth: 200 }}>
              <Typography variant="h6" sx={{ color: accentColor, textAlign: "center", mb: 2, pb: 1, borderBottom: `1px solid ${accentColor}55` }}>
                {title}
              </Typography>
              {chars.map((stat) => {
                const isSelected = selectedCharacters.some((c) => c.ID_character === stat.ID_character);
                return (
                  <div key={stat.ID_character} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleCharacter(stat)}
                      style={{ marginRight: 8, width: 18, height: 18, cursor: "pointer" }}
                    />
                    <Btn
                      msg={stat.Name_character}
                      onClick={() => toggleCharacter(stat)}
                      sx={{
                        color: theme.custom.mymodal.text,
                        backgroundColor: isSelected
                          ? (theme.custom.mymodal.selected ?? theme.custom.mymodal.button)
                          : theme.custom.mymodal.button,
                        marginBottom: 0,
                        fontWeight: "bold",
                      }}
                    />
                  </div>
                );
              })}
              {chars.length === 0 && (
                <Typography sx={{ color: "rgba(255,255,255,0.3)", textAlign: "center", fontSize: "0.85rem" }}>
                  Aucun
                </Typography>
              )}
            </Box>
          );

          return (
            <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start", mt: 2, flexWrap: "wrap", justifyContent: "center" }}>
              {renderColumn(pjList,  "👥 Joueurs (PJ)", "#90caf9")}
              {renderColumn(pnjList, "🎭 PNJ",          "#ffa726")}
              {renderColumn(mobList, "⚔️ MOB",          "#f87171")}
            </Box>
          );
        })()}
        {isConnected?.users_status === "a" && selectedCharacters.length > 0 && (
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
          msg={t("jdr.return")}
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
