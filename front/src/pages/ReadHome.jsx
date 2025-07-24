import { useContext, useEffect, useState } from 'react';
import '../index.css';
import '../general.css';
import Btn from '../components/Btn';
import Top from '../components/Header';
import BG from '../components/Background';
import logoReturn from "../assets/img/return.png";
import { useNavigate } from 'react-router-dom';
import { ConnexionContext } from '../components/provider.jsx';

function ReadHome() {
  const navigate = useNavigate();
  const { state: isConnected } = useContext(ConnexionContext);

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

  return (
    <div className='main'>
      <BG />
      <Top started={isConnected} />

      <div style={{
        width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        position: 'fixed',
        bottom: '25vh',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <Btn
          onClick={() => navigate(-1)}
          msg="Go back"
          src={logoReturn}
          height={'100px'}
          sx={{ color: 'whitesmoke' }}
        />

        {seriesList.map(serie => (
          <Btn
            key={serie.ID_series}
            path={`/read/${serie.path}`}
            msg={`Go to ${serie.series_title}`}
            src={serie.image}
            sx={{ color: 'whitesmoke' }}
          />
        ))}
      </div>
    </div>
  );
}

export default ReadHome;
