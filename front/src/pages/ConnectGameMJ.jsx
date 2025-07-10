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

function ConnectGameMJ() {
  const { ids } = useParams();
  const idArray = ids.split("&&");
  const theme = useTheme();
  const {
    state: currentUser,
    setState: setCurrentUser,
    loading,
  } = useContext(ConnexionContext);
  console.log(currentUser.users_ID);
  const [characters, setCharacters] = useState([]);
  console.log(characters);
  useEffect(() => {
    Promise.all(
      idArray.map((id) =>
        fetch(`/characters/api/getOneCharacterById/${id}`)
          .then((res) => res.json())
          .then((data) => data.data)
      )
    ).then((list) => setCharacters(list.filter(Boolean)));
  }, [ids]);

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
                  <Table>
                    <TableHead>
                      <TableRow variant="head">
                        <TableCell></TableCell>
                        <TableCell>
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
                        <TableCell>
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
                        <TableCell>
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
                        <TableCell>
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
                        <TableCell>
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
                        <TableCell>
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
                        <TableCell>
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
                        <TableCell>
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
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {characters.map((char) => (
                        <TableRow key={char.ID_character}>
                          <TableCell>{char.Name_character}</TableCell>
                          <TableCell>
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
                                value={
                                  (char.ManaVital_character /
                                    char.maxManaVital) *
                                  100
                                }
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
                              {char.ManaVital_character} points
                            </Typography>
                          </TableCell>
                          <TableCell>
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
                                value={
                                  (char.Stamina_character / char.maxStamina) *
                                  100
                                }
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
                              {char.Stamina_character} points
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <LinearProgress
                              color="success"
                              id="manaAir"
                              variant="determinate"
                              value={
                                (char.ManaAir_character / char.maxManaAir) * 100
                              }
                              sx={{
                                height: "5px",
                                width: "60px",
                                borderRadius: "25px",
                                rotate: "-90deg",
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
                              {char.ManaAir_character} points
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <LinearProgress
                              color="info"
                              id="manaAir"
                              variant="determinate"
                              value={
                                (char.ManaEau_character / char.maxManaEau) * 100
                              }
                              sx={{
                                height: "5px",
                                width: "60px",
                                borderRadius: "25px",
                                rotate: "-90deg",
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
                              {char.ManaEau_character} points
                            </Typography></TableCell>
                          <TableCell>
                            <LinearProgress
                              color="warning"
                              id="manaAir"
                              variant="determinate"
                              value={
                                (char.ManaTerre_character / char.maxManaTerre) * 100
                              }
                              sx={{
                                height: "5px",
                                width: "60px",
                                borderRadius: "25px",
                                rotate: "-90deg",
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
                              {char.ManaTerre_character} points
                            </Typography></TableCell>
                          <TableCell>
                            <LinearProgress
                              color="error"
                              id="manaAir"
                              variant="determinate"
                              value={
                                (char.ManaFeu_character / char.maxManaFeu) * 100
                              }
                              sx={{
                                height: "5px",
                                width: "60px",
                                borderRadius: "25px",
                                rotate: "-90deg",
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
                              {char.ManaFeu_character} points
                            </Typography></TableCell>
                          <TableCell>
                            <LinearProgress
                              id="manaAir"
                              variant="determinate"
                              value={
                                (char.ManaVolonte_character / char.maxManaVolonte) * 100
                              }
                              sx={{
                                height: "5px",
                                width: "60px",
                                borderRadius: "25px",
                                rotate: "-90deg",
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
                              {char.ManaVolonte_character} points
                            </Typography></TableCell>
                          <TableCell>
                            {/* ici un input + bouton 👁 comme vu plus haut pour demander une stat spécifique */}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectGameMJ;
