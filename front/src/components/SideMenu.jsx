import { Drawer, Box, IconButton, Divider, Button, Grid, List,  Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import ModifierDialogs from "./ModifierComp";
import { useTheme } from "@mui/material/styles";



export default function SideMenu(character) {
      const theme = useTheme();
    console.log(character);
    console.log(character.character);
    const perso = character.character;
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isWeapons, setIsWeapons] = useState(false);
    const [isDivers, setIsDivers] = useState(false);
    const [isScience, setIsScience] = useState(false);
    const [isMagic, setIsMagic] = useState(false);
    const [isCarac, setIsCarac] = useState(false);
    const [isRang1, setIsRang1] = useState(false);
    const [isRang2, setIsRang2] = useState(false);
    const [isRang3, setIsRang3] = useState(false);
    const [isRangA, setIsRangA] = useState(false);
    const [isLang, setIsLang] = useState(false);
    const [classique, setClassique] = useState(false);
    const [xalytien, setXalytien] = useState(false);
    const [xentokolien, setXentokolien] = useState(false);
    const [zenolm, setZenolm] = useState(false);
    const [planaire, setPlanaire] = useState(false);
    const [raciale, setRaciale] = useState(false);
    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
      };
    return (
        <div>
            <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={() => setIsDrawerOpen(true)} sx={{ width: '50px', position: 'fixed', right: "0vw", top:'9vh' }} >
                {isDrawerOpen ? <></> :
                    <PsychologyAltOutlinedIcon sx={{ color: "white" }} />}
            </IconButton>
            <Drawer className="drawer" BackdropProps={{ style: { backdropFilter: "none", opacity:0 } }} PaperProps={{ sx: { 
           backgroundColor:theme.custom.mycustomblur.main, 
           backdropFilter: theme.custom.mycustomblur.blur, top:"5vh", textAlign: 'center', width: "40%", borderRadius:"25px" } }} anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>

                <Box p={2} width='250px' sx={{ backdropFilter: "none", top: '15vh', width: '100%' }} textAlign={'center'} role="presentation">
                    <Grid container spacing={2} width='100%'>
                        <List>
                            <Button variant="h4" onClick={() => setIsCarac(!isCarac)} sx={{
               color: theme.custom.mycustomblur.text , }}>
                                Caractéristiques
                            </Button>
                            {isCarac &&
                                <div style={{ textAlign: "left",
               color: theme.custom.mycustomblur.text ,marginInline:"5px"  }}>
                                    <Table className="comptab">
                                        <TableBody>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Force</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Force_character}<ModifierDialogs character={character} name={"force"}  left={'40%'} dataToUpdate={'Force'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Dextérité</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Dexte_character }<ModifierDialogs character={character} name={"dexte"}  left={'40%'} dataToUpdate={'Dextérité'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Résistance</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Resistance_character }<ModifierDialogs character={character} name={"resistance"}  left={'40%'} dataToUpdate={'Résistance'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Résilience</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Resilience_character }<ModifierDialogs character={character} name={"resilience"}  left={'40%'} dataToUpdate={'Résilience'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Intelligence</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Intell_character }<ModifierDialogs character={character} name={"intell"}  left={'40%'} dataToUpdate={'Intelligence'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Charisme</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Charisme_character }<ModifierDialogs character={character} name={"charisme"}  left={'40%'} dataToUpdate={'Charisme'}/></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                    <Divider />
                                    <Table className="comptab">
                                        <TableBody>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Bien</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Bien_character }<ModifierDialogs character={character} name={"bien"}  left={'40%'} dataToUpdate={'Bien'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Mal</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Mal_character }<ModifierDialogs character={character} name={"mal"}  left={'40%'} dataToUpdate={'Mal'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Instinct</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Instinct_character }<ModifierDialogs character={character} name={"instinct"}  left={'40%'} dataToUpdate={'Instinct'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Survie</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Survie_character }<ModifierDialogs character={character} name={"survie"}  left={'40%'} dataToUpdate={'Survie'}/></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>}
                        </List>
                        <Divider orientation="vertical" flexItem/>
                        <List>
                            <Button variant="h4" onClick={() => setIsLang(!isLang)} sx={{ 
               color: theme.custom.mycustomblur.text ,}}>
                                Langues
                            </Button>
                            {isLang &&
                                <div style={{ textAlign: "left",
               color: theme.custom.mycustomblur.text , marginInline:"5px"  }}>
                                    <Button variant="h5" onClick={() => setClassique(!classique)} sx={{ 
               color: theme.custom.mycustomblur.text ,}}>
                                        Classiques
                                    </Button>
                                    {classique &&
                                     <div style={{ textAlign: "left", 
               color: theme.custom.mycustomblur.text , marginInline:"5px"  }}>
                                        <Table className="comptab">
                                            <TableBody>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Démonique</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Demonique_character}<ModifierDialogs character={character} name={"démonique"}  left={'40%'} dataToUpdate={'Langue Démonique'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Draconique</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Draconique_character}<ModifierDialogs character={character} name={"draconique"}  left={'40%'} dataToUpdate={'Langue Draconique'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Xalytien</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Xalytien_character}<ModifierDialogs character={character} name={"xalytien"}  left={'40%'} dataToUpdate={'Xalytien'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Xentokolien</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Xento_character }<ModifierDialogs character={character} name={"xento"}  left={'40%'} dataToUpdate={'Xentokolien'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Zenolm</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Zenolm_character }<ModifierDialogs character={character} name={"zenolm"}  left={'40%'} dataToUpdate={'Zenolm'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Justiccel</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Justiccel_character }<ModifierDialogs character={character} name={"justiccel"}  left={'40%'} dataToUpdate={'Justiccel'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Cerebrov</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Cerebrov_character }<ModifierDialogs character={character} name={"cerebrov"}  left={'40%'} dataToUpdate={'Cérébrov'}/></TableCell>
                                            </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                    }
                                    <Divider/>
                                    <Button variant="h5" onClick={() => setXalytien(!xalytien)} sx={{ 
               color: theme.custom.mycustomblur.text , }}>
                                        Langues Arachaïques
                                    </Button>
                                    {xalytien &&
                                     <div style={{ textAlign: "left",
               color: theme.custom.mycustomblur.text , marginInline:"5px"  }}>
                                        <Table className="comptab">
                                            <TableBody>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Xalytien Archaïque</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.XalytienArchaique_character }<ModifierDialogs character={character} name={"xaArch"}  left={'40%'} dataToUpdate={'Xalytien Archaïque'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Xentokolien Archaïque</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.XentoArchaique_character}<ModifierDialogs character={character} name={"xenArch"}  left={'40%'} dataToUpdate={'Xentokolien Archaïque'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Zenolm Archaïque</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.ZenolmArchaique_character }<ModifierDialogs character={character} name={"zenArch"}  left={'40%'} dataToUpdate={'Zenolm Archaïque'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Justiccel Arachaïque</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.JusticcelArchaique_character }<ModifierDialogs character={character} name={"justiArch"}  left={'40%'} dataToUpdate={'Justiccel Archaïque'}/></TableCell>
                                            </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                    }
                                    <Divider/>
                                    <Button variant="h5" onClick={() => setXentokolien(!xentokolien)} sx={{
               color: theme.custom.mycustomblur.text , }}>
                                        Langues Antiques
                                    </Button>
                                    {xentokolien &&
                                    <div style={{ textAlign: "left", 
               color: theme.custom.mycustomblur.text , marginInline:"5px"  }}>
                                        <Table className="comptab">
                                            <TableBody>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Xalytien Antique</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.XalytienAntique_character }<ModifierDialogs character={character} name={"xaAnt"}  left={'40%'} dataToUpdate={'Xalytien Antique'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp"> Xentokolien Antique</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.XentoAntique_character }<ModifierDialogs character={character} name={"xenAnt"}  left={'40%'} dataToUpdate={'Xentokolien Antique'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Zenolm Antique</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.ZenolmAntique_character }<ModifierDialogs character={character} name={"zenAnt"}  left={'40%'} dataToUpdate={'Zenolm Antique'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Justiccel Antique</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.JusticcelAntique_character }<ModifierDialogs character={character} name={"justiAnt"}  left={'40%'} dataToUpdate={'Justiccel Antique'}/></TableCell>
                                            </TableRow>
                                            </TableBody>
                                        </Table>

                                    </div>
                                    }
                                    <Divider/>
                                    <Button variant="h5" onClick={() => setZenolm(!zenolm)} sx={{ 
               color: theme.custom.mycustomblur.text ,}}>
                                        Langues Démoniques
                                    </Button>
                                    {zenolm &&
                                     <div style={{ textAlign: "left", 
               color: theme.custom.mycustomblur.text , marginInline:"5px"  }}>
                                        <Table className="comptab">
                                            <TableBody>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Xalytien Démonique</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.XalytienDemonique_character}<ModifierDialogs character={character} name={"xaDem"}  left={'40%'} dataToUpdate={'Xalytien Démonique'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Xentokolien Démonique</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.XentoDemonique_character}<ModifierDialogs character={character} name={"xenDem"}  left={'40%'} dataToUpdate={'Xentokolien Démonique'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Zenolm Démonique</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.ZenolmDemonique_character}<ModifierDialogs character={character} name={"ZenDem"}  left={'40%'} dataToUpdate={'Zenolm Démonique'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Justiccel Démonique</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.JusticcelDemonique_character}<ModifierDialogs character={character} name={"JustiDem"}  left={'40%'} dataToUpdate={'Justiccel Démonique'}/></TableCell>
                                            </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                    }
                                    <Divider/>
                                    <Button variant="h5" onClick={() => setRaciale(!raciale)} sx={{ 
               color: theme.custom.mycustomblur.text ,}}>
                                        Raciales
                                    </Button>
                                    {raciale &&
                                     <div style={{ textAlign: "left",
               color: theme.custom.mycustomblur.text , marginInline:"5px"  }}>
                                        <Table className="comptab">
                                            <TableBody>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Zombique</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Zombique_character}<ModifierDialogs character={character} name={"zombique"}  left={'40%'} dataToUpdate={'Zombique'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Faerik</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Faerik_character}<ModifierDialogs character={character} name={"faerik"}  left={'40%'} dataToUpdate={'Faerik'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Elfik</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Elfik_character}<ModifierDialogs character={character} name={"elfik"}  left={'40%'} dataToUpdate={'Elfik'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Nanien</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Nanien_character}<ModifierDialogs character={character} name={"nanien"}  left={'40%'} dataToUpdate={'Nanien'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Gnomique</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Gnomique_character}<ModifierDialogs character={character} name={"gnomique"}  left={'40%'} dataToUpdate={'Gnomique'}/></TableCell>
                                            </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                    }
                                    <Divider/>
                                    <Button variant="h5" onClick={() => setPlanaire(!planaire)} sx={{ 
               color: theme.custom.mycustomblur.text ,}}>
                                        Planaires
                                    </Button>
                                    {planaire &&
                                     <div style={{ textAlign: "left", 
               color: theme.custom.mycustomblur.text , marginInline:"5px"  }}>
                                        <Table className="comptab">
                                            <TableBody>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Spectrale</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Spectrale_character}<ModifierDialogs character={character} name={"spectrale"}  left={'40%'} dataToUpdate={'Langue Spectrale'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Astrale</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Astrale_character}<ModifierDialogs character={character} name={"astrale"}  left={'40%'} dataToUpdate={'Langue Astrale'}/></TableCell>
                                            </TableRow>
                                            </TableBody>
                                        </Table>
                                        <Divider/>
                                        <Table className="comptab">
                                            <TableBody>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Ténébriale</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Tenebriale_character }<ModifierDialogs character={character} name={"tenebriale"}  left={'40%'} dataToUpdate={'Ténébriale'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Noyale</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Noyale_character}<ModifierDialogs character={character} name={"noyale"}  left={'40%'} dataToUpdate={'Noyale'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Elémentale</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Elementale_character}<ModifierDialogs character={character} name={"elementale"}  left={'40%'} dataToUpdate={'Elementale'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Céleste</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Celeste_character}<ModifierDialogs character={character} name={"celeste"}  left={'40%'} dataToUpdate={'Celeste'}/></TableCell>
                                            </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                    }
                                </div>}
                        </List>
                        <Divider orientation="vertical" flexItem/>
                        <List>
                            <Button variant="h6" onClick={() => setIsWeapons(!isWeapons)} sx={{ 
               color: theme.custom.mycustomblur.text , }}>Armes</Button>
                            {isWeapons && <div style={{ textAlign: "left",
               color: theme.custom.mycustomblur.text , marginInline:"5px"  }}>
                                <Table className="comptab">
                                    <TableBody>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Arcs</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Arcs_character }<ModifierDialogs character={character} name={"arcs"}  left={'40%'} dataToUpdate={'Arcs'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Tir</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Tir_character }<ModifierDialogs character={character} name={"tir"}  left={'40%'} dataToUpdate={'Tir'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Mains nues</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.MainsNues_character}<ModifierDialogs character={character} name={"mainsNues"}  left={'40%'} dataToUpdate={'Mains Nues'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Jet</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Jets_character }<ModifierDialogs character={character} name={"jets"}  left={'40%'} dataToUpdate={'Jets'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Armes d'Hast</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.ArmesHast_character}<ModifierDialogs character={character} name={"hast"}  left={'40%'} dataToUpdate={"Armes d'Hast"}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Lames courtes</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Courtes_character }<ModifierDialogs character={character} name={"courtes"}  left={'40%'} dataToUpdate={'Lames courtes'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Lames longues</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Longues_character }<ModifierDialogs character={character} name={"longues"}  left={'40%'} dataToUpdate={'Lames longues'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Esquive</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Esquive_character}<ModifierDialogs character={character} name={"esquive"}  left={'40%'} dataToUpdate={'Esquive'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Parade</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Parade_character}<ModifierDialogs character={character} name={"parade"}  left={'40%'} dataToUpdate={'Parade'}/></TableCell>
                                            </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                            }
                        </List>
                        <Divider orientation="vertical" flexItem/>
                        <List>
                            <Button variant="h6" onClick={() => setIsDivers(!isDivers)} sx={{
               color: theme.custom.mycustomblur.text , }}>Diverses</Button>
                            {isDivers && <div style={{ textAlign: "left", 
               color: theme.custom.mycustomblur.text ,marginInline:"5px"  }} >
                                <Table className="comptab">
                                    <TableBody>
                                    <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Chant</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Chant_character }<ModifierDialogs character={character} name={"chant"}  left={'40%'} dataToUpdate={'Chant'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Chasse</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Chasse_character}<ModifierDialogs character={character} name={"chasse"}  left={'40%'} dataToUpdate={'Chasse'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Course</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Course_character}<ModifierDialogs character={character} name={"course"}  left={'40%'} dataToUpdate={'Course'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Crochetage</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Crochetage_character}<ModifierDialogs character={character} name={"crochetage"}  left={'40%'} dataToUpdate={'Crochetage'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Déquisement</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Deguisement_character}<ModifierDialogs character={character} name={"deguisement"}  left={'40%'} dataToUpdate={'Déguisement'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Discrétion</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Discretion_character}<ModifierDialogs character={character} name={"discretion"}  left={'40%'} dataToUpdate={'Discrétion'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Eloquence</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Eloquance_character}<ModifierDialogs character={character} name={"eloquance"}  left={'40%'} dataToUpdate={'Eloquance'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Equitation</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Equitation_character}<ModifierDialogs character={character} name={"equitation"}  left={'40%'} dataToUpdate={'Equitation'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Escalade</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Escalade_character }<ModifierDialogs character={character} name={"escalade"}  left={'40%'} dataToUpdate={'Escalade'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Hypnose</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Hypnose_character }<ModifierDialogs character={character} name={"hypnose"}  left={'40%'} dataToUpdate={'Hypnose'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Nage</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Nage_character}<ModifierDialogs character={character} name={"nage"}  left={'40%'} dataToUpdate={'Nage'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Observation</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Observation_character}<ModifierDialogs character={character} name={"observation"}  left={'40%'} dataToUpdate={'Observation'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Pièges</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Pieges_character}<ModifierDialogs character={character} name={"pieges"}  left={'40%'} dataToUpdate={'Pieges'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Professorat</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Professorat_character}<ModifierDialogs character={character} name={"professorat"}  left={'40%'} dataToUpdate={'Professorat'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Saut</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Saut_character}<ModifierDialogs character={character} name={"saut"}  left={'40%'} dataToUpdate={'Saut'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Soin</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Soin_character}<ModifierDialogs character={character} name={"soin"}  left={'40%'} dataToUpdate={'Soin'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Télékinésie</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Telekinesie_character}<ModifierDialogs character={character} name={"telekine"}  left={'40%'} dataToUpdate={'Télékinésie'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Vigilence</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Vigilence_character}<ModifierDialogs character={character} name={"vigi"}  left={'40%'} dataToUpdate={'Vigilance'}/></TableCell>
                                            </TableRow>
                                    </TableBody>
                                </Table>
                                <Divider />
                            </div>
                            }
                        </List>
                        <Divider orientation="vertical" flexItem/>
                        <List style={{marginRight:"5px"}}>
                            <Button variant="h6" onClick={() => setIsScience(!isScience)} sx={{ 
               color: theme.custom.mycustomblur.text , }}>Sciences</Button>
                            {isScience && <div style={{ textAlign: "left", 
               color: theme.custom.mycustomblur.text , marginInline:"5px" }}>
                                <Table className="comptab">
                                    <TableBody>
                                    <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Magico-tech</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.MagicoTech_character }<ModifierDialogs character={character} name={"magicotech"}  left={'40%'} dataToUpdate={'Magico-tech'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Cartographie</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Cartographie_character }<ModifierDialogs character={character} name={"carto"}  left={'40%'} dataToUpdate={'Cartographie'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Herboristerie</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Herboristerie_character }<ModifierDialogs character={character} name={"herbo"}  left={'40%'} dataToUpdate={'Herboristerie'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Médecine</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Medecine_character}<ModifierDialogs character={character} name={"medecine"}  left={'40%'} dataToUpdate={'Médecine'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Potions</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Potions_character}<ModifierDialogs character={character} name={"popo"}  left={'40%'} dataToUpdate={'Potions'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Théorie des magies</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.TheorieMagique_character}<ModifierDialogs character={character} name={"theoMag"}  left={'40%'} dataToUpdate={'Théorie Magique'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Histoire Magique</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.HistoireMagique_character}<ModifierDialogs character={character} name={"histoMag"}  left={'40%'} dataToUpdate={'Histoire Magique'}/></TableCell>
                                            </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                            }
                        </List>
                        <Divider orientation="vertical" flexItem/>
                        <List>
                            <Button variant="h6" onClick={() => setIsMagic(!isMagic)} sx={{ 
               color: theme.custom.mycustomblur.text , }}>Magies</Button>
                            {isMagic && <Grid container spacing={2} style={{ textAlign: "center", 
               color: theme.custom.mycustomblur.text , marginLeft:'5px' }}>
                                <List>
                                    <Button variant="h8" onClick={() => setIsRang1(!isRang1)} sx={{
               color: theme.custom.mycustomblur.text , }}> Elementaire </Button>
                                    {isRang1 && <div style={{ textAlign: "left",
               color: theme.custom.mycustomblur.text ,marginInline:"5px" }}>
                                        <Table className="comptab">
                                            <TableBody>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Air</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.MagieAir_character }<ModifierDialogs character={character} name={"air"}  left={'40%'} dataToUpdate={"Magie d'air"}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Eau</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.MagieEau_character}<ModifierDialogs character={character} name={"eau"}  left={'40%'} dataToUpdate={"Magie d'eau"}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Feu</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.MagieFeu_character}<ModifierDialogs character={character} name={"feu"}  left={'40%'} dataToUpdate={"Magie de Feu"}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Terre</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.MagieTerre_character}<ModifierDialogs character={character} name={"terre"}  left={'40%'} dataToUpdate={'Magie de Terre'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Electricité</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.MagieElec_character}<ModifierDialogs character={character} name={"elec"}  left={'40%'} dataToUpdate={"Magie d'Elec"}/></TableCell>
                                            </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>}
                                </List>
                        <Divider orientation="vertical" flexItem/>
                                <List>
                                    <Button variant="h8" onClick={() => setIsRang2(!isRang2)} sx={{ 
               color: theme.custom.mycustomblur.text , }}> Psychique </Button>
                                    {isRang2 && <div style={{ textAlign: "left", 
               color: theme.custom.mycustomblur.text , marginInline:"5px"  }}>
                                        <Table className="comptab">
                                            <TableBody>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Création</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.Crea_character }<ModifierDialogs character={character} name={"crea"}  left={'40%'} dataToUpdate={'Magie de Création'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Psy Interne</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.PsyInt_character}<ModifierDialogs character={character} name={"psyInt"}  left={'40%'} dataToUpdate={'Magie Psy Interne'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Psy Personnel</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.PsyPerso_character}<ModifierDialogs character={character} name={"psyPerso"}  left={'40%'} dataToUpdate={'Magie Psy Personnel'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Psy Externe</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.PsyExt_character }<ModifierDialogs character={character} name={"PsyExt"}  left={'40%'} dataToUpdate={'Magie Psy Externe'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">Psy Interpersonnel</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }} className="comp">{perso.PsyInterperso_character }<ModifierDialogs character={character} name={"PsyInterperso"}  left={'40%'} dataToUpdate={'Magie Psy Interpersonnel'}/></TableCell>
                                            </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>}
                                </List>
                        <Divider orientation="vertical" flexItem/>
                                <List>
                                    <Button variant="h8" onClick={() => setIsRang3(!isRang3)} sx={{ 
               color: theme.custom.mycustomblur.text , }}> Energétique </Button>
                                    {isRang3 && <div style={{ textAlign: "left", 
               color: theme.custom.mycustomblur.text , marginInline:"5px"  }}>
                                            <Table className="comptab">
                                                <TableBody>
                                                    <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}  >
                                                        <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }}  className="comp">Vie</TableCell>
                                                        <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }}  className="comp">{perso.MagieVie_character}<ModifierDialogs character={character} name={"vie"}  left={'40%'} dataToUpdate={'Magie de Vie'}/></TableCell>
                                                    </TableRow>
                                                    <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }} >
                                                        <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }}  className="comp">Mort</TableCell>
                                                        <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }}  className="comp">{perso.Mort_character}<ModifierDialogs character={character} name={"mort"}  left={'40%'} dataToUpdate={'Magie de mort'}/></TableCell>
                                                    </TableRow>
                                                    <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }} >
                                                        <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }}  className="comp">Temps</TableCell>
                                                        <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }}  className="comp">{perso.Temps_character }<ModifierDialogs character={character} name={"temps"}  left={'40%'} dataToUpdate={'Magie de Temps'}/></TableCell>
                                                    </TableRow>
                                                    <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }} >
                                                        <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }}  className="comp">Lumière</TableCell>
                                                        <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }}  className="comp">{perso.Lumière_character }<ModifierDialogs character={character} name={"lumiere"}  left={'40%'} dataToUpdate={'Magie de Lumière'}/></TableCell>
                                                    </TableRow>
                                                    <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }} >
                                                    <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }}  className="comp">Ténèbres</TableCell>
                                                    <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }}  className="comp">{perso.Tenebres_character }<ModifierDialogs character={character} name={"tenebre"}  left={'40%'} dataToUpdate={'Magie des Ténèbres'}/></TableCell>
                                                    </TableRow>
                                                    <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }} >
                                                    <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }}  className="comp">Cosmos</TableCell>
                                                    <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }}  className="comp">{perso.Cosmos_character}<ModifierDialogs character={character} name={"cosmos"}  left={'40%'} dataToUpdate={'Magie de Cosmos'}/></TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>}
                                </List>
                        <Divider orientation="vertical" flexItem/>
                                <List>
                                    <Button variant="h8" onClick={() => setIsRangA(!isRangA)} sx={{ 
               color: theme.custom.mycustomblur.text , }}> Planaire </Button>
                                    {isRangA && <div style={{ textAlign: "left",
               color: theme.custom.mycustomblur.text , marginInline:"5px"  }}>
                                        <Table>
                                            <TableBody>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }} >
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }}  className="comp">Invocation</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }}  className="comp">{perso.Invoc_character}<ModifierDialogs character={character} name={"invoc"}  left={'40%'} dataToUpdate={"Magie d'invocation"}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }} >
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }}  className="comp">Aura</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }}  className="comp">{perso.AuraLectrice_character }<ModifierDialogs character={character} name={"aura"}  left={'40%'} dataToUpdate={'armure'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }} >
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }}  className="comp">Magie Astrale</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }}  className="comp">{perso.MagieAstrale_character }<ModifierDialogs character={character} name={"magieAstrale"}  left={'40%'} dataToUpdate={'Magie Astrale'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }} >
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }}  className="comp">Magie Spectrale</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }}  className="comp">{perso.MagieSpectrale_character }<ModifierDialogs character={character} name={"magieSpectrale"}  left={'40%'} dataToUpdate={'Magie Spectrale'}/></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }} >
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }}  className="comp">Magie draconique</TableCell>
                                                <TableCell sx={{ color: theme.custom.mycustomblur.text,  border: theme.custom.mycustomblur.tableborder, }}  className="comp">{perso.MagieDraconique_character }<ModifierDialogs character={character} name={"magieDraconique"}  left={'40%'} dataToUpdate={'Magie Draconique'}/></TableCell>
                                            </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>}
                                </List>
                               </Grid>
                            }
                        </List>
                    </Grid>
                </Box>
                        <IconButton onClick={handleDrawerClose} sx={{position:'fixed', right:'0vw',top:'9vh'}}>
                            <CloseIcon  sx={{ color: theme.custom.mycustomblur.text,  }} />
                        </IconButton>
            </Drawer>
        </div>
    )
}