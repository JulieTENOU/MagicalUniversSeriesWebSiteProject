import React, { useContext, useEffect } from 'react';
import '../index.css';
import '../general.css';
import Top from '../components/Header';
import BG from '../components/Background';
import { ConnexionContext } from '../components/provider';
import Connexion from "../components/Connexion.jsx";
import { useNavigate } from 'react-router-dom';


function ConnexionPage() {
    const navigate = useNavigate();

    const { state: currentUser, setState: setCurrentUser, loading } = useContext(ConnexionContext);
    const isConnected = !!currentUser;
    console.log(isConnected);
    useEffect(() => {
        if (!loading && currentUser) {
            navigate("/")
        }
    })
    return (
        <div className='main'>
            <BG />
            <Top started={isConnected} />
            <div className="landscape-scrollable"
                style={{
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'fixed',
                    bottom: '25vh',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}
            >
                <div style={{ color: 'white', textAlign: 'center' }}>
                    <Connexion />
                </div>
            </div>
        </div>
    )
}
export default ConnexionPage;