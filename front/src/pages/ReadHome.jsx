import React, { useState } from 'react';
//import bg from '../assets/img/bg.jpg';
import '../index.css';
import '../general.css';
import Btn from '../components/Btn';
import Top from '../components/Header';
import BG from '../components/Background';
import  logoMA from '../assets/img/ma.webp';
import logoXalyt from '../assets/img/xalyt-couv-tmp.webp';
import logoBeasts from "../assets/img/chèze.png";
import logoReturn from "../assets/img/return.png"
import { useNavigate } from 'react-router-dom';




function ReadHome() {
    let navigate = useNavigate();
    const [isConnected, setIsConnected] = useState(false)
    return (
        <div className='main'>
            <BG />
            <Top started={isConnected} />
            <div style={{width:'100vw',display:'flex', flexDirection:'row', position:'fixed', bottom:'25vh', justifyContent:'space-around', alignItems:'center'}}>

            <Btn onClick={navigate(-1)} msg="Go back" src={logoReturn} height={'100px'} sx={{color:'whitesmoke'}} />
            <Btn path='/read/xalyt' msg='Go to Xalyt' src={logoXalyt} sx={{color:'whitesmoke'}}/>
            <Btn path='/read/MA' msg='Go to Magical Academy' src={logoMA}  sx={{color:'whitesmoke'}}/>
            <Btn path='/read/lexicon' msg='Go to Bestiaire' src={logoBeasts} height={'100px'}  sx={{color:'whitesmoke'}}/>
            </div>
        </div>
    )
}
export default ReadHome;