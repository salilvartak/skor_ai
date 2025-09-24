import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { auth } from "./firebase";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import Guide from "./pages/Guide";
import Match from "./pages/Match";
import SubmissionForm from "./pages/submissionform";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import ProfileSetup from "./pages/ProfileSetup";
import SovaSunset from "./pages/lineup/sova-sunset";
import Teams from "./pages/Teams";
import TeamDetails from "./pages/TeamDetails";
import LiveMatchPage from "./pages/LiveMatchPage";
import Hunter from "./pages/Hunter";
import Coupons from "./pages/Coupons";
import CouponDetails from "./pages/CouponDetails";
import Airdrops from "./pages/Airdrops";
import AirdropDetails from "./pages/AirdropDetails";
import HunterSelection from "./pages/HunterSelection";

const queryClient = new QueryClient();


const AuthWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (location.pathname === "/") {
          navigate("/dashboard");
        }
      } else {
        if (location.pathname !== "/") {
          navigate("/");
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  return null;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/stats" element={<Stats />} /> {/* Trial */}
      <Route path="/guide" element={<Guide />} />
      <Route path="/match" element={<Match />} />{/* Trial */}
      <Route path="/submission" element={<SubmissionForm />} />{/* Trial */}
      <Route path="/chat" element={<Chat />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile-setup" element={<ProfileSetup />} />
      <Route path="/lineup/sova-sunset" element={<SovaSunset />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/teams/:id" element={<TeamDetails />} />
      <Route path="/live" element={<LiveMatchPage />} />
      <Route path="/selection" element={<HunterSelection />} />
      <Route path="/selection/hunter" element={<Hunter />} />
      <Route path="/selection/coupons" element={<Coupons />} />
      <Route path="/coupons/:id" element={<CouponDetails />} />
      <Route path="/selection/airdrops" element={<Airdrops />} />
      <Route path="/airdrops/:id" element={<AirdropDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
