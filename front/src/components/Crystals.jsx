import { Drawer, Box, IconButton, Grid, Typography, Table, TableBody, TableCell, TableHead, TableRow  } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import ModifierDialogs from "./ModifierCrystals";
import Crystal from "../assets/img/icons8-crystal.svg";
import { useTheme } from "@mui/material/styles";

function CrystalRow({ label, field, crystals, theme }) {
  const value = crystals?.[field] ?? "—";
  return (
    <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
      <TableCell  sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }}>{label}</TableCell>
      <TableCell  sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }} className="diversQ comp">
        {value}
        <ModifierDialogs
          inventaire={crystals}
          name={field}
          left={"40%"}
          dataToUpdate={label.toLowerCase()}
        />
      </TableCell>
    </TableRow>
  );
}

export default function Crystals(data) {
      const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const character = data.data;
  console.log(character);
  const [crystals, setCrystals] = useState({});
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  useEffect(() => {
    fetch(`/api/crystals/getOneCrystals/${character.Name_character}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setCrystals(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [character.Name_character]);

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="logo"
        onClick={() => setIsDrawerOpen(true)}
        sx={{ width: "50px", position: "fixed", right: "0vw", top: "36vh" }}
      >
        {isDrawerOpen ? (
          <></>
        ) : (
          <img
            src={Crystal}
            className="filter-white"
            style={{ height: "30px" }}
            alt="Shield"
          />
        )}
      </IconButton>
      <Drawer
        className="drawer"
        BackdropProps={{ style: { backdropFilter: "none", opacity: 0 } }}
        PaperProps={{
          sx: {
           backgroundColor:theme.custom.mycustomblur.main, 
           backdropFilter: theme.custom.mycustomblur.blur,
            top: "5vh",
            textAlign: "center",
            width: "40%",
            borderRadius: "25px",
          },
        }}
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box
          p={2}
          width="250px"
          sx={{ backdropFilter: "none", top: "15vh", width: "100%" }}
          textAlign={"center"}
          role="presentation"
        >
          <Grid container spacing={2} width="100%">
            <div
              style={{
                textAlign: "left",
               color: theme.custom.mycustomblur.text ,
                marginInline: "5px",
                marginBlock: "15px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: theme.custom.mycustomblur.text , textAlign: "center" }}
              >
                Crystaux
              </Typography>

              <Table>
                <TableHead>
                  <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                    <TableCell  sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }} variant="head">Nom du crystal</TableCell>
                    <TableCell  sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder,  }} variant="head">Quantité</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <CrystalRow
                    label="Crystal de verre"
                    field="crystal_verre"
                    crystals={crystals}
                    theme={theme}
                  />
                  <CrystalRow
                    label="Crystal-plasma"
                    field="crystal_plasma"
                    crystals={crystals}
                    theme={theme}
                  />
                  <CrystalRow
                    label="Crystal d'eau"
                    field="crystal_eau"
                    crystals={crystals}
                    theme={theme}
                  />
                  <CrystalRow
                    label="Lapis-Lazuli"
                    field="lapis"
                    crystals={crystals}
                    theme={theme}
                  />
                  <CrystalRow
                    label="Diamants Violets"
                    field="diams_violet"
                    crystals={crystals}
                    theme={theme}
                  />
                  <CrystalRow
                    label="Diamants Verts"
                    field="diams_vert"
                    crystals={crystals}
                    theme={theme}
                  />
                  <CrystalRow
                    label="Diamants Turquoises"
                    field="diams_turquoise"
                    crystals={crystals}
                    theme={theme}
                  />
                  <CrystalRow
                    label="Diamants Carmins"
                    field="diams_carmin"
                    crystals={crystals}
                    theme={theme}
                  />
                  <CrystalRow
                    label="Diamants Ocres"
                    field="diams_ocre"
                    crystals={crystals}
                    theme={theme}
                  />
                  <CrystalRow
                    label="Billes Arc-en-Ciel"
                    field="bille_arc"
                    crystals={crystals}
                    theme={theme}
                  />
                  <CrystalRow
                    label="Crystal Angélique"
                    field="crystal_ange"
                    crystals={crystals}
                    theme={theme}
                  />
                  <CrystalRow
                    label="Crystal Démonique"
                    field="crystal_dem"
                    crystals={crystals}
                    theme={theme}
                  />
                  <CrystalRow
                    label="Crystal Liquide"
                    field="crystal_liquide"
                    crystals={crystals}
                    theme={theme}
                  />
                  <CrystalRow
                    label="Pierre de Lune"
                    field="pierre_lune"
                    crystals={crystals}
                    theme={theme}
                  />
                  <CrystalRow
                    label="Crystal de Feu"
                    field="crystal_feu"
                    crystals={crystals}
                    theme={theme}
                  />
                  <CrystalRow
                    label="Crystal d'Or"
                    field="crystal_or"
                    crystals={crystals}
                    theme={theme}
                  />
                </TableBody>
              </Table>
            </div>
          </Grid>
        </Box>
        <IconButton
          onClick={handleDrawerClose}
          sx={{ position: "fixed", right: "0vw", top: "36vh" }}
        >
          <CloseIcon sx={{color:theme.custom.mycustomblur.text }}/>
        </IconButton>
      </Drawer>
    </div>
  );
}
