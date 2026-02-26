import * as React from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";

import Btn from "./Btn";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

import { useState, useEffect, useCallback } from "react";
import { uploadImage, attachMediaToCharacter, deleteMedia, } from "../service/mediaApi";
import { useCharacterMedia } from "../hooks/useCharacterMedia";


const tornSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" preserveAspectRatio="none"><path d="
M0,30 C25,10 50,50 75,30 C100,10 125,50 150,30 C175,10 200,50 225,30 C250,10 275,50 300,30 C325,10 350,50 375,30 C400,10 425,50 450,30 C475,10 500,50 525,30 C550,10 575,50 600,30 C625,10 650,50 675,30 C700,10 725,50 750,30 C775,10 800,50 825,30 C850,10 875,50 900,30 C925,10 950,50 975,30 C987,22 1000,28 1000,30
C980,55 1000,80 980,105 C960,130 1000,155 980,180 C960,205 1000,230 980,255 C960,280 1000,305 980,330 C960,355 1000,380 980,405 C960,430 1000,455 980,480 C960,505 1000,530 980,555 C960,580 1000,605 980,630 C960,655 1000,680 980,705 C960,730 1000,755 980,780 C960,805 1000,830 980,855 C960,880 1000,905 980,930 C960,955 1000,975 980,970
C950,990 925,955 900,975 C875,995 850,958 825,978 C800,998 775,958 750,978 C725,998 700,958 675,978 C650,998 625,958 600,978 C575,998 550,958 525,978 C500,998 475,958 450,978 C425,998 400,958 375,978 C350,998 325,958 300,978 C275,998 250,958 225,978 C200,998 175,958 150,978 C125,998 100,958 75,978 C50,998 25,958 0,970
C20,945 0,920 20,895 C40,870 0,845 20,820 C40,795 0,770 20,745 C40,720 0,695 20,670 C40,645 0,620 20,595 C40,570 0,545 20,520 C40,495 0,470 20,445 C40,420 0,395 20,370 C40,345 0,320 20,295 C40,270 0,245 20,220 C40,195 0,170 20,145 C40,120 0,95 20,70 C40,45 0,32 0,30 Z
" fill="white"/></svg>`;

const tornMask = `url("data:image/svg+xml,${encodeURIComponent(tornSvg)}")`;

// 👇 DANS le composant, rien ne change ici
const GrimoirePaper = styled("div")(({ theme }) => ({
  position: "relative",
  color: "#2c1a0e",
  minWidth: "70vw",
  minHeight: "70vh",
  background:
    "radial-gradient(ellipse at 0% 0%,    rgba(80,30,0,0.75), transparent 35%)," +
    "radial-gradient(ellipse at 100% 0%,  rgba(80,30,0,0.70), transparent 35%)," +
    "radial-gradient(ellipse at 0% 100%,  rgba(80,30,0,0.75), transparent 35%)," +
    "radial-gradient(ellipse at 100% 100%,rgba(80,30,0,0.75), transparent 35%)," +
    "radial-gradient(ellipse at 50% 0%,   rgba(60,20,0,0.35), transparent 25%)," +
    "radial-gradient(ellipse at 50% 100%, rgba(60,20,0,0.35), transparent 25%)," +
    "linear-gradient(160deg, #f5e6c2 0%, #ead9a8 40%, #dfc98a 70%, #c9a95e 100%)",
  boxShadow:
    "0 24px 80px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(120,70,10,0.25), inset 0 0 40px rgba(100,50,0,0.18)",
  borderRadius: 0,
  // 👇 tornMask vient maintenant du niveau fichier, pas besoin de le redéfinir ici
  WebkitMaskImage: tornMask,
  maskImage: tornMask,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  padding: "8px 24px",
  boxSizing: "border-box",
}));

