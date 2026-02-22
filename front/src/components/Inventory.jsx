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

import { useTranslation } from "react-i18next";

import { useMediaQuery } from "@mui/material";
function InventoryRow({ label, nameKey, quantityKey, data, theme, onInventoryUpdate }) {
  const name = data?.[nameKey] ?? "—";
  const quantity = quantityKey ? (data?.[quantityKey] ?? "—") : null;
  return (
    <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
      <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversName">
        {name}
        <ModifierDialogs
          inventaire={data}
          name={nameKey}
          left="80%"
          dataToUpdate={label}
          onInventoryUpdate={onInventoryUpdate}
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
            onInventoryUpdate={onInventoryUpdate}
          />
        </TableCell>
      }
    </TableRow>

  );
}

export default function Inventory(data) {

  const { t } = useTranslation();
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

  function handleInventoryUpdate(patch) {
    setInventaires((prev) => ({ ...prev, ...patch }));
  }

  const isMobile = useMediaQuery("(max-width: 768px)");
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
            backgroundColor: theme.custom.mycustomblur.main,
            backdropFilter: theme.custom.mycustomblur.blur,
            top: "5vh",
            textAlign: "center",
            width: isMobile ? "100%" : "40%",
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
                sx={{ color: theme.custom.mycustomblur.text, }}
              >
                {t("inventory.important")}
              </Button>
              {isImportant && (
                <div
                  style={{
                    textAlign: "left",
                    color: theme.custom.mycustomblur.text,
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
                          onInventoryUpdate={handleInventoryUpdate}
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
                sx={{ color: theme.custom.mycustomblur.text, }}
              >
                {t("inventory.meal")}
              </Button>
              {repas && (
                <div
                  style={{
                    textAlign: "left",
                    color: theme.custom.mycustomblur.text,
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
                          onInventoryUpdate={handleInventoryUpdate}
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
                sx={{ color: theme.custom.mycustomblur.text, }}
              >
                {t("inventory.currency")}
              </Button>
              {argent && (
                <Grid
                  container
                  spacing={2}
                  style={{
                    textAlign: "left",
                    color: theme.custom.mycustomblur.text,
                    marginLeft: "5px",
                  }}
                >
                  <Table>
                    <TableBody>
                      <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="important comp">
                          {t("inventory.ppu")}{" "}
                          <span>{inventaires?.PPU ?? 0}</span>
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"PPU"}
                            left={"80%"}
                            dataToUpdate={"PPU"}
                            onInventoryUpdate={handleInventoryUpdate}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="important comp" >
                          {" "}
                          {t("inventory.pou")}{" "}
                          <span>{inventaires?.POU ?? 0}</span>
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"POU"}
                            left={"80%"}
                            dataToUpdate={"POU"}
                            onInventoryUpdate={handleInventoryUpdate}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="important comp">
                          {t("inventory.pau")}{" "}
                          <span>{inventaires?.PAU ?? 0}</span>
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"PAU"}
                            left={"80%"}
                            dataToUpdate={"PAU"}
                            onInventoryUpdate={handleInventoryUpdate}
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
                sx={{ color: theme.custom.mycustomblur.text, }}
              >
                {t("inventory.misc")}
              </Button>
              {divers && (
                <div
                  style={{
                    textAlign: "left",
                    color: theme.custom.mycustomblur.text,
                    marginInline: "5px",
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} variant="head">{t("inventory.name")}</TableCell>
                      <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} variant="head">{t("inventory.qty")}</TableCell>
                    </TableHead>
                    <TableBody>
                      <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversName">
                          {inventaires?.divers1_inventory ?? t("inventory.nothing")}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d1"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 1"}
                            onInventoryUpdate={handleInventoryUpdate}
                          />
                        </TableCell>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversQ">
                          {inventaires?.divers1Quantite ?? t("inventory.nothing")}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d1q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 1"}
                              onInventoryUpdate={handleInventoryUpdate}
                            />
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversName">
                          {inventaires?.divers2_inventory ?? t("inventory.nothing")}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d2"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 2"}
                            onInventoryUpdate={handleInventoryUpdate}
                          />
                        </TableCell>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversQ">
                          {inventaires?.divers2Quantite ?? t("inventory.nothing")}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d2q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 2"}
                              onInventoryUpdate={handleInventoryUpdate}
                            />
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversName">
                          {inventaires?.divers3_inventory ?? t("inventory.nothing")}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d3"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 3"}
                            onInventoryUpdate={handleInventoryUpdate}
                          />
                        </TableCell>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversQ">
                          {inventaires?.divers3Quantite ?? t("inventory.nothing")}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d3q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 3"}
                              onInventoryUpdate={handleInventoryUpdate}
                            />
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversName">
                          {inventaires?.divers4_inventory ?? t("inventory.nothing")}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d4"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 4"}
                            onInventoryUpdate={handleInventoryUpdate}
                          />
                        </TableCell>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversQ">
                          {inventaires?.divers4Quantite ?? t("inventory.nothing")}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d4q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 4"}
                              onInventoryUpdate={handleInventoryUpdate}
                            />
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversName">
                          {inventaires?.divers5_inventory ?? t("inventory.nothing")}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d5"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 5"}
                            onInventoryUpdate={handleInventoryUpdate}
                          />
                        </TableCell>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversQ">
                          {inventaires?.divers5Quantite ?? t("inventory.nothing")}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d5q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 5"}
                              onInventoryUpdate={handleInventoryUpdate}
                            />
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversName">
                          {inventaires?.divers6_inventory ?? t("inventory.nothing")}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d6"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 6"}
                            onInventoryUpdate={handleInventoryUpdate}
                          />
                        </TableCell>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversQ">
                          {inventaires?.divers6Quantite ?? t("inventory.nothing")}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d6q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 6"}
                              onInventoryUpdate={handleInventoryUpdate}
                            />
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversName">
                          {inventaires?.divers7_inventory ?? t("inventory.nothing")}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d7"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 7"}
                            onInventoryUpdate={handleInventoryUpdate}
                          />
                        </TableCell>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversQ">
                          {inventaires?.divers7Quantite ?? t("inventory.nothing")}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d7q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 7"}
                              onInventoryUpdate={handleInventoryUpdate}
                            />
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversName">
                          {inventaires?.divers8_inventory ?? t("inventory.nothing")}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d8"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 8"}
                            onInventoryUpdate={handleInventoryUpdate}
                          />
                        </TableCell>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversQ">
                          {inventaires?.divers8Quantite ?? t("inventory.nothing")}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d8q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 8"}
                              onInventoryUpdate={handleInventoryUpdate}
                            />
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversName">
                          {inventaires?.divers9_inventory ?? t("inventory.nothing")}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d9"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 9"}
                            onInventoryUpdate={handleInventoryUpdate}
                          />
                        </TableCell>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversQ">
                          {inventaires?.divers9Quantite ?? t("inventory.nothing")}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d9q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 9"}
                              onInventoryUpdate={handleInventoryUpdate}
                            />
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversName">
                          {inventaires?.divers10_inventory ?? t("inventory.nothing")}
                          <ModifierDialogs
                            inventaire={inventaires}
                            name={"d10"}
                            left={"80%"}
                            dataToUpdate={"divers ligne 10"}
                            onInventoryUpdate={handleInventoryUpdate}
                          />
                        </TableCell>
                        <TableCell sx={{ border: theme.custom.mycustomblur.tableborder, }} className="diversQ">
                          {inventaires?.divers10Quantite ?? t("inventory.nothing")}
                          <span>
                            <ModifierDialogs
                              inventaire={inventaires}
                              name={"d10q"}
                              left={"40%"}
                              dataToUpdate={"quantité de divers ligne 10"}
                              onInventoryUpdate={handleInventoryUpdate}
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
          <CloseIcon sx={{ color: theme.custom.mycustomblur.text, }} />
        </IconButton>
      </Drawer>
    </div>
  );
}
