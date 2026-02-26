import React, { useContext } from "react";
import { ConnexionContext } from "../components/provider";

import "../index.css";
import "../general.css";

import Top from "../components/Header";
import BG from "../components/Background";
import ForgotPassword from "../components/ForgottenPassWord";
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
          <ForgotPassword />
        </div>
      </div>
    </div>
  );
}
export default ForgottenPassWord;