function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  const goPrev = useCallback(() => setCurrent((i) => (i - 1 + images.length) % images.length), [images.length]);
  const goNext = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, goPrev, goNext]);

  const img = images[current];

  return (
    <Box
      onClick={onClose}
      sx={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.88)", backdropFilter: "blur(8px)",
        animation: "lbFadeIn 0.2s ease",
        "@keyframes lbFadeIn": { from: { opacity: 0 }, to: { opacity: 1 } },
      }}
    >
      <IconButton onClick={onClose}
        sx={{
          position: "absolute", top: 16, right: 16, color: "white",
          bgcolor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)",
          "&:hover": { bgcolor: "rgba(255,255,255,0.22)" }, zIndex: 10001
        }}>
        <CloseIcon />
      </IconButton>

      {images.length > 1 && (
        <IconButton onClick={(e) => { e.stopPropagation(); goPrev(); }}
          sx={{
            position: "absolute", left: 16, color: "white",
            bgcolor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.22)" }, zIndex: 10001
          }}>
          <ArrowBackIosNewIcon />
        </IconButton>
      )}

      <Box onClick={(e) => e.stopPropagation()}
        sx={{
          display: "flex", flexDirection: "column", alignItems: "center",
          maxWidth: "90vw", maxHeight: "90vh",
          animation: "lbZoomIn 0.25s cubic-bezier(0.34,1.56,0.64,1)",
          "@keyframes lbZoomIn": { from: { transform: "scale(0.85)", opacity: 0 }, to: { transform: "scale(1)", opacity: 1 } },
        }}>
        <Box component="img" src={img.url} alt={img.label || "image"}
          sx={{
            maxWidth: "90vw", maxHeight: "80vh", objectFit: "contain",
            borderRadius: 2, boxShadow: "0 8px 60px rgba(0,0,0,0.8)",
            border: "2px solid rgba(255,255,255,0.15)", display: "block"
          }} />
        {img.label && (
          <Typography sx={{ mt: 1.5, color: "rgba(255,255,255,0.85)", fontSize: 14, fontStyle: "italic" }}>
            {img.label}
          </Typography>
        )}
        {images.length > 1 && (
          <Typography sx={{ mt: 0.5, color: "rgba(255,255,255,0.45)", fontSize: 12 }}>
            {current + 1} / {images.length}
          </Typography>
        )}
      </Box>

      {images.length > 1 && (
        <IconButton onClick={(e) => { e.stopPropagation(); goNext(); }}
          sx={{
            position: "absolute", right: 16, color: "white",
            bgcolor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.22)" }, zIndex: 10001
          }}>
          <ArrowForwardIosIcon />
        </IconButton>
      )}
    </Box>
  );
}


