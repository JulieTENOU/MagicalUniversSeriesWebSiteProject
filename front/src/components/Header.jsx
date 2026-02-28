import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ConnexionContext } from "./provider";

import { useTheme } from "@mui/material/styles";

import { AppBar, Toolbar } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
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
            display: "flex",
            flexDirection: "row",
            alignItems: "left",
            justifyContent: "space-between",
          }}
        >
          <Btn
            path="/"
            msg={<HomeIcon sx={{ color: theme.custom.myheader.text }} />}
          />
          <h2 className="header-title"
            style={{
              color: theme.custom.myheader.text,
              backgroundColor: "none",
            }}
          >
            {t("home.welcomeHeader")}
          </h2>
          {isConnected ? (
            <>
              <Btn
                path="/read"
                msg={<BooksIcon sx={{ color: theme.custom.myheader.text }} />}
                sx={{
                  textDecoration: "none",
                  color: theme.custom.myheader.text,
                }}
              />
              <Btn
                path="/jdr"
                msg={<SmartWatchIcon sx={{ color: theme.custom.myheader.text }} />}
                sx={{
                  textDecoration: "none",
                  color: theme.custom.myheader.text,
                }}
              />
              {/* <Btn path='/read/Lexicon' msg={"Lexique Magique"} sx={{ textDecoration: 'none', color: theme.custom.myheader.text }} />
              <Btn path='/read/Bestiary' msg={"Bestiaire"} sx={{ textDecoration: 'none', color: theme.custom.myheader.text }} />
              <Btn path='/read/Characters' msg={"Les secrets"} msg2={"des personnages"} sx={{ textDecoration: 'none', color: theme.custom.myheader.text }} />
              <Btn path='/read/Magic_history' msg={"Histoire"} msg2={"de la magie"} sx={{ textDecoration: 'none', color: theme.custom.myheader.text }} />
              <Btn path='/read/Magical_Academy' msg={"M.A. Stories"} sx={{ textDecoration: 'none', color: theme.custom.myheader.text }} /> */}

              <Btn
                path="/settings"
                msg={
                  <SettingsIcon sx={{ color: theme.custom.myheader.text }} />
                }
              />

              <Btn
                onClick={() => {
                  fetch("/api/logout", {
                    method: "POST",
                    credentials: "include",
                  }).then(() => {
                    localStorage.removeItem("token");
                    setUser(null);
                    navigate("/");
                  });
                }}
                msg={<LogoutIcon sx={{ color: theme.custom.myheader.text }} />}
                sx={{
                  textDecoration: "none",
                  color: theme.custom.myheader.text,
                }}
              />
            </>
          ) : (
            <Btn
              path={"/connexion"}
              msg={t("buttons.login")}
              msg2={t("buttons.signup")}
            />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
