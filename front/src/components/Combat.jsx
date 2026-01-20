import { Drawer, Box, IconButton, Divider, Button, Grid, List, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";
import Shield from '../assets/img/icons8-shield.svg';
import ModifierDialogs from "./ModifierInventory";
import { useTheme } from "@mui/material/styles";


export default function Combat(data) {
    const theme = useTheme();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const character = data.data;
    console.log(character);
    const [inventaires, setInventaires] = useState({});
    const [isArmes, setIsArmes] = useState(false);
    const [isArmure, setIsArmure]= useState(false);
    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
      };
      useEffect(() => {
        fetch(`/api/inventories/getOneInventories/${character.Name_character}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data.data);
            setInventaires(data.data);
          })
          .catch((error)=>{
            console.error("Error:", error);
          });
      }, [character.Name_character]);
    return (
        <div>
            <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={() => setIsDrawerOpen(true)} sx={{ width: '50px', position: 'fixed', right: "0vw", top:'27vh' }} >
                {isDrawerOpen ? <></> :
                    <img src={Shield} className="filter-white" style={{height:'30px'}} alt='Shield'/>}
            </IconButton>
            <Drawer className="drawer" BackdropProps={{ style: { backdropFilter: "none", opacity:0 } }} PaperProps={{ sx: { backgroundColor: theme.custom.mycustomblur.main, backdropFilter: theme.custom.mycustomblur.blur, top:"5vh", textAlign: 'center', width: "40%", borderRadius:"25px" } }} anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <Box p={2} width='250px' sx={{ backdropFilter: "none", top: '15vh', width: '100%' }} textAlign={'center'} role="presentation">
                    <Grid container spacing={2} width='100%'>
                        <List>
                            <Button variant="h4" onClick={() => setIsArmes(!isArmes)} sx={{ color: theme.custom.mycustomblur.text }}>
                                Armes
                            </Button>
                            {isArmes &&
                                <div style={{ textAlign: "left", color: theme.custom.mycustomblur.text, marginInline:"5px"  }}>
                                    <Table sx={{color: theme.custom.mycustomblur.main, }}>
                                    <TableHead sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                        <TableCell variant="head" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>Nom/Appelation</TableCell>
                                        <TableCell variant="head" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>Dégâts</TableCell>
                                        <TableCell variant="head" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>Portée</TableCell>
                                        <TableCell variant="head" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>Munitions</TableCell>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                            <TableCell className="armesName" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>{inventaires?.arme1Name ?? "Acune arme"}<span><ModifierDialogs inventaire={inventaires} name={"arme1Name"}  left={'75%'} dataToUpdate={'nom de la 1e arme'}/></span></TableCell>
                                            <TableCell className="armeD" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>{inventaires?.arme1Damage ?? 0}<span><ModifierDialogs inventaire={inventaires} name={"arme1Damage"}  left={'40%'} dataToUpdate={'dégâts de la 1e arme'}/></span></TableCell>
                                            <TableCell className="armeP" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>{inventaires?.arme1Scope ?? 0}<span><ModifierDialogs inventaire={inventaires} name={"arme1Scope"}  left={'60%'} dataToUpdate={'portée de la 1e arme'}/></span></TableCell>
                                            <TableCell className="armeM" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>{inventaires?.arme1Ammunition?? 0}<span><ModifierDialogs inventaire={inventaires} name={"arme1Ammunition"}  left={'40%'} dataToUpdate={'munitions de la 1e arme'}/></span></TableCell>
                                        </TableRow>
                                        <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                            <TableCell className="armesName" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>{inventaires?.arme2Name  ?? "Acune arme"}<span><ModifierDialogs inventaire={inventaires} name={"arme2Name"}  left={'75%'} dataToUpdate={'nom de la 2e arme'}/></span></TableCell>
                                            <TableCell className="armeD" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>{inventaires?.arme2Damage ?? 0}<span><ModifierDialogs inventaire={inventaires} name={"arme2Damage"}  left={'40%'} dataToUpdate={'dégâts de la 2e arme'}/></span></TableCell>
                                            <TableCell className="armeP" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>{inventaires?.arme2Scope ?? 0}<span><ModifierDialogs inventaire={inventaires} name={"arme1Scope"}  left={'60%'} dataToUpdate={'portée de la 2e arme'}/></span></TableCell>
                                            <TableCell className="armeM" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>{inventaires?.arme2Ammunition ?? 0}<span><ModifierDialogs inventaire={inventaires} name={"arme2Ammunition"}  left={'40%'} dataToUpdate={'munitions de la 2e arme'}/></span></TableCell>
                                        </TableRow>
                                        <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                            <TableCell className="armesName" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>{inventaires?.arme3Name ?? "Acune arme"}<span><ModifierDialogs inventaire={inventaires} name={"arme3Name"}  left={'75%'} dataToUpdate={'nom de la 3e arme'}/></span></TableCell>
                                            <TableCell className="armeD" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>{inventaires?.arme3Damage ?? 0}<span><ModifierDialogs inventaire={inventaires} name={"arme3Damage"}  left={'40%'} dataToUpdate={'dégâts de la 3e arme'}/></span></TableCell>
                                            <TableCell className="armeP" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>{inventaires?.arme3Scope ?? 0}<span><ModifierDialogs inventaire={inventaires} name={"arme3Scope"}  left={'60%'} dataToUpdate={'portée de la 3e arme'}/></span></TableCell>
                                            <TableCell className="armeM" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>{inventaires?.arme3Ammunition ?? 0}<span><ModifierDialogs inventaire={inventaires} name={"arme3Ammunition"}  left={'40%'} dataToUpdate={'munitions de la 3e arme'}/></span></TableCell>
                                        </TableRow>
                                    </TableBody>
                            </Table>
                                </div>}
                        </List>
                        <Divider orientation="vertical" flexItem/>
                        <List>
                            <Button variant="h4" onClick={() => setIsArmure(!isArmure)} sx={{ color: theme.custom.mycustomblur.text }}>
                                Armures
                            </Button>
                            {isArmure &&
                                     <div style={{ textAlign: "left", color: "whitesmoke", marginInline:"5px"  }}>
                                <Table sx={{color: theme.custom.mycustomblur.main, }}>
                                    <TableHead sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                        <TableCell variant="head" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>Nom/Appelation</TableCell>
                                        <TableCell variant="head" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>Cac</TableCell>
                                        <TableCell variant="head" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>Distance</TableCell>
                                        <TableCell variant="head" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>Effet(s)</TableCell>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                            <TableCell className="armureName" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>{inventaires?.armure1Name ?? "Aucune armure"}<span><ModifierDialogs inventaire={inventaires} name={"armure1Name"}  left={'70%'} dataToUpdate={'nom de la 1e armure'}/></span></TableCell>
                                            <TableCell className="armureCac" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>{inventaires?.armure1Cac ?? 0}<span><ModifierDialogs inventaire={inventaires} name={"armure1Damage"}  left={'50%'} dataToUpdate={'dégâts de la 1e armure'}/></span></TableCell>
                                            <TableCell className="armureD" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>{inventaires?.armure1Dist ?? 0}<span><ModifierDialogs inventaire={inventaires} name={"arme1Scope"}  left={'50%'} dataToUpdate={'portée de la 1e armure'}/></span></TableCell>
                                            <TableCell className="armureE" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>{inventaires?.armure1Effect ?? 0}<span><ModifierDialogs inventaire={inventaires} name={"arme1Ammunition"}  left={'70%'} dataToUpdate={'munitions de la 1e armure'}/></span></TableCell>
                                        </TableRow>
                                        <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                            <TableCell  className="armureName" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>{inventaires?.armure2Name ?? "Aucune armure"}<span><ModifierDialogs inventaire={inventaires} name={"armure2Name"}  left={'70%'} dataToUpdate={'nom de la 2e armure'}/></span></TableCell>
                                            <TableCell className="armureCac" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>{inventaires?.armure2Cac ?? 0}<span><ModifierDialogs inventaire={inventaires} name={"armure2Damage"}  left={'50%'} dataToUpdate={'dégâts de la 2e armure'}/></span></TableCell>
                                            <TableCell className="armureD" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>{inventaires?.armure2Dist ?? 0}<span><ModifierDialogs inventaire={inventaires} name={"armure2Scope"}  left={'50%'} dataToUpdate={'portée de la 2e armure'}/></span></TableCell>
                                            <TableCell className="armureE" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>{inventaires?.armure2Effect ?? 0}<span><ModifierDialogs inventaire={inventaires} name={"armure2Ammunition"}  left={'70%'} dataToUpdate={'munitions de la 2e armure'}/></span></TableCell>
                                        </TableRow>
                                        <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                            <TableCell className="armureName" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>{inventaires?.armure3Name ?? "Aucune armure"}<span><ModifierDialogs inventaire={inventaires} name={"armure3Name"}  left={'70%'} dataToUpdate={'nom de la 3e armure'}/></span></TableCell>
                                            <TableCell className="armureCac" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>{inventaires?.armure3Cac ?? 0}<span><ModifierDialogs inventaire={inventaires} name={"armure3Damage"}  left={'50%'} dataToUpdate={'dégâts de la 3e armure'}/></span></TableCell>
                                            <TableCell className="armureD" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>{inventaires?.armure3Dist ?? 0}<span><ModifierDialogs inventaire={inventaires} name={"armure3Scope"}  left={'50%'} dataToUpdate={'portée de la 3e armure'}/></span></TableCell>
                                            <TableCell className="armureE" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>{inventaires?.armure3Effect ?? 0}<span><ModifierDialogs inventaire={inventaires} name={"armure3Ammunition"}  left={'70%'} dataToUpdate={'munitions de la 3e armure'}/></span></TableCell>
                                        </TableRow>
                                    </TableBody>
                            </Table>
                                    </div>
                            }
                        </List>
                    </Grid>
                </Box>
                        <IconButton onClick={handleDrawerClose} sx={{position:'fixed', right:'0vw',top:'27vh'}}>
                             <CloseIcon sx={{color:theme.custom.mycustomblur.text }}/>
                        </IconButton>
            </Drawer>
        </div>
    )
}