import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import ReadHome from "./pages/ReadHome";
import ReadMA from "./pages/ReadMA";
import ConnectGame from "./pages/ConnectGame";
import JDR from "./pages/JDR.jsx";
import ReadXalyt from "./pages/ReadXalyt";
import ReadBook from "./pages/ReadBook";
import ChaptersXalyt1 from "./pages/ReadChapters";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import MyProvider from "./components/provider.jsx"
import SettingsPage from "./pages/Settings.jsx"
import NewCharacter from "./pages/NewCharacter.jsx"

function App() {
  return (
    <MyProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/connexion' element={<Connexion/>} />
          <Route path='/inscription' element={<Inscription/>} />
          <Route path="/read" element={<ReadHome />} />
          <Route path="/read/xalyt" element={<ReadXalyt />} />
          <Route path="/read/xalyt/1" element={<ChaptersXalyt1 />} />
          <Route path="/read/xalyt/2" element={<ReadBook />} />
          <Route path="/read/xalyt/1/0" element={<ReadBook />} />
          <Route path="/read/xalyt/1/1" element={<ReadBook />} />
          <Route path="/read/xalyt/1/2" element={<ReadBook />} />
          <Route path="/read/xalyt/1/3" element={<ReadBook />} />
          <Route path="/read/xalyt/1/4" element={<ReadBook />} />
          <Route path="/read/xalyt/1/5" element={<ReadBook />} />
          <Route path="/read/xalyt/1/6" element={<ReadBook />} />
          <Route path="/read/xalyt/1/7" element={<ReadBook />} />
          <Route path="/read/xalyt/1/8" element={<ReadBook />} />
          <Route path="/read/xalyt/1/9" element={<ReadBook />} />
          <Route path="/read/xalyt/1/10" element={<ReadBook />} />
          <Route path="/read/xalyt/1/11" element={<ReadBook />} />
          <Route path="/read/xalyt/1/12" element={<ReadBook />} />
          <Route path="/read/xalyt/1/13" element={<ReadBook />} />
          <Route path="/read/xalyt/1/14" element={<ReadBook />} />
          <Route path="/read/xalyt/1/15" element={<ReadBook />} />
          <Route path="/read/xalyt/1/16" element={<ReadBook />} />
          <Route path="/read/xalyt/1/17" element={<ReadBook />} />
          <Route path="/read/xalyt/1/18" element={<ReadBook />} />
          <Route path="/read/xalyt/1/19" element={<ReadBook />} />
          <Route path="/read/xalyt/1/20" element={<ReadBook />} />
          <Route path="/read/xalyt/1/21" element={<ReadBook />} />
          <Route path="/read/xalyt/1/22" element={<ReadBook />} />
          <Route path="/read/xalyt/1/23" element={<ReadBook />} />
          <Route path="/read/xalyt/1/24" element={<ReadBook />} />
          <Route path="/read/xalyt/1/25" element={<ReadBook />} />
          <Route path="/read/xalyt/1/26" element={<ReadBook />} />
          <Route path="/read/xalyt/1/27" element={<ReadBook />} />
          <Route path="/read/xalyt/1/28" element={<ReadBook />} />
          <Route path="/read/xalyt/1/29" element={<ReadBook />} />
          <Route path="/read/xalyt/1/30" element={<ReadBook />} />
          <Route path="/read/xalyt/1/31" element={<ReadBook />} />
          <Route path="/read/xalyt/1/32" element={<ReadBook />} />
          <Route path="/read/xalyt/1/33" element={<ReadBook />} />
          <Route path="/read/xalyt/1/34" element={<ReadBook />} />
          <Route path="/read/xalyt/1/35" element={<ReadBook />} />
          <Route path="/read/2" element={<ReadBook />} />
          <Route path="/read/xalyt/3" element={<ReadBook />} />
          <Route path="/read/MA" element={<ReadMA />} />
          <Route path="/read/MA/1" element={<ReadBook />} />
          <Route path="/read/MA/2" element={<ReadBook />} />
          <Route path="/read/MA/3" element={<ReadBook />} />
          <Route path="/read/MA/whats_to_know" element={<ReadHome />} />
          <Route path="/read/MA/NPC_stories" element={<ReadHome />} />
          <Route path="/read/lexicon" element={<ReadHome />} />
          {/* <Route path="/jdr" element={<JDR />} /> */}
          {/* <Route path="/jdr/connectGame" element={<ConnectGame />}/> */}
          <Route path="/jdr" element={<ConnectGame />}/>
          <Route path="/settings" element={<SettingsPage/>}/>
          <Route path="/create_character" element={<NewCharacter/>}/>
          
        </Routes>
      </Router>
      </MyProvider>
  );
}
export default App;
