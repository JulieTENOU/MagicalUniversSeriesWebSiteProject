import { useNavigate } from "react-router-dom";
import BG from "../components/Background";
import Top from "../components/Header";
import { useContext, useEffect } from "react";
import { ConnexionContext } from "../components/provider";
import CreateCharacterAdmin from "../components/CreateCharacterAdmin";

function NewCharacterAdmin() {
  const navigate = useNavigate();

  const {
    state: currentUser,
    setState: setCurrentUser,
    loading,
  } = useContext(ConnexionContext);
  const isConnected = !!currentUser;
  console.log(isConnected);

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/");
    }
  });

  return (
    <div className="main">
      <BG />
      <Top started={isConnected} />
      <div
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "row",
          position: "fixed",
          bottom: "5vh",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div style={{ color: "white", textAlign: "center" }}>
          <CreateCharacterAdmin />
        </div>
      </div>
    </div>
  );
}
export default NewCharacterAdmin;
