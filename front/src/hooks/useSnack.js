import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export function useSnack() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [duration, setDuration] = useState(20000);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const showSnack = (msg, sev = "info", dur) => {
    setMessage(msg);
    setSeverity(sev);
    if (dur !== undefined) setDuration(dur);
    setOpen(true);
  };

  const Snack = (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity={severity}
        sx={{ width: "100%" }}
      >
        <span style={{ whiteSpace: "pre-line" }}>{message}</span>
      </Alert>
    </Snackbar>
  );

  return { showSnack, Snack };
}
