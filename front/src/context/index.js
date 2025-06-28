import { createContext, useContext, useMemo, useState } from "react"
import { getStat } from "../service"

const AppContext = createContext();
const { Provider } = AppContext;

const AppProvider = ({ children}) => {
    const [stats, setStats] = useState([]);

    const fetchStat = () => {
        getStat().then(setStats)
    }
    // const addPost = (body) => {
    //     insertPost(body).then(setPosts)
    // }
    const value = useMemo(() => {
        return {
            stats, 
            fetchStat
            //, 
           // addPost
        }
    }, [stats, fetchStat])
    return <Provider value={value}>{children}</Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}

export default AppProvider;