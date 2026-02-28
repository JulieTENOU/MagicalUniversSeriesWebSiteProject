import React, { createContext, useState, useEffect, useCallback } from "react";
import AppProvider from "../context";

export const ConnexionContext = createContext(null);

const { Provider } = ConnexionContext;

const MyProvider = ({ children }) => {
  const [state, setState] = useState(undefined);  // undefined tant que pas chargé
  const [loading, setLoading] = useState(true);   // loading général

  // Chargement initial au mount
  useEffect(() => {
    setLoading(true);
    fetch(`/api/me`, { method: "GET", credentials: "include" })
      .then(res => res.ok ? res.json() : null)
      .then(data => setState(data))
      .catch(() => setState(null))
      .finally(() => setLoading(false));
  }, []);

  // refreshUser pour recharger l'utilisateur depuis n'importe où
  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch(`/api/me`, { method: "GET", credentials: "include" });
      if (!res.ok) throw new Error("Not logged in");
      const data = await res.json();
      setState(data);
    } catch {
      // Ici, NE PAS faire setState(null) pour éviter la déco fantôme
    }
  }, []);

  // Logout explicite
  const logout = useCallback(() => {
    setState(null);
  }, []);

  return (
    <AppProvider>
      <Provider value={{ state, setState, loading, refreshUser, logout }}>
        {children}
      </Provider>
    </AppProvider>
  );
};

MyProvider.context = ConnexionContext;

export default MyProvider;
