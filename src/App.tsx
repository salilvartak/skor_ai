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
import Coupons from "./pages/Coupons";
import CouponDetails from "./pages/CouponDetails";
import Airdrops from "./pages/Airdrops";
import AirdropDetails from "./pages/AirdropDetails";


// New imports
import HunterSelection from "./pages/HunterSelection";


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
      <Route path="/teams" element={<Teams />} />
      <Route path="/teams/:id" element={<TeamDetails />} />
      <Route path="/tournaments" element={<Tournaments />} />
      <Route path="/tournaments/:id" element={<TournamentDetails />} />
      <Route path="/live" element={<LiveMatchPage />} />

      {/* Update this route to the new HunterSelection page */}
      <Route path="/selection" element={<HunterSelection />} />
      <Route path="/selection/hunter" element={<Hunter />} />
      <Route path="/selection/coupons" element={<Coupons />} />
      <Route path="/coupons/:id" element={<CouponDetails />} />
      <Route path="/selection/airdrops" element={<Airdrops />} />
      <Route path="/airdrops/:id" element={<AirdropDetails />} />
      {/* Add new routes for Coupons and Airdrops */}
      
      
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;