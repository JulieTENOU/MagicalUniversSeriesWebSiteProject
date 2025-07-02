import { AppBar, Toolbar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import React, { useContext } from 'react';
import Btn from './Btn';
import { Link } from 'react-router-dom';
import { ConnexionContext } from './provider';

export default function Top() {
    const {state: user, setState: setUser, loading} = useContext(ConnexionContext);
    const isConnected = !!user;
    console.log(isConnected);
    return (
        
        <div style={{ backgroundColor: 'transparent', backdropFilter: "blur(10px)", top: "0", display: "flex", position: "sticky", flexDirection: "row", textAlign: "center", alignItems: "end", justifyContent: "space-between" }}>
            <AppBar position='static' style={{ backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', alignItems: "left", justifyContent: 'space-evenly' }}>
                <Toolbar style={{ display: 'flex', flexDirection: 'row', alignItems: "left", justifyContent: 'space-between' }}>
                    <Btn path='/' msg={<HomeIcon sx={{ color: 'white' }} />} />
                    <h2 style={{ color: 'white', backgroundColor: 'none' }}>Welcome to the magical univers</h2>
                    {isConnected ? <>
                        <Typography ><Link style={{ textDecoration: 'none', color: 'white' }} to='/read/xalyt'>Xalyt Stories</Link></Typography>
                        <Typography ><Link style={{ textDecoration: 'none', color: 'white' }} to='/read/MA'>M.A. Stories</Link></Typography>
                        <Typography ><Link style={{ textDecoration: 'none', color: 'white' }} to="/jdr">M.A. Game</Link></Typography>
                        <Typography ><Link style={{ textDecoration: 'none', color: 'white' }} to='/read/lexicon'>Lexique Magique<br />Bestiaire</Link></Typography>
                        <Btn path='/' onClick={()=>{
                            fetch('/api/logout', {
                                method: 'POST',
                                credentials: 'include', 
                            }).then(() => {
                                localStorage.removeItem("token");
                                setUser(null);
                            });

                        }} msg={"Déconnexion"} />

                    </> : <Btn path={'/connexion'} msg={`Connexion`} msg2={`Inscription`} />}

                </Toolbar>

            </AppBar>



        </div>
    )
};
