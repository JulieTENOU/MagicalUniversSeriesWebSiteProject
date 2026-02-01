import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ReadHome from "./pages/ReadHome";
import ConnectGame from "./pages/ConnectGame";
import ConnectGameCopy from "./pages/ConnectGameCopy";
import ConnectGameMJ from "./pages/ConnectGameMJ";
import JDR from "./pages/JDR.jsx";
import ReadSeries from "./pages/ReadSeries";
import ReadBook from "./pages/ReadBook";
import ChaptersList from "./pages/ReadChapters";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import MyProvider from "./components/provider.jsx";
import SettingsPage from "./pages/Settings.jsx";
import NewCharacter from "./pages/NewCharacter.jsx";
import ForgottenPassWord from "./pages/ForgottenPassWord.jsx";
import ResetPassWord from "./pages/ResetPassWord.jsx";
import NewCharacterAdmin from "./pages/NewCharacterAdmin.jsx";

function App() {
  return (
    <MyProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/read" element={<ReadHome />} />
          <Route path="/read/:serie" element={<ReadSeries />} />
          <Route path="/read/:serie/:book" element={<ChaptersList />} />
          <Route path="/read/:serie/:book/:chapter" element={<ReadBook />} />
          <Route path="/read/MA/whats_to_know" element={<ReadHome />} />
          <Route path="/read/MA/NPC_stories" element={<ReadHome />} />
          <Route path="/read/lexicon" element={<ReadHome />} />
          <Route path="/jdr" element={<JDR />} />
          <Route
            path="/jdr2/connectGame/:characterId"
            element={<ConnectGameCopy />}
          />{" "}
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
        </Routes>
      </Router>
    </MyProvider>
  );
}
export default App;
