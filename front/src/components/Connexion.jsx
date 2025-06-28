import {
  Button,
  Box,
  Typography,
  TextField,
  DialogContent,
  DialogContentText,
  DialogActions,
  Link,
} from "@mui/material";
import React, { useState, useContext } from "react";
import { ConnexionContext } from "./provider";
import HomeCompo from "./Home";
import Btn from "./Btn";

export default function Connexion() {
  const [currentUser, setCurrentUser] = useContext(ConnexionContext);
  const [id, setId] = useState(null);
  const [pwd, setPwd] = useState(null);
  console.log(ConnexionContext);
  const handleConnexion = () => {
    const data = {
      users_email: id,
      users_password: pwd,
    };
    console.log(data);
    fetch("api/signIn", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert("Invalid email or password!");
        } else {
          if (data.login.users_status === "a") {
            setCurrentUser(data);
            console.log("currentUser:" + currentUser);
            console.log(currentUser);
            console.log("Success:", data);
            // window.location.href = "http://localhost:3003/"
          } else if (data.login.users_status === "p") {
            setCurrentUser(data);
            console.log(currentUser);
            console.log("Success:", data);
            // window.location.href = "http://localhost:3003/"
          } else {
            console.log("Success:", data);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {currentUser ? (
        <HomeCompo user={currentUser} />
      ) : (
        <Box
          sx={{
            backgroundColor: "whitesmoke",
            color: "black",
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
              sx={{ textDecoration: "none", width:"100%", padding:0, borderRadius:"5px 5px 0 0",flex:1 }}
              msg={
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    // borderRadius: "5px 0 0 0",
                    padding: "6px",
                    color: "white",
                    backgroundColor: " #3498DB ",
                    fontWeight: "bold",
                  }}
                >
                  Connexion
                </Typography>
              }
            />
            <Btn
              path="/inscription"
            //   style={{flex:1}}
              sx={{ textDecoration: "none", width:"100%", padding:0, borderRadius:0, flex:1}}
              msg={
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    // borderRadius: "0 5px 0 0",
                    padding: "6px",
                    color: "white",
                    backgroundColor: " #3498DB ",
                    fontWeight: "bold",
                  }}
                >
                  Inscritpion
                </Typography>
              }
            />
          </Box>
          <DialogContent>
            <DialogContentText>Email</DialogContentText>
            <TextField
              id="mail"
              type="email"
              onChange={(e) => setId(e.target.value)}
            />
            <DialogContentText>Mot de passe</DialogContentText>
            <TextField
              id="password"
              type="password"
              onChange={(e) => setPwd(e.target.value)}
            />
          </DialogContent>
          <DialogActions sx={{ textAlign: "center", justifyContent: "center" }}>
            <Button
              onClick={() => {
                handleConnexion();
              }}
            >
              Se connecter
            </Button>
          </DialogActions>
        </Box>
      )}
    </div>
  );
}
