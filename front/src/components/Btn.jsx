import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Btn(props) {
  const button = (
    <Button
      sx={{
        padding: 0,
        margin: 0,
        minWidth: 0,
        minHeight: 0,
        lineHeight: 1,
        borderRadius: 0,
        p: 0,
        m: 0,
        width: "100%",
        height: "100%",
        ...props.sx,
      }}
      onClick={props.onClick}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img
          src={props.src}
          alt={props.alt}
          height={props.height}
          width={props.width}
        />
        {props.msg}
        {props.msg2 && <br />}
        {props.msg2}
      </div>
    </Button>
  );

  return (
    <div style={{ flex: 1, ...props.style }}>
      {props.path ? (
        <Link
          to={props.path}
          style={{ textDecoration: "none", display: "block", width: "100%" }}
        >
          {button}
        </Link>
      ) : (
        button
      )}
    </div>
  );
}
