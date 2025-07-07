import {
  Button,
  Box,
  Typography,
  TextField,
  DialogContent,
  DialogContentText,
  DialogActions,
  Link,
  Alert,
} from "@mui/material";
import Btn from "./Btn";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function ForgotPassword({ onBack }) {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Quand l'envoi est fait, on redirige après 2 secondes
  useEffect(() => {
    if (sent) {
      const timer = setTimeout(() => {
        navigate("/connexion");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [sent, navigate]);

  const handleSend = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ users_email: email }),
      });
      const data = await res.json();
      console.log(data);
      setSent(true);
      setMessage(
        data.message ||
          "Si ce mail existe, tu recevras un lien de réinitialisation."
      );
    } catch (err) {
      setError("Erreur lors de l'envoi. Réessaie plus tard.");
    }
  };

  return (
    <div>
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "stretch",
            width: "100%",
            borderRadius: "5px 5px 0 0",
            overflow: "hidden",
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
                  textTransform:"uppercase"
                  
                }}
              >
                Mot de passe oublié
              </Typography>
        </Box>
        <DialogContent>
          {sent ? (
            <Alert severity="success" sx={{ mt: 2 }}>
              {message}
            </Alert>
          ) : (
            <div>
              <DialogContentText
              >
                Indique ton adresse e-mail, tu recevras un lien pour
                réinitialiser ton mot de passe.
              </DialogContentText>
              <TextField
                label="Adresse e-mail"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  mt: 2,
                  mb: 2,
                  backgroundColor: theme.custom.mymodal.main,
                  color: theme.custom.mymodal.text,
                }}
                required
              />
              {error && <Alert severity="error">{error}</Alert>}
            </div>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          {!sent && (
            <Button
              variant="contained"
              onClick={handleSend}
              disabled={!email}
              sx={{
                color: theme.custom.mymodal.text,
                backgroundColor: theme.custom.mymodal.button,
              }}
            >
              Envoyer le lien
            </Button>
          )}
        </DialogActions>
      </Box>
    </div>
  );
}
