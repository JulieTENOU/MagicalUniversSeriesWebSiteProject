import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Typography,
  TextField,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function ResetPassword() {
  const { token } = useParams();
  const theme = useTheme();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!password || !confirm) {
      setError("Merci de remplir les deux champs.");
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      const res = await fetch(`/api/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ users_password: password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setMessage(data.message || "Mot de passe modifié !");
        setTimeout(() => navigate("/connexion"), 2000); // redirection après 2s
      } else {
        setError(data.message || "Erreur lors de la modification.");
      }
    } catch (err) {
      setError("Erreur serveur, réessaie plus tard.");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.custom.mymodal.main,
        color: theme.custom.mymodal.text,
        borderRadius: "5px",
        maxWidth: 400,
        mx: "auto",
        mt: 4,
      }}
    >
      <Typography
        sx={{
          width: "100%",
          textAlign: "center",
          padding: "6px",
          color: theme.custom.mymodal.text,
          backgroundColor: theme.custom.mymodal.button,
          fontWeight: "bold",
          textDecoration: "none",
          textTransform: "uppercase",
        }}
      >
        Réinitialiser le mot de passe
      </Typography>
      <DialogContent>
        {success ? (
          <Alert severity="success" sx={{ mt: 2 }}>
            {message}
          </Alert>
        ) : (
          <form onSubmit={handleReset}>
            <TextField
              label="Nouveau mot de passe"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: theme.custom.mymodal.main,
                color: theme.custom.mymodal.text,
              }}
              required
            />
            <TextField
              label="Confirme le mot de passe"
              type="password"
              fullWidth
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              sx={{
                mb: 2,
                backgroundColor: theme.custom.mymodal.main,
                color: theme.custom.mymodal.text,
              }}
              required
            />
            {error && <Alert severity="error">{error}</Alert>}
            <DialogActions sx={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  color: theme.custom.mymodal.text,
                  backgroundColor: theme.custom.mymodal.button,
                  mt: 2,
                }}
              >
                Mettre à jour
              </Button>
            </DialogActions>
          </form>
        )}
      </DialogContent>
    </Box>
  );
}
