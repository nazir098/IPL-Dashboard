import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { TeamPage } from "./pages/TeamPage";
import { MatchPage } from "./pages/MatchPage";
import {HomePage} from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/teams/:teamName" element={<TeamPage />} />
          <Route
            exact path="/teams/:teamName/match/:year" element={<MatchPage />}
          />
          <Route
            exact path="/" element={<HomePage />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
