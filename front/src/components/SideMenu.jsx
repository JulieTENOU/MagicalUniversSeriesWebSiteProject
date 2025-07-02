import { Drawer, Box, IconButton, Divider, Button, Grid, List } from "@mui/material";
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import ModifierDialogs from "./ModifierComp";


export default function SideMenu(character) {
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
            <Drawer className="drawer" BackdropProps={{ style: { backdropFilter: "none", opacity:0 } }} PaperProps={{ sx: { backgroundColor: "transparent",top:"5vh", textAlign: 'center', width: "40%", borderRadius:"25px" } }} anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>

                <Box p={2} width='250px' sx={{ backdropFilter: "none", top: '15vh', width: '100%' }} textAlign={'center'} role="presentation">
                    <Grid container spacing={2} width='100%'>
                        <List>
                            <Button variant="h4" onClick={() => setIsCarac(!isCarac)} sx={{ color: "whitesmoke" }}>
                                Caractéristiques
                            </Button>
                            {isCarac &&
                                <div style={{ textAlign: "left", color: "whitesmoke", marginInline:"5px"  }}>
                                    <table className="comptab">
                                        <tbody>
                                            <tr>
                                                <td className="comp">Force</td>
                                                <td className="comp">{perso.Force_character}<ModifierDialogs character={character} name={"force"}  left={'40%'} dataToUpdate={'Force'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Dextérité</td>
                                                <td className="comp">{perso.Dexte_character }<ModifierDialogs character={character} name={"dexte"}  left={'40%'} dataToUpdate={'Dextérité'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Résistance</td>
                                                <td className="comp">{perso.Resistance_character }<ModifierDialogs character={character} name={"resistance"}  left={'40%'} dataToUpdate={'Résistance'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Résilience</td>
                                                <td className="comp">{perso.Resilience_character }<ModifierDialogs character={character} name={"resilience"}  left={'40%'} dataToUpdate={'Résilience'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Intelligence</td>
                                                <td className="comp">{perso.Intell_character }<ModifierDialogs character={character} name={"intell"}  left={'40%'} dataToUpdate={'Intelligence'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Charisme</td>
                                                <td className="comp">{perso.Charisme_character }<ModifierDialogs character={character} name={"charisme"}  left={'40%'} dataToUpdate={'Charisme'}/></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <Divider />
                                    <table className="comptab">
                                        <tbody>
                                            <tr>
                                                <td className="comp">Bien</td>
                                                <td className="comp">{perso.Bien_character }<ModifierDialogs character={character} name={"bien"}  left={'40%'} dataToUpdate={'Bien'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Mal</td>
                                                <td className="comp">{perso.Mal_character }<ModifierDialogs character={character} name={"mal"}  left={'40%'} dataToUpdate={'Mal'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Instinct</td>
                                                <td className="comp">{perso.Instinct_character }<ModifierDialogs character={character} name={"instinct"}  left={'40%'} dataToUpdate={'Instinct'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Survie</td>
                                                <td className="comp">{perso.Survie_character }<ModifierDialogs character={character} name={"survie"}  left={'40%'} dataToUpdate={'Survie'}/></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>}
                        </List>
                        <Divider orientation="vertical" flexItem/>
                        <List>
                            <Button variant="h4" onClick={() => setIsLang(!isLang)} sx={{ color: "whitesmoke" }}>
                                Langues
                            </Button>
                            {isLang &&
                                <div style={{ textAlign: "left", color: "whitesmoke", marginInline:"5px"  }}>
                                    <Button variant="h5" onClick={() => setClassique(!classique)} sx={{ color: "whitesmoke" }}>
                                        Classiques
                                    </Button>
                                    {classique &&
                                     <div style={{ textAlign: "left", color: "whitesmoke", marginInline:"5px"  }}>
                                        <table className="comptab">
                                            <tbody>
                                            <tr>
                                                <td className="comp">Démonique</td>
                                                <td className="comp">{perso.Demonique_character}<ModifierDialogs character={character} name={"démonique"}  left={'40%'} dataToUpdate={'Langue Démonique'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Draconique</td>
                                                <td className="comp">{perso.Draconique_character}<ModifierDialogs character={character} name={"draconique"}  left={'40%'} dataToUpdate={'Langue Draconique'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Xalytien</td>
                                                <td className="comp">{perso.Xalytien_character}<ModifierDialogs character={character} name={"xalytien"}  left={'40%'} dataToUpdate={'Xalytien'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Xentokolien</td>
                                                <td className="comp">{perso.Xento_character }<ModifierDialogs character={character} name={"xento"}  left={'40%'} dataToUpdate={'Xentokolien'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Zenolm</td>
                                                <td className="comp">{perso.Zenolm_character }<ModifierDialogs character={character} name={"zenolm"}  left={'40%'} dataToUpdate={'Zenolm'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Justiccel</td>
                                                <td className="comp">{perso.Justiccel_character }<ModifierDialogs character={character} name={"justiccel"}  left={'40%'} dataToUpdate={'Justiccel'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Cerebrov</td>
                                                <td className="comp">{perso.Cerebrov_character }<ModifierDialogs character={character} name={"cerebrov"}  left={'40%'} dataToUpdate={'Cérébrov'}/></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    }
                                    <Divider/>
                                    <Button variant="h5" onClick={() => setXalytien(!xalytien)} sx={{ color: "whitesmoke" }}>
                                        Langues Arachaïques
                                    </Button>
                                    {xalytien &&
                                     <div style={{ textAlign: "left", color: "whitesmoke", marginInline:"5px"  }}>
                                        <table className="comptab">
                                            <tbody>
                                            <tr>
                                                <td className="comp">Xalytien Archaïque</td>
                                                <td className="comp">{perso.XalytienArchaique_character }<ModifierDialogs character={character} name={"xaArch"}  left={'40%'} dataToUpdate={'Xalytien Archaïque'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Xentokolien Archaïque</td>
                                                <td className="comp">{perso.XentoArchaique_character}<ModifierDialogs character={character} name={"xenArch"}  left={'40%'} dataToUpdate={'Xentokolien Archaïque'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Zenolm Archaïque</td>
                                                <td className="comp">{perso.ZenolmArchaique_character }<ModifierDialogs character={character} name={"zenArch"}  left={'40%'} dataToUpdate={'Zenolm Archaïque'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Justiccel Arachaïque</td>
                                                <td className="comp">{perso.JusticcelArchaique_character }<ModifierDialogs character={character} name={"justiArch"}  left={'40%'} dataToUpdate={'Justiccel Archaïque'}/></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    }
                                    <Divider/>
                                    <Button variant="h5" onClick={() => setXentokolien(!xentokolien)} sx={{ color: "whitesmoke" }}>
                                        Langues Antiques
                                    </Button>
                                    {xentokolien &&
                                    <div style={{ textAlign: "left", color: "whitesmoke", marginInline:"5px"  }}>
                                        <table className="comptab">
                                            <tbody>
                                            <tr>
                                                <td className="comp">Xalytien Antique</td>
                                                <td className="comp">{perso.XalytienAntique_character }<ModifierDialogs character={character} name={"xaAnt"}  left={'40%'} dataToUpdate={'Xalytien Antique'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp"> Xentokolien Antique</td>
                                                <td className="comp">{perso.XentoAntique_character }<ModifierDialogs character={character} name={"xenAnt"}  left={'40%'} dataToUpdate={'Xentokolien Antique'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Zenolm Antique</td>
                                                <td className="comp">{perso.ZenolmAntique_character }<ModifierDialogs character={character} name={"zenAnt"}  left={'40%'} dataToUpdate={'Zenolm Antique'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Justiccel Antique</td>
                                                <td className="comp">{perso.JusticcelAntique_character }<ModifierDialogs character={character} name={"justiAnt"}  left={'40%'} dataToUpdate={'Justiccel Antique'}/></td>
                                            </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    }
                                    <Divider/>
                                    <Button variant="h5" onClick={() => setZenolm(!zenolm)} sx={{ color: "whitesmoke" }}>
                                        Langues Démoniques
                                    </Button>
                                    {zenolm &&
                                     <div style={{ textAlign: "left", color: "whitesmoke", marginInline:"5px"  }}>
                                        <table className="comptab">
                                            <tbody>
                                            <tr>
                                                <td className="comp">Xalytien Démonique</td>
                                                <td className="comp">{perso.XalytienDemonique_character}<ModifierDialogs character={character} name={"xaDem"}  left={'40%'} dataToUpdate={'Xalytien Démonique'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Xentokolien Démonique</td>
                                                <td className="comp">{perso.XentoDemonique_character}<ModifierDialogs character={character} name={"xenDem"}  left={'40%'} dataToUpdate={'Xentokolien Démonique'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Zenolm Démonique</td>
                                                <td className="comp">{perso.ZenolmDemonique_character}<ModifierDialogs character={character} name={"ZenDem"}  left={'40%'} dataToUpdate={'Zenolm Démonique'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Justiccel Démonique</td>
                                                <td className="comp">{perso.JusticcelDemonique_character}<ModifierDialogs character={character} name={"JustiDem"}  left={'40%'} dataToUpdate={'Justiccel Démonique'}/></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    }
                                    <Divider/>
                                    <Button variant="h5" onClick={() => setRaciale(!raciale)} sx={{ color: "whitesmoke" }}>
                                        Raciales
                                    </Button>
                                    {raciale &&
                                     <div style={{ textAlign: "left", color: "whitesmoke", marginInline:"5px"  }}>
                                        <table className="comptab">
                                            <tbody>
                                            <tr>
                                                <td className="comp">Zombique</td>
                                                <td className="comp">{perso.Zombique_character}<ModifierDialogs character={character} name={"zombique"}  left={'40%'} dataToUpdate={'Zombique'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Faerik</td>
                                                <td className="comp">{perso.Faerik_character}<ModifierDialogs character={character} name={"faerik"}  left={'40%'} dataToUpdate={'Faerik'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Elfik</td>
                                                <td className="comp">{perso.Elfik_character}<ModifierDialogs character={character} name={"elfik"}  left={'40%'} dataToUpdate={'Elfik'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Nanien</td>
                                                <td className="comp">{perso.Nanien_character}<ModifierDialogs character={character} name={"nanien"}  left={'40%'} dataToUpdate={'Nanien'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Gnomique</td>
                                                <td className="comp">{perso.Gnomique_character}<ModifierDialogs character={character} name={"gnomique"}  left={'40%'} dataToUpdate={'Gnomique'}/></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    }
                                    <Divider/>
                                    <Button variant="h5" onClick={() => setPlanaire(!planaire)} sx={{ color: "whitesmoke" }}>
                                        Planaires
                                    </Button>
                                    {planaire &&
                                     <div style={{ textAlign: "left", color: "whitesmoke", marginInline:"5px"  }}>
                                        <table className="comptab">
                                            <tbody>
                                            <tr>
                                                <td className="comp">Spectrale</td>
                                                <td className="comp">{perso.Spectrale_character}<ModifierDialogs character={character} name={"spectrale"}  left={'40%'} dataToUpdate={'Langue Spectrale'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Astrale</td>
                                                <td className="comp">{perso.Astrale_character}<ModifierDialogs character={character} name={"astrale"}  left={'40%'} dataToUpdate={'Langue Astrale'}/></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <Divider/>
                                        <table className="comptab">
                                            <tbody>
                                            <tr>
                                                <td className="comp">Ténébriale</td>
                                                <td className="comp">{perso.Tenebriale_character }<ModifierDialogs character={character} name={"tenebriale"}  left={'40%'} dataToUpdate={'Ténébriale'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Noyale</td>
                                                <td className="comp">{perso.Noyale_character}<ModifierDialogs character={character} name={"noyale"}  left={'40%'} dataToUpdate={'Noyale'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Elémentale</td>
                                                <td className="comp">{perso.Elementale_character}<ModifierDialogs character={character} name={"elementale"}  left={'40%'} dataToUpdate={'Elementale'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Céleste</td>
                                                <td className="comp">{perso.Celeste_character}<ModifierDialogs character={character} name={"celeste"}  left={'40%'} dataToUpdate={'Celeste'}/></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    }
                                </div>}
                        </List>
                        <Divider orientation="vertical" flexItem/>
                        <List>
                            <Button variant="h6" onClick={() => setIsWeapons(!isWeapons)} sx={{ color: "whitesmoke" }}>Armes</Button>
                            {isWeapons && <div style={{ textAlign: "left", color: "whitesmoke", marginInline:"5px"  }}>
                                <table className="comptab">
                                    <tbody>
                                            <tr>
                                                <td className="comp">Arcs</td>
                                                <td className="comp">{perso.Arcs_character }<ModifierDialogs character={character} name={"arcs"}  left={'40%'} dataToUpdate={'Arcs'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Tir</td>
                                                <td className="comp">{perso.Tir_character }<ModifierDialogs character={character} name={"tir"}  left={'40%'} dataToUpdate={'Tir'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Mains nues</td>
                                                <td className="comp">{perso.MainsNues_character}<ModifierDialogs character={character} name={"mainsNues"}  left={'40%'} dataToUpdate={'Mains Nues'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Jet</td>
                                                <td className="comp">{perso.Jets_character }<ModifierDialogs character={character} name={"jets"}  left={'40%'} dataToUpdate={'Jets'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Armes d'Hast</td>
                                                <td className="comp">{perso.ArmesHast_character}<ModifierDialogs character={character} name={"hast"}  left={'40%'} dataToUpdate={"Armes d'Hast"}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Lames courtes</td>
                                                <td className="comp">{perso.Courtes_character }<ModifierDialogs character={character} name={"courtes"}  left={'40%'} dataToUpdate={'Lames courtes'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Lames longues</td>
                                                <td className="comp">{perso.Longues_character }<ModifierDialogs character={character} name={"longues"}  left={'40%'} dataToUpdate={'Lames longues'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Esquive</td>
                                                <td className="comp">{perso.Esquive_character}<ModifierDialogs character={character} name={"esquive"}  left={'40%'} dataToUpdate={'Esquive'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Parade</td>
                                                <td className="comp">{perso.Parade_character}<ModifierDialogs character={character} name={"parade"}  left={'40%'} dataToUpdate={'Parade'}/></td>
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                            }
                        </List>
                        <Divider orientation="vertical" flexItem/>
                        <List>
                            <Button variant="h6" onClick={() => setIsDivers(!isDivers)} sx={{ color: "whitesmoke" }}>Diverses</Button>
                            {isDivers && <div style={{ textAlign: "left", color: "whitesmoke", marginInline:"5px"  }} >
                                <table className="comptab">
                                    <tbody>
                                    <tr>
                                                <td className="comp">Chant</td>
                                                <td className="comp">{perso.Chant_character }<ModifierDialogs character={character} name={"chant"}  left={'40%'} dataToUpdate={'Chant'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Chasse</td>
                                                <td className="comp">{perso.Chasse_character}<ModifierDialogs character={character} name={"chasse"}  left={'40%'} dataToUpdate={'Chasse'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Course</td>
                                                <td className="comp">{perso.Course_character}<ModifierDialogs character={character} name={"course"}  left={'40%'} dataToUpdate={'Course'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Crochetage</td>
                                                <td className="comp">{perso.Crochetage_character}<ModifierDialogs character={character} name={"crochetage"}  left={'40%'} dataToUpdate={'Crochetage'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Déquisement</td>
                                                <td className="comp">{perso.Deguisement_character}<ModifierDialogs character={character} name={"deguisement"}  left={'40%'} dataToUpdate={'Déguisement'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Discrétion</td>
                                                <td className="comp">{perso.Discretion_character}<ModifierDialogs character={character} name={"discretion"}  left={'40%'} dataToUpdate={'Discrétion'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Eloquence</td>
                                                <td className="comp">{perso.Eloquance_character}<ModifierDialogs character={character} name={"eloquance"}  left={'40%'} dataToUpdate={'Eloquance'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Equitation</td>
                                                <td className="comp">{perso.Equitation_character}<ModifierDialogs character={character} name={"equitation"}  left={'40%'} dataToUpdate={'Equitation'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Escalade</td>
                                                <td className="comp">{perso.Escalade_character }<ModifierDialogs character={character} name={"escalade"}  left={'40%'} dataToUpdate={'Escalade'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Hypnose</td>
                                                <td className="comp">{perso.Hypnose_character }<ModifierDialogs character={character} name={"hypnose"}  left={'40%'} dataToUpdate={'Hypnose'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Nage</td>
                                                <td className="comp">{perso.Nage_character}<ModifierDialogs character={character} name={"nage"}  left={'40%'} dataToUpdate={'Nage'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Observation</td>
                                                <td className="comp">{perso.Observation_character}<ModifierDialogs character={character} name={"observation"}  left={'40%'} dataToUpdate={'Observation'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Pièges</td>
                                                <td className="comp">{perso.Pieges_character}<ModifierDialogs character={character} name={"pieges"}  left={'40%'} dataToUpdate={'Pieges'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Professorat</td>
                                                <td className="comp">{perso.Professorat_character}<ModifierDialogs character={character} name={"professorat"}  left={'40%'} dataToUpdate={'Professorat'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Saut</td>
                                                <td className="comp">{perso.Saut_character}<ModifierDialogs character={character} name={"saut"}  left={'40%'} dataToUpdate={'Saut'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Soin</td>
                                                <td className="comp">{perso.Soin_character}<ModifierDialogs character={character} name={"soin"}  left={'40%'} dataToUpdate={'Soin'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Télékinésie</td>
                                                <td className="comp">{perso.Telekinesie_character}<ModifierDialogs character={character} name={"telekine"}  left={'40%'} dataToUpdate={'Télékinésie'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Vigilence</td>
                                                <td className="comp">{perso.Vigilence_character}<ModifierDialogs character={character} name={"vigi"}  left={'40%'} dataToUpdate={'Vigilance'}/></td>
                                            </tr>
                                    </tbody>
                                </table>
                                <Divider />
                            </div>
                            }
                        </List>
                        <Divider orientation="vertical" flexItem/>
                        <List style={{marginRight:"5px"}}>
                            <Button variant="h6" onClick={() => setIsScience(!isScience)} sx={{ color: "whitesmoke" }}>Sciences</Button>
                            {isScience && <div style={{ textAlign: "left", color: "whitesmoke", marginInline:"5px" }}>
                                <table className="comptab">
                                    <tbody>
                                    <tr>
                                                <td className="comp">Magico-tech</td>
                                                <td className="comp">{perso.MagicoTech_character }<ModifierDialogs character={character} name={"magicotech"}  left={'40%'} dataToUpdate={'Magico-tech'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Cartographie</td>
                                                <td className="comp">{perso.Cartographie_character }<ModifierDialogs character={character} name={"carto"}  left={'40%'} dataToUpdate={'Cartographie'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Herboristerie</td>
                                                <td className="comp">{perso.Herboristerie_character }<ModifierDialogs character={character} name={"herbo"}  left={'40%'} dataToUpdate={'Herboristerie'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Médecine</td>
                                                <td className="comp">{perso.Medecine_character}<ModifierDialogs character={character} name={"medecine"}  left={'40%'} dataToUpdate={'Médecine'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Potions</td>
                                                <td className="comp">{perso.Potions_character}<ModifierDialogs character={character} name={"popo"}  left={'40%'} dataToUpdate={'Potions'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Théorie des magies</td>
                                                <td className="comp">{perso.TheorieMagique_character}<ModifierDialogs character={character} name={"theoMag"}  left={'40%'} dataToUpdate={'Théorie Magique'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Histoire Magique</td>
                                                <td className="comp">{perso.HistoireMagique_character}<ModifierDialogs character={character} name={"histoMag"}  left={'40%'} dataToUpdate={'Histoire Magique'}/></td>
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                            }
                        </List>
                        <Divider orientation="vertical" flexItem/>
                        <List>
                            <Button variant="h6" onClick={() => setIsMagic(!isMagic)} sx={{ color: "whitesmoke" }}>Magies</Button>
                            {isMagic && <Grid container spacing={2} style={{ textAlign: "center", color: "whitesmoke", marginLeft:'5px' }}>
                                <List>
                                    <Button variant="h8" onClick={() => setIsRang1(!isRang1)} sx={{ color: "whitesmoke" }}> Elementaire </Button>
                                    {isRang1 && <div style={{ textAlign: "left", color: "whitesmoke", marginInline:"5px" }}>
                                        <table className="comptab">
                                            <tbody>
                                            <tr>
                                                <td className="comp">Air</td>
                                                <td className="comp">{perso.MagieAir_character }<ModifierDialogs character={character} name={"air"}  left={'40%'} dataToUpdate={"Magie d'air"}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Eau</td>
                                                <td className="comp">{perso.MagieEau_character}<ModifierDialogs character={character} name={"eau"}  left={'40%'} dataToUpdate={"Magie d'eau"}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Feu</td>
                                                <td className="comp">{perso.MagieFeu_character}<ModifierDialogs character={character} name={"feu"}  left={'40%'} dataToUpdate={"Magie de Feu"}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Terre</td>
                                                <td className="comp">{perso.MagieTerre_character}<ModifierDialogs character={character} name={"terre"}  left={'40%'} dataToUpdate={'Magie de Terre'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Electricité</td>
                                                <td className="comp">{perso.MagieElec_character}<ModifierDialogs character={character} name={"elec"}  left={'40%'} dataToUpdate={"Magie d'Elec"}/></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>}
                                </List>
                        <Divider orientation="vertical" flexItem/>
                                <List>
                                    <Button variant="h8" onClick={() => setIsRang2(!isRang2)} sx={{ color: "whitesmoke" }}> Psychique </Button>
                                    {isRang2 && <div style={{ textAlign: "left", color: "whitesmoke", marginInline:"5px"  }}>
                                        <table className="comptab">
                                            <tbody>
                                            <tr>
                                                <td className="comp">Création</td>
                                                <td className="comp">{perso.Crea_character }<ModifierDialogs character={character} name={"crea"}  left={'40%'} dataToUpdate={'Magie de Création'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Psy Interne</td>
                                                <td className="comp">{perso.PsyInt_character}<ModifierDialogs character={character} name={"psyInt"}  left={'40%'} dataToUpdate={'Magie Psy Interne'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Psy Personnel</td>
                                                <td className="comp">{perso.PsyPerso_character}<ModifierDialogs character={character} name={"psyPerso"}  left={'40%'} dataToUpdate={'Magie Psy Personnel'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Psy Externe</td>
                                                <td className="comp">{perso.PsyExt_character }<ModifierDialogs character={character} name={"PsyExt"}  left={'40%'} dataToUpdate={'Magie Psy Externe'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Psy Interpersonnel</td>
                                                <td className="comp">{perso.PsyInterperso_character }<ModifierDialogs character={character} name={"PsyInterperso"}  left={'40%'} dataToUpdate={'Magie Psy Interpersonnel'}/></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>}
                                </List>
                        <Divider orientation="vertical" flexItem/>
                                <List>
                                    <Button variant="h8" onClick={() => setIsRang3(!isRang3)} sx={{ color: "whitesmoke" }}> Energétique </Button>
                                    {isRang3 && <div style={{ textAlign: "left", color: "whitesmoke", marginInline:"5px"  }}>
                                            <table className="comptab">
                                                <tbody>
                                                    <tr>
                                                        <td className="comp">Vie</td>
                                                        <td className="comp">{perso.MagieVie_character}<ModifierDialogs character={character} name={"vie"}  left={'40%'} dataToUpdate={'Magie de Vie'}/></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="comp">Mort</td>
                                                        <td className="comp">{perso.Mort_character}<ModifierDialogs character={character} name={"mort"}  left={'40%'} dataToUpdate={'Magie de mort'}/></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="comp">Temps</td>
                                                        <td className="comp">{perso.Temps_character }<ModifierDialogs character={character} name={"temps"}  left={'40%'} dataToUpdate={'Magie de Temps'}/></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="comp">Lumière</td>
                                                        <td className="comp">{perso.Lumière_character }<ModifierDialogs character={character} name={"lumiere"}  left={'40%'} dataToUpdate={'Magie de Lumière'}/></td>
                                                    </tr>
                                                    <tr>
                                                    <td className="comp">Ténèbres</td>
                                                    <td className="comp">{perso.Tenebres_character }<ModifierDialogs character={character} name={"tenebre"}  left={'40%'} dataToUpdate={'Magie des Ténèbres'}/></td>
                                                    </tr>
                                                    <tr>
                                                    <td className="comp">Cosmos</td>
                                                    <td className="comp">{perso.Cosmos_character}<ModifierDialogs character={character} name={"cosmos"}  left={'40%'} dataToUpdate={'Magie de Cosmos'}/></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>}
                                </List>
                        <Divider orientation="vertical" flexItem/>
                                <List>
                                    <Button variant="h8" onClick={() => setIsRangA(!isRangA)} sx={{ color: "whitesmoke" }}> Planaire </Button>
                                    {isRangA && <div style={{ textAlign: "left", color: "whitesmoke", marginInline:"5px"  }}>
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td className="comp">Invocation</td>
                                                <td className="comp">{perso.Invoc_character}<ModifierDialogs character={character} name={"invoc"}  left={'40%'} dataToUpdate={"Magie d'invocation"}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Aura</td>
                                                <td className="comp">{perso.AuraLectrice_character }<ModifierDialogs character={character} name={"aura"}  left={'40%'} dataToUpdate={'armure'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Magie Astrale</td>
                                                <td className="comp">{perso.MagieAstrale_character }<ModifierDialogs character={character} name={"magieAstrale"}  left={'40%'} dataToUpdate={'Magie Astrale'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Magie Spectrale</td>
                                                <td className="comp">{perso.MagieSpectrale_character }<ModifierDialogs character={character} name={"magieSpectrale"}  left={'40%'} dataToUpdate={'Magie Spectrale'}/></td>
                                            </tr>
                                            <tr>
                                                <td className="comp">Magie draconique</td>
                                                <td className="comp">{perso.MagieDraconique_character }<ModifierDialogs character={character} name={"magieDraconique"}  left={'40%'} dataToUpdate={'Magie Draconique'}/></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>}
                                </List>
                               </Grid>
                            }
                        </List>
                    </Grid>
                </Box>
                        <IconButton onClick={handleDrawerClose} sx={{position:'fixed', right:'0vw',top:'9vh'}}>
                            <CloseIcon sx={{color:"whitesmoke"}}/>
                        </IconButton>
            </Drawer>
        </div>
    )
}