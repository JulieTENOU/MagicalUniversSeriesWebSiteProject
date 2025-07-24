import {
  Button,
  Box,
  Typography,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect } from "react";
import Btn from "./Btn";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useThemeMode } from "../context/ThemeContext";
import { useTheme } from "@mui/material/styles";


export default function Settings() {
  const currentTheme = useTheme();
  const {changeTheme} = useThemeMode();
  const [activeTab, setActiveTab] = useState("identity");

  // Identité
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

  // Charger les données utilisateur (exemple)
  useEffect(() => {
    fetch(`/api/me`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        console.log("Datas: ", data);
        setPseudo(data.users_pseudo || "");
        setEmail(data.users_email || "");
        setStatus(data.users_status || "r");
      });
  }, []);

  const handleUpdateIdentity = () => {
    const data = {
      pseudo,
      email,
      status,
    };
    fetch(`/api/update-identity`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  const handleChangePassword = () => {
    if (newPwd !== confirmPwd) {
      alert("Les mots de passe ne correspondent pas");
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
    });
  };

  const handleSavePreferences = () => {
    const data = { user_theme: theme, user_language: language };
    fetch(`/api/preferences`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      changeTheme(theme);
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
              backgroundColor:currentTheme.custom.mymodal.button,
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
            <Typography variant="h6" color={currentTheme.custom.mymodal.text}>Informations personnelles</Typography>
            <TextField
              label="Pseudo"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              fullWidth
              margin="normal"
              sx={{color:currentTheme.custom.mymodal.text}}
            />
            <TextField
              label="Email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              sx={{color:currentTheme.custom.mymodal.text}}
            />
            <TextField
              label="Statut"
              select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
              margin="normal"
              sx={{color:currentTheme.custom.mymodal.text}}
            >
              <MenuItem value="r" sx={{color:currentTheme.custom.mymodal.text}}>Lecteur</MenuItem>
              <MenuItem value="p" sx={{color:currentTheme.custom.mymodal.text}}>Joueur</MenuItem>
            </TextField>
            <Button
              onClick={handleUpdateIdentity}
              variant="contained"
              sx={{ mt: 2, color:currentTheme.custom.mymodal.text, backgroundColor:currentTheme.custom.mymodal.button}}
            >
              Mettre à jour
            </Button>
          </>
        )}

        {activeTab === "security" && (
          <>
            <Typography variant="h6" sx={{color:currentTheme.custom.mymodal.text}}>Sécurité du compte</Typography>
            <TextField
              label="Mot de passe actuel"
              type={showPwd.old ? "text" : "password"}
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
              fullWidth
              margin="normal"
              sx={{color:currentTheme.custom.mymodal.text}}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPwd((prev) => ({ ...prev, old: !prev.old }))
                      }
                      edge="end"
                      sx={{color:currentTheme.custom.mymodal.text,backgroundColor:currentTheme.custom.mymodal.button}}
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
              sx={{color:currentTheme.custom.mymodal.text}}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPwd((prev) => ({ ...prev, new: !prev.new }))
                      }
                      edge="end"
                      sx={{color:currentTheme.custom.mymodal.text,backgroundColor:currentTheme.custom.mymodal.button}}
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
             sx={{color:currentTheme.custom.mymodal.text}}
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
                      sx={{color:currentTheme.custom.mymodal.text,backgroundColor:currentTheme.custom.mymodal.button}}
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
              sx={{ mt: 2, color:currentTheme.custom.mymodal.text,backgroundColor:currentTheme.custom.mymodal.button }}
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
              sx={{color:currentTheme.custom.mymodal.text}}
            >
              <MenuItem value="light" sx={{color:currentTheme.custom.mymodal.text}}>Clair</MenuItem>
              <MenuItem value="dark" sx={{color:currentTheme.custom.mymodal.text}}>Sombre</MenuItem>
            </TextField>
            <TextField
              label="Langue"
              select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              fullWidth
              margin="normal"
             sx={{color:currentTheme.custom.mymodal.text}}
            >
              <MenuItem value="fr" sx={{color:currentTheme.custom.mymodal.text}}>Français</MenuItem>
              <MenuItem value="en" sx={{color:currentTheme.custom.mymodal.text}}>Anglais</MenuItem>
            </TextField>
            <Button
              onClick={handleSavePreferences}
              variant="contained"
              sx={{ mt: 2,color:currentTheme.custom.mymodal.text, backgroundColor:currentTheme.custom.mymodal.button}}
            >
              Enregistrer les préférences
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
