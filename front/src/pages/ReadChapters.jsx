import { useContext } from 'react';
import '../index.css';
import '../general.css';
import Btn from '../components/Btn';
import Top from '../components/Header';
import BG from '../components/Background';
import logoReturn from "../assets/img/return.png"
import { Navigate } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';
import { ConnexionContext } from '../components/provider.jsx';


function ChaptersXalyt1() {

        const {state: isConnected, setState: setIsConnected, loading} = useContext(ConnexionContext);

    return (
        <div className='main'>
            <BG />
            <Top started={isConnected} />
            <div style={{ width: '90vw', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', top: '10vh', position: 'fixed',backdropFilter: "blur(20px)",height:'80vh', right:'5vw'  }}>

                <Btn onClick={Navigate(-1)} src={logoReturn} height={'100px'} color={'white'} sx={{position:'fixed', bottom:'10vh', color:'whitesmoke'}} />
                <Grid container spacing={2} top={'0'} >
                        <Typography variant='h4' style={{ color: 'whitesmoke', marginInline: "10px", position: 'absolute', top: '0', width: '15vw', textAlign: 'center' }}>Une arrivée mouvementée</Typography>
                        <div style={{ position: 'absolute', top: '10vh' }}>
                            <Btn path='/read/xalyt/1/0' msg='PROLOGUE' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/1' msg='CHAPITRE I : Transfert' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/2' msg='CHAPITRE II : Le haut conseil' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/3' msg='CHAPITRE III : Shaïna' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/4' msg='CHAPITRE IV : La forêt des ténèbres' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/5' msg='CHAPITRE V : Le lac bleu' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/6' msg='CHAPITRE VI : Rusaloshka' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/7' msg='CHAPITRE VII : La grotte de cristal' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/8' msg="CHAPITRE VIII : Le cristal d'Or" sx={{ color: '#B6D8F2' }} />
                        </div>
                </Grid>
                <Grid container spacing={2} top={'0'} >
                        <Typography variant='h4' style={{ color: 'whitesmoke', marginInline: "10px", position: 'absolute', top: '0', width: '15vw', textAlign: 'center' }}>Un nouveau monde à explorer</Typography>
                        <div style={{ position: 'absolute', top: '10vh' }}>
                            <Btn path='/read/xalyt/1/9' msg='CHAPITRE IX : Andreï' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/10' msg="CHAPITRE X : L'Eveil" sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/11' msg='CHAPITRE XI : Histoire du passé' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/12' msg='CHAPITRE XII : Passé effacé' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/13' msg="CHAPITRE XIII : Holo-com ? C'est quoi ça ?" sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/14' msg='CHAPITRE XIV : Damian & Mihya' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/15' msg="CHAPITRE XV : L'académie" sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/16' msg='CHAPITRE XVI : Leçon de contrôle' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/17' msg='CHAPITRE XVII : Mal du pays' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/18' msg='CHAPITRE XVIII : Généralités' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/19' msg='CHAPITRE XIX : Terra Antes' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/20' msg='CHAPITRE XX : Augustin' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/21' msg='CHAPITRE XXI : Xento-quoi ?' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/22' msg='CHAPITRE XXII : Parents de substitution' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/23' msg='CHAPITRE XXIII : Histoire de la magie' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/24' msg='CHAPITRE XXIV : La Grande Guerre Magique' sx={{ color: '#B6D8F2' }} />
                        </div>
                </Grid>
                <Grid container spacing={2} top={'0'}>
                        <Typography variant='h4' style={{ color: 'whitesmoke', marginInline: "10px", position: 'absolute', top: '0', width: '15vw', textAlign: 'center' }}>Des aventures qui commencent</Typography>
                        <div style={{ position: 'absolute', top: '10vh'}}>
                            <Btn path='/read/xalyt/1/25' msg='CHAPITRE XXV : Le Noyaux' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/26' msg='CHAPITRE XXVI : Gardienne' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/27' msg='CHAPITRE XXVII : Première mission' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/28' msg='CHAPITRE XXVIII : Faux espoirs' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/29' msg='CHAPITRE XXIX : Accalmie' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/30' msg='CHAPITRE XXX : Ennemis' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/31' msg='CHAPITRE XXXI : Instincts' sx={{ color: '#B6D8F2' }} />
                        </div>
                </Grid>
                <Grid container spacing={2} top={'0'}>
                        <Typography variant='h4' style={{ color: 'whitesmoke', marginInline: "10px", position: 'absolute', top: '0', width: '15vw', textAlign: 'center' }}>Ce n'est que le début</Typography>
                        <div style={{ position: 'absolute', top: '10vh'}}>
                            <Btn path='/read/xalyt/1/32' msg='CHAPITRE XXXII : Rêves' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/33' msg='CHAPITRE XXXIII : Cristal de Lune' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/34' msg='CHAPITRE XXXIV : Tiboï ?' sx={{ color: '#B6D8F2' }} />
                            <Btn path='/read/xalyt/1/35' msg='EPILOGUE' sx={{ color: '#B6D8F2' }} />
                        </div>
                </Grid>
            </div>

        </div>
    )
}
export default ChaptersXalyt1;