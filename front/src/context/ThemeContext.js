// context/ThemeContext.js
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { createContext, useMemo, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

const getTheme = (mode = "dark") =>
  createTheme({
    palette: {
      mode,
    },
    custom: {
      mycustomblur: {
        main: mode === "dark" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.7)",
        text: mode === "dark" ? "lightblue" : "#222",
        border: "3px solid gray",
        tableborder:
          mode === "light" ? "1px solid black" : "1px solid whitesmoke",
        boxShadow:
          mode === "dark"
            ? "0 0 10px rgba(255,255,255,0.1)"
            : "0 0 10px rgba(0,0,0,0.2)",
        blur: "blur(20px)",
      },
      mymodal: {
        main: mode === "dark" ? "rgba(20,24,30,0.88)" : "whitesmoke",
        text: mode === "dark" ? "#e0e8ff" : "#111",
        header: mode === "dark" ? "000080" : "#3498DB",
        border: mode === "dark" ? "3px solid #2f3545" : "3px solid #d3d7df",
        boxShadow:
          mode === "dark"
            ? "0 4px 32px 0 rgba(0,0,0,0.15)"
            : "0 4px 32px 0 rgba(0,0,0,0.08)",
        blur: "blur(10px)",
        button: mode === "dark" ? "#140759" : "#7bcbff",
      },
      myheader: {
        main: mode === "dark" ? "transparent" : "rgba(255,255,255,0.7)",
        text: mode === "dark" ? "lightblue" : "#222",
        blur: "blur(10px)",
      },
      modeSwitchBtn: {
        background: mode === "dark" ? "#eee" : "#222",
        color: mode === "dark" ? "black" : "white",
        border: "1px solid gray",
      },
    },
  });

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(
    () => localStorage.getItem("theme") || "dark"
  );
  const [defaultMode, setDefaultMode] = useState(mode); // valeur de la DB au chargement

  useEffect(() => {
    fetch(`/api/preferences`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.user_theme) {
          setMode(data.user_theme); // On applique la préférence stockée
          setDefaultMode(data.user_theme); // <== on sauvegarde la valeur "de base"
          localStorage.setItem("theme", data.user_theme);
        }
      })
      .catch(() => {});
  }, []);

  const changeTheme = (newMode) => {
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, defaultMode, changeTheme }}>
      <MuiThemeProvider theme={getTheme(mode)}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  return useContext(ThemeContext);
}
