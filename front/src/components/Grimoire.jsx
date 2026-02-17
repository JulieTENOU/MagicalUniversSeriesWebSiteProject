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


import { useState, useEffect } from "react";
import { uploadImage, attachMediaToCharacter } from "../service/mediaApi";
import { useCharacterMedia } from "../hooks/useCharacterMedia";

import useMediaQuery from "@mui/material/useMediaQuery";

// function BootstrapDialogTitle(props) {
//   const { children, onClose, ...other } = props;

//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: "absolute",
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// }

// BootstrapDialogTitle.propTypes = {
//   children: PropTypes.node,
//   onClose: PropTypes.func.isRequired,
// };

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
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
            {/* Exemples d'utilisations magiques  */}
            {/* <button onClick={() => { setSimple(true); setCombinaison(false); setNotes(false); }}>simples</button> / <button onClick={() => { setSimple(false); setCombinaison(true); setNotes(false); }}>combinées</button> /  */}
            {/* <button
              onClick={() => {
                setGalleryPics(true);
                setNotes(false);
              }}
            >
              Ma gallerie
            </button>
            <button
              onClick={() => {
                setGalleryPics(false);
                setNotes(true);
              }}
            >
              Mes notes
            </button> */}
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
                  const newOne = old ? `${old}\n${add}` : add;
                  handleSave(newOne);
                  setInventaires((prev) => ({
                    ...prev,
                    autres_inventory: newOne,
                  }));
                  setText("");
                }}
                msg="Save new notes"
              />

              <div style={{ whiteSpace: "pre-wrap" }}>
                <h3>Notes saved</h3>
                <br />
                {inventaires?.autres_inventory ?? "Aucune note enregistrées"}
                <br />
                {text}
              </div>
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
                      {gallery.map((img) => (
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
