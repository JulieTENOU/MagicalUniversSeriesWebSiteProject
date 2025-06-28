import { Drawer, Box, IconButton, Grid, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import ModifierDialogs from "./ModifierCrystals";
import Crystal from "../assets/img/icons8-crystal.svg";

function CrystalRow({ label, field, crystals }) {
  const value = crystals?.[field] ?? "—";
  return (
    <tr>
      <td>{label}</td>
      <td className="diversQ comp">
        {value}
        <ModifierDialogs
          inventaire={crystals}
          name={field}
          left={"40%"}
          dataToUpdate={label.toLowerCase()}
        />
      </td>
    </tr>
  );
}

export default function Crystals(data) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const character = data.data;
  console.log(character);
  const [crystals, setCrystals] = useState({});
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  useEffect(() => {
    fetch(`/crystals/api/getOneCrystals/${character.ID_character}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setCrystals(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [character.ID_character]);

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
            backgroundColor: "transparent",
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
                color: "whitesmoke",
                marginInline: "5px",
                marginBlock: "15px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "whitesmoke", textAlign: "center" }}
              >
                Crystaux
              </Typography>

              <table>
                <thead>
                  <tr>
                    <td>Nom du crystal</td>
                    <td>Quantité</td>
                  </tr>
                </thead>
                <tbody>
                  <CrystalRow
                    label="Crystal de verre"
                    field="crystal_verre"
                    crystals={crystals}
                  />
                  <CrystalRow
                    label="Crystal-plasma"
                    field="crystal_plasma"
                    crystals={crystals}
                  />
                  <CrystalRow
                    label="Crystal d'eau"
                    field="crystal_eau"
                    crystals={crystals}
                  />
                  <CrystalRow
                    label="Lapis-Lazuli"
                    field="lapis"
                    crystals={crystals}
                  />
                  <CrystalRow
                    label="Diamants Violets"
                    field="diams_violet"
                    crystals={crystals}
                  />
                  <CrystalRow
                    label="Diamants Verts"
                    field="diams_vert"
                    crystals={crystals}
                  />
                  <CrystalRow
                    label="Diamants Turquoises"
                    field="diams_turquoise"
                    crystals={crystals}
                  />
                  <CrystalRow
                    label="Diamants Carmins"
                    field="diams_carmin"
                    crystals={crystals}
                  />
                  <CrystalRow
                    label="Diamants Ocres"
                    field="diams_ocre"
                    crystals={crystals}
                  />
                  <CrystalRow
                    label="Billes Arc-en-Ciel"
                    field="bille_arc"
                    crystals={crystals}
                  />
                  <CrystalRow
                    label="Crystal Angélique"
                    field="crystal_ange"
                    crystals={crystals}
                  />
                  <CrystalRow
                    label="Crystal Démonique"
                    field="crystal_dem"
                    crystals={crystals}
                  />
                  <CrystalRow
                    label="Crystal Liquide"
                    field="crystal_liquide"
                    crystals={crystals}
                  />
                  <CrystalRow
                    label="Pierre de Lune"
                    field="pierre_lune"
                    crystals={crystals}
                  />
                  <CrystalRow
                    label="Crystal de Feu"
                    field="crystal_feu"
                    crystals={crystals}
                  />
                  <CrystalRow
                    label="Crystal d'Or"
                    field="crystal_or"
                    crystals={crystals}
                  />
                </tbody>
              </table>
            </div>
          </Grid>
        </Box>
        <IconButton
          onClick={handleDrawerClose}
          sx={{ position: "fixed", right: "0vw", top: "36vh" }}
        >
          <CloseIcon sx={{ color: "whitesmoke" }} />
        </IconButton>
      </Drawer>
    </div>
  );
}
