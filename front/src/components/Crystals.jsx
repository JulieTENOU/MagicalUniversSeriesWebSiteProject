import { Drawer, Box, IconButton, Grid, Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import ModifierDialogs from "./ModifierCrystals";
import Crystal from "../assets/svg/icons8-crystal.svg";
import { useTheme } from "@mui/material/styles";

import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";

function CrystalRow({ label, field, crystals, theme, onCrystalUpdate }) {
  const value = crystals?.[field] ?? "—";
  return (
    <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
      <TableCell sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }}>{label}</TableCell>
      <TableCell sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }} className="diversQ comp">
        {value}
        <ModifierDialogs
          inventaire={crystals}
          name={field}
          left={"40%"}
          dataToUpdate={label.toLowerCase()}
          onCrystalUpdate={onCrystalUpdate}
        />
      </TableCell>
    </TableRow>
  );
}

export default function Crystals(props) {

  const { t } = useTranslation();
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const character = props.data;
  console.log(character);
  const [crystals, setCrystals] = useState({});
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    props.onDrawerChange?.(false);
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

  function handleCrystalsUpdate(patch) {
    setCrystals((prev) => ({ ...prev, ...patch }));
  }

  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="logo"
        onClick={() => { setIsDrawerOpen(true); props.onDrawerChange?.(true); }}
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
            backgroundColor: theme.custom.mycustomblur.main,
            backdropFilter: theme.custom.mycustomblur.blur,
            WebkitBackdropFilter: theme.custom.mycustomblur.blur,
            top: "5vh",
            textAlign: "center",
            width: isMobile ? "100%" : "40%",
            borderRadius: "25px",
            height: "90dvh"
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
          <Grid container spacing={2} width="100%" direction={isMobile ? "column" : "row"}>
            <div
              style={{
                textAlign: "left",
                color: theme.custom.mycustomblur.text,
                marginInline: "5px",
                marginBlock: "15px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: theme.custom.mycustomblur.text, textAlign: "center" }}
              >
                {t("crystal.crystals")}
              </Typography>

              <Table>
                <TableHead>
                  <TableRow sx={{ border: theme.custom.mycustomblur.tableborder, }}>
                    <TableCell sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }} variant="head">{t("crystal.name")}</TableCell>
                    <TableCell sx={{ color: theme.custom.mycustomblur.text, border: theme.custom.mycustomblur.tableborder, }} variant="head">{t("inventory.qty")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <CrystalRow
                    label={t("crystal.glass")}
                    field="crystal_verre"
                    crystals={crystals}
                    theme={theme}
                    onCrystalUpdate={handleCrystalsUpdate}
                  />
                  <CrystalRow
                    label={t("crystal.plasma")}
                    field="crystal_plasma"
                    crystals={crystals}
                    theme={theme}
                    onCrystalUpdate={handleCrystalsUpdate}
                  />
                  <CrystalRow
                    label={t("crystal.water")}
                    field="crystal_eau"
                    crystals={crystals}
                    theme={theme}
                    onCrystalUpdate={handleCrystalsUpdate}
                  />
                  <CrystalRow
                    label={t("crystal.lapis")}
                    field="lapis"
                    crystals={crystals}
                    theme={theme}
                    onCrystalUpdate={handleCrystalsUpdate}
                  />
                  <CrystalRow
                    label={t("crystal.purpleGems")}
                    field="diams_violet"
                    crystals={crystals}
                    theme={theme}
                    onCrystalUpdate={handleCrystalsUpdate}
                  />
                  <CrystalRow
                    label={t("crystal.greenGems")}
                    field="diams_vert"
                    crystals={crystals}
                    theme={theme}
                    onCrystalUpdate={handleCrystalsUpdate}
                  />
                  <CrystalRow
                    label={t("crystal.turquoiseGems")}
                    field="diams_turquoise"
                    crystals={crystals}
                    theme={theme}
                    onCrystalUpdate={handleCrystalsUpdate}
                  />
                  <CrystalRow
                    label={t("crystal.crimsonGems")}
                    field="diams_carmin"
                    crystals={crystals}
                    theme={theme}
                    onCrystalUpdate={handleCrystalsUpdate}
                  />
                  <CrystalRow
                    label={t("crystal.ochreGems")}
                    field="diams_ocre"
                    crystals={crystals}
                    theme={theme}
                    onCrystalUpdate={handleCrystalsUpdate}
                  />
                  <CrystalRow
                    label={t("crystal.prismaticOrbs")}
                    field="bille_arc"
                    crystals={crystals}
                    theme={theme}
                    onCrystalUpdate={handleCrystalsUpdate}
                  />
                  <CrystalRow
                    label={t("crystal.angel")}
                    field="crystal_ange"
                    crystals={crystals}
                    theme={theme}
                    onCrystalUpdate={handleCrystalsUpdate}
                  />
                  <CrystalRow
                    label={t("crystal.demon")}
                    field="crystal_dem"
                    crystals={crystals}
                    theme={theme}
                    onCrystalUpdate={handleCrystalsUpdate}
                  />
                  <CrystalRow
                    label={t("crystal.liquid")}
                    field="crystal_liquide"
                    crystals={crystals}
                    theme={theme}
                    onCrystalUpdate={handleCrystalsUpdate}
                  />
                  <CrystalRow
                    label={t("crystal.moonstone")}
                    field="pierre_lune"
                    crystals={crystals}
                    theme={theme}
                    onCrystalUpdate={handleCrystalsUpdate}
                  />
                  <CrystalRow
                    label={t("crystal.fire")}
                    field="crystal_feu"
                    crystals={crystals}
                    theme={theme}
                    onCrystalUpdate={handleCrystalsUpdate}
                  />
                  <CrystalRow
                    label={t("crystal.gold")}
                    field="crystal_or"
                    crystals={crystals}
                    theme={theme}
                    onCrystalUpdate={handleCrystalsUpdate}
                  />
                </TableBody>
              </Table>
            </div>
          </Grid>
        </Box>
        <IconButton
          onClick={handleDrawerClose}
          sx={{ position: "fixed", right: isMobile ? "2dvw" : "0vw", top: isMobile ? "1dvh" : "36vh" }}
        >
          <CloseIcon sx={{ color: theme.custom.mycustomblur.text }} />
        </IconButton>
      </Drawer>
    </div>
  );
}
