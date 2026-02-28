import { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import { Typography, Drawer, IconButton, Divider, List, ListSubheader, ListItemButton, ListItemText, } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";

import "../index.css";
import "../general.css";
import "../../src/styles/responsive.css";

import { useThemeMode } from "../context/ThemeContext.js";
import { ConnexionContext } from "../components/provider.jsx";

import Btn from "../components/Btn";
import Top from "../components/Header";
import BG from "../components/Background";

import PageLoader from "../components/PageLoader.jsx";

function ReadBook() {
  const API_BASE = process.env.REACT_APP_API_BASE || window.location.origin;
  const LogoReturn = `${API_BASE}/api/media/getOneMedia/8`;
  const LogoNext = `${API_BASE}/api/media/getOneMedia/6`;
  const SepGrey = `${API_BASE}/api/media/getOneMedia/48`;
  const SepBlack = `${API_BASE}/api/media/getOneMedia/47`;

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
  const [chaptersDrawerOpen, setChaptersDrawerOpen] = useState(false);
  const [chaptersParts, setChaptersParts] = useState({});
  const [chaptersListLoading, setChaptersListLoading] = useState(false);
  const [bookInfos, setBookInfos] = useState(null);

  const [navigationInfo, setNavigationInfo] = useState({ prev: null, next: null });

  const scrollRef = useRef(null);

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
        setNavigationInfo({ prev: res.data.prev, next: res.data.next });
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
            setNavigationInfo({ prev: data.prev, next: data.next });
          } catch (e) {
            setGate(data); // fallback si la route puzzle plante
            setNearHint(null);
            setAttempts(0);
            setShowHint(false);
            setAwakeningAnswer("");
            setNavigationInfo({ prev: data.prev, next: data.next });
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
        setAttempts((prev) => prev + 1);
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

    // ── Pre-processing : collapse les balises multi-lignes en une seule ──
    let normalized = text
      .replace(/<i>([\s\S]*?)<\/i>/g, (_, c) => `<i>${c.replace(/\n/g, " ")}</i>`)
      .replace(/<b>([\s\S]*?)<\/b>/g, (_, c) => `<b>${c.replace(/\n/g, " ")}</b>`)
      .replace(/<bi>([\s\S]*?)<\/bi>/g, (_, c) => `<bi>${c.replace(/\n/g, " ")}</bi>`)
      .replace(/<note([^>]*)>([\s\S]*?)<\/note>/g, (_, attrs, c) => `<note${attrs}>${c.replace(/\n/g, " ")}</note>`);

    const lines = normalized.split("\n").map(l => l.trim());

    // ── Fonction qui parse les balises inline sur une ligne ──
    const parseInline = (line, key) => {
      const parts = line.split(/(<bi>[\s\S]*?<\/bi>|<i>[\s\S]*?<\/i>|<b>[\s\S]*?<\/b>|<note[^>]*>[\s\S]*?<\/note>)/g);

      const rendered = parts.map((part, i) => {
        if (part.startsWith("<bi>") && part.endsWith("</bi>"))
          return <span key={i} style={{ fontStyle: "italic", fontWeight: "bold" }}>{part.slice(4, -5)}</span>;
        if (part.startsWith("<i>") && part.endsWith("</i>"))
          return <span key={i} style={{ fontStyle: "italic" }}>{part.slice(3, -4)}</span>;
        if (part.startsWith("<b>") && part.endsWith("</b>"))
          return <span key={i} style={{ fontWeight: "bold" }}>{part.slice(3, -4)}</span>;
        const noteMatch = part.match(/^<note id="(\d+)">(.*?)<\/note>$/);
        if (noteMatch) {
          const [, id, noteText] = noteMatch;
          return (
            <Tooltip key={i} title={noteText} arrow placement="top">
              <sup style={{ cursor: "help", borderBottom: "1px dotted currentColor" }}>
                {id}
              </sup>
            </Tooltip>
          );
        }
        return part;
      });

      return (
        <Typography key={key} sx={{ whiteSpace: "pre-line", textAlign: "justify" }} color={theme.custom.mycustomblur.text}>
          {rendered}
        </Typography>
      );
    };

    return lines.map((line, index) => {
      // Séparateur
      if (line.includes("<sep/>")) {
        const imgSrc = mode === "dark" ? SepGrey : SepBlack;
        return (
          <div key={index} style={{ textAlign: "center", margin: "1rem 0" }}>
            <img src={imgSrc} alt="Séparateur" style={{ maxHeight: "40px" }} />
          </div>
        );
      }

      // Ligne entièrement italique (optimisation visuelle : pas de texte normal autour)
      const italicFullMatch = line.match(/^<i>(.*)<\/i>$/);
      if (italicFullMatch) {
        return (
          <Typography key={index} sx={{ fontStyle: "italic", whiteSpace: "pre-line", textAlign: "justify" }} color={theme.custom.mycustomblur.text}>
            {italicFullMatch[1]}
          </Typography>
        );
      }

      // Ligne avec balises inline
      if (line.includes("<i>") || line.includes("<b>") || line.includes("<bi>") || line.includes("<note ")) {
        return parseInline(line, index);
      }

      // Paragraphe normal
      return (
        <Typography key={index} sx={{ whiteSpace: "pre-line", textAlign: "justify" }} color={theme.custom.mycustomblur.text}>
          {line}
        </Typography>
      );
    });
  };

  useEffect(() => {
    const fetchChaptersList = async () => {
      setChaptersListLoading(true);
      try {
        const res = await axios.get(`/chapters/getAllByBookPath/${serie}/${book}`);
        const chaptersData = res.data;

        const grouped = {};
        chaptersData.forEach((chap) => {
          const partName = chap.part?.part_name || "Autres";
          if (!grouped[partName]) grouped[partName] = [];
          grouped[partName].push(chap);
        });

        setChaptersParts(grouped);
      } catch (err) {
        console.error("Erreur chargement liste chapitres :", err);
        setChaptersParts({});
      } finally {
        setChaptersListLoading(false);
      }
    };

    fetchChaptersList();
  }, [serie, book]);

  useEffect(() => {
    const fetchBookInfos = async () => {
      try {
        const res = await axios.get(`/books/getByPath/${serie}/${book}`);
        setBookInfos(res.data);
      } catch (err) {
        console.error("Erreur chargement infos livre :", err);
        setBookInfos(null);
      }
    };

    fetchBookInfos();
  }, [serie, book]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    setLocalReadingMode(mode);
  }, [serie, book, chapter]);

  useEffect(() => {
    setLocalReadingMode(mode); // reset au mode courant à chaque changement de chapitre
  }, [serie, book, chapter]);

  console.log(bookInfos);
  if (loading) return <PageLoader />;

  return (
    <div className="main">
      <BG />
      <Top started={isConnected} />
      <Drawer
        anchor="left"
        open={chaptersDrawerOpen}
        onClose={() => setChaptersDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 320,
            backgroundColor:
              theme.palette.mode === "dark" ? "#121212" : "#ffffff",
            color:
              theme.palette.mode === "dark" ? "#ffffff" : "#000000",
            borderRight: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 0 20px rgba(0,0,0,0.4)",
          },
        }}
      >
        <div style={{ padding: "12px 16px" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Chapitres
          </Typography>
          <Typography sx={{ opacity: 0.8, fontSize: 13 }}>
            {serie} /  {bookInfos?.name || serie}
          </Typography>
        </div>

        <Divider />

        {chaptersListLoading ? (
          <div style={{ padding: 16 }}>
            <Typography sx={{ opacity: 0.8 }}>Chargement...</Typography>
          </div>
        ) : (
          <List
            sx={{ pb: 2 }}
            subheader={<li />}
          >
            {Object.keys(chaptersParts).map((partName) => (
              <li key={`section-${partName}`}>
                <ul style={{ padding: 0 }}>
                  <ListSubheader
                    sx={{
                      backgroundColor: "transparent",
                      color: theme.custom.mycustomblur.text,
                      fontWeight: 700,
                    }}
                  >
                    {partName}
                  </ListSubheader>

                  {chaptersParts[partName].map((chap) => (
                    <ListItemButton
                      key={chap.ID_chapter}
                      selected={chap.path === chapter}
                      onClick={() => {
                        setChaptersDrawerOpen(false);
                        navigate(`/read/${serie}/${book}/${chap.path}`);
                      }}
                      sx={{
                        borderRadius: 1,
                        mx: 1,
                        mb: 0.5,
                      }}
                    >
                      <ListItemText
                        primary={chap.title_chapter}
                        primaryTypographyProps={{
                          sx: { fontSize: 14, lineHeight: 1.2 },
                        }}
                      />
                    </ListItemButton>
                  ))}
                </ul>
              </li>
            ))}
          </List>
        )}

        <Divider />

        <div style={{ padding: 12 }}>
          <Btn
            path={`/read/${serie}/${book}`}
            msg="Retour au sommaire"
            sx={{ color: "whitesmoke", width: "100%" }}
          />
        </div>
      </Drawer>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "90dvh",
          padding: "0px 16px 0px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "6px 4px",
            flexShrink: 0,
          }}
        >
          {/* Hamburger */}
          <IconButton
            onClick={() => setChaptersDrawerOpen(true)}
            sx={{
              color: theme.custom.mycustomblur.text,
              border: theme.custom.mycustomblur.border,
              backgroundColor: theme.custom.mycustomblur.main,
              width: 40,
              height: 40,
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Bouton thème */}
          <div style={{ width: "fit-content" }}>
            <Btn
              onClick={() => setLocalReadingMode(mode === "dark" ? "light" : "dark")}
              msg={
                localReadingMode === "dark" ? (
                  <LightModeIcon sx={{ fontSize: 20, lineHeight: 1 }} />
                ) : (
                  <DarkModeIcon sx={{ fontSize: 20, lineHeight: 1 }} />
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
        </div>

        {/* ── Box de lecture ── */}
        <div className="read-glass-shell" style={{ flex: 1, minHeight: 0 }}>
          <div
            className="read-scroll"
            ref={scrollRef}
            style={{
              color: theme.custom.mycustomblur.text,
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              backgroundColor: theme.custom.mycustomblur.main,
              boxShadow: theme.custom.mycustomblur.boxShadow,
              border: theme.custom.mycustomblur.border,
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "900px",
              position: "relative",
              margin: "auto",
            }}
          >
            {/* Titre */}
            <Typography
              variant="h4"
              color={theme.custom.mycustomblur.text}
              style={{ textAlign: "center", userSelect: "none" }}
            >
              {gate
                ? "Accès verrouillé"
                :
                <>
                  <span style={{ fontFamily: "'Lettrine', serif", fontSize: "1.4em" }}>
                    {currentChapter?.title?.[0]}
                  </span>
                  <span style={{ fontFamily: "'Titre', serif", fontSize: "1.4em" }}>
                    {currentChapter?.title?.slice(1)}
                  </span>
                </>

                || "Chargement..."}
            </Typography>

            {/* Gate Éveil */}
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
                      onClick={() => setShowHint((prev) => !prev)}
                      msg={showHint ? "Masquer l'indice" : "Révéler un indice"}
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
                  <Typography
                    sx={{ mt: 2, opacity: 0.9 }}
                    color={theme.custom.mycustomblur.text}
                  >
                    {nearHint}
                  </Typography>
                )}

                <Typography
                  color={theme.custom.mycustomblur.text}
                  sx={{ mb: 2 }}
                >
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
              currentChapter?.content && (
                <div style={{ fontFamily: "'Corps', serif" }}>
                  {parseChapterContent(currentChapter.content, localReadingMode)}
                </div>
              )
            )}
          </div>
        </div>

        {/* ── Flèches nav ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 4px",
            flexShrink: 0,
          }}
        >
          <Btn
            path={
              navigationInfo?.prev
                ? `/read/${serie}/${book}/${navigationInfo.prev}`
                : `/read/${serie}/${book}`
            }
            msg="Chapitre précédent"
            src={LogoReturn}
            height="50px"
            sx={{ textDecoration: "none", color: "whitesmoke" }}
          />
          <Btn
            path={
              navigationInfo?.next
                ? `/read/${serie}/${book}/${navigationInfo.next}`
                : `/read/${serie}/${book}`
            }
            msg={
              navigationInfo?.next ? "Chapitre suivant" : "Retour au sommaire"
            }
            src={LogoNext}
            height="50px"
            sx={{ textDecoration: "none", color: "whitesmoke" }}
          />
        </div>
      </div>
    </div>
  );
}
export default ReadBook;
