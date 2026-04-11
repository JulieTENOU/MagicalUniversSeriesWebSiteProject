import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ConnexionContext } from "./provider";

import { useTheme } from "@mui/material/styles";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import SettingsIcon from "@mui/icons-material/Settings";
import SmartWatchIcon from "./icons/SmartWatchIcon";

import BooksIcon from "./icons/BooksIcon";

import Btn from "./Btn";

export default function Top() {
  const {
    state: user,
    setState: setUser,
    loading,
  } = useContext(ConnexionContext);
  const isConnected = !!user;
  console.log(isConnected);
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const iconSx = { color: theme.custom.myheader.text, fontSize: "1.8rem" };

  const DrawerContent = () => (
    <Box
      sx={{
        width: 270,
        height: "100%",
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        py: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 2, py: 1.5 }}>
        <img src="/favicon.svg" alt="logo" style={{ width: 28, height: 28 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: theme.custom.myheader.text }}>
          Magical Universe
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

      <List dense sx={{ flex: 1, width: "100%" }}>
        <ListItemButton onClick={() => { navigate("/"); setDrawerOpen(false); }}>
          <ListItemIcon sx={{ color: theme.custom.myheader.text, minWidth: 36 }}>
            <HomeIcon sx={iconSx} />
          </ListItemIcon>
          <ListItemText primary="Accueil" primaryTypographyProps={{ fontSize: "1.1rem", color: theme.custom.myheader.text }} />
        </ListItemButton>

        {isConnected && (
          <ListItemButton onClick={() => { navigate("/read"); setDrawerOpen(false); }}>
            <ListItemIcon sx={{ color: theme.custom.myheader.text, minWidth: 36 }}>
              <BooksIcon sx={iconSx} />
            </ListItemIcon>
            <ListItemText primary={t("buttons.read")} primaryTypographyProps={{ fontSize: "1.1rem", color: theme.custom.myheader.text }} />
          </ListItemButton>
        )}

        {isConnected && (
          <ListItemButton onClick={() => { navigate("/jdr"); setDrawerOpen(false); }}>
            <ListItemIcon sx={{ color: theme.custom.myheader.text, minWidth: 36 }}>
              <SmartWatchIcon sx={iconSx} />
            </ListItemIcon>
            <ListItemText primary={t("buttons.jdr")} primaryTypographyProps={{ fontSize: "1.1rem", color: theme.custom.myheader.text }} />
          </ListItemButton>
        )}

        <ListItemButton onClick={() => { navigate("/about"); setDrawerOpen(false); }}>
          <ListItemIcon sx={{ color: theme.custom.myheader.text, minWidth: 36 }}>
            <InfoOutlinedIcon sx={iconSx} />
          </ListItemIcon>
          <ListItemText primary={t("about.pageTitle")} primaryTypographyProps={{ fontSize: "1.1rem", color: theme.custom.myheader.text }} />
        </ListItemButton>

        {isConnected && (
          <ListItemButton onClick={() => { navigate("/settings"); setDrawerOpen(false); }}>
            <ListItemIcon sx={{ color: theme.custom.myheader.text, minWidth: 36 }}>
              <SettingsIcon sx={iconSx} />
            </ListItemIcon>
            <ListItemText primary={t("settings.title")} primaryTypographyProps={{ fontSize: "1.1rem", color: theme.custom.myheader.text }} />
          </ListItemButton>
        )}
      </List>

      <Divider />

      <List dense sx={{ width: "100%" }}>
        {isConnected ? (
          <ListItemButton
            onClick={() => {
              fetch("/api/logout", { method: "POST", credentials: "include" }).then(() => {
                localStorage.removeItem("token");
                setUser(null);
                navigate("/");
              });
              setDrawerOpen(false);
            }}
            sx={{ color: "#f87171" }}
          >
            <ListItemIcon sx={{ color: "#f87171", minWidth: 36 }}>
              <LogoutIcon sx={{ ...iconSx, color: "#f87171" }} />
            </ListItemIcon>
            <ListItemText primary={t("buttons.logout")} primaryTypographyProps={{ fontSize: "1.1rem", color: "#f87171" }} />
          </ListItemButton>
        ) : (
          <ListItemButton onClick={() => { navigate("/connexion"); setDrawerOpen(false); }}>
            <ListItemIcon sx={{ color: theme.custom.myheader.text, minWidth: 36 }}>
              <LoginIcon sx={iconSx} />
            </ListItemIcon>
            <ListItemText
              primary={`${t("buttons.login")} / ${t("buttons.signup")}`}
              primaryTypographyProps={{ fontSize: "1.1rem", color: theme.custom.myheader.text }}
            />
          </ListItemButton>
        )}
      </List>
    </Box>
  );

  if (isMobile) {
    return (
      <>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            backgroundColor: theme.custom.myheader.main,
            WebkitBackdropFilter: theme.custom.myheader.blur,
            backdropFilter: theme.custom.myheader.blur,
            boxShadow: "none",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ p: 0.5 }} aria-label="menu">
              <img src="/favicon.svg" alt="logo" style={{ width: 32, height: 32 }} />
            </IconButton>
            <Typography
              component="h2"
              className="header-title"
              sx={{
                color: theme.custom.myheader.text,
                fontWeight: "bold",
                fontSize: "1rem",
                m: 0,
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              {t("home.welcomeHeader")}
            </Typography>
            <Box sx={{ width: 40 }} />
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{ zIndex: 1500 }}
        >
          <DrawerContent />
        </Drawer>
      </>
    );
  }

  return (
    <div
      style={{
        top: "0",
        display: "flex",
        position: "sticky",
        flexDirection: "row",
        textAlign: "center",
        alignItems: "end",
        justifyContent: "space-between",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: theme.custom.myheader.main,
          WebkitBackdropFilter: theme.custom.myheader.blur,
          backdropFilter: theme.custom.myheader.blur,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent: "space-evenly",
          boxShadow: "none",
        }}
      >
        <Toolbar
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            alignItems: "center",
          }}
        >
          <Btn
            path="/"
            msg={<HomeIcon sx={{ color: theme.custom.myheader.text }} />}
          />
          <h2 className="header-title"
            style={{ color: theme.custom.myheader.text, backgroundColor: "none", textAlign: "center", margin: 0 }}
          >
            {t("home.welcomeHeader")}
          </h2>
          {isConnected ? (
            <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "0 12px" }}>
              <Btn path="/read" msg={<BooksIcon sx={{ color: theme.custom.myheader.text }} />} sx={{ textDecoration: "none", color: theme.custom.myheader.text }} style={{ flex: "none", margin: "0 10px" }} />
              <Btn path="/jdr" msg={<SmartWatchIcon sx={{ color: theme.custom.myheader.text }} />} sx={{ textDecoration: "none", color: theme.custom.myheader.text }} style={{ flex: "none", margin: "0 10px" }} />
              <Btn path="/about" msg={<InfoOutlinedIcon sx={{ color: theme.custom.myheader.text }} />} style={{ flex: "none", margin: "0 10px" }} />
              <Btn path="/settings" msg={<SettingsIcon sx={{ color: theme.custom.myheader.text }} />} style={{ flex: "none", margin: "0 10px" }} />
              <Btn
                onClick={() => {
                  fetch("/api/logout", { method: "POST", credentials: "include" }).then(() => {
                    localStorage.removeItem("token");
                    setUser(null);
                    navigate("/");
                  });
                }}
                msg={<LogoutIcon sx={{ color: theme.custom.myheader.text }} />}
                sx={{ textDecoration: "none", color: theme.custom.myheader.text }}
                style={{ flex: "none", margin: "0 10px", minWidth: "90px" }}
              />
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "0 12px" }}>
              <BooksIcon sx={{ visibility: "hidden", margin: "0 10px" }} />
              <SmartWatchIcon sx={{ visibility: "hidden", margin: "0 10px" }} />
              <Btn path="/about" msg={<InfoOutlinedIcon sx={{ color: theme.custom.myheader.text }} />} style={{ flex: "none", margin: "0 10px" }} />
              <SettingsIcon sx={{ visibility: "hidden", margin: "0 10px" }} />
              <Btn path={"/connexion"} msg={t("buttons.login")} msg2={t("buttons.signup")} style={{ flex: "none", margin: "0 10px", minWidth: "90px" }} />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
