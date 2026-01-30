import {
  Button,
  Box,
  Typography,
  TextField,
  DialogContent,
  DialogContentText,
  DialogActions,
  Link,
  backdropClasses,
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ConnexionContext } from "./provider";
import HomeCompo from "./Home";
import Btn from "./Btn";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

export default function Connexion() {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    state: currentUser,
    setState: setCurrentUser,
    loading,
  } = useContext(ConnexionContext);
  const [id, setId] = useState(null);
  const [pwd, setPwd] = useState(null);
  console.log(ConnexionContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const handleConnexion = () => {
    const data = {
      users_email: id,
      users_password: pwd,
    };
    console.log("data before", data);
    fetch(`api/signIn`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data after co", data);
        if (data.message) {
          alert("Invalid email or password!");
          return;
        }
        const user = data.login;

        if (
          user.users_status === "a" ||
          user.users_status === "p" ||
          user.users_status === "r"
        ) {
          setCurrentUser(user);
          console.log("currentUser:", currentUser);
          console.log("Success:", data);
          // window.location.href = "http://localhost:3003/"
        } else {
          console.warn("Unknown user status:", user.users_status);
        }
      })
      .catch((error) => {
        console.error("Erreur pendant la connexion :", error);
      });
  };

  return (
    <div>
      {currentUser ? (
        <HomeCompo user={currentUser} />
      ) : (
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
              Email
            </DialogContentText>
            <TextField
              sx={{
                backgroundColor: theme.custom.mymodal.main,
                color: theme.custom.mymodal.text,
              }}
              id="mail"
              type="email"
              onChange={(e) => setId(e.target.value)}
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
              onChange={(e) => setPwd(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && id && pwd) {
                  handleConnexion();
                }
              }}
            />
            <Btn
              sx={{
                color: theme.custom.mymodal.text,
                textDecoration: "underline",
              }}
              path="/forgotten_password"
              msg={t("signup.frgt")}
            />
          </DialogContent>
          <DialogActions sx={{ textAlign: "center", justifyContent: "center" }}>
            <Button
              onClick={handleConnexion}
              sx={{
                color: theme.custom.mymodal.text,
                backgroundColor: theme.custom.mymodal.button,
              }}
            >
              {t("signup.cta")}
            </Button>
          </DialogActions>
        </Box>
      )}
    </div>
  );
}
