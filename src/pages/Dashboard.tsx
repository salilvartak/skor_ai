import React, { useEffect, useState } from "react";
import {
  Home,
  Brain,
  Trophy,
  Box,
  BarChart2,
  User,
  Settings,
  Search,
  LogOut,
  CalendarSync,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NotificationsTab from '@/components/NotificationsTab';
import AISearchOverlay from '@/components/AISearchOverlay';
import { ProfileOverlay } from '@/components/ProfileOverlay';
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [price, setPrice] = useState<string>("-");
  const [pctChange, setPctChange] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, { lastOnline: Date.now() });
      }
      await signOut(auth);
      setIsProfileOpen(false); // Close profile overlay on logout
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const agentSlides = [
    {
      title: "Agent Precision",
      button: "Try Now →",
      image: "",
      bg: "bg-[url('/assets/cs.jpg')]",
      link: "/agent/precision",
    },
    {
      title: "Agent Hunter",
      button: "Try Now →",
      image: "",
      bg: "bg-[url('/assets/hunter.webp')]",
      link: "/selection",
    },
    {
      title: "SKOR Coin",
      button: "Checkout →",
      image: "",
      bg: "bg-[url('/assets/coin.png')]",
      link: "/agent/scope",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % agentSlides.length);
        setFade(true);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, [agentSlides.length]);

  const getUserInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=skor-ai&vs_currencies=usd&include_24hr_change=true"
        );
        const data = await response.json();
        const skorData = data['skor-ai'];

        if (skorData && skorData.usd) {
          setPrice(skorData.usd.toFixed(4));
          const change = skorData.usd_24h_change;
          setPctChange(
            change >= 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`
          );
        } else {
          throw new Error("Price data not found for skor-ai");
        }
      } catch (error) {
        console.error("Error fetching price data:", error);
        setPrice("N/A");
        setPctChange("Error");
      } finally {
        setLoading(false);
      }
    };
    fetchPriceData();
  }, []);

  return (
    <div className="font-chakra min-h-screen bg-gradient-to-br from-[#141110] via-[#2a1f1a] to-back grid grid-cols-[auto_1fr_auto]">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 bg-[#EE5946]/5 rounded-full blur-xl animate-pulse"
            style={{
              left: `${12 * 100}%`,
              top: `${10 * 100}%`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>
      </div>

      <aside className="fixed top-4 bottom-4 left-4 w-20 flex flex-col items-center gap-8 py-6 rounded-3xl bg-black/40 backdrop-blur-md z-10">
        <img src="/assets/logo.png" alt="Logo" className="w-10" />
        <div className="flex flex-col gap-12 mt-6 text-accent">
          <div className="relative group">
            <Link to="/home" className="flex flex-col items-center gap-1">
              <Home className="w-6 h-6 text-gray-400 group-hover:text-accent transition-colors" />
            </Link>
            <span className="absolute -top-full mt-0 left-1/2 -translate-x-1/2 rounded-full bg-white/10 text-white text-sm whitespace-nowrap px-3 py-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
              Home
            </span>
          </div>
          <div className="relative group">
            <Link to="/ai" className="flex flex-col items-center gap-1">
              <Brain className="w-6 h-6 text-gray-400 group-hover:text-accent transition-colors" />
            </Link>
            <span className="absolute -top-full mt-0 left-1/2 -translate-x-1/2 rounded-full bg-white/10 text-white text-sm whitespace-nowrap px-3 py-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
              AI
            </span>
          </div>
          <div className="relative group">
            <Link to="/tournaments" className="flex flex-col items-center gap-1">
              <Trophy className="w-6 h-6 text-gray-400 group-hover:text-accent transition-colors" />
            </Link>
            <span className="absolute -top-full mt-0 left-1/2 -translate-x-1/2 rounded-full bg-white/10 text-white text-sm whitespace-nowrap px-3 py-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
              Tournaments
            </span>
          </div>
          <div className="relative group">
            <div className="flex flex-col items-center gap-1 cursor-not-allowed opacity-50">
              <Box className="w-6 h-6 text-gray-400" />
            </div>
            <span className="absolute -top-full mt-0 left-1/2 -translate-x-1/2 rounded-full bg-white/10 text-white text-sm whitespace-nowrap px-3 py-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
              Coming Soon
            </span>
          </div>
          <div className="relative group">
            <div className="flex flex-col items-center gap-1 cursor-not-allowed opacity-50">
              <BarChart2 className="w-6 h-6 text-gray-400" />
            </div>
            <span className="absolute -top-full mt-0 left-1/2 -translate-x-1/2 rounded-full bg-white/10 text-white text-sm whitespace-nowrap px-3 py-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
              Coming Soon
            </span>
          </div>
        </div>
        <div className="mt-auto flex flex-col items-center gap-8">
          
          <div className="relative group">
            <button onClick={() => setIsProfileOpen(true)} className="flex flex-col items-center gap-1">
              <Settings className="w-6 h-6 text-gray-400 group-hover:text-accent transition-colors" />
            </button>
            <span className="absolute -top-full mt-0 left-1/2 -translate-x-1/2 rounded-full bg-white/10 text-white text-sm whitespace-nowrap px-3 py-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
              Settings
            </span>
          </div>
          <div className="relative group">
            <button
              onClick={handleLogout}
              className="flex flex-col items-center gap-1 focus:outline-none"
              aria-label="Logout"
            >
              <LogOut className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors" />
            </button>
            <span className="absolute -top-full mt-0 left-1/2 -translate-x-1/2 rounded-full bg-white/10 text-white text-sm whitespace-nowrap px-3 py-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
              Logout
            </span>
          </div>
        </div>
      </aside>

      <main className="col-start-2 col-end-3 p-6 grid grid-rows-[auto_1fr_auto] gap-6 ml-[96px] mr-[96px]">
        <header className="flex justify-between items-center">
          <h1 className="text-xl font-bold font-chakra text-white">
            Ready to Play, <span className="text-accent">{user?.displayName || "Player"}</span>
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(true)}
            className="hover:bg-accent/80"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </header>

        <section className="grid grid-cols-3 gap-6 items-stretch">
          <div className="col-span-2 grid grid-rows-[auto_auto_1fr] gap-6">
            <div
              className={`relative h-[280px] rounded-2xl overflow-hidden bg-cover bg-center duration-500 ease-in-out ${
                agentSlides[currentSlide].bg
              } ${fade ? "opacity-100" : "opacity-0"} transition-opacity`}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm p-6 z-10 flex flex-col justify-between">
                <div>
                  <h2 className="text-5xl text-accent font-semibold mb-4 font-chakra">
                    {agentSlides[currentSlide].title.split(" ")[0]}{" "}
                    <span className="text-white">
                      {agentSlides[currentSlide].title.split(" ")[1]}
                    </span>
                  </h2>
                </div>
                <Link
                  to={agentSlides[currentSlide].link}
                  className="w-fit bg-accent px-4 py-2 rounded-full text-xl font-bold hover:bg-orange-500 transition"
                >
                  {agentSlides[currentSlide].button}
                </Link>
                <img src="/assets/0027.png" alt="Agent" className="absolute right-0 bottom-0 w-[55%]" />
              </div>
              <img
                src={agentSlides[currentSlide].image}
                alt="Agent"
                className="absolute right-0 bottom-0 w-[55%] object-contain z-0"
              />
            </div>
            <div>
              <div className="grid grid-cols-3 gap-4">
                <AgentCard name="selection" image="/assets/hunter.png" />
                <AgentCard name="Precision" image="/assets/Precision.png" />
                <AgentCard name="Guide" image="/assets/guide.png" />
              </div>
            </div>
            <section className="bg-white/10 backdrop-blur-md rounded-2xl p-4 grid grid-cols-[auto_1fr] gap-8">
              <CalendarSync className="text-accent w-24 h-24" />
              <div>
                <h4 className="text-accent0 text-lg text-white font-semibold font-chakra">
                  Beta For Agent Hunter is Live!
                </h4>
                <h4 className="text-accent mb-1 text-md font-chakra">
                  Version: 0.4 - October 2025
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 font-chakra">
                  <li>Authentication Options
                    <ul className="list-disc list-inside ml-4">
                      <li className="ml-4">Added OAuth login support with Google.</li>
                      <li className="ml-4">Introduced traditional email/password signup and login flow.</li>
                      
                    </ul>
                  </li>
                  <li>Tournament Data Coverage Upgrade
                    <ul className="list-disc list-inside ml-4">
                      <li className="ml-4">Expanded data ingestion pipeline to aggregate tournaments from 150+ verified sources.</li>
                      <li className="ml-4">Increased redundancy checks to eliminate duplicate tournament entries across sources.</li>
                    </ul>
                  </li>
                  
                </ul>
              </div>
            </section>
          </div>
          <div className="flex flex-col gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center h-[200px] flex flex-col items-center justify-center">
              <h2 className="text-4xl text-accent font-semibold font-chakra">Price</h2>
              {loading ? (
                <p className="text-white text-xl mt-2 font-chakra">Loading...</p>
              ) : (
                <>
                  <p className="text-3xl font-bold mt-2 font-chakra text-white">${price}</p>
                  <p
                    className={`text-lg mt-1 font-chakra ${
                      pctChange && pctChange.startsWith("+")
                        ? "text-green-500"
                        : pctChange && pctChange.startsWith("-")
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  >
                    {pctChange || "Fetching..."}
                  </p>
                </>
              )}
            </div>
            
            <NotificationsTab />

          </div>
        </section>
      </main>

      <aside className="fixed top-4 bottom-4 right-4 w-20 flex flex-col items-center py-6 gap-4 rounded-3xl bg-black/40 backdrop-blur-md z-10">
        {user && (
          <button onClick={() => setIsProfileOpen(true)} className="focus:outline-none rounded-full">
            <Avatar className="w-12 h-12 border-2 border-accent">
              <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
              <AvatarFallback className="bg-accent text-white text-xl">
                {getUserInitials(user.displayName)}
              </AvatarFallback>
            </Avatar>
          </button>
        )}
      </aside>

      {/* AI Search and Profile Overlays */}
      <AISearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        liveTournaments={[]}
        upcomingTournaments={[]}
        trendingTournaments={[]}
      />
      <ProfileOverlay
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onLogout={handleLogout}
      />
    </div>
  );
}

function AgentCard({ name, image }: { name: string; image: string }) {
  const path = `/${name.toLowerCase()}`;
  return (
    <Link to={path} className="bg-orange-700/40 backdrop-blur-md rounded-xl p-4 flex flex-col items-center hover:ring-2 hover:ring-orange-400 transition-all duration-200">
      <img src={image} alt={name} className="w-fit h-32 mb-2" />
    </Link>
  );
}