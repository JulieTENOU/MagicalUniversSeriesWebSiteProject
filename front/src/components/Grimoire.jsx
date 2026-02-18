import * as React from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Btn from "./Btn";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteIcon from "@mui/icons-material/Delete";

import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { useState, useEffect } from "react";
import { uploadImage, attachMediaToCharacter, deleteMedia } from "../service/mediaApi";
import { useCharacterMedia } from "../hooks/useCharacterMedia";

import useMediaQuery from "@mui/material/useMediaQuery";



export default function CustomizedDialogs(data) {
  const API_BASE = process.env.REACT_APP_API_BASE || window.location.origin;
  const Grimoire = `${API_BASE}/api/media/getOneMedia/4`;
  const character = data.data;
  console.log(character);
  const [inventaires, setInventaires] = useState({});
  const [galleryPics, setGalleryPics] = useState(true);
  const [notes, setNotes] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [text, setText] = useState("");

  const [editIdx, setEditIdx] = useState(null);   // index de la note en cours d’édition
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


  return (
    <div>
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
        PaperProps={{
          style: {
            minWidth: "70vw",
            minHeight: "70vh",
            backgroundColor: "beige",
            color: "black",
          },
        }}
      >
        <DialogTitle onClose={handleClose} sx={{ outerWidth: "50vw" }}>
          Grimoire
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            <Box sx={{
              display: "flex",
              gap: 1,              // espace entre les boutons
              alignItems: "center",
            }}>
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
                              <Typography sx={{ color: "black", whiteSpace: "pre-wrap" }}>
                                {note}
                              </Typography>
                            )}
                          </Box>

                          {/* actions */}
                          {isEditing ? (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
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
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
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
                                  if (window.confirm("Supprimer cette note ?")) deleteNote(idx);
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

                    setPendingUploads(files.map((file) => ({ file, label: "" })));
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
                        // gap: 2,
                        mb: 1,
                        alignItems: "center",
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
                        onChange={(ev) => {
                          const v = ev.target.value;
                          setPendingUploads((prev) =>
                            prev.map((p, i) =>
                              i === idx ? { ...p, label: v } : p,
                            ),
                          );
                        }}
                        sx={{ flex: 1 }}
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
                          const ID_media = await uploadImage(it.file, "gallery");
                          await attachMediaToCharacter(
                            character.ID_character,
                            ID_media,
                            "gallery",
                            { label: it.label }
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

                        // optionnel: cache la scrollbar sur mobile (sinon garde)
                        // "&::-webkit-scrollbar": { display: "none" },
                        // scrollbarWidth: "none",
                      }}
                    >
                      {/* {gallery.map((img) => (
                        <Box
                          key={img.ID_character_media || img.ID_media}
                          sx={{
                            // ✅ largeur exacte en tenant compte du gap (8px = gap:1)
                            flex: `0 0 calc((100% - ${(itemsPerView - 1) * 8}px) / ${itemsPerView})`,
                            scrollSnapAlign: "start",
                            textAlign: "center",
                          }}
                        >
                          <Box
                            component="img"
                            src={img.url}
                            alt={img.label || "image"}
                            onLoad={() => {
                              // met à jour canPrev/canNext quand une image charge
                              const el = railRef.current;
                              if (!el) return;
                              const max = el.scrollWidth - el.clientWidth - 2;
                              setCanPrev(el.scrollLeft > 2);
                              setCanNext(el.scrollLeft < max);
                            }}
                            sx={{
                              width: "100%",
                              height: isXs ? 150 : 180,
                              objectFit: "cover",
                              borderRadius: 1,
                              border: "1px solid #444",
                              display: "block",
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
                      ))} */}
                      {gallery.map((img) => (
                        <Box
                          key={img.ID_character_media || img.ID_media}
                          sx={{
                            flex: `0 0 calc((100% - ${(itemsPerView - 1) * 8}px) / ${itemsPerView})`,
                            scrollSnapAlign: "start",
                            textAlign: "center",
                            position: "relative",
                          }}
                        >
                          {/* bouton delete overlay */}
                          <IconButton
                            aria-label="supprimer image"
                            size="small"
                            onClick={async () => {
                              if (!window.confirm("Supprimer définitivement cette image ?")) return;

                              try {
                                await deleteMedia(img.ID_media);     // ✅ suppression totale
                                await refresh();                      // ✅ recharge la galerie
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
                              bgcolor: "rgba(255,255,255,0.6)",
                              backdropFilter: "blur(6px)",
                              border: "1px solid rgba(0,0,0,0.2)",
                              "&:hover": { bgcolor: "rgba(255,255,255,0.85)" },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
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
                            sx={{
                              width: "100%",
                              height: isXs ? 150 : 180,
                              objectFit: "cover",
                              borderRadius: 1,
                              border: "1px solid #444",
                              display: "block",
                            }}
                          />

                          <Typography sx={{ fontSize: 12, fontStyle: "italic", color: "black", mt: 0.5 }}>
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
