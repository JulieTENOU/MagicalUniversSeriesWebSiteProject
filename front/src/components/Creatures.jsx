import { Drawer, Box, IconButton, Grid, Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";
import ModifierDialogs from "./ModifierCreatures";
import Creature from '../assets/svg/icons8-cat.svg';
import { useTheme } from "@mui/material/styles";

import { useTranslation } from "react-i18next";

function CreatureRow({ index, data, theme, onCreatureUpdate }) {
  const key = `creature${index}`;
  const value = data?.[key] ?? "—";
  return (
    <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
      <TableCell sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }} className="comp">
        {value}
        <ModifierDialogs inventaire={data} name={key} left="100%" dataToUpdate={`${index}e créature`} onCreatureUpdate={onCreatureUpdate} />
      </TableCell>
    </TableRow>
  );
}


export default function Creatures(data) {

  const { t } = useTranslation();
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const character = data.data;
  console.log(character);
  const [creatures, setCreatures] = useState({});
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  useEffect(() => {
    fetch(`/api/creatures/getOneCreatures/${character.Name_character}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setCreatures(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [character.ID_character]);

  function handleCreatureUpdate(patch) {
    setCreatures((prev) => ({ ...prev, ...patch }));
  }

  return (
    <div>
      <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={() => setIsDrawerOpen(true)} sx={{ width: '50px', position: 'fixed', right: "0vw", top: '54vh' }} >
        {isDrawerOpen ? <></> :
          <img src={Creature} className="filter-white" style={{ height: '30px' }} alt='Shield' />}
      </IconButton>
      <Drawer className="drawer" BackdropProps={{ style: { backdropFilter: "none", opacity: 0 } }} PaperProps={{ sx: { backgroundColor: theme.custom.mycustomblur.main, backdropFilter: theme.custom.mycustomblur.blur, top: "5vh", textAlign: 'center', width: "40%", borderRadius: "25px" } }} anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>

        <Box p={2} width='250px' sx={{ backdropFilter: "none", top: '15vh', width: '100%' }} textAlign={'center'} role="presentation">
          <Grid container spacing={2} width='100%'>

            <div style={{ textAlign: "left", color: theme.custom.mycustomblur.text, marginInline: "5px", marginBlock: "15px" }}>
              <Typography variant="h6" sx={{ color: theme.custom.mycustomblur.text, textAlign: "center" }}>{t("inventory.creatures")}</Typography>
              <Table className="comp">
                <TableBody>
                  {[...Array(15)].map((_, i) => (
                    <CreatureRow key={i} index={i + 1} data={creatures} theme={theme} onCreatureUpdate={handleCreatureUpdate} />
                  ))}
                </TableBody>

              </Table>
            </div>
          </Grid>
        </Box>
        <IconButton onClick={handleDrawerClose} sx={{ position: 'fixed', right: '0vw', top: '54vh' }}>
          <CloseIcon sx={{ color: theme.custom.mycustomblur.text }} />
        </IconButton>
      </Drawer>
    </div>
  )
}