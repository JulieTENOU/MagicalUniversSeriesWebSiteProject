import React, { useContext } from 'react';
import '../index.css';
import '../general.css';
import Top from '../components/Header.jsx';
import BG from '../components/Background.jsx';
import { ConnexionContext } from '../components/provider.jsx';
import Inscription from "../components/Inscription.jsx";


function InscriptionPage() {
    const [isConnected, setIsConnected] = useContext(ConnexionContext)
    return (
        <div className='main'>
            <BG />
            <Top started={isConnected} />
            <div style={{ width: '100vw', display: 'flex', flexDirection: 'row', position: 'fixed', bottom: '25vh', justifyContent: 'space-around', alignItems: 'center' }}>
                <div style={{ color: 'white', textAlign: 'center' }}>
                    <Inscription/>
                </div>
            </div>
        </div>
    )
}
export default InscriptionPage;