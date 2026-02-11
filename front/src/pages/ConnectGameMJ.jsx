import { useState, useContext, useEffect } from "react";
import BG from "../components/Background";
import Top from "../components/Header";
import { ConnexionContext } from "../components/provider";
import "react-circular-progressbar/dist/styles.css";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import {
  LinearProgress,
  Typography,
  TableRow,
  TableCell,
  Table,
  TableBody,
  TableHead,
} from "@mui/material";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

import Btn from "../components/Btn";
import DynamicSkillSelector from "../components/DynamicSkillSelector";
import { useNavigate } from "react-router-dom";
import { socket } from "../service/socket";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function ConnectGameMJ() {
  const { ids } = useParams();
  const idArray = ids.split("&&");
  const theme = useTheme();
  const {
    state: currentUser,
    setState: setCurrentUser,
    loading,
  } = useContext(ConnexionContext);

  let navigate = useNavigate();

  console.log(currentUser?.users_ID);
  const [characters, setCharacters] = useState([]);
  console.log(characters);
  useEffect(() => {
    Promise.all(
      idArray.map((id) =>
        fetch(`/api/characters/getOneCharacterById/${id}`)
          .then((res) => res.json())
          .then((data) => data.data),
      ),
    ).then((list) => setCharacters(list.filter(Boolean)));
  }, [ids]);

  const [selectorVisibleFor, setSelectorVisibleFor] = useState(null); // contient l’ID du joueur sélectionné
  const [skillScores, setSkillScores] = useState({});

  const [allCompetences, setAllCompetences] = useState([]);

  const [selected, setSelected] = useState(() => new Set());
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info"); // tu peux garder "info" fixe au début

  const toggleSelected = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () =>
    setSelected(new Set(characters.map((c) => c.ID_character)));
  const clearAll = () => setSelected(new Set());

  const openAlertDialogFor = (targets) => {
    setSelected(new Set(targets));
    setAlertOpen(true);
  };

  const sendAlert = () => {
    const targets = [...selected];
    if (!targets.length || !alertText.trim()) return;

    socket.emit("mj:sendAlert", {
      targets,
      message: alertText,
      severity: alertSeverity,
    });

    setAlertText("");
    setAlertOpen(false);
  };

  useEffect(() => {
    fetch(`/api/competences/findAllComp`)
      .then((res) => res.json())
      .then(setAllCompetences)
      .catch(console.error);
  }, []);

  const handleFinalSelection = (charId, path) => {
    const selectedId = path.at(-1);
    const comp = allCompetences.find((c) => c.id === selectedId);
    console.log("Compétence sélectionnée :", comp);

    if (!comp?.code) return;

    const fieldName = `${comp.code}_character`;
    const char = characters.find((c) => c.ID_character === charId);
    if (!char) return;

    const valeur = char[fieldName] ?? "N/A";

    setSkillScores((prev) => ({
      ...prev,
      [charId]: { valeur, label: comp.nom },
    }));

    setSelectorVisibleFor(null); // ferme le sélecteur après sélection
    console.log("Champ utilisé :", fieldName, "| Valeur :", valeur);
  };

  const [gaugesByCharId, setGaugesByCharId] = useState({});
  // Exemple: gaugesByCharId[12] = { currentManaAir: 10, ... }

  useEffect(() => {
    if (!characters.length) return;

    let cancelled = false;

    async function loadAllGauges() {
      try {
        const results = await Promise.all(
          characters.map(async (char) => {
            const name = encodeURIComponent(char.Name_character);
            const res = await fetch(`/api/gauges/getOneGauges/${name}`);
            const json = await res.json().catch(() => null);

            if (!res.ok || !json?.data) {
              // fallback : si pas de gauges, on peut retourner les valeurs du perso
              return [
                char.ID_character,
                {
                  currentManaAir: char.ManaAir_character,
                  currentManaEau: char.ManaEau_character,
                  currentManaTerre: char.ManaTerre_character,
                  currentManaFeu: char.ManaFeu_character,
                  currentManaVolonte: char.ManaVolonte_character,
                  currentManaVital: char.ManaVital_character,
                  currentStamina: char.Stamina_character,
                },
              ];
            }

            return [char.ID_character, json.data];
          }),
        );

        if (cancelled) return;

        // results = [[id, gauges], [id, gauges], ...]
        setGaugesByCharId(Object.fromEntries(results));
      } catch (e) {
        console.error("Erreur loadAllGauges:", e);
      }
    }

    loadAllGauges();

    const interval = setInterval(loadAllGauges, 1500);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [characters]);

  const isInvalidUser =
    !currentUser ||
    (Array.isArray(currentUser) && currentUser.length === 0) ||
    (typeof currentUser === "object" && Object.keys(currentUser).length === 0);

  if (!loading && isInvalidUser) {
    navigate("/", { replace: true });
    return null;
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
                    left: "15vw",
                    top: "15vh",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "auto",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      justifyContent: "center",
                      marginBottom: 10,
                    }}
                  >
                    <Btn msg="Tout sélectionner" onClick={selectAll} />
                    <Btn msg="Vider sélection" onClick={clearAll} />
                    <Btn
                      msg="Alerte sélection"
                      onClick={() => setAlertOpen(true)}
                    />
                    <Btn
                      msg="Alerte à tous"
                      onClick={() =>
                        openAlertDialogFor(
                          characters.map((c) => c.ID_character),
                        )
                      }
                    />
                  </div>

                  <Table sx={{ border: "none" }}>
                    <TableHead sx={{ border: "none" }}>
                      <TableRow variant="head" sx={{ border: "none" }}>
                        <TableCell sx={{ border: "none" }}></TableCell>
                        <TableCell sx={{ border: "none" }}>
                          {" "}
                          <Typography
                            className="label"
                            variant="h5"
                            sx={{ color: theme.custom.mymodal.text }}
                            s
                            textAlign={"center"}
                          >
                            Mana Vital
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Typography
                            className="label"
                            variant="h5"
                            sx={{ color: theme.custom.mymodal.text }}
                            s
                            textAlign={"center"}
                          >
                            Stamina
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Typography
                            className="label"
                            variant="h5"
                            sx={{ color: theme.custom.mymodal.text }}
                            s
                            textAlign={"center"}
                          >
                            Mana Air
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Typography
                            className="label"
                            variant="h5"
                            sx={{ color: theme.custom.mymodal.text }}
                            s
                            textAlign={"center"}
                          >
                            Mana Eau
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Typography
                            className="label"
                            variant="h5"
                            sx={{ color: theme.custom.mymodal.text }}
                            s
                            textAlign={"center"}
                          >
                            Mana Terre
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Typography
                            className="label"
                            variant="h5"
                            sx={{ color: theme.custom.mymodal.text }}
                            s
                            textAlign={"center"}
                          >
                            Mana Feu
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Typography
                            className="label"
                            variant="h5"
                            sx={{ color: theme.custom.mymodal.text }}
                            s
                            textAlign={"center"}
                          >
                            Mana Volonté
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Typography
                            className="label"
                            variant="h5"
                            sx={{ color: theme.custom.mymodal.text }}
                            s
                            textAlign={"center"}
                          >
                            Compétence
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Typography
                            className="label"
                            variant="h5"
                            sx={{ color: theme.custom.mymodal.text }}
                            textAlign="center"
                          >
                            Sélection
                          </Typography>
                        </TableCell>

                        <TableCell sx={{ border: "none" }}>
                          <Typography
                            className="label"
                            variant="h5"
                            sx={{ color: theme.custom.mymodal.text }}
                            textAlign="center"
                          >
                            Alerte
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {characters.map((char) => {
                        // 1) je récupère les gauges courantes de CE perso
                        const gauges = gaugesByCharId[char.ID_character];
                        // console.log("char:", char);
                        // 2) je crée des valeurs "courantes" avec fallback si pas encore chargé
                        const n = (v) => Number(v);
                        // utilitaire clamp identique à la page joueur
                        const currentManaVital = n(
                          gauges?.currentManaVital ?? char.ManaVital_character,
                        );
                        // console.log("currentManaVital: ", currentManaVital);
                        const currentStamina = n(
                          gauges?.currentStamina ?? char.Stamina_character,
                        );
                        // console.log("currentStamina: ", currentStamina);
                        const currentManaAir = n(
                          gauges?.currentManaAir ?? char.ManaAir_character,
                        );
                        // console.log("currentManaAir: ", currentManaAir);

                        const currentManaEau = n(
                          gauges?.currentManaEau ?? char.ManaEau_character,
                        );
                        // console.log("currentManaEau: ", currentManaEau);

                        const currentManaTerre = n(
                          gauges?.currentManaTerre ?? char.ManaTerre_character,
                        );
                        // console.log("currentManaTerre: ", currentManaTerre);

                        const currentManaFeu = n(
                          gauges?.currentManaFeu ?? char.ManaFeu_character,
                        );
                        // console.log("currentManaFeu: ", currentManaFeu);

                        const currentManaVolonte = n(
                          gauges?.currentManaVolonte ??
                            char.ManaVolonte_character,
                        );
                        // console.log("currentManaVolonte: ", currentManaVolonte);

                        const clamp = (v) => Math.min(100, Math.max(0, v));

                        // Mana Vital
                        const percentManaVital =
                          (currentManaVital / char.ManaVital_character) * 100;
                        // console.log("maxManaVital: ", char.ManaVital_character);
                        const clampedManaVital = clamp(percentManaVital);
                        // console.log("clampedManaVital: ", clampedManaVital);

                        // Stamina
                        const percentStamina =
                          (currentStamina / char.Stamina_character) * 100;
                        // console.log("maxStamina: ", char.Stamina_character);
                        const clampedStamina = clamp(percentStamina);
                        // console.log("clampedStamina: ", clampedStamina);

                        // Mana Air
                        const percentManaAir =
                          (currentManaAir / char.ManaAir_character) * 100;
                        // console.log("maxManaAir: ", char.ManaAir_character);
                        const clampedManaAir = clamp(percentManaAir);
                        // console.log("clampedManaAir: ", clampedManaAir);

                        // Mana Eau
                        const percentManaEau =
                          (currentManaEau / char.ManaEau_character) * 100;
                        // console.log("maxManaEau: ", char.ManaEau_character);
                        const clampedManaEau = clamp(percentManaEau);
                        // console.log("clampedManaEau: ", clampedManaEau);

                        // Mana Terre
                        const percentManaTerre =
                          (currentManaTerre / char.ManaTerre_character) * 100;
                        // console.log("maxManaTerre: ", char.ManaTerre_character);
                        const clampedManaTerre = clamp(percentManaTerre);
                        // console.log("clampedManaTerre: ", clampedManaTerre);

                        // Mana Feu
                        const percentManaFeu =
                          (currentManaFeu / char.ManaFeu_character) * 100;

                        // console.log("maxManaFeu: ", char.ManaFeu_character);
                        const clampedManaFeu = clamp(percentManaFeu);
                        // console.log("clampedManaFeu: ", clampedManaFeu);

                        // Mana Volonté
                        const percentManaVolonte =
                          (currentManaVolonte / char.ManaVolonte_character) *
                          100;
                        // console.log("maxManaVolonte: ",char.ManaVolonte_character);
                        const clampedManaVolonte = clamp(percentManaVolonte);
                        // console.log("clampedManaVolonte: ", clampedManaVolonte);

                        return (
                          <TableRow
                            key={char.ID_character}
                            sx={{ border: "none" }}
                          >
                            <TableCell sx={{ border: "none" }}>
                              {char.Name_character}
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <div
                                className="container"
                                style={{
                                  width: "120px",
                                  height: "60px",
                                  overflow: "hidden",
                                  margin: "0 auto",
                                }}
                              >
                                <CircularProgressbar
                                  value={clampedManaVital}
                                  circleRatio={0.5}
                                  styles={buildStyles({
                                    rotation: 0.75,
                                    strokeLinecap: "butt",
                                    pathTransitionDuration: 0.5,
                                    pathColor: `red`,
                                    textColor: "#f88",
                                    trailColor: "#af8c8d",
                                    backgroundColor: "#3e98c7",
                                  })}
                                />
                              </div>
                              <Typography
                                className="label"
                                variant="h5"
                                sx={{ color: theme.custom.mymodal.text }}
                                textAlign={"center"}
                              >
                                {currentManaVital} points
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <div
                                className="container"
                                style={{
                                  width: "120px",
                                  height: "60px",
                                  overflow: "hidden",
                                  margin: "0 auto",
                                }}
                              >
                                <CircularProgressbar
                                  value={clampedStamina}
                                  circleRatio={0.5}
                                  styles={buildStyles({
                                    rotation: 0.75,
                                    strokeLinecap: "butt",
                                    pathTransitionDuration: 0.5,
                                    pathColor: `#42d750`,
                                    textColor: "#f88",
                                    trailColor: "#cfe9d2",
                                    backgroundColor: "#3e98c7",
                                  })}
                                />
                              </div>
                              <Typography
                                className="label"
                                variant="h5"
                                sx={{ color: theme.custom.mymodal.text }}
                                textAlign={"center"}
                              >
                                {currentStamina} points
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <LinearProgress
                                color="success"
                                id="manaAir"
                                variant="determinate"
                                value={clampedManaAir}
                                sx={{
                                  height: "5px",
                                  width: "60px",
                                  borderRadius: "25px",
                                  transform: "rotate(-90deg)",
                                }}
                              />
                              <Typography
                                className="label"
                                position={"relative"}
                                top={"5vh"}
                                variant="h5"
                                sx={{ color: theme.custom.mymodal.text }}
                                textAlign={"center"}
                              >
                                {currentManaAir} points
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <LinearProgress
                                color="info"
                                id="manaEau"
                                variant="determinate"
                                value={clampedManaEau}
                                sx={{
                                  height: "5px",
                                  width: "60px",
                                  borderRadius: "25px",
                                  transform: "rotate(-90deg)",
                                }}
                              />
                              <Typography
                                className="label"
                                position={"relative"}
                                top={"5vh"}
                                variant="h5"
                                sx={{ color: theme.custom.mymodal.text }}
                                textAlign={"center"}
                              >
                                {currentManaEau} points
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <LinearProgress
                                color="warning"
                                id="manaTerre"
                                variant="determinate"
                                value={clampedManaTerre}
                                sx={{
                                  height: "5px",
                                  width: "60px",
                                  borderRadius: "25px",
                                  transform: "rotate(-90deg)",
                                }}
                              />
                              <Typography
                                className="label"
                                position={"relative"}
                                top={"5vh"}
                                variant="h5"
                                sx={{ color: theme.custom.mymodal.text }}
                                textAlign={"center"}
                              >
                                {currentManaTerre} points
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <LinearProgress
                                color="error"
                                id="manaFeu"
                                variant="determinate"
                                value={clampedManaFeu}
                                sx={{
                                  height: "5px",
                                  width: "60px",
                                  borderRadius: "25px",
                                  transform: "rotate(-90deg)",
                                }}
                              />
                              <Typography
                                className="label"
                                position={"relative"}
                                top={"5vh"}
                                variant="h5"
                                sx={{ color: theme.custom.mymodal.text }}
                                textAlign={"center"}
                              >
                                {currentManaFeu} points
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <LinearProgress
                                id="manaVolonte"
                                variant="determinate"
                                value={clampedManaVolonte}
                                sx={{
                                  height: "5px",
                                  width: "60px",
                                  borderRadius: "25px",
                                  transform: "rotate(-90deg)",
                                }}
                              />
                              <Typography
                                className="label"
                                position={"relative"}
                                top={"5vh"}
                                variant="h5"
                                sx={{ color: theme.custom.mymodal.text }}
                                textAlign={"center"}
                              >
                                {currentManaVolonte} points
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <Btn
                                onClick={() =>
                                  setSelectorVisibleFor(
                                    selectorVisibleFor === char.ID_character
                                      ? null
                                      : char.ID_character,
                                  )
                                }
                                msg="Compétence"
                              />

                              {selectorVisibleFor === char.ID_character && (
                                <DynamicSkillSelector
                                  onFinalSelect={(path) =>
                                    handleFinalSelection(
                                      char.ID_character,
                                      path,
                                    )
                                  }
                                />
                              )}

                              {skillScores[char.ID_character] && (
                                <h2
                                  style={{
                                    marginTop: "8px",
                                    fontSize: "1.2rem",
                                    color: "white",
                                  }}
                                >
                                  {skillScores[char.ID_character].label} :{" "}
                                  {skillScores[char.ID_character].valeur}
                                </h2>
                              )}
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <input
                                type="checkbox"
                                checked={selected.has(char.ID_character)}
                                onChange={() =>
                                  toggleSelected(char.ID_character)
                                }
                              />
                            </TableCell>

                            <TableCell sx={{ border: "none" }}>
                              <Btn
                                msg="Envoyer"
                                onClick={() =>
                                  openAlertDialogFor([char.ID_character])
                                }
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Envoyer une alerte</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            multiline
            minRows={3}
            label="Message"
            value={alertText}
            onChange={(e) => setAlertText(e.target.value)}
            sx={{ marginTop: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAlertOpen(false)}>Annuler</Button>
          <Button
            onClick={sendAlert}
            disabled={!alertText.trim() || selected.size === 0}
          >
            Envoyer ({selected.size})
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConnectGameMJ;
