import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function BtnRtn(props) {
  const API_BASE = process.env.REACT_APP_API_BASE || window.location.origin;
  const LogoReturn = `${API_BASE}/api/media/getOneMedia/8`;
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();


  const handleBack = () => {
    if (props.path) {
      navigate(props.path);
      return;
    }
    // Si on a un "from" explicite, on retourne dessus
    if (location.state?.from) {
      navigate(location.state.from, { replace: true });
      return;
    }

    // Sinon, si l'historique est suffisant, on back
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    // Fallback: route sûre (ex: accueil)
    navigate("/", { replace: true });
  };

  return (
    <div style={props.style}>
      <Link to={props.path}>
        {/* <Button sx={props.sx} onClick={handleBack}> */}
        <Button
          disableRipple
          sx={{
            ...props.sx,
            backgroundColor: "transparent",
            "&:hover": { backgroundColor: "transparent" },
          }}
          onClick={handleBack}
        >
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
      </Link>
    </div>
  );
}
