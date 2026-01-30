import { useContext } from 'react';
import '../index.css';
import '../general.css';
import Btn from './Btn';
import logoMA from '../assets/img/ma.webp';
import Pile from "../assets/img/pile.png";
import { ConnexionContext } from './provider';


export default function UnavailableContent() {
    const { state: currentUser, setState: setCurrentUser, loading } = useContext(ConnexionContext);
    console.log(currentUser);
    return (
        <div className='main'>
            <div style={{ fontSize: "2em", width: '100vw', display: 'flex', flexDirection: 'row', position: 'fixed', left: 0, bottom: '40vh', justifyContent: 'space-around', alignItems: 'center', alignContent: 'space-around' }}>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', }}>
                    <div style={{ color: 'white', textAlign: 'center' }}>
                        No content available yet for this page, please chose another direction.
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '20vw', position: 'relative', marginInline: '15vw' }}>
                        <Btn path='/read' msg="Go to your books" src={Pile} height={'100px'} sx={{ color: "white", /*marginInline:'15vw'*/ }} />
                        <Btn path='/jdr' msg='Open your Holocom' src={logoMA} height={'100px'} width={'100px'} sx={{ color: "white",/* marginInline:'15vw'*/ }} />
                    </div>
                </div>

            </div>
        </div>
    )
};