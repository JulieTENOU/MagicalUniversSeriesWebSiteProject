import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useContext, useEffect } from "react";
import { ConnexionContext } from "./components/provider.jsx";

import PageLoader from "./components/PageLoader.jsx";

import Home from "./pages/Home";
import ReadHome from "./pages/ReadHome";
import ConnectGame from "./pages/ConnectGame";
import ConnectGameMJ from "./pages/ConnectGameMJ";
import JDR from "./pages/JDR.jsx";
import ReadSeries from "./pages/ReadSeries";
import ReadBook from "./pages/ReadBook";
import ChaptersList from "./pages/ReadChapters";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
// import MyProvider from "./components/provider.jsx"; // déjà importé dans index.js
import SettingsPage from "./pages/Settings.jsx";
import NewCharacter from "./pages/NewCharacter.jsx";
import ForgottenPassWord from "./pages/ForgottenPassWord.jsx";
import ResetPassWord from "./pages/ResetPassWord.jsx";
import NewCharacterAdmin from "./pages/NewCharacterAdmin.jsx";
import DiceChoice from "./components/DiceChoice.jsx";
import About from "./pages/About.jsx";
import MaintenanceBanner from "./components/MaintenanceBanner.jsx";
import { useParams } from "react-router-dom";

function RedirectToMaintenance() {
  useEffect(() => { window.location.href = '/maintenance.html'; }, []);
  return null;
}

// function ReadBookWrapper() {
//   const { serie, book, chapter } = useParams();
//   return <ReadBook key={`${serie}-${book}-${chapter}`} />;
// }

function App() {
  const { loading } = useContext(ConnexionContext);

  if (loading) return <PageLoader />;

  // <MyProvider> retiré ici : il est déjà présent dans index.js.
  // Avoir deux MyProvider imbriqués crée un second ConnexionContext indépendant (loading=true, state=undefined)
  // que les pages comme JDR lisent, provoquant une race condition et une page blanche.
  return (
    // <MyProvider>
      <Router>
        <MaintenanceBanner />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/read" element={<ReadHome />} />
          <Route path="/read/:serie" element={<ReadSeries />} />
          <Route path="/read/:serie/:book" element={<ChaptersList />} />
          <Route path="/read/:serie/:book/:chapter" element={<ReadBook />} />
          <Route path="/jdr" element={<JDR />} />
          <Route
            path="/jdr/connectGame/:characterId"
            element={<ConnectGame />}
          />
          {/* <Route path="/jdr" element={<ConnectGame />}/> */}
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/forgotten_password" element={<ForgottenPassWord />} />
          <Route path="/reset-password/:token" element={<ResetPassWord />} />
          <Route path="/jdr/create_character" element={<NewCharacter />} />
          <Route
            path="/jdr/admin/create_character"
            element={<NewCharacterAdmin />}
          />
          <Route
            path="/jdr/connectGame/admin/:ids"
            element={<ConnectGameMJ />}
          />
          <Route path="/diceRoll" element={<DiceChoice />} />
          <Route path="/about" element={<About />} />
          <Route path="/maintenance" element={<RedirectToMaintenance />} />
        </Routes>
      </Router>
    // </MyProvider>
  );
}

export default App;
