import React, { useContext } from 'react';
import '../index.css';
import '../general.css';
import Top from '../components/Header';
import BG from '../components/Background';
import { ConnexionContext } from '../components/provider';
import Connexion from "../components/Connexion.jsx";


function ConnexionPage() {
    const [isConnected, setIsConnected] = useContext(ConnexionContext)
    return (
        <div className='main'>
            <BG />
            <Top started={isConnected} />
            <div style={{ width: '100vw', display: 'flex', flexDirection: 'row', position: 'fixed', bottom: '25vh', justifyContent: 'space-around', alignItems: 'center' }}>
                <div style={{ color: 'white', textAlign: 'center' }}>
                    <Connexion/>
                </div>
            </div>
        </div>
    )
}
export default ConnexionPage;