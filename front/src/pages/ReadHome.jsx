import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../index.css";
import "../general.css";
import "../../src/styles/responsive.css";

import { ConnexionContext } from "../components/provider.jsx";

import Top from "../components/Header";
import BG from "../components/Background";
import Btn from "../components/Btn";
import BtnRtn from "../components/BtnRtn.jsx";

function ReadHome() {
  const navigate = useNavigate();
  const { state: isConnected, loading } = useContext(ConnexionContext);

  const [seriesList, setSeriesList] = useState([]);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await fetch(`/series/findAllSeriesReadable`);
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

      <div className="readHomeGridWrap">
        <BtnRtn msg={"Go back"} path={`/`} />

        <div className="readHomeGrid">
          {seriesList.map((serie) => {
            const imgUrl = serie.ID_media
              ? `${API_BASE}/api/media/getOneMedia/${serie.ID_media}`
              : null;

            return (
              <Btn
                key={serie.ID_series}
                path={`/read/${serie.path}`}
                msg={serie.series_title} // évite "Go to ..." si tu veux plus clean
                src={imgUrl}
                height="80"
                width="60"
                sx={{ color: "whitesmoke" }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ReadHome;
