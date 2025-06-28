import React, { useState } from 'react';
import '../index.css';
import '../general.css';
import Btn from '../components/Btn';
import Top from '../components/Header';
import BG from '../components/Background';
import { useNavigate } from 'react-router-dom';


function ReadMA() {
    let navigate = useNavigate();

    const [isConnected, setIsConnected] = useState(false)
    return (
        <div className='main'>
            <BG />
            <Top started={isConnected} />
            <div style={{width:'100vw',display:'flex', flexDirection:'row', position:'fixed', bottom:'25vh', justifyContent:'space-around', alignItems:'center'}}>

            <Btn onClick={navigate(-1)} msg="Go back"  sx={{color:'whitesmoke'}} />
            <Btn path='/read/ma/1' msg='Héritière' sx={{color:'whitesmoke'}}/>
            <Btn path='/read/ma/2' msg='Grande Guerre' sx={{color:'whitesmoke'}}/>
            <Btn path='/read/ma/3' msg='Conséquences' sx={{color:'whitesmoke'}}/>
            </div>

        </div>
    )
}
export default ReadMA;