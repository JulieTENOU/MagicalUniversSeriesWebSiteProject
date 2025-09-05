import {
  Drawer,
  Box,
  IconButton,
  Divider,
  Button,
  Grid,
  List, Table, TableBody, TableCell, TableHead, TableRow  
} from "@mui/material";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import ModifierDialogs from "./ModifierInventory";
import { useTheme } from "@mui/material/styles";

function InventoryRow({ label, nameKey, quantityKey, data, theme }) {
  const name = data?.[nameKey] ?? "—";
  const quantity = quantityKey ? (data?.[quantityKey] ?? "—") : null;
  return (
    <TableRow  sx={{ border: theme.custom.mycustomblur.tableborder, }}>
      <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversName">
        {name}
        <ModifierDialogs
          inventaire={data}
          name={nameKey}
          left="80%"
          dataToUpdate={label}
        />
      </TableCell>
      {quantity != null &&
      <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversQ">
        {quantity}
        <ModifierDialogs
          inventaire={data}
          name={quantityKey}
          left="40%"
          dataToUpdate={`quantité de ${label}`}
        />
      </TableCell>
      }
    </TableRow>
    
  );
}

export default function Inventory(data) {
      const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const character = data.data;
  console.log(character);
  const [inventaires, setInventaires] = useState({});
  const [isImportant, setIsImportant] = useState(false);
  const [divers, setDivers] = useState(false);
  const [repas, setRepas] = useState(false);
  const [argent, setArgent] = useState(false);
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  useEffect(() => {
    fetch(`/api/inventories/getOneInventories/${character.Name_character}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setInventaires(data.data);
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
        sx={{ width: "50px", position: "fixed", right: "0vw", top: "18vh" }}
      >
        {isDrawerOpen ? <></> : <CardTravelIcon sx={{ color: "white" }} />}
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
            <List>
              <Button
                variant="h6"
                onClick={() => setIsImportant(!isImportant)}
                sx={{color: theme.custom.mycustomblur.text , }}
              >
                Importants
              </Button>
              {isImportant && (
                <div
                  style={{
                    textAlign: "left",
                   color: theme.custom.mycustomblur.text ,
                    marginInline: "5px",
                  }}
                >
                  <Table>
                    <TableBody>
                      {[...Array(10)].map((_, i) => (
                        <InventoryRow
                          key={i}
                          label={`important ligne ${i + 1}`}
                          nameKey={`important${i + 1}`}
                          quantityKey={null}
                          data={inventaires}
                          theme={theme}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </List>
            <Divider orientation="vertical" flexItem />
            <List style={{ marginRight: "5px" }}>
              <Button
                variant="h6"
                onClick={() => setRepas(!repas)}
                sx={{ color: theme.custom.mycustomblur.text ,}}
              >
                Repas
              </Button>
              {repas && (
                <div
                  style={{
                    textAlign: "left",
                    color: theme.custom.mycustomblur.text ,
                    marginInline: "5px",
                  }}
                >
                  <List>
                    <p>
                      <span>{inventaires?.repas_inventory ?? "Aucun repas"}</span>
                      <span>
                        <ModifierDialogs
                          inventaire={inventaires}
                          name={"repas"}
                          left={"40%"}
                          dataToUpdate={"quantité de repas"}
                        />
                      </span>
                    </p>
                  </List>
                </div>
              )}
            </List>

            <Divider orientation="vertical" flexItem />
            <List>
              <Button
                variant="h6"
                onClick={() => setArgent(!argent)}
                sx={{ color: theme.custom.mycustomblur.text , }}
              >
                Monnaie
              </Button>
              {argent && (
                <Grid
                  container
                  spacing={2}
                  style={{
                    textAlign: "left",
                    color: theme.custom.mycustomblur.text ,
                    marginLeft: "5px",
                  }}
                >
                  <Table>
                    <TableBody>
                      <TableRow  sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="important comp">
                          Pièces de Platine Universelles :{" "}
                          <span>{inventaires?.PPU ?? 0}</span>
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"PPU"}
                            left={"80%"}
                            dataToUpdate={"PPU"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow  sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="important comp" >
                          {" "}
                          Pièces d'Or Universelles :{" "}
                          <span>{inventaires?.POU ?? 0}</span>
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"POU"}
                            left={"80%"}
                            dataToUpdate={"POU"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow  sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="important comp">
                          Pièces d'Argent Universelles :{" "}
                          <span>{inventaires?.PAU ?? 0}</span>
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"PAU"}
                            left={"80%"}
                            dataToUpdate={"PAU"}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              )}
            </List>
            <Divider orientation="vertical" flexItem />
            <List>
              <Button
                variant="h6"
                onClick={() => setDivers(!divers)}
                sx={{ color: theme.custom.mycustomblur.text , }}
              >
                Divers
              </Button>
              {divers && (
                <div
                  style={{
                    textAlign: "left",
                    color: theme.custom.mycustomblur.text ,
                    marginInline: "5px",
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableCell  sx={{ border: theme.custom.mycustomblur.tableborder, }} variant="head">Nom/Appelation</TableCell>
                      <TableCell  sx={{ border: theme.custom.mycustomblur.tableborder, }} variant="head">Quantité</TableCell>
                    </TableHead>
                    <TableBody>
                      <TableRow  sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversName">
                          {inventaires?.divers1_inventory ?? "Auncun objet"}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d1"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 1"}
                          />
                        </TableCell>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversQ">
                          {inventaires?.divers1Quantite ?? "Aucun objet"}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d1q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 1"}
                            />
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow  sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversName">
                          {inventaires?.divers2_inventory ?? "Aucun objet"}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d2"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 2"}
                          />
                        </TableCell>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversQ">
                          {inventaires?.divers2Quantite ?? "Aucun objet"}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d2q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 2"}
                            />
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow  sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversName">
                          {inventaires?.divers3_inventory ?? "Aucun objet"}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d3"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 3"}
                          />
                        </TableCell>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversQ">
                          {inventaires?.divers3Quantite ?? "Aucun objet"}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d3q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 3"}
                            />
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow  sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversName">
                          {inventaires?.divers4_inventory ?? "Aucun objet"}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d4"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 4"}
                          />
                        </TableCell>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversQ">
                          {inventaires?.divers4Quantite ?? "Aucun objet"}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d4q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 4"}
                            />
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow  sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversName">
                          {inventaires?.divers5_inventory ?? "Aucun objet"}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d5"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 5"}
                          />
                        </TableCell>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversQ">
                          {inventaires?.divers5Quantite ?? "Aucun objet"}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d5q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 5"}
                            />
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow  sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversName">
                          {inventaires?.divers6_inventory ?? "Aucun objet"}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d6"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 6"}
                          />
                        </TableCell>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversQ">
                          {inventaires?.divers6Quantite ?? "Aucun objet"}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d6q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 6"}
                            />
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow  sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversName">
                          {inventaires?.divers7_inventory ?? "Aucun objet"}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d7"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 7"}
                          />
                        </TableCell>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversQ">
                          {inventaires?.divers7Quantite ?? "Aucun objet"}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d7q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 7"}
                            />
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow  sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversName">
                          {inventaires?.divers8_inventory ?? "Aucun objet"}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d8"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 8"}
                          />
                        </TableCell>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversQ">
                          {inventaires?.divers8Quantite ?? "Aucun objet"}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d8q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 8"}
                            />
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow  sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversName">
                          {inventaires?.divers9_inventory ?? "Aucun objet"}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d9"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 9"}
                          />
                        </TableCell>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversQ">
                          {inventaires?.divers9Quantite ?? "Aucun objet"}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d9q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 9"}
                            />
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversName">
                          {inventaires?.divers10_inventory ?? "Aucun objet"}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d10"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 10"}
                          />
                        </TableCell>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversQ">
                          {inventaires?.divers10Quantite ?? "Aucun objet"}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d10q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 10"}
                            />
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Divider />
                </div>
              )}
            </List>
          </Grid>
        </Box>
        <IconButton
          onClick={handleDrawerClose}
          sx={{ position: "fixed", right: "0vw", top: "18vh" }}
        >
          <CloseIcon sx={{ color: theme.custom.mycustomblur.text , }} />
        </IconButton>
      </Drawer>
    </div>
  );
}
