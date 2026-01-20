import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LogoReturn from "../assets/img/return.png";

export default function BtnRtn(props) {
    const navigate= useNavigate();
    return (
        <div style={props.style}>
            {/* <Link to={props.path}> */}
                <Button sx={props.sx} onClick={() => navigate(-1)}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent:"center", alignItems:'center'}}>
                       <img src={LogoReturn} alt="Retour" height="10vh" width="20vw" />
           {props.msg}
                    </div>
                </Button>
            {/* </Link> */}
        </div>
    )
};