import {
  Button,
  Box,
  Typography,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import React from "react";
import Btn from "./Btn";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useThemeMode } from "../context/ThemeContext";
import { useTheme } from "@mui/material/styles";
import "../../src/styles/responsive.css"
import { ConnexionContext } from "./provider";

import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { useSnack } from "../hooks/useSnack";

export default function Settings() {
  const { state: currentUser, refreshUser } = useContext(ConnexionContext);
  console.log("refreshUser: ", refreshUser);
  const { t } = useTranslation();

  const { showSnack, Snack } = useSnack();

  const currentTheme = useTheme();
  const { changeTheme } = useThemeMode();
  const [activeTab, setActiveTab] = useState("identity");

  // Identité
  const [userId, setUserId] = useState(null);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("r");

  // Sécurité
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPwd, setShowPwd] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  // Préférences
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("fr");

  // const [alertOpen, setAlertOpen] = useState(false);
  // const [alertMessage, setAlertMessage] = useState("");
  // const [alertSeverity, setAlertSeverity] = useState("success"); // "success" | "error"

  // const Alert = React.forwardRef(function Alert(props, ref) {
  //   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  // });

  useEffect(() => {
    if (currentUser) {
      setUserId(currentUser.users_ID);
      setPseudo(currentUser.users_pseudo || "");
      setEmail(currentUser.users_email || "");
      setStatus(currentUser.users_status || "r");
    }
  }, [currentUser]);

  const handleUpdateIdentity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userId) {
      showSnack("Utilisateur non identifié !", "error");
      return;
    }

    const data = {
      users_ID: userId,
      users_pseudo: pseudo,
      users_email: email,
      users_status: status,
    };

    fetch(`/users/api/updateUser/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const payload = await res.json().catch(() => null);

        if (!res.ok) {
          showSnack(payload?.message || "Erreur serveur", "error");
          throw new Error("Update user failed");
        }

        return payload;
      })
      .then(() => {
        setTimeout(() => {
          refreshUser();
        }, 250);

        showSnack("Identité mise à jour !", "success");
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour : ", error);
        showSnack("Erreur lors de la mise à jour de l'identité.", "error");
      });
  };

  const handleChangePassword = () => {
    if (newPwd !== confirmPwd) {
      showSnack("Les mots de passe ne correspondent pas.", "warning");
      return;
    }
    const data = {
      old_password: oldPwd,
      new_password: newPwd,
    };
    fetch(`/api/updatePwd/${userId}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const payload = await res.json().catch(() => null);

        if (!res.ok) {
          showSnack(
            payload?.message || "Échec du changement de mot de passe",
            "error",
          );
          throw new Error("Update pwd failed");
        }

        return payload;
      })
      .then(() => {
        setOldPwd("");
        setNewPwd("");
        setConfirmPwd("");
        showSnack("Mot de passe mis à jour !", "success");
      })
      .catch((error) => {
        console.error("Erreur changement mot de passe:", error);
        showSnack("Impossible de changer le mot de passe.", "error");
      });
  };

  const handleSavePreferences = async () => {
    try {
      const data = { user_theme: theme, user_language: language };

      const res = await fetch("/api/preferences", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        showSnack(payload?.message || "Erreur de sauvegarde", "error");
        return;
      }

      changeTheme(theme);
      await i18n.changeLanguage(language);
      refreshUser?.();

      showSnack("Préférences enregistrées !", "success");
    } catch (error) {
      console.error("Erreur préférences:", error);
      showSnack("Erreur lors de la sauvegarde des préférences.", "error");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: currentTheme.custom.mymodal.main,
        color: currentTheme.custom.mymodal.text,
        borderRadius: "5px",
        maxWidth: "600px",
        margin: "0 auto",
        mt: 4,
      }}
    >
      {/* Onglets */}
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {[
          { key: "identity", label: t("settings.identity") },
          { key: "security", label: t("settings.security") },
          { key: "preferences", label: t("settings.preferences") },
        ].map(({ key, label }) => (
          <Btn
            key={key}
            onClick={() => setActiveTab(key)}
            msg={
              <Typography
                sx={{
                  width: "100%",
                  textAlign: "center",
                  padding: "6px",
                  backgroundColor: currentTheme.custom.mymodal.header,
                  fontWeight: "bold",
                  color: activeTab === key ? "white" : "grey",
                }}
              >
                {label}
              </Typography>
            }
            sx={{
              overflow: "hidden",
              textDecoration: "none",
              flex: 1,
              width: "100%",
              padding: 0,
              backgroundColor: currentTheme.custom.mymodal.button,
              borderRadius:
                key === "identity"
                  ? "5px 0 0 0"
                  : key === "preferences"
                    ? "0 5px 0 0"
                    : "0",
            }}
          />
        ))}
      </Box>

      {/* Contenu de l'onglet actif */}
      <Box sx={{ padding: 3 }}>
        {activeTab === "identity" && (
          <>
            <Typography variant="h6" color={currentTheme.custom.mymodal.text}>
              {t("settings.infos")}
            </Typography>
            <TextField
              label="Pseudo"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ color: currentTheme.custom.mymodal.text }}
            />
            <TextField
              label="Email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ color: currentTheme.custom.mymodal.text }}
            />
            <TextField
              label="Statut"
              select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ color: currentTheme.custom.mymodal.text }}
            >
              <MenuItem
                value="r"
                sx={{ color: currentTheme.custom.mymodal.text }}
              >
                {t("signup.statusR")}
              </MenuItem>
              <MenuItem
                value="p"
                sx={{ color: currentTheme.custom.mymodal.text }}
              >
                {t("signup.statusP")}
              </MenuItem>
            </TextField>
            <Button
              type="button"
              onClick={handleUpdateIdentity}
              variant="contained"
              sx={{
                mt: 2,
                color: currentTheme.custom.mymodal.text,
                backgroundColor: currentTheme.custom.mymodal.button,
              }}
            >
              {t("settings.update")}
            </Button>
          </>
        )}

        {activeTab === "security" && (
          <>
            <Typography
              variant="h6"
              sx={{ color: currentTheme.custom.mymodal.text }}
            >
              {t("settings.account")}
            </Typography>
            <TextField
              label={t("settings.currentPwd")}
              type={showPwd.old ? "text" : "password"}
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ color: currentTheme.custom.mymodal.text }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPwd((prev) => ({ ...prev, old: !prev.old }))
                      }
                      edge="end"
                      sx={{
                        color: currentTheme.custom.mymodal.text,
                        backgroundColor: currentTheme.custom.mymodal.button,
                      }}
                    >
                      {showPwd.old ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label={t("settings.newPwd")}
              type={showPwd.new ? "text" : "password"}
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ color: currentTheme.custom.mymodal.text }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPwd((prev) => ({ ...prev, new: !prev.new }))
                      }
                      edge="end"
                      sx={{
                        color: currentTheme.custom.mymodal.text,
                        backgroundColor: currentTheme.custom.mymodal.button,
                      }}
                    >
                      {showPwd.new ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label={t("settings.confirmPwd")}
              type={showPwd.confirm ? "text" : "password"}
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
              onPaste={(e) => e.preventDefault()} // 🚫 empêche le collage
              fullWidth
              margin="normal"
              sx={{ color: currentTheme.custom.mymodal.text }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPwd((prev) => ({
                          ...prev,
                          confirm: !prev.confirm,
                        }))
                      }
                      edge="end"
                      sx={{
                        color: currentTheme.custom.mymodal.text,
                        backgroundColor: currentTheme.custom.mymodal.button,
                      }}
                    >
                      {showPwd.confirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              onClick={handleChangePassword}
              variant="contained"
              sx={{
                mt: 2,
                color: currentTheme.custom.mymodal.text,
                backgroundColor: currentTheme.custom.mymodal.button,
              }}
            >
              {t("settings.updatePwd")}
            </Button>
          </>
        )}

        {activeTab === "preferences" && (
          <>
            <Typography variant="h6">{t("settings.preferences")}</Typography>
            <TextField
              label="Thème"
              select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ color: currentTheme.custom.mymodal.text }}
            >
              <MenuItem
                value="light"
                sx={{ color: currentTheme.custom.mymodal.text }}
              >
                {t("settings.lightMode")}
              </MenuItem>
              <MenuItem
                value="dark"
                sx={{ color: currentTheme.custom.mymodal.text }}
              >
                {t("settings.darkMode")}
              </MenuItem>
            </TextField>
            <TextField
              label="Langue"
              select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ color: currentTheme.custom.mymodal.text }}
            >
              <MenuItem
                value="fr"
                sx={{ color: currentTheme.custom.mymodal.text }}
              >
                {t("settings.fr")}
              </MenuItem>
              <MenuItem
                value="en"
                sx={{ color: currentTheme.custom.mymodal.text }}
              >
                {t("settings.en")}
              </MenuItem>
            </TextField>
            <Button
              onClick={handleSavePreferences}
              variant="contained"
              sx={{
                mt: 2,
                color: currentTheme.custom.mymodal.text,
                backgroundColor: currentTheme.custom.mymodal.button,
              }}
            >
              {t("settings.savePref")}
            </Button>
          </>
        )}
      </Box>
      {Snack}
    </Box>
  );
}
