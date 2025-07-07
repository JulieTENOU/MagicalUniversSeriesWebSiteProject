import { createContext, useContext, useMemo, useState,useEffect, useCallback } from "react"
import { getStat } from "../service"

const AppContext = createContext();
const { Provider } = AppContext;

const AppProvider = ({ children}) => {
    const [stats, setStats] = useState([]);
    const [currentCharacter, setCurrentCharacter] = useState(null);

    const fetchStat = useCallback(() => {
        getStat().then(setStats)
    },[]);
    // const addPost = (body) => {
    //     insertPost(body).then(setPosts)
    // }

    useEffect(()=>{
        fetchStat();
    },[fetchStat]);

    const value = useMemo(() => {
        return {
            stats, 
            fetchStat,
            currentCharacter,
            setCurrentCharacter,
            //, 
           // addPost
        }
    }, [stats, fetchStat, currentCharacter])
    return <Provider value={value}>{children}</Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}

export default AppProvider;