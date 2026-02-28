import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";


import { Drawer, Box, IconButton, Divider, Button, Grid, List, Table, TableBody, TableCell, TableHead, TableRow, useMediaQuery } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';


import Shield from '../assets/svg/icons8-shield.svg';

import ModifierDialogs from "./ModifierInventory";

export default function Combat(props) {

    const { t } = useTranslation();
    const theme = useTheme();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const character = props.data;
    console.log(character);
    const [inventaires, setInventaires] = useState({});
    const [isArmes, setIsArmes] = useState(false);
    const [isArmure, setIsArmure] = useState(false);
    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
        props.onDrawerChange?.(false);
    };
    useEffect(() => {
        fetch(`/api/inventories/getOneInventories/${character.Name_character}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setInventaires(data.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [character.Name_character]);


    function handleInventoryUpdate(patch) {
        setInventaires((prev) => ({ ...prev, ...patch }));
    }

    const isMobile = useMediaQuery("(max-width: 768px)");
    return (
        <div>
            <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={() => { setIsDrawerOpen(true); props.onDrawerChange?.(true); }} sx={{ width: '50px', position: 'fixed', right: "0vw", top: '27vh' }} >
                {isDrawerOpen ? <></> :
                    <img src={Shield} className="filter-white" style={{ height: '30px' }} alt='Shield' />}
            </IconButton>
            <Drawer className="drawer"
                BackdropProps={{
                    style: {
                        backdropFilter: "none",
                        opacity: 0
                    }
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: theme.custom.mycustomblur.main,
                        backdropFilter: theme.custom.mycustomblur.blur,
                        WebkitBackdropFilter: theme.custom.mycustomblur.blur,
                        top: "5vh",
                        textAlign: 'center',
                        width: isMobile ? "100%" : "40%",
                        borderRadius: "25px",
                        height: "90dvh"
                    }
                }} anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <Box p={2} width='250px' sx={{ backdropFilter: "none", top: '15vh', width: '100%' }} textAlign={'center'} role="presentation">
                    <Grid container spacing={2} width='100%' direction={isMobile ? "column" : "row"}>
                        <List>
                            <Button variant="h4" onClick={() => setIsArmes(!isArmes)} sx={{ color: theme.custom.mycustomblur.text }}>
                                {t("fight.weapons")}
                            </Button>
                            {isArmes &&
                                <div style={{ textAlign: "left", color: theme.custom.mycustomblur.text, marginInline: "5px" }}>
                                    <Table sx={{ color: theme.custom.mycustomblur.main, }}>
                                        <TableHead sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                            <TableCell variant="head" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>{t("inventory.name")}</TableCell>
                                            <TableCell variant="head" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>{t("fight.dmg")}</TableCell>
                                            <TableCell variant="head" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>{t("fight.scope")}</TableCell>
                                            <TableCell variant="head" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>{t("fight.ammo")}</TableCell>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell className="armesName" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.arme1Name ?? t("inventory.nothing")}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"arme1Name"} left={'75%'} dataToUpdate={'nom de la 1e arme'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span>
                                                </TableCell>
                                                <TableCell className="armeD" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.arme1Damage ?? 0}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"arme1Damage"} left={'40%'} dataToUpdate={'dégâts de la 1e arme'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span>
                                                </TableCell>
                                                <TableCell className="armeP" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.arme1Scope ?? 0}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"arme1Scope"} left={'60%'} dataToUpdate={'portée de la 1e arme'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span>
                                                </TableCell>
                                                <TableCell className="armeM" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.arme1Ammunition ?? 0}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"arme1Ammunition"} left={'40%'} dataToUpdate={'munitions de la 1e arme'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell className="armesName" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.arme2Name ?? t("inventory.nothing")}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"arme2Name"} left={'75%'} dataToUpdate={'nom de la 2e arme'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span>
                                                </TableCell>
                                                <TableCell className="armeD" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.arme2Damage ?? 0}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"arme2Damage"} left={'40%'} dataToUpdate={'dégâts de la 2e arme'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span>
                                                </TableCell>
                                                <TableCell className="armeP" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.arme2Scope ?? 0}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"arme2Scope"} left={'60%'} dataToUpdate={'portée de la 2e arme'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span>
                                                </TableCell>
                                                <TableCell className="armeM" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.arme2Ammunition ?? 0}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"arme2Ammunition"} left={'40%'} dataToUpdate={'munitions de la 2e arme'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell className="armesName" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.arme3Name ?? t("inventory.nothing")}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"arme3Name"} left={'75%'} dataToUpdate={'nom de la 3e arme'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span>
                                                </TableCell>
                                                <TableCell className="armeD" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.arme3Damage ?? 0}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"arme3Damage"} left={'40%'} dataToUpdate={'dégâts de la 3e arme'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span>
                                                </TableCell>
                                                <TableCell className="armeP" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.arme3Scope ?? 0}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"arme3Scope"} left={'60%'} dataToUpdate={'portée de la 3e arme'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span>
                                                </TableCell>
                                                <TableCell className="armeM" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.arme3Ammunition ?? 0}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"arme3Ammunition"} left={'40%'} dataToUpdate={'munitions de la 3e arme'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>}
                        </List>
                        <Divider orientation="vertical" flexItem />
                        <List>
                            <Button variant="h4" onClick={() => setIsArmure(!isArmure)} sx={{ color: theme.custom.mycustomblur.text }}>
                                {t("fight.armours")}
                            </Button>
                            {isArmure &&
                                <div style={{ textAlign: "left", color: "whitesmoke", marginInline: "5px" }}>
                                    <Table sx={{ color: theme.custom.mycustomblur.main, }}>
                                        <TableHead sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                            <TableCell variant="head" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>{t("inventory.name")}</TableCell>
                                            <TableCell variant="head" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>{t("fight.melee")}</TableCell>
                                            <TableCell variant="head" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>{t("fight.distance")}</TableCell>
                                            <TableCell variant="head" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>{t("fight.effects")}</TableCell>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell className="armureName" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.armure1Name ?? t("inventory.nothing")}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"armure1Name"} left={'70%'} dataToUpdate={'nom de la 1e armure'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span>
                                                </TableCell>
                                                <TableCell className="armureCac" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.armure1Cac ?? ""}
                                                    <span><ModifierDialogs inventaire={inventaires} name={"armure1Cac"} left={'50%'} dataToUpdate={'Cac de la 1e armure'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span>
                                                </TableCell>
                                                <TableCell className="armureD" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.armure1Dist ?? ""}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"armure1Dist"} left={'50%'} dataToUpdate={'distance de la 1e armure'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span>
                                                </TableCell>
                                                <TableCell className="armureE" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.armure1Effect ?? ""}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"armure1Effect"} left={'70%'} dataToUpdate={'effets de la 1e armure'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell className="armureName" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.armure2Name ?? t("inventory.nothing")}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"armure2Name"} left={'70%'} dataToUpdate={'nom de la 2e armure'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span>
                                                </TableCell>
                                                <TableCell className="armureCac" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.armure2Cac ?? ""}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"armure2Cac"} left={'50%'} dataToUpdate={'Cac de la 2e armure'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span></TableCell>
                                                <TableCell className="armureD" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.armure2Dist ?? ""}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"armure2Dist"} left={'50%'} dataToUpdate={'distance de la 2e armure'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span>
                                                </TableCell>
                                                <TableCell className="armureE" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.armure2Effect ?? ""}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"armure2Effect"} left={'70%'} dataToUpdate={'effet de la 2e armure'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                                                <TableCell className="armureName" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.armure3Name ?? t("inventory.nothing")}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"armure3Name"} left={'70%'} dataToUpdate={'nom de la 3e armure'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span>
                                                </TableCell>
                                                <TableCell className="armureCac" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.armure3Cac ?? ""}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"armure3Cac"} left={'50%'} dataToUpdate={'Cac de la 3e armure'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span></TableCell>
                                                <TableCell className="armureD" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.armure3Dist ?? ""}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"armure3Dist"} left={'50%'} dataToUpdate={'dist de la 3e armure'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span>
                                                </TableCell>
                                                <TableCell className="armureE" sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>
                                                    {inventaires?.armure3Effect ?? ""}
                                                    <span>
                                                        <ModifierDialogs inventaire={inventaires} name={"armure3Effect"} left={'70%'} dataToUpdate={'effet de la 3e armure'} onInventoryUpdate={handleInventoryUpdate} />
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            }
                        </List>
                    </Grid>
                </Box>
                <IconButton onClick={handleDrawerClose} sx={{ position: 'fixed', right: isMobile ? "2dvw" : '0vw', top: isMobile ? "1dvh" : '27vh' }}>
                    <CloseIcon sx={{ color: theme.custom.mycustomblur.text }} />
                </IconButton>
            </Drawer>
        </div>
    )
}