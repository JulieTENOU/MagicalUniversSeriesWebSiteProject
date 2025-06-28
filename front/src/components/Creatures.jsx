import { Drawer, Box, IconButton, Grid, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";
import ModifierDialogs from "./ModifierCreatures";
import Creature from '../assets/img/icons8-cat.svg';

function CreatureRow({ index, data }) {
  const key = `creature${index}`;
  const value = data?.[key] ?? "—";
  return (
    <tr>
      <td className="comp">
        {value}
        <ModifierDialogs inventaire={data} name={key} left="100%" dataToUpdate={`${index}e créature`} />
      </td>
    </tr>
  );
}


export default function Creatures(data) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const character = data.data;
    console.log(character);
    const [creatures, setCreatures] = useState({});
    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
      };
      useEffect(() => {
        fetch(`/creatures/api/getOneCreatures/${character.ID_character}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data.data);
            setCreatures(data.data);
          })
          .catch((error)=>{
            console.error("Error:", error);
          });
      }, [character.ID_character]);

    return (
        <div>
            <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={() => setIsDrawerOpen(true)} sx={{ width: '50px', position: 'fixed', right: "0vw", top:'54vh' }} >
                {isDrawerOpen ? <></> :
                                        <img src={Creature} className="filter-white" style={{height:'30px'}} alt='Shield'/>}
            </IconButton>
            <Drawer className="drawer" BackdropProps={{ style: { backdropFilter: "none", opacity:0 } }} PaperProps={{ sx: { backgroundColor: "transparent",top:"5vh", textAlign: 'center', width: "40%", borderRadius:"25px" } }} anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>

                <Box p={2} width='250px' sx={{ backdropFilter: "none", top: '15vh', width: '100%' }} textAlign={'center'} role="presentation">
                    <Grid container spacing={2} width='100%'>

                    <div style={{ textAlign: "left", color: "whitesmoke", marginInline:"5px", marginBlock:"15px"  }}>
                    <Typography variant="h6" sx={{ color: "whitesmoke", textAlign:"center" }}>Mes Créatures</Typography>
                                <table className="comp">
                                   <tbody>
  {[...Array(15)].map((_, i) => (
    <CreatureRow key={i} index={i + 1} data={creatures} />
  ))}
</tbody>

                                </table>
                                </div>
                    </Grid>
                </Box>
                        <IconButton onClick={handleDrawerClose} sx={{position:'fixed', right:'0vw',top:'54vh'}}>
                            <CloseIcon sx={{color:"whitesmoke"}}/>
                        </IconButton>
            </Drawer>
        </div>
    )
}