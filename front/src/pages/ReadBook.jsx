import { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import "../index.css";
import "../general.css";
import Btn from "../components/Btn";
import Top from "../components/Header";
import BG from "../components/Background";
import { useNavigate } from "react-router-dom";
import { ConnexionContext } from "../components/provider.jsx";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";
import { useThemeMode } from "../context/ThemeContext.js";
import axios from "axios";

function ReadBook() {
  const API_BASE = process.env.REACT_APP_API_BASE || window.location.origin;
  const LogoReturn = `${API_BASE}/api/media/getOneMedia/8`;
  const LogoNext = `${API_BASE}/api/media/getOneMedia/6`;
  const { serie, book, chapter } = useParams();
  const [currentChapter, setCurrentChapter] = useState(null);

  const [gate, setGate] = useState(null); // infos du verrou
  const [awakeningAnswer, setAwakeningAnswer] = useState("");
  const [awakeningError, setAwakeningError] = useState(null);
  const [awakeningLoading, setAwakeningLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [nearHint, setNearHint] = useState(null);

  const {
    state: isConnected,
    setState: setIsConnected,
    loading,
  } = useContext(ConnexionContext);

  let navigate = useNavigate();
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

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const res = await axios.get(
          `/chapters/getByPath/${serie}/${book}/${chapter}`,
        );
        setGate(null);
        setAwakeningError(null);
        setCurrentChapter(res.data);
      } catch (error) {
        const status = error?.response?.status;
        const data = error?.response?.data;

        // ✅ Gate Éveil
        if (status === 403 && data?.error === "AWAKEN_LOCKED") {
          try {
            const puzzleRes = await axios.get(
              `/api/awakening/puzzle/${data.puzzle_key}`,
            );
            setGate({ ...data, ...puzzleRes.data }); // ajoute question/hint
            setNearHint(null);
            setAttempts(0);
            setShowHint(false);
            setAwakeningAnswer("");

          } catch (e) {
            setGate(data); // fallback si la route puzzle plante
            setNearHint(null);
            setAttempts(0);
            setShowHint(false);
            setAwakeningAnswer("");
          }
          setCurrentChapter(null);
          return;
        }

        console.error("Erreur chargement chapitre :", error);
      }
    };

    fetchChapter();
  }, [serie, book, chapter]);

  const submitAwakening = async () => {
    setAwakeningLoading(true);
    setAwakeningError(null);

    try {
      console.log("axios withCredentials =", axios.defaults.withCredentials);

      const res = await axios.post("/api/awakening/solve", {
        puzzle_key: gate?.puzzle_key || "level_1",
        answer: awakeningAnswer,
      });

      if (res.data?.ok) {
        // succès -> on retente de charger le chapitre
        setGate(null);
        setAwakeningAnswer("");
        setAttempts(0);
        setShowHint(false);
        setNearHint(null);
        window.location.reload();
      } else {
        setAttempts(prev => prev + 1);
        setAwakeningError("Réponse incorrecte.");

        if (res.data?.near && res.data?.near_hint) {
          setNearHint(res.data.near_hint); // ✅ affichage direct
        } else {
          setNearHint(null);
        }
      }
    } catch (err) {
      console.error(err);
      setAwakeningError("Erreur serveur.");
    } finally {
      setAwakeningLoading(false);
    }
  };

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
            <img src={imgSrc} alt="Séparateur" style={{ maxHeight: "40px" }} />
          </div>
        );
      }

      // Texte en italique complet
      const italicMatch = line.match(/^<i>(.*?)<\/i>$/);
      if (italicMatch) {
        return (
          <Typography
            key={index}
            sx={{
              fontStyle: "italic",
              whiteSpace: "pre-line",
              textAlign: "justify",
            }}
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
              : `/read/${serie}/${book}`
          }
          msg="Chapitre précédent"
          src={LogoReturn}
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
              : `/read/${serie}/${book}`
          }
          msg={currentChapter?.next ? "Chapitre suivant" : "Retour au sommaire"}
          src={LogoNext}
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
            {gate
              ? "Accès verrouillé"
              : currentChapter?.title || "Chargement..."}
          </Typography>

          {gate ? (
            <div style={{ textAlign: "center", padding: 24 }}>
              <Typography
                variant="h5"
                color={theme.custom.mycustomblur.text}
                sx={{ mb: 2 }}
              >
                {gate.question ||
                  "Pour accéder à cette information tu devras d'abord Eveiller tes pouvoirs."}
              </Typography>

              {attempts >= (gate?.hint_after_attemps ?? 3) && gate?.hint && (
                <div style={{ marginTop: 20 }}>
                  <Btn
                    onClick={() => setShowHint(prev => !prev)}
                    msg={showHint ? "Masquer l’indice" : "Révéler un indice"}
                    sx={{ color: "whitesmoke" }}
                  />
                  {showHint && (
                    <Typography
                      sx={{ mb: 2, opacity: 0.8 }}
                      color={theme.custom.mycustomblur.text}
                    >
                      {gate.hint}
                    </Typography>
                  )}
                </div>
              )}

              {nearHint && (
                <Typography sx={{ mt: 2, opacity: 0.9 }} color={theme.custom.mycustomblur.text}>
                  {nearHint}
                </Typography>
              )}


              <Typography color={theme.custom.mycustomblur.text} sx={{ mb: 2 }}>
                Niveau requis : {gate.required_level} — Ton niveau :{" "}
                {gate.current_level}
              </Typography>

              <input
                value={awakeningAnswer}
                onChange={(e) => setAwakeningAnswer(e.target.value)}
                placeholder="Entre la réponse…"
                style={{
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.2)",
                  width: "min(420px, 80vw)",
                  background: "transparent",
                  color: theme.custom.mycustomblur.text,
                }}
              />

              <div style={{ marginTop: 12 }}>
                <Btn
                  onClick={submitAwakening}
                  msg={awakeningLoading ? "Validation..." : "Déverrouiller"}
                  sx={{ color: "whitesmoke" }}
                />
              </div>

              {awakeningError && (
                <Typography sx={{ mt: 2 }} color="error">
                  {awakeningError}
                </Typography>
              )}
            </div>
          ) : (
            currentChapter?.content &&
            parseChapterContent(currentChapter.content, localReadingMode)
          )}
        </div>
      </Box>
    </div>
  );
}
export default ReadBook;
