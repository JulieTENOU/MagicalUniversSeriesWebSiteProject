import { AppBar, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useContext } from 'react';
import Btn from './Btn';
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
                        <Btn path='/read/xalyt' msg={"Xalyt Stories"} sx={{textDecoration: 'none', color: 'white' }}/>
                        <Btn path='/read/ma' msg={"M.A. Stories"} sx={{textDecoration: 'none', color: 'white' }}/>
                        <Btn path='/jdr' msg={"M.A. Game"} sx={{textDecoration: 'none', color: 'white' }}/>
                        <Btn path='/read/lexicon' msg={"Lexique Magique"} msg2={"Bestiaire"} sx={{textDecoration: 'none', color: 'white' }}/>
                        <Btn path='/settings' msg={<SettingsIcon sx={{color: "white"}}/>}/>
                        
                        <Btn path='/' onClick={()=>{
                            fetch('/api/logout', {
                                method: 'POST',
                                credentials: 'include', 
                            }).then(() => {
                                localStorage.removeItem("token");
                                setUser(null);
                            });

                        }} msg={<LogoutIcon sx={{ color: 'white' }} />}  sx={{textDecoration: 'none', color: 'white' }} />

                    </> : <Btn path={'/connexion'} msg={`Connexion`} msg2={`Inscription`} />}

                </Toolbar>

            </AppBar>



        </div>
    )
};
