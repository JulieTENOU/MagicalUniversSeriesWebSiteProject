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
import { ConnexionContext } from "./provider";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function Settings() {
  const { state: currentUser, refreshUser } = useContext(ConnexionContext);
  console.log("refreshUser: ", refreshUser);

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

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success"); // "success" | "error"

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  // ✅ NOUVEAU: Synchronise les champs dès que le currentUser change
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
      setAlertMessage("Utilisateur non identifié !");
      setAlertSeverity("error");
      setAlertOpen(true);
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
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur serveur");
        }
        return res.json();
      })
      .then((updatedUser) => {
        // Ajoute une petite pause pour être certain que le backend ait bien commit la modif
        setTimeout(() => {
          refreshUser();
        }, 250); // parfois 100ms suffisent, 250ms c'est solide

        setAlertMessage("Identité mise à jour !");
        setAlertSeverity("success");
        setAlertOpen(true);
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour : ", error);
        setAlertMessage("Erreur lors de la mise à jour de l'identité.");
        setAlertSeverity("error");
        setAlertOpen(true);
      });
  };

  const handleChangePassword = () => {
    if (newPwd !== confirmPwd) {
      setAlertMessage("Les mots de passe ne correspondent pas.");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }
    const data = {
      old_password: oldPwd,
      new_password: newPwd,
    };
    fetch(`/api/change-password`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Échec du changement de mot de passe");
        return res.json();
      })
      .then(() => {
        setAlertMessage("Mot de passe mis à jour !");
        setAlertSeverity("success");
        setAlertOpen(true);
      })
      .catch((error) => {
        console.error("Erreur changement mot de passe:", error);
        setAlertMessage("Impossible de changer le mot de passe.");
        setAlertSeverity("error");
        setAlertOpen(true);
      });
  };

  const handleSavePreferences = () => {
    const data = { user_theme: theme, user_language: language };
    fetch(`/api/preferences`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de sauvegarde");
        return res.json(); // ou `return;` si pas de JSON renvoyé
      })
      .then(() => {
        changeTheme(theme);
        setAlertMessage("Préférences enregistrées !");
        setAlertSeverity("success");
        setAlertOpen(true);
      })
      .catch((error) => {
        console.error("Erreur préférences:", error);
        setAlertMessage("Erreur lors de la sauvegarde des préférences.");
        setAlertSeverity("error");
        setAlertOpen(true);
      });
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
          { key: "identity", label: "Identité" },
          { key: "security", label: "Sécurité" },
          { key: "preferences", label: "Préférences" },
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
              Informations personnelles
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
                Lecteur
              </MenuItem>
              <MenuItem
                value="p"
                sx={{ color: currentTheme.custom.mymodal.text }}
              >
                Joueur
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
              Mettre à jour
            </Button>
          </>
        )}

        {activeTab === "security" && (
          <>
            <Typography
              variant="h6"
              sx={{ color: currentTheme.custom.mymodal.text }}
            >
              Sécurité du compte
            </Typography>
            <TextField
              label="Mot de passe actuel"
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
              label="Nouveau mot de passe"
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
              label="Confirmer le mot de passe"
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
              Changer le mot de passe
            </Button>
          </>
        )}

        {activeTab === "preferences" && (
          <>
            <Typography variant="h6">Préférences</Typography>
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
                Clair
              </MenuItem>
              <MenuItem
                value="dark"
                sx={{ color: currentTheme.custom.mymodal.text }}
              >
                Sombre
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
                Français
              </MenuItem>
              <MenuItem
                value="en"
                sx={{ color: currentTheme.custom.mymodal.text }}
              >
                Anglais
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
              Enregistrer les préférences
            </Button>
          </>
        )}
      </Box>
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
