import { useContext, useEffect, useState } from "react";
import "../index.css";
import "../general.css";
import Btn from "../components/Btn";
import Top from "../components/Header";
import BG from "../components/Background";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Grid } from "@mui/material";
import { ConnexionContext } from "../components/provider.jsx";
import axios from "axios";
import BtnRtn from "../components/BtnRtn.jsx";

function ChaptersList() {
  const { state: isConnected } = useContext(ConnexionContext);
  const [chapters, setChapters] = useState([]);
  const [parts, setParts] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { serie, book } = useParams();

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        // Récupère les chapitres
        const chaptersRes = await axios.get(
          `/chapters/getAllByBookPath/${serie}/${book}`,
        );
        const chaptersData = chaptersRes.data;

        // Classe les chapitres par partie (optionnel)
        const grouped = {};
        chaptersData.forEach((chap) => {
          const partName = chap.part?.part_name || "Autres";
          if (!grouped[partName]) grouped[partName] = [];
          grouped[partName].push(chap);
        });

        setParts(grouped);
        setChapters(chaptersData);
        setLoading(false);
      } catch (err) {
        console.error("Erreur de chargement :", err);
        setLoading(false);
      }
    };

    fetchChapters();
  }, [serie, book]);

  if (!loading && !isConnected) {
    navigate("/", { replace: true });
    return null;
  }

  return (
    <div className="main">
      <BG />
      <Top started={isConnected} />
      <div
        style={{
          position: "fixed",
          bottom: "5vh",
          left: "3vw",
          zIndex: 1000, // bien au-dessus
        }}
      >
        {/* <Btn
          onClick={() => navigate(-1)}
          msg="Go back"
          src={logoReturn}
          height="100px"
          sx={{ color: "whitesmoke" }}
        /> */}

        <BtnRtn msg={"Go back"} />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          width: "90vw",
          maxWidth: "1200px",
          margin: "10vh auto",
          padding: "1rem",
          overflowY: "auto",
          height: "80vh",
          backdropFilter: "blur(20px)",
          gap: "2rem",
        }}
      >
        {loading ? (
          <Typography variant="h5" sx={{ color: "whitesmoke" }}>
            Chargement...
          </Typography>
        ) : (
          Object.keys(parts).map((partName, index) => (
            <div
              key={index}
              style={{
                flex: "1 1 250px",
                maxWidth: "300px",
                minWidth: "200px",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "whitesmoke",
                  marginBottom: "1rem",
                  fontWeight: "bold",
                }}
              >
                {partName}
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
              >
                {parts[partName].map((chap) => (
                  <Btn
                    key={chap.ID_chapter}
                    path={`/read/${serie}/${book}/${chap.path}`}
                    msg={chap.title_chapter}
                    sx={{ color: "#B6D8F2" }}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ChaptersList;
