import React, { useEffect, useState, useRef } from "react";
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

export default function Dashboard() {
  const [price, setPrice] = useState<string>("-");
  const [pctChange, setPctChange] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const navigate = useNavigate();

  const [timeSpent, setTimeSpent] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchTimeSpent = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const savedTime = userDoc.data().timeSpent || 0;
          const lastOnlineTimestamp = userDoc.data().lastOnline || Date.now();
          const timeDifference = Math.floor((Date.now() - lastOnlineTimestamp) / 1000);
          setTimeSpent(savedTime + timeDifference);
        } else {
          setTimeSpent(0);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchTimeSpent();
  }, [user?.uid]);

  useEffect(() => {
    if (!user) return;

    timerRef.current = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const saveInterval = setInterval(async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, { timeSpent });
      } catch (err) {
        console.error("Error saving timeSpent:", err);
      }
    }, 30000);

    return () => clearInterval(saveInterval);
  }, [timeSpent, user]);

  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (!user) return;
      try {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, { timeSpent, lastOnline: Date.now() });
      } catch (err) {
        console.error("Error saving timeSpent on unload:", err);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [timeSpent, user]);

  const handleLogout = async () => {
    try {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, { lastOnline: Date.now() });
      }
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  const agentSlides = [
    {
      title: "Agent Precision",
      button: "Try Now →",
      image: "",
      bg: "bg-[url('/assets/cs2.webp')]",
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
          "https://api.coingecko.com/api/v3/coins/skor-ai/market_chart?vs_currency=usd&days=30"
        );
        const data = await response.json();
        const prices = data.prices;
        if (!Array.isArray(prices) || prices.length < 2) {
          throw new Error("Insufficient price data");
        }
        const startPrice = prices[0][1];
        const latestPrice = prices[prices.length - 1][1];
        const priceChange = ((latestPrice - startPrice) / startPrice) * 100;
        setPrice(latestPrice.toFixed(4));
        setPctChange(
          priceChange >= 0 ? `+${priceChange.toFixed(2)}%` : `${priceChange.toFixed(2)}%`
        );
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
            <Link to="/labs" className="flex flex-col items-center gap-1">
              <Box className="w-6 h-6 text-gray-400 group-hover:text-accent transition-colors" />
            </Link>
            <span className="absolute -top-full mt-0 left-1/2 -translate-x-1/2 rounded-full bg-white/10 text-white text-sm whitespace-nowrap px-3 py-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
              Labs
            </span>
          </div>
          <div className="relative group">
            <Link to="/analytics" className="flex flex-col items-center gap-1">
              <BarChart2 className="w-6 h-6 text-gray-400 group-hover:text-accent transition-colors" />
            </Link>
            <span className="absolute -top-full mt-0 left-1/2 -translate-x-1/2 rounded-full bg-white/10 text-white text-sm whitespace-nowrap px-3 py-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
              Analytics
            </span>
          </div>
        </div>
        <div className="mt-auto flex flex-col items-center gap-8">
          <div className="relative group">
            <Link to="/profile" className="flex flex-col items-center gap-1">
              <User className="w-6 h-6 text-gray-400 group-hover:text-accent transition-colors" />
            </Link>
            <span className="absolute -top-full mt-0 left-1/2 -translate-x-1/2 rounded-full bg-white/10 text-white text-sm whitespace-nowrap px-3 py-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
              Profile
            </span>
          </div>
          <div className="relative group">
            <Link to="/settings" className="flex flex-col items-center gap-1">
              <Settings className="w-6 h-6 text-gray-400 group-hover:text-accent transition-colors" />
            </Link>
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
          <div className="relative w-full max-w-xs ">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 w-5 h-5 z-20 pointer-events-none"
            />
            <input
              type="search"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800/40 backdrop-blur-md text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition z-10"
            />
          </div>
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
                <AgentCard name="Precision" image="/assets/presion.png" />
                <AgentCard name="Guide" image="" />
              </div>
            </div>
            <section className="bg-white/10 backdrop-blur-md rounded-2xl p-4 grid grid-cols-[auto_1fr] gap-8">
              <CalendarSync className="text-accent w-28 h-28" />
              <div>
                <h4 className="text-accent0 text-lg text-white font-semibold font-chakra">
                  New Update for Agent Precision
                </h4>
                <h4 className="text-accent mb-1 text-md font-chakra">
                  Version: 0.4
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 font-chakra">
                  <li>Multi-Platform Data Scraping Enhancements
                    <ul className="list-disc list-inside ml-4">
                      <li className="ml-4">Added Instagram Story and Reel metadata extraction via Puppeteer with dynamic rendering support.</li>
                      <li className="ml-4">Integrated Discord channel scraping with automatic rate-limit handling.</li>
                      <li className="ml-4">Expanded Liquipedia parser to support additional tournament formats and region filters.</li>
                    </ul>
                  </li>
                  <li>Tournament Ranking Engine v2
                    <ul className="list-disc list-inside ml-4">
                      <li className="ml-4">Introduced weighted scoring based on user-selected criteria (e.g., prize pool, player tier, event prestige).</li>
                      <li className="ml-4">Added AI-powered ranking explanation so users can see why a tournament placed in the Top 5.</li>
                    </ul>
                  </li>
                  <li>Frontend Dashboard Improvements
                    <ul className="list-disc list-inside ml-4">
                      <li className="ml-4">New interactive filters for region, game title, and tournament type.</li>
                      <li className="ml-4">Implemented real-time updates when new tournaments are found.</li>
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
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col min-h-[480px] relative overflow-hidden">
              <h3 className="text-orange-400 text-lg mb-2">Your Statistics</h3>
              <div className="flex justify-center items-center relative z-10">
                <p className="text-white rounded-full py-16 px-6 w-fit ring-accent/50 ring-4 text-5xl font-bold text-center font-chakra relative z-10">
                  {formatTime(timeSpent)}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <aside className="fixed top-4 bottom-4 right-4 w-20 flex flex-col items-center py-6 gap-4 rounded-3xl bg-black/40 backdrop-blur-md z-10">
        {user && (
          <Link to="/profile">
            <Avatar className="w-12 h-12 border-2 border-accent">
              <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
              <AvatarFallback className="bg-accent text-white text-xl">
                {getUserInitials(user.displayName)}
              </AvatarFallback>
            </Avatar>
          </Link>
        )}
      </aside>
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

function LockedCard() {
  return (
    <div className="bg-gray-700/40 backdrop-blur-md rounded-xl p-4 flex flex-col items-center opacity-60 relative">
      <img src="/assets/lock.png" alt="Locked Agent" className="w-fit h-32 mb-2 blur-sm" />
    </div>
  );
}