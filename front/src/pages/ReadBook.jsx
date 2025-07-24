import { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import "../index.css";
import "../general.css";
import Btn from "../components/Btn";
import Top from "../components/Header";
import BG from "../components/Background";
import logoReturn from "../assets/img/return.png";
import logoNext from "../assets/img/next.png";
import { useNavigate } from "react-router-dom";
import { ConnexionContext } from "../components/provider.jsx";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";
import { useThemeMode } from "../context/ThemeContext.js";
import axios from "axios";

function ReadBook() {
  const { serie, book, chapter } = useParams();
  const [currentChapter, setCurrentChapter] = useState(null);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const res = await axios.get(
          `/chapters/getByPath/${serie}/${book}/${chapter}`
        );
      console.log("✔️ Chapitre reçu :", res.data);
        setCurrentChapter(res.data);
      } catch (error) {
        console.error("Erreur chargement chapitre :", error);
      }
    };

    fetchChapter();
  }, [serie, book, chapter]);

  let navigate = useNavigate();
  const {
    state: isConnected,
    setState: setIsConnected,
    loading,
  } = useContext(ConnexionContext);
  const { mode, defaultMode, changeTheme } = useThemeMode();
  const [localReadingMode, setLocalReadingMode] = useState(mode);

  const isLastChapter = false;

  const theme = useTheme();

  useEffect(() => {
    changeTheme(localReadingMode);
    return () => {
      changeTheme(defaultMode);
    };
  }, [localReadingMode, defaultMode, changeTheme]);

  const parseChapterContent = (text, mode) => {
  if (!text) return null;

  const lines = text.split("\n");

  return lines.map((line, index) => {
    // Image de séparation
    if (line.includes("<sep />")) {
      const imgSrc =
        mode === "dark"
          ? "/assets/img/separator-light.png"
          : "/assets/img/separator-dark.png";

      return (
        <div key={index} style={{ textAlign: "center", margin: "1rem 0" }}>
          <img
            src={imgSrc}
            alt="Séparateur"
            style={{ maxHeight: "40px" }}
          />
        </div>
      );
    }

    // Texte en italique complet
    const italicMatch = line.match(/^<i>(.*?)<\/i>$/);
    if (italicMatch) {
      return (
        <Typography
          key={index}
          sx={{ fontStyle: "italic", whiteSpace: "pre-line", textAlign: "justify" }}
          color={theme.custom.mycustomblur.text}
        >
          {italicMatch[1]}
        </Typography>
      );
    }

    // Texte avec balises <i> à l'intérieur
    if (line.includes("<i>")) {
      const parts = line.split(/(<i>.*?<\/i>)/g);

      return (
        <Typography
          key={index}
          sx={{ whiteSpace: "pre-line", textAlign: "justify" }}
          color={theme.custom.mycustomblur.text}
        >
          {parts.map((part, i) => {
            if (part.startsWith("<i>") && part.endsWith("</i>")) {
              return (
                <span key={i} style={{ fontStyle: "italic" }}>
                  {part.slice(3, -4)}
                </span>
              );
            } else {
              return part;
            }
          })}
        </Typography>
      );
    }

    // Paragraphe normal
    return (
      <Typography
        key={index}
        sx={{ whiteSpace: "pre-line", textAlign: "justify" }}
        color={theme.custom.mycustomblur.text}
      >
        {line}
      </Typography>
    );
  });
};


  return (
    <div className="main">
      <BG />
      <Top started={isConnected} />
      {/* Flèche gauche (retour) */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: 20,
          transform: "translateY(-50%)",
          zIndex: 1000,
        }}
      >
        <Btn
          path={
            currentChapter?.prev
              ? `/read/${serie}/${book}/${currentChapter.prev}`
              : `/book/${serie}/${book}`
          }
          msg="Chapitre précédent"
          src={logoReturn}
          height={"50px"}
          sx={{ textDecoration: "none", color: "whitesmoke" }}
        />
      </div>

      {/* Flèche droite (next) */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          right: 20,
          transform: "translateY(-50%)",
          zIndex: 1000,
        }}
      >
        <Btn
          path={
            currentChapter?.next
              ? `/read/${serie}/${book}/${currentChapter.next}`
              : "/summary"
          }
          msg={currentChapter?.next ? "Chapitre suivant" : "Retour au sommaire"}
          src={logoNext}
          height={"50px"}
          sx={{ textDecoration: "none", color: "whitesmoke" }}
        />
      </div>

      <Box sx={{ p: 5, mt: 5 }}>
        <div
          style={{
            color: theme.custom.mycustomblur.text,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            backgroundColor: theme.custom.mycustomblur.main,
            boxShadow: theme.custom.mycustomblur.boxShadow,
            border: theme.custom.mycustomblur.border,
            backdropFilter: theme.custom.mycustomblur.blur,
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "900px",
            position: "relative",
            margin: "auto",
            overflow: "visible",
          }}
        >
          <div
            style={{
              position: "sticky",
              top: "10px",
              width: "100%",
              zIndex: 10,
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: 60,
              padding: "0 24", // pour respirer sur les côtés
            }}
          >
            {/* Zone gauche vide */}
            <div style={{ width: "100vw" }} /> {/* Même taille que le bouton */}
            {/* Bouton à droite */}
            <Btn
              onClick={() => {
                setLocalReadingMode(mode === "dark" ? "light" : "dark");
              }}
              msg={
                localReadingMode === "dark" ? (
                  <DarkModeIcon sx={{ fontSize: 20, lineHeight: 1 }} />
                ) : (
                  <LightModeIcon sx={{ fontSize: 20, lineHeight: 1 }} />
                )
              }
              sx={{
                backgroundColor: theme.custom.modeSwitchBtn.background,
                color: theme.custom.modeSwitchBtn.color,
                border: theme.custom.modeSwitchBtn.border,
                borderRadius: "50%",
                width: 36,
                height: 36,
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </div>

          {/* Titre centré */}
          <Typography
            variant="h4"
            color={theme.custom.mycustomblur.text}
            style={{
              flex: 1,
              textAlign: "center",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {currentChapter?.title || "Chargement..."}
          </Typography>

          {currentChapter?.content && parseChapterContent(currentChapter.content, localReadingMode)}
        </div>
      </Box>
    </div>
  );
}
export default ReadBook;
