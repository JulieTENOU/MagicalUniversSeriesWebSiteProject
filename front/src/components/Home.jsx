import { useContext } from "react";
import { ConnexionContext } from "../components/provider";
import { useTranslation } from "react-i18next";

import Btn from "../components/Btn";

export default function HomeCompo() {

  const API_BASE = process.env.REACT_APP_API_BASE || window.location.origin;
  const logoMA = `${API_BASE}/api/media/getOneMedia/5`;
  const Pile = `${API_BASE}/api/media/getOneMedia/7`;

  const {
    state: currentUser,
    setState: setCurrentUser,
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
        <div className="home-guest"
        >
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
        </div>
      )}
    </div>
  );
}
