import React, { useContext } from 'react';

import '../index.css';
import '../general.css';
import "../../src/styles/responsive.css";

import { ConnexionContext } from '../components/provider';

import Top from '../components/Header';
import BG from '../components/Background';
import HomeCompo from '../components/Home';
import PageLoader from '../components/PageLoader';

function Home() {


    const { state: isConnected, setState: setIsConnected, loading } = useContext(ConnexionContext);

    console.log(isConnected);

    if (loading) return <PageLoader />;

    return (
        <div className='main'>
            <BG />
            <Top started={isConnected} />
            <HomeCompo />
        </div>
    )
}
export default Home;