import { useContext } from 'react';
import '../index.css';
import '../general.css';
import Btn from '../components/Btn';
import Top from '../components/Header';
import BG from '../components/Background';
import logoReturn from "../assets/img/return.png"
import { useNavigate } from 'react-router-dom';

import { ConnexionContext } from '../components/provider.jsx';

function ReadXalyt() {
    let navigate = useNavigate();
    const {state: isConnected, setState: setIsConnected, loading} = useContext(ConnexionContext);

    return (
        <div className='main'>
            <BG />
            <Top started={isConnected} />
            <div style={{width:'100vw',display:'flex', flexDirection:'row', position:'fixed', bottom:'25vh', justifyContent:'space-around', alignItems:'center'}}>

            <Btn onClick={navigate(-1)} msg="Go back" src={logoReturn} height={'100px'} color={'white'} sx={{color:'whitesmoke'}}/>
            <Btn path='/read/xalyt/1' msg='Nouvelles Vies' sx={{color:'whitesmoke'}}/>
            <Btn path='/read/xalyt/2' msg='Complications' sx={{color:'whitesmoke'}}/>
            <Btn path='/read/xalyt/3' msg='Finalités' sx={{color:'whitesmoke'}}/>
            </div>

        </div>
    )
}
export default ReadXalyt;