export default function CustomizedDialogs(data) {
  const API_BASE = process.env.REACT_APP_API_BASE || window.location.origin;
  const Grimoire = `${API_BASE}/api/media/getOneMedia/35`;
  const character = data.data;
  console.log(character);
  const [inventaires, setInventaires] = useState({});
  const [galleryPics, setGalleryPics] = useState(true);
  const [notes, setNotes] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [text, setText] = useState("");

  const [editIdx, setEditIdx] = useState(null); // index de la note en cours d’édition
  const [editValue, setEditValue] = useState(""); // texte modifié

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const NOTE_SEP = "\n---NOTE---\n";

  const { gallery, refresh } = useCharacterMedia(character?.ID_character);

  const [pendingUploads, setPendingUploads] = useState([]); // [{file,label}]

  useEffect(() => {
    fetch(`/api/inventories/getOneInventories/${character.Name_character}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setInventaires(data.data);
      });
  }, [character.ID_character]);
  var autres = inventaires?.autres_inventory ?? "";
  useEffect(() => {
    console.log("autres", autres);
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
  };

  const isXs = useMediaQuery("(max-width:480px)");
  const isSm = useMediaQuery("(max-width:768px)");
  const isMd = useMediaQuery("(max-width:1024px)");

  const itemsPerView = isXs ? 1 : isSm ? 2 : isMd ? 3 : 5;

  const railRef = React.useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const total = gallery?.length || 0;

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth - 2; // tolérance
      setCanPrev(el.scrollLeft > 2);
      setCanNext(el.scrollLeft < max);
    };

    // après render + après chargement images, on update
    const raf = requestAnimationFrame(update);

    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [total, itemsPerView]);

  const scrollByPage = (dir) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  const notesList = React.useMemo(() => {
    const raw = inventaires?.autres_inventory ?? "";
    return raw
      .split(NOTE_SEP)
      .map((n) => n.trim())
      .filter(Boolean);
  }, [inventaires?.autres_inventory, NOTE_SEP]);

  const deleteNote = async (idx) => {
    const next = notesList.filter((_, i) => i !== idx).join(NOTE_SEP);
    handleSave(next);
    setInventaires((prev) => ({ ...prev, autres_inventory: next }));
  };

  const startEdit = (idx) => {
    setEditIdx(idx);
    setEditValue(notesList[idx] ?? "");
  };

  const saveEdit = async () => {
    if (editIdx === null) return;

    const cleaned = (editValue ?? "").trim();
    if (!cleaned) {
      alert("Une note ne peut pas être vide.");
      return;
    }

    const nextArr = notesList.map((n, i) => (i === editIdx ? cleaned : n));
    const next = nextArr.join(NOTE_SEP);

    handleSave(next);
    setInventaires((prev) => ({ ...prev, autres_inventory: next }));

    setEditIdx(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditIdx(null);
    setEditValue("");
  };
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <div>
      {lightboxIndex !== null && gallery?.length > 0 && (
        <Lightbox
          images={gallery}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
      <Button
        sx={{ position: "fixed", bottom: 16, right: 5 }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        <img src={Grimoire} height={"75px"} alt="grimoire" />
      </Button>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperComponent={(props) => <GrimoirePaper {...props} />}
      >
        <DialogTitle onClose={handleClose} sx={{ outerWidth: "50vw" }}>
          Grimoire
        </DialogTitle>
        <DialogContent
          sx={{
            "&::-webkit-scrollbar": { width: 4 },
            "&::-webkit-scrollbar-track": { background: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(44, 26, 14, 0.25)",
              borderRadius: 4,
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "rgba(44, 26, 14, 0.45)",
            },
          }}>
          <Typography gutterBottom>
            <Box
              sx={{
                display: "flex",
                gap: 1, // espace entre les boutons
                alignItems: "center",
              }}
            >
              <Btn
                msg="Ma gallerie"
                onClick={() => {
                  setGalleryPics(true);
                  setNotes(false);
                }}
              />
              <Btn
                msg="Notes"
                onClick={() => {
                  setGalleryPics(false);
                  setNotes(true);
                }}
              />
            </Box>
          </Typography>
          {notes && (
            <div>
              <TextField
                autoFocus
                id="newNotes"
                multiline
                sx={{
                  minHeight: "20vh",
                  minWidth: "20vw",
                  border: "solid black 3px ",
                }}
                onChange={(e) => setText(e.target.value)}
                inputProps={{ style: { height: "150px", color: "black" } }}
              />
              <Btn
                onClick={() => {
                  const old = inventaires?.autres_inventory ?? "";
                  const add = text ?? "";
                  const newOne = old ? `${old}${NOTE_SEP}${add}` : add;

                  handleSave(newOne);
                  setInventaires((prev) => ({
                    ...prev,
                    autres_inventory: newOne,
                  }));
                  setText("");
                }}
                msg="Save new notes"
              />

              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Notes saved
                </Typography>

                {notesList.length === 0 ? (
                  <Typography>Aucune note enregistrée</Typography>
                ) : (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {notesList.map((note, idx) => {
                      const isEditing = editIdx === idx;

                      return (
                        <Box
                          key={idx}
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1,
                            p: 1,
                            border: "1px solid rgba(0,0,0,0.25)",
                            borderRadius: 2,
                            bgcolor: "rgba(255,255,255,0.4)",
                          }}
                        >
                          {/* contenu */}
                          <Box sx={{ flex: 1 }}>
                            {isEditing ? (
                              <TextField
                                multiline
                                minRows={3}
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                inputProps={{ style: { color: "black" } }}
                                sx={{ width: "100%" }}
                              />
                            ) : (
                              <Typography
                                sx={{ color: "black", whiteSpace: "pre-wrap" }}
                              >
                                {note}
                              </Typography>
                            )}
                          </Box>

                          {/* actions */}
                          {isEditing ? (
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 0.5,
                              }}
                            >
                              <IconButton
                                aria-label="valider modification"
                                size="small"
                                onClick={saveEdit}
                                sx={{
                                  bgcolor: "rgba(76,175,80,0.15)",
                                  color: "success.main",
                                  border: "1px solid",
                                  borderColor: "success.main",
                                  "&:hover": {
                                    bgcolor: "rgba(76,175,80,0.25)",
                                  },
                                }}
                              >
                                <CheckIcon fontSize="small" />
                              </IconButton>

                              <IconButton
                                aria-label="annuler modification"
                                size="small"
                                onClick={cancelEdit}
                                sx={{
                                  bgcolor: "rgba(120,120,120,0.15)",
                                  color: "text.secondary",
                                  border: "1px solid",
                                  borderColor: "divider",
                                  "&:hover": {
                                    bgcolor: "rgba(120,120,120,0.25)",
                                  },
                                }}
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 0.5,
                              }}
                            >
                              <IconButton
                                aria-label="modifier note"
                                size="small"
                                onClick={() => startEdit(idx)}
                                sx={{
                                  bgcolor: "rgba(25,118,210,0.15)",
                                  color: "primary.main",
                                  border: "1px solid",
                                  borderColor: "primary.main",
                                  "&:hover": {
                                    bgcolor: "rgba(25,118,210,0.25)",
                                  },
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>

                              <IconButton
                                aria-label="supprimer note"
                                size="small"
                                onClick={() => {
                                  if (window.confirm("Supprimer cette note ?"))
                                    deleteNote(idx);
                                }}
                                sx={{
                                  bgcolor: "rgba(244,67,54,0.15)",
                                  color: "error.main",
                                  border: "1px solid",
                                  borderColor: "error.main",
                                  "&:hover": {
                                    bgcolor: "rgba(244,67,54,0.25)",
                                  },
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          )}
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Box>
            </div>
          )}
          {galleryPics && (
            <div>
              <Button
                component="label"
                variant="outlined"
                size="small"
                sx={{
                  width: "fit-content",
                  minWidth: 0,
                  px: 1,
                  py: 0.5,
                  fontSize: "0.8rem",
                  lineHeight: 1.1,
                  textTransform: "none",
                }}
              >
                Choisir des images
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (!files.length) return;

                    setPendingUploads(
                      files.map((file) => ({ file, label: "" })),
                    );
                    e.target.value = "";
                  }}
                />
              </Button>
              {pendingUploads.length > 0 && (
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    border: "1px solid #000",
                    borderRadius: 2,
                  }}
                >
                  <Typography sx={{ mb: 1, fontWeight: 700 }}>
                    Légendes des nouvelles images
                  </Typography>

                  {pendingUploads.map((it, idx) => (
                    <Box
                      key={`${it.file.name}-${idx}`}
                      sx={{
                        display: "flex",
                        flexDirection: isSm ? "column" : "row",
                        alignItems: isSm ? "stretch" : "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Typography sx={{ minWidth: 220, fontSize: 12 }}>
                        {it.file.name}
                      </Typography>

                      <TextField
                        size="small"
                        label="Label"
                        value={it.label}
                        inputProps={{ style: { color: "black" } }}
                        InputLabelProps={{ style: { color: "black" } }}
                        onChange={(ev) => {
                          const v = ev.target.value;
                          setPendingUploads((prev) =>
                            prev.map((p, i) =>
                              i === idx ? { ...p, label: v } : p,
                            ),
                          );
                        }}
                        sx={{ width: "100%" }}
                      />
                    </Box>
                  ))}
                  <Btn
                    msg="Envoyer"
                    sx={{
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      "&:hover": { bgcolor: "primary.dark" },
                    }}
                    onClick={async () => {
                      if (!character?.ID_character) return;

                      try {
                        for (const it of pendingUploads) {
                          const ID_media = await uploadImage(
                            it.file,
                            "gallery",
                          );
                          await attachMediaToCharacter(
                            character.ID_character,
                            ID_media,
                            "gallery",
                            { label: it.label },
                          );
                        }
                        setPendingUploads([]);
                        await refresh();
                      } catch (err) {
                        console.error(err);
                        alert(err?.message || "Erreur upload gallery");
                      }
                    }}
                  />
                </Box>
              )}

              <Box sx={{ mt: 2, position: "relative" }}>
                {total === 0 ? (
                  <Typography>Aucune image.</Typography>
                ) : (
                  <>
                    {/* Flèche gauche */}
                    <IconButton
                      onClick={() => scrollByPage(-1)}
                      disabled={!canPrev}
                      aria-label="précédent"
                      sx={{
                        position: "absolute",
                        left: 6,
                        top: "45%",
                        transform: "translateY(-50%)",
                        zIndex: 5,
                        backgroundColor: "rgba(255,255,255,0.85)",
                        border: "1px solid rgba(0,0,0,0.2)",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.95)",
                        },
                      }}
                    >
                      <ArrowBackIosNewIcon />
                    </IconButton>

                    {/* Flèche droite */}
                    <IconButton
                      onClick={() => scrollByPage(1)}
                      disabled={!canNext}
                      aria-label="suivant"
                      sx={{
                        position: "absolute",
                        right: 6,
                        top: "45%",
                        transform: "translateY(-50%)",
                        zIndex: 5,
                        backgroundColor: "rgba(255,255,255,0.85)",
                        border: "1px solid rgba(0,0,0,0.2)",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.95)",
                        },
                      }}
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>

                    {/* Le rail scrollable */}
                    <Box
                      ref={railRef}
                      sx={{
                        overflowX: "auto",
                        overflowY: "hidden",
                        display: "flex",
                        gap: 1,
                        p: 1,
                        border: "2px solid #000",
                        borderRadius: 2,

                        scrollSnapType: "x mandatory",
                        scrollBehavior: "smooth",

                        // évite que les flèches cachent la 1ère/dernière carte
                        scrollPaddingLeft: 48,
                        scrollPaddingRight: 48,
                      }}
                    >
                      {gallery.map((img, imgIndex) => (
                        <Box
                          key={img.ID_character_media || img.ID_media}
                          sx={{
                            flex: `0 0 calc((100% - ${(itemsPerView - 1) * 8}px) / ${itemsPerView})`,
                            scrollSnapAlign: "start",
                            textAlign: "center",
                            position: "relative",
                            "&:hover .zoom-btn": { opacity: 1 },
                            "&:hover img": { filter: "brightness(0.88)" },
                          }}
                        >
                          {/* bouton delete overlay */}
                          <IconButton
                            aria-label="supprimer image"
                            size="small"
                            onClick={async () => {
                              if (
                                !window.confirm(
                                  "Supprimer définitivement cette image ?",
                                )
                              )
                                return;

                              try {
                                await deleteMedia(img.ID_media); // ✅ suppression totale
                                await refresh(); // ✅ recharge la galerie
                              } catch (e) {
                                console.error(e);
                                alert(e?.message || "Erreur suppression image");
                              }
                            }}
                            sx={{
                              position: "absolute",
                              top: 6,
                              right: 6,
                              zIndex: 6,
                              color: "error.main",
                              border: "1px solid",
                              borderColor: "error.main",
                              bgcolor: "rgba(244,67,54,0.15)",
                              backdropFilter: "blur(6px)",
                              border: "1px solid rgba(0,0,0,0.2)",
                              "&:hover": { bgcolor: "rgba(244,67,54,0.25)" },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            className="zoom-btn"
                            aria-label="agrandir image"
                            size="small"
                            onClick={() => setLightboxIndex(imgIndex)}
                            sx={{
                              position: "absolute", top: 6, left: 6, zIndex: 6,
                              opacity: 0, transition: "opacity 0.18s ease",
                              bgcolor: "rgba(255, 255, 255, 0.23)", backdropFilter: "blur(6px)",
                              border: "1px solid rgba(0,0,0,0.2)",
                              "&:hover": { bgcolor: "rgba(25,118,210,0.25)" },
                            }}
                          >
                            <ZoomInIcon fontSize="small" />
                          </IconButton>
                          <Box
                            component="img"
                            src={img.url}
                            alt={img.label || "image"}
                            onLoad={() => {
                              const el = railRef.current;
                              if (!el) return;
                              const max = el.scrollWidth - el.clientWidth - 2;
                              setCanPrev(el.scrollLeft > 2);
                              setCanNext(el.scrollLeft < max);
                            }}
                            onClick={() => setLightboxIndex(imgIndex)}
                            sx={{
                              width: "100%",
                              height: isXs ? 150 : 180,
                              objectFit: "cover",
                              borderRadius: 1,
                              border: "1px solid #444",
                              display: "block",
                              cursor: "zoom-in",
                              transition: "filter 0.18s ease",
                            }}
                          />

                          <Typography
                            sx={{
                              fontSize: 12,
                              fontStyle: "italic",
                              color: "black",
                              mt: 0.5,
                            }}
                          >
                            {img.label || "No name"}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </>
                )}
              </Box>
            </div>
          )}
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
