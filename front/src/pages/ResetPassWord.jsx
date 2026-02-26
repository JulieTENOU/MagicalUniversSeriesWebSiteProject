import React, { useContext } from "react";
import "../index.css";
import "../general.css";

import { ConnexionContext } from "../components/provider";

import Top from "../components/Header";
import BG from "../components/Background";
import ResetPassWord from "../components/ResetPassWord";
import PageLoader from "../components/PageLoader";

function ForgottenPassWord() {
  const {
    state: isConnected,
    setState: setIsConnected,
    loading,
  } = useContext(ConnexionContext);

  console.log(isConnected);

  if (loading) return <PageLoader />;

  return (
    <div className="main">
      <BG />
      <Top started={isConnected} />
      <div className="landscape-scrollable"
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
        <div className="modal-wrapper" style={{ color: "white", textAlign: "center" }}>
          <ResetPassWord />
        </div>
      </div>
    </div>
  );
}
export default ForgottenPassWord;
