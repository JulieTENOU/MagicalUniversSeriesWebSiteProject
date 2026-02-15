import { useContext } from "react";
import "../index.css";
import "../general.css";
import Btn from "../components/Btn";
import { ConnexionContext } from "../components/provider";
import { useTranslation } from "react-i18next";

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

  return (
    <div className="main">
      <div
        style={{
          fontSize: "2em",
          width: "100vw",
          display: "flex",
          flexDirection: "row",
          position: "fixed",
          left: 0,
          bottom: "40vh",
          justifyContent: "space-around",
          alignItems: "center",
          alignContent: "space-around",
        }}
      >
        {currentUser ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <h2
              style={{
                color: "whitesmoke",
                position: "absolute",
                bottom: "25vh",
              }}
            >
              {t("home.welcomeUser", { pseudo: currentUser.users_pseudo })}
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "20vw",
                position: "relative",
                marginInline: "15vw",
              }}
            >
              <Btn
                path="/read"
                msg={t("home.goToBooks")}
                src={Pile}
                height={"100px"}
                sx={{ color: "white" /*marginInline:'15vw'*/ }}
              />
              <Btn
                path="/jdr"
                msg={t("home.openHolocom")}
                src={logoMA}
                height={"100px"}
                width={"100px"}
                sx={{ color: "white" /* marginInline:'15vw'*/ }}
              />
            </div>
          </div>
        ) : (
          <div style={{ color: "white", textAlign: "center" }}>
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
    </div>
  );
}
