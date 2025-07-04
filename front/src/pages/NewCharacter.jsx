import { useNavigate } from "react-router-dom";
import BG from "../components/Background";
import CreateCharacter from "../components/CreateCharacter";
import Top from "../components/Header";
import { useContext, useEffect } from "react";
import { ConnexionContext } from "../components/provider";

function NewCharacter() {
    const navigate = useNavigate();

    const {state: currentUser,setState: setCurrentUser, loading} = useContext(ConnexionContext);
    const isConnected = !!currentUser;
    console.log(isConnected);
    useEffect(()=> {
        if(!loading && !currentUser){
            navigate("/")
        }
    })
    return (
        <div className='main'>
            <BG />
            <Top started={isConnected} />
            <div style={{ width: '100vw', display: 'flex', flexDirection: 'row', position: 'fixed', bottom: '25vh', justifyContent: 'space-around', alignItems: 'center' }}>
                <div style={{ color: 'white', textAlign: 'center' }}>
                    <CreateCharacter/>
                </div>
            </div>
        </div>
    )
}
export default NewCharacter;