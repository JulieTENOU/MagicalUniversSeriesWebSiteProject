import React, { useContext } from "react";
import "../index.css";
import "../general.css";
import Top from "../components/Header";
import BG from "../components/Background";
import { ConnexionContext } from "../components/provider";
import ForgotPassword from "../components/ForgottenPassWord";

function ForgottenPassWord() {
  const {
    state: isConnected,
    setState: setIsConnected,
    loading,
  } = useContext(ConnexionContext);

  console.log(isConnected);
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
          top: "25vh",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div style={{ color: "white", textAlign: "center" }}>
          <ForgotPassword />
        </div>
      </div>
    </div>
  );
}
export default ForgottenPassWord;
