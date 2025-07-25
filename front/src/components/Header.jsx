import { AppBar, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useContext } from 'react';
import Btn from './Btn';
import { ConnexionContext } from './provider';
import { useTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

export default function Top() {
    const {state: user, setState: setUser, loading} = useContext(ConnexionContext);
    const isConnected = !!user;
    console.log(isConnected);
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        
        <div style={{top: "0", display: "flex", position: "sticky", flexDirection: "row", textAlign: "center", alignItems: "end", justifyContent: "space-between" }}>
            <AppBar position='static' elevation={0} sx={{ backgroundColor: theme.custom.myheader.main, WebkitBackdropFilter: theme.custom.myheader.blur, backdropFilter: theme.custom.myheader.blur, display: 'flex', flexDirection: 'column', alignItems: "left", justifyContent: 'space-evenly', boxShadow:"none" }}>
                <Toolbar style={{ display: 'flex', flexDirection: 'row', alignItems: "left", justifyContent: 'space-between' }}>
                    <Btn path='/' msg={<HomeIcon sx={{ color: theme.custom.myheader.text }} />} />
                    <h2 style={{  color: theme.custom.myheader.text, backgroundColor: 'none' }}>Welcome to the magical univers</h2>
                    {isConnected ? <>
                        <Btn path='/read/xalyt' msg={"Xalyt Stories"} sx={{textDecoration: 'none',  color: theme.custom.myheader.text}}/>
                        <Btn path='/read/ma' msg={"M.A. Stories"} sx={{textDecoration: 'none',  color: theme.custom.myheader.text }}/>
                        <Btn path='/jdr' msg={"M.A. Game"} sx={{textDecoration: 'none',  color: theme.custom.myheader.text }}/>
                        <Btn path='/read/lexicon' msg={"Lexique Magique"} msg2={"Bestiaire"} sx={{textDecoration: 'none', color: theme.custom.myheader.text }}/>
                        <Btn path='/settings' msg={<SettingsIcon sx={{ color: theme.custom.myheader.text}}/>}/>
                        
                        <Btn onClick={()=>{
                            fetch('/api/logout', {
                                method: 'POST',
                                credentials: 'include', 
                            }).then(() => {
                                localStorage.removeItem("token");
                                setUser(null);
                                navigate("/");
                            });

                        }} msg={<LogoutIcon sx={{  color: theme.custom.myheader.text}} />}  sx={{textDecoration: 'none',  color: theme.custom.myheader.text }} />

                    </> : <Btn path={'/connexion'} msg={`Connexion`} msg2={`Inscription`} />}

                </Toolbar>

            </AppBar>



        </div>
    )
};
