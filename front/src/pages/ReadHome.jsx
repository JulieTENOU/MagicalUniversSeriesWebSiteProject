import { useContext, useEffect, useState } from "react";
import "../index.css";
import "../general.css";
import Btn from "../components/Btn";
import Top from "../components/Header";
import BG from "../components/Background";
import { useNavigate } from "react-router-dom";
import { ConnexionContext } from "../components/provider.jsx";
import BtnRtn from "../components/BtnRtn.jsx";

function ReadHome() {
  const navigate = useNavigate();
  const { state: isConnected, loading } = useContext(ConnexionContext);

  const [seriesList, setSeriesList] = useState([]);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await fetch(`/series/findAllSeries`);
        const data = await res.json();
        setSeriesList(data);
      } catch (error) {
        console.error("Erreur lors du chargement des séries :", error);
      }
    };

    fetchSeries();
  }, []);

  if (!loading && !isConnected) {
    navigate("/", { replace: true });
    return null;
  }
  const API_BASE = process.env.REACT_APP_API_BASE || window.location.origin;

  return (
    <div className="main">
      <BG />
      <Top started={isConnected} />

      <div
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "row",
          position: "fixed",
          bottom: "25vh",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <BtnRtn msg={"Go back"} />
        {seriesList.forEach((serie, i) => {
          console.log("serie", i, serie);
        })}

        {seriesList.forEach((serie, i) => {
          console.log("keys", i, Object.keys(serie));
        })}

        {seriesList.map((serie) => {
          const imgUrl = serie.ID_media
            ? `${API_BASE}/api/media/getOneMedia/${serie.ID_media}`
            : null;

          return (
            <Btn
              key={serie.ID_series}
              path={`/read/${serie.path}`}
              msg={`Go to ${serie.series_title}`}
              src={imgUrl}
              height="80"
              width="60"
              sx={{ color: "whitesmoke" }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ReadHome;
