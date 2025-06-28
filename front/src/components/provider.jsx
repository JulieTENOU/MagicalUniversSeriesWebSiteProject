import React, {createContext, useState} from "react";
import AppProvider from "../context";

export const ConnexionContext = createContext(null);

const { Provider } = ConnexionContext;


const MyProvider = ({children}) => {
    const [state, setState] = useState({});

    return <AppProvider><Provider value={[state, setState]}>{children}</Provider></AppProvider>;
};

MyProvider.context= ConnexionContext;

export default MyProvider;
