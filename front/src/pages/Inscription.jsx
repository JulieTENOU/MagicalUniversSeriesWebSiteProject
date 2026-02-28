import { useContext } from 'react';

import '../index.css';
import '../general.css';

import { ConnexionContext } from '../components/provider.jsx';

import Top from '../components/Header.jsx';
import BG from '../components/Background.jsx';
import Inscription from "../components/Inscription.jsx";
import PageLoader from '../components/PageLoader.jsx';

function InscriptionPage() {
    const { state: isConnected, setState: setIsConnected, loading } = useContext(ConnexionContext);
    if (loading) return <PageLoader />;
    return (
        <div className='main'>
            <BG />
            <Top started={isConnected} />
            <div className="landscape-scrollable" style={{ width: '100vw', display: 'flex', flexDirection: 'row', position: 'fixed', bottom: '25vh', justifyContent: 'space-around', alignItems: 'center' }}>
                <div style={{ color: 'white', textAlign: 'center' }}>
                    <Inscription />
                </div>
            </div>
        </div>
    )
}
export default InscriptionPage;