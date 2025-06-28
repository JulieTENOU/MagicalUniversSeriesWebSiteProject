import React, { useState } from 'react';
import '../index.css';
import '../general.css';
import Btn from '../components/Btn';
import Top from '../components/Header';
import BG from '../components/Background';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context';
import { Typography } from '@mui/material';


function JDR() {
    let navigate = useNavigate();
    const [isConnected, setIsConnected] = useState(false)
    const { stats } = useAppContext();
    //const player = 
    return (
        <div className='main'>
            <BG />
            <Top started={isConnected} />
            <div style={{width:'100vw',display:'flex', flexDirection:'row', position:'fixed', bottom:'25vh', justifyContent:'space-around', alignItems:'center'}}>
            <Typography>Choose your character for this game</Typography>
            <Btn onClick={navigate(-1)} msg="Go back" />
            {stats.map((stat) => {
                const player =`${stat?.name}`
         return(
             <Btn path={`/jdr/${player}`} msg={`${player}`}/>
         )   
        }
        )}
            </div>

        </div>
    )
}
export default JDR;