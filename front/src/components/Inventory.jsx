import {
  Drawer,
  Box,
  IconButton,
  Divider,
  Button,
  Grid,
  List,
} from "@mui/material";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import ModifierDialogs from "./ModifierInventory";

function InventoryRow({ label, nameKey, quantityKey, data }) {
  const name = data?.[nameKey] ?? "—";
  const quantity = data?.[quantityKey] ?? "—";
  return (
    <tr>
      <td className="diversName">
        {name}
        <ModifierDialogs
          inventaire={data}
          name={nameKey}
          left="80%"
          dataToUpdate={label}
        />
      </td>
      <td className="diversQ">
        {quantity}
        <ModifierDialogs
          inventaire={data}
          name={quantityKey}
          left="40%"
          dataToUpdate={`quantité de ${label}`}
        />
      </td>
    </tr>
  );
}

export default function Inventory(data) {
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
    fetch(`/inventories/api/getOneInventories/${character.ID_character}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setInventaires(data.data);
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
        sx={{ width: "50px", position: "fixed", right: "0vw", top: "18vh" }}
      >
        {isDrawerOpen ? <></> : <CardTravelIcon sx={{ color: "white" }} />}
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
            <List>
              <Button
                variant="h6"
                onClick={() => setIsImportant(!isImportant)}
                sx={{ color: "whitesmoke" }}
              >
                Importants
              </Button>
              {isImportant && (
                <div
                  style={{
                    textAlign: "left",
                    color: "whitesmoke",
                    marginInline: "5px",
                  }}
                >
                  <table>
                    <tbody>
                      {[...Array(10)].map((_, i) => (
                        <InventoryRow
                          key={i}
                          label={`divers ligne ${i + 1}`}
                          nameKey={`divers${i + 1}_inventory`}
                          quantityKey={`divers${i + 1}Quantite`}
                          data={inventaires}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </List>
            <Divider orientation="vertical" flexItem />
            <List style={{ marginRight: "5px" }}>
              <Button
                variant="h6"
                onClick={() => setRepas(!repas)}
                sx={{ color: "whitesmoke" }}
              >
                Repas
              </Button>
              {repas && (
                <div
                  style={{
                    textAlign: "left",
                    color: "whitesmoke",
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
                sx={{ color: "whitesmoke" }}
              >
                Monnaie
              </Button>
              {argent && (
                <Grid
                  container
                  spacing={2}
                  style={{
                    textAlign: "left",
                    color: "whitesmoke",
                    marginLeft: "5px",
                  }}
                >
                  <table>
                    <tbody>
                      <tr>
                        <td className="important comp">
                          Pièces de Platine Universelles :{" "}
                          <span>{inventaires?.PPU ?? 0}</span>
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"PPU"}
                            left={"80%"}
                            dataToUpdate={"PPU"}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="important comp">
                          {" "}
                          Pièces d'Or Universelles :{" "}
                          <span>{inventaires?.POU ?? 0}</span>
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"POU"}
                            left={"80%"}
                            dataToUpdate={"POU"}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="important comp">
                          Pièces d'Argent Universelles :{" "}
                          <span>{inventaires?.PAU ?? 0}</span>
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"PAU"}
                            left={"80%"}
                            dataToUpdate={"PAU"}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Grid>
              )}
            </List>
            <Divider orientation="vertical" flexItem />
            <List>
              <Button
                variant="h6"
                onClick={() => setDivers(!divers)}
                sx={{ color: "whitesmoke" }}
              >
                Divers
              </Button>
              {divers && (
                <div
                  style={{
                    textAlign: "left",
                    color: "whitesmoke",
                    marginInline: "5px",
                  }}
                >
                  <table>
                    <thead>
                      <th>Nom/Appelation</th>
                      <th>Quantité</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="diversName">
                          {inventaires?.divers1_inventory ?? "Auncun objet"}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d1"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 1"}
                          />
                        </td>
                        <td className="diversQ">
                          {inventaires?.divers1Quantite ?? "Aucun objet"}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d1q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 1"}
                            />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="diversName">
                          {inventaires?.divers2_inventory ?? "Aucun objet"}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d2"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 2"}
                          />
                        </td>
                        <td className="diversQ">
                          {inventaires?.divers2Quantite ?? "Aucun objet"}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d2q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 2"}
                            />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="diversName">
                          {inventaires?.divers3_inventory ?? "Aucun objet"}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d3"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 3"}
                          />
                        </td>
                        <td className="diversQ">
                          {inventaires?.divers3Quantite ?? "Aucun objet"}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d3q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 3"}
                            />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="diversName">
                          {inventaires?.divers4_inventory ?? "Aucun objet"}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d4"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 4"}
                          />
                        </td>
                        <td className="diversQ">
                          {inventaires?.divers4Quantite ?? "Aucun objet"}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d4q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 4"}
                            />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="diversName">
                          {inventaires?.divers5_inventory ?? "Aucun objet"}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d5"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 5"}
                          />
                        </td>
                        <td className="diversQ">
                          {inventaires?.divers5Quantite ?? "Aucun objet"}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d5q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 5"}
                            />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="diversName">
                          {inventaires?.divers6_inventory ?? "Aucun objet"}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d6"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 6"}
                          />
                        </td>
                        <td className="diversQ">
                          {inventaires?.divers6Quantite ?? "Aucun objet"}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d6q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 6"}
                            />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="diversName">
                          {inventaires?.divers7_inventory ?? "Aucun objet"}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d7"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 7"}
                          />
                        </td>
                        <td className="diversQ">
                          {inventaires?.divers7Quantite ?? "Aucun objet"}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d7q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 7"}
                            />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="diversName">
                          {inventaires?.divers8_inventory ?? "Aucun objet"}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d8"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 8"}
                          />
                        </td>
                        <td className="diversQ">
                          {inventaires?.divers8Quantite ?? "Aucun objet"}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d8q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 8"}
                            />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="diversName">
                          {inventaires?.divers9_inventory ?? "Aucun objet"}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d9"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 9"}
                          />
                        </td>
                        <td className="diversQ">
                          {inventaires?.divers9Quantite ?? "Aucun objet"}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d9q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 9"}
                            />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="diversName">
                          {inventaires?.divers10_inventory ?? "Aucun objet"}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d10"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 10"}
                          />
                        </td>
                        <td className="diversQ">
                          {inventaires?.divers10Quantite ?? "Aucun objet"}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d10q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 10"}
                            />
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
          <CloseIcon sx={{ color: "whitesmoke" }} />
        </IconButton>
      </Drawer>
    </div>
  );
}
