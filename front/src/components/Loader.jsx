import { CircularProgress, Box } from "@mui/material";

export default function Loader({ fullscreen = true }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: fullscreen ? "100vh" : "100%",
        width: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
