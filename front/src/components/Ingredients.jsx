import { Drawer, Box, IconButton, Grid, Typography, TableRow, TableCell, Table, TableBody, TableHead } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import ModifierDialogs from "./ModifierIngredients";
import Ingredient from "../assets/img/icons8-potion.svg";
import { useTheme } from "@mui/material/styles";

import { useTranslation } from "react-i18next";

function IngredientRow({ label, nameKey, quantityKey, ingredients, theme }) {
  const name = ingredients?.[nameKey] ?? "—";
  const quantity = ingredients?.[quantityKey] ?? "—";

  return (
    <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
      <TableCell sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }} className="diversName">
        {name}
        <ModifierDialogs
          inventaire={ingredients}
          name={nameKey}
          left="80%"
          dataToUpdate={label}
        />
      </TableCell>
      <TableCell sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }} className="diversQ">
        {quantity}
        <ModifierDialogs
          inventaire={ingredients}
          name={quantityKey}
          left="40%"
          dataToUpdate={`quantité de ${label}`}
        />
      </TableCell>
    </TableRow>
  );
}

export default function Ingredients(data) {
  const { t } = useTranslation();
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const character = data.data;
  console.log(character);
  const [ingredients, setIngredients] = useState({});
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  useEffect(() => {
    fetch(`/ingredients/api/getOneIngredients/${character.ID_character}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setIngredients(data.data);
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
        sx={{ width: "50px", position: "fixed", right: "0vw", top: "45vh" }}
      >
        {isDrawerOpen ? (
          <></>
        ) : (
          <img
            src={Ingredient}
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
            backgroundColor: theme.custom.mycustomblur.main,
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
                color: "whitesmoke",
                marginInline: "5px",
                marginBlock: "15px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: theme.custom.mycustomblur.text, textAlign: "center" }}
              >
                {t("inventory.ingredients")}
              </Typography>
              <Table>
                <TableBody>
                  {[...Array(15)].map((_, i) => {
                    const num = i + 1;
                    return (
                      <IngredientRow
                        key={num}
                        label={`${num}e ingrédient`}
                        nameKey={`ingredient${num}`}
                        quantityKey={`ingredient${num}Quantite`}
                        ingredients={ingredients}
                        theme={theme}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Grid>
        </Box>
        <IconButton
          onClick={handleDrawerClose}
          sx={{ position: "fixed", right: "0vw", top: "45vh" }}
        >
          <CloseIcon sx={{ color: theme.custom.mycustomblur.text }} />
        </IconButton>
      </Drawer>
    </div>
  );
}
