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
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ConnexionContext } from "./provider";
import HomeCompo from "./Home";
import Btn from "./Btn";


export default function Connexion() {
  const navigate = useNavigate();
  const {state :currentUser,setState: setCurrentUser, loading} = useContext(ConnexionContext);
  const [id, setId] = useState(null);
  const [pwd, setPwd] = useState(null);
  console.log(ConnexionContext);

  useEffect(()=>{
    if(currentUser){
      navigate("/");
    }
  }, [currentUser]);
  
  const handleConnexion = () => {
    const data = {
      users_email: id,
      users_password: pwd,
    };
    console.log("data before", data);
    fetch("api/signIn", {
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
        const user = data.login

          if (user.users_status === "a" || user.users_status === "p" || user.users_status === "r") {
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
              sx={{ textDecoration: "none", width:"100%", padding:0, borderRadius:"5px 5px 0 0",flex:1 }}
              msg={
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "center",
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
              sx={{ textDecoration: "none", width:"100%", padding:0, borderRadius:0, flex:1}}
              msg={
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "center",
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
