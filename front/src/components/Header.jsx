import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ConnexionContext } from "./provider";

import { useTheme } from "@mui/material/styles";

import { AppBar, Toolbar } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
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
