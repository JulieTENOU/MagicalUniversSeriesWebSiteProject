import React, { useContext } from 'react';
import '../index.css';
import '../general.css';
import "../../src/styles/responsive.css"
import Top from '../components/Header';
import BG from '../components/Background';
import { ConnexionContext } from '../components/provider';
import HomeCompo from '../components/Home';


function Home() {


    const { state: isConnected, setState: setIsConnected, loading } = useContext(ConnexionContext);

    console.log(isConnected);
    return (
        <div className='main'>
            <BG />
            <Top started={isConnected} />
            <HomeCompo />
        </div>
    )
}
export default Home;