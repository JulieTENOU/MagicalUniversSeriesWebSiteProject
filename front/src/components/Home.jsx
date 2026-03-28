import { useContext } from "react";
import { ConnexionContext } from "../components/provider";
import { useTranslation } from "react-i18next";

import Btn from "../components/Btn";

export default function HomeCompo() {

  const API_BASE = process.env.REACT_APP_API_BASE || window.location.origin;
  const logoMA = `${API_BASE}/api/media/getOneMedia/5`;
  const Pile = `${API_BASE}/api/media/getOneMedia/7`;
  // ⚠️ Remplacer XX par l'ID retourné après avoir lancé back/scripts/insert_signature_media.sql
  const signature = `${API_BASE}/api/media/getOneMedia/60`;

  const {
    state: currentUser,
    loading,
  } = useContext(ConnexionContext);

  console.log(currentUser);

  const { t } = useTranslation();

  if (loading) {
    return <div className="home-content" />; // ou un spinner
  }
  return (
    <div className="home-content"
    >
      {currentUser ? (
        <div className="home-logged"
        >
          <h2 className="home-welcome"
          >
            {t("home.welcomeUser", { pseudo: currentUser.users_pseudo })}
          </h2>
          <div className="home-btns"
          >
            <Btn
              path="/read"
              msg={t("home.goToBooks")}
              src={Pile}
              height={"100px"}
              sx={{ color: "white" }}
            />
            <Btn
              path="/jdr"
              msg={t("home.openHolocom")}
              src={logoMA}
              height={"100px"}
              width={"100px"}
              sx={{ color: "white" }}
            />
          </div>
        </div>
      ) : (
        <div className="home-guest" style={{ position: "relative", paddingBottom: "15rem" }}>
          <p>
            {t("home.welcomeGuest")
              .split("\n")
              .map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
          </p>
          <div style={{ position: "absolute", bottom: "0", right: "0" }}>
            <img
              src={signature}
              alt="signature de l'autrice"
              style={{
                height: "80px",
                filter: "invert(1)",
                opacity: 0.9,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
