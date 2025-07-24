import React, {createContext, useState, useEffect} from "react";
import AppProvider from "../context";
// import { useLocation } from "react-router-dom";

export const ConnexionContext = createContext(null);

const { Provider } = ConnexionContext;


// const PUBLIC_ROUTES = [
//   "/connexion",
//   "/inscription",
//   "/forgotten_password",
// ];

const MyProvider = ({children}) => {
    const [state, setState] = useState(null);
    const [loading, setLoading] = useState(true); // Pour éviter les flashes
    // const location = useLocation();


    useEffect(() => {
    fetch(`/api/me`, {
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
  
  // Si tu es sur une page PUBLIQUE, ne bloque pas le rendu
  // const isPublic = PUBLIC_ROUTES.includes(location.pathname);

      if(loading /*&& !isPublic*/) return <div>Chargement...</div>

    return <AppProvider><Provider value={{state, setState, loading}}>{children}</Provider></AppProvider>;
};

MyProvider.context= ConnexionContext;

export default MyProvider;