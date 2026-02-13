import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LogoReturn from "../assets/img/return.png";
import { useTheme } from "@mui/material/styles";

export default function BtnRtn(props) {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <div style={props.style}>
      {/* <Link to={props.path}> */}
      <Button sx={props.sx} onClick={() => navigate(-1)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={LogoReturn}
            alt="Retour"
            style={{ height: "5vh", width: "7vw" }}
          />
          <Typography sx={{ color: theme.custom.mycustomblur.text }}>
            {props.msg}
          </Typography>
        </div>
      </Button>
      {/* </Link> */}
    </div>
  );
}
