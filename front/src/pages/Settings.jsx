
import { useContext, useEffect } from "react";
import { ConnexionContext } from "../components/provider";
import { useNavigate } from "react-router-dom";

import "../../src/styles/responsive.css"

import BG from "../components/Background";
import Settings from "../components/Settings";
import Top from "../components/Header";
import PageLoader from "../components/PageLoader";

function SettingsPage() {
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
  }, [loading, currentUser, navigate]);

  if (!loading && !isConnected) {
    navigate("/", { replace: true });
    return null;
  }

  if (loading) return <PageLoader />;

  return (
    <div className="main">
      <BG />
      <Top started={isConnected} />
      <div className="landscape-scrollable"
        style={{
          width: '100vw',
          display: 'flex',
          flexDirection: 'row',
          position: 'fixed',
          bottom: '25vh',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>

        <div style={{ color: "white", textAlign: "center" }} className="settings-page" >
          <Settings />
        </div>
      </div>
    </div>
  );
}
export default SettingsPage;
