import { Button, Box, Typography, DialogActions, DialogContent, DialogContentText, TextField, MenuItem } from "@mui/material";
import Btn from "./Btn";
import * as React from "react";
import { useState } from "react";

export default function Inscription() {
  const [id, setId] = useState(null);
  const [pwd, setPwd] = useState(null);
  const [status, setStatus] = useState(null);
  const [name, setName] = useState(null);

  const handleInscription = () => {
    const data = {
      users_email: id,
      users_password: pwd,
      users_pseudo: name,
      users_status: status,
    };
    console.log(data);
    alert(
      "Data fournies : \n mail: " +
        data.users_email +
        "\n password: " +
        data.users_password +
        "\n pseudo: " +
        data.users_pseudo +
        "\n status: " +
        data.users_status
    );
    // if(
    //     data[0] != null &&
    //     data[1] != null &&
    //     data[2] != null &&
    //     data[3] != null
    // ){

    fetch("api/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        //    window.location.href = "http://localhost:3000/connexion";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // }
  };

  return (
    <div>
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
        {/* <form onSubmit={(e) => handleInscription(e)}>
                    <label htmlFor="name">Pseudo</label>
                    <input id="name" type="text" onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="mail">Email</label>
                    <input id="mail" type="email" onChange={(e) => setId(e.target.value)} />
                    <label htmlFor="password">Mot de passe</label>
                    <input id="password" type="password" onChange={(e) => setPwd(e.target.value)} />
                    <label htmlFor="status">Status</label>
                    <select id="status" value={status || "r"} onChange={(e) => setStatus(e.target.value)}>
                        <option value="r">Lecteur</option>
                        <option value="p">Joueur</option>
                    </select>
                </form>
                <DialogActions sx={{ textAlign: "center", justifyContent: 'center' }}>
                    <Button onClick={(e) => { handleInscription(e) }}>
                        S'inscrire
                    </Button>
                </DialogActions> */}
        <DialogContent>
          <DialogContentText>Pseudo</DialogContentText>
          <TextField
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <DialogContentText>Email</DialogContentText>
          <TextField
            id="mail"
            type="email"
            value={id}
            onChange={(e) => setId(e.target.value)}
            fullWidth
          />

          <DialogContentText>Mot de passe</DialogContentText>
          <TextField
            id="password"
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            fullWidth
          />

          <DialogContentText>Status</DialogContentText>
          <TextField
            id="status"
            select
            value={status || "r"}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
          >
            <MenuItem value="r">Lecteur</MenuItem>
            <MenuItem value="p">Joueur</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions sx={{ textAlign: "center", justifyContent: "center" }}>
          <Button onClick={handleInscription}>S'inscrire</Button>
        </DialogActions>
      </Box>
    </div>
  );
}
