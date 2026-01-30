import {
  Button,
  Box,
  Typography,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  MenuItem,
} from "@mui/material";
import Btn from "./Btn";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useSnack } from "../hooks/useSnack";

export default function Inscription() {
  const theme = useTheme();
  const [id, setId] = useState(null);
  const [pwd, setPwd] = useState(null);
  const [status, setStatus] = useState(null);
  const [name, setName] = useState(null);
  const { t } = useTranslation();
  const { showSnack, Snack } = useSnack();

  const handleInscription = () => {
    const data = {
      users_email: id,
      users_password: pwd,
      users_pseudo: name,
      users_status: status,
    };
    // console.log(data);

    if (!data.users_email || !data.users_password || !data.users_pseudo) {
      showSnack("Merci de remplir pseudo, email et mot de passe.", "warning");
      return;
    }

    showSnack(
      `Données fournies : mail=${data.users_email}, pseudo=${data.users_pseudo}, status=${data.users_status || "r"}`,
      "info",
    );

    fetch(`api/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        // si le backend renvoie parfois autre chose que du json, on protège
        const payload = await response.json().catch(() => null);

        if (!response.ok) {
          showSnack(
            payload?.message ||
              payload?.error ||
              "Erreur lors de l'inscription.",
            "error",
          );
          throw new Error("Register failed");
        }

        return payload;
      })
      .then((payload) => {
        console.log("Success:", payload);
        showSnack("Inscription réussie ! 🎉", "success");
        // window.location.href = "http://localhost:3000/connexion";
      })
      .catch((error) => {
        console.error("Error:", error);
        showSnack("Impossible de contacter le serveur.", "error");
      });
  };

  return (
    <div>
      <Box
        sx={{
          backgroundColor: theme.custom.mymodal.main,
          color: theme.custom.mymodal.text,
          borderRadius: "5px",
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
          <Btn
            path="/connexion"
            //   style={{flex:1}}
            sx={{
              textDecoration: "none",
              width: "100%",
              padding: 0,
              borderRadius: "5px 5px 0 0",
              flex: 1,
            }}
            msg={
              <Typography
                sx={{
                  width: "100%",
                  textAlign: "center",
                  padding: "6px",
                  color: theme.custom.mymodal.text,
                  backgroundColor: theme.custom.mymodal.button,
                  fontWeight: "bold",
                }}
              >
                {t("buttons.login")}
              </Typography>
            }
          />
          <Btn
            path="/inscription"
            //   style={{flex:1}}
            sx={{
              textDecoration: "none",
              width: "100%",
              padding: 0,
              borderRadius: 0,
              flex: 1,
            }}
            msg={
              <Typography
                sx={{
                  width: "100%",
                  textAlign: "center",
                  // borderRadius: "0 5px 0 0",
                  padding: "6px",
                  color: theme.custom.mymodal.text,
                  backgroundColor: theme.custom.mymodal.button,
                  fontWeight: "bold",
                }}
              >
                {t("buttons.signup")}
              </Typography>
            }
          />
        </Box>
        <DialogContent>
          <DialogContentText
            sx={{
              backgroundColor: theme.custom.mymodal.main,
              color: theme.custom.mymodal.text,
            }}
          >
            Pseudo
          </DialogContentText>
          <TextField
            sx={{
              backgroundColor: theme.custom.mymodal.main,
              color: theme.custom.mymodal.text,
            }}
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <DialogContentText
            sx={{
              backgroundColor: theme.custom.mymodal.main,
              color: theme.custom.mymodal.text,
            }}
          >
            Email
          </DialogContentText>
          <TextField
            sx={{
              backgroundColor: theme.custom.mymodal.main,
              color: theme.custom.mymodal.text,
            }}
            id="mail"
            type="email"
            value={id}
            onChange={(e) => setId(e.target.value)}
            fullWidth
          />

          <DialogContentText
            sx={{
              backgroundColor: theme.custom.mymodal.main,
              color: theme.custom.mymodal.text,
            }}
          >
            {t("signup.pwd")}
          </DialogContentText>
          <TextField
            sx={{
              backgroundColor: theme.custom.mymodal.main,
              color: theme.custom.mymodal.text,
            }}
            id="password"
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            fullWidth
          />

          <DialogContentText
            sx={{
              backgroundColor: theme.custom.mymodal.main,
              color: theme.custom.mymodal.text,
            }}
          >
            Status
          </DialogContentText>
          <TextField
            sx={{
              backgroundColor: theme.custom.mymodal.main,
              color: theme.custom.mymodal.text,
            }}
            id="status"
            select
            value={status || "r"}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
          >
            <MenuItem
              sx={{
                backgroundColor: theme.custom.mymodal.main,
                color: theme.custom.mymodal.text,
              }}
              value="r"
            >
              {t("signup.statusR")}
            </MenuItem>
            <MenuItem
              sx={{
                backgroundColor: theme.custom.mymodal.main,
                color: theme.custom.mymodal.text,
              }}
              value="p"
            >
              {t("signup.statusP")}
            </MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions sx={{ textAlign: "center", justifyContent: "center" }}>
          <Button
            onClick={handleInscription}
            sx={{
              color: theme.custom.mymodal.text,
              backgroundColor: theme.custom.mymodal.button,
            }}
          >
            {t("signup.cta")}
          </Button>
        </DialogActions>
      </Box>
      {Snack}
    </div>
  );
}
