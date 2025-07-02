import React, {createContext, useState, useEffect} from "react";
import AppProvider from "../context";

export const ConnexionContext = createContext(null);

const { Provider } = ConnexionContext;


const MyProvider = ({children}) => {
    const [state, setState] = useState(null);
    const [loading, setLoading] = useState(true); // Pour éviter les flashes


    useEffect(() => {
    fetch("/api/me", {
      method: "GET",
      credentials: "include", // ⚠️ nécéssaire pour envoyer le cookie de session
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((user) => {
        setState(user); // même structure que lors du login
      })
      .catch(() => {
        setState(null); // pas connecté
      })
      .finally(()=> setLoading(false));
  }, []);

      if(loading) return <div>Chargement...</div>

    return <AppProvider><Provider value={{state, setState, loading}}>{children}</Provider></AppProvider>;
};

MyProvider.context= ConnexionContext;

export default MyProvider;