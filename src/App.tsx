import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import Guide from "./pages/Guide";
import Match from "./pages/Match";
import SubmissionForm from "./pages/submissionform";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import SovaSunset from "./pages/lineup/sova-sunset";

import Teams from "./pages/Teams";
import TeamDetails from "./pages/TeamDetails";
import Tournaments from "./pages/Tournaments";
import TournamentDetails from "./pages/TournamentDetails";
import LiveMatchPage from "./pages/LiveMatchPage";
import Hunter from "./pages/Hunter";
import ProDetails from "./pages/pro-details";
import LivestreamDetails from "./pages/livestream-details";
import AmateurDetails from "./pages/amateur-details";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/match" element={<Match />} />
      <Route path="/submission" element={<SubmissionForm />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/lineup/sova-sunset" element={<SovaSunset />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/teams/:id" element={<TeamDetails />} />
      <Route path="/tournaments" element={<Tournaments />} />
      <Route path="/tournaments/:id" element={<TournamentDetails />} />
      <Route path="/live" element={<LiveMatchPage />} />
      <Route path="/hunter" element={<Hunter />} />
      <Route path="/pro-details/:id" element={<ProDetails />} />
      <Route path="/livestream-details/:id" element={<LivestreamDetails />} />
      <Route path="/amateur-details/:id" element={<AmateurDetails />} />
    </Routes>
  );
}

export default App;