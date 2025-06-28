import React, { useContext } from 'react';
import '../index.css';
import '../general.css';
import Top from '../components/Header';
import BG from '../components/Background';
import { ConnexionContext } from '../components/provider';
import HomeCompo from '../components/Home';


function Home() {

    const [isConnected, setIsConnected] = useContext(ConnexionContext)
    console.log(isConnected)
    return (
        <div className='main'>
            <BG />
            <Top started={isConnected} />
           <HomeCompo/>
        </div>
    )
}
export default Home;