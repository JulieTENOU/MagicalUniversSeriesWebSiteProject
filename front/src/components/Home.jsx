import { useContext } from 'react';
import '../index.css';
import '../general.css';
import Btn from '../components/Btn';
import logoMA from '../assets/img/ma.webp';
import Pile from "../assets/img/pile.png";
import { ConnexionContext } from '../components/provider';


export default function HomeCompo() {
    const {state: currentUser, setState: setCurrentUser, loading} = useContext(ConnexionContext);
    console.log(currentUser);
    return (
        <div className='main'>
            <div style={{  fontSize: "2em", width: '100vw', display: 'flex', flexDirection: 'row', position: 'fixed',left:0, bottom: '40vh', justifyContent: 'space-around', alignItems: 'center', alignContent:'space-around' }}>
                {currentUser ?
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-evenly',}}>
                    <h2 style={{color:'whitesmoke', position:'absolute', bottom: "25vh"}}>Welcome to your space <span>{currentUser.users_pseudo}</span></h2>
                    <div style={{display:'flex', flexDirection:'row', justifyContent: 'center', alignItems:'center', gap:'20vw', position:'relative', marginInline:'15vw' }}>
                        <Btn path='/read' msg="Go to your books" src={Pile} height={'100px'} sx={{ color: "white", /*marginInline:'15vw'*/ }} />
                        <Btn path='/jdr'  msg='Open your Holocom' src={logoMA} height={'100px'} width={'100px'} sx={{ color: "white",/* marginInline:'15vw'*/ }} />
                    </div>
                </div>  :
                    <div style={{ color: 'white', textAlign: 'center' }}>
                        Welcome to my univers dear visitor
                        <br />
                        If you wanna access my writings or the game please connect yourself with your codes
                        <br />
                        or feel free to sign up to start your adventure...
                        <br />
                        Everything is up to you !
                    </div>
                }
            </div>
        </div>
    )
};