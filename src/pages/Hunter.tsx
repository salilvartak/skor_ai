import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TournamentRow from '@/components/TournamentRow';
import Sidebar from '@/components/sidebar';
import { trendingTournaments as trendingData } from '@/data/tournaments';

// Defines the structure of a tournament object
interface Tournament {
  id: string;
  title: string;
  image: string;
  category: string;
  prizePool: string;
  participants: number;
  status: 'live' | 'upcoming' | 'registration' | 'ended';
  startDate?: string;
  duration?: string;
  location?: string;
  registration_link?: string;
  tournament_start_date?: string;
  tournament_end_date?: string;
  registration_start_date?: string;
  registration_end_date?: string;
  tournament_location?: string;
}

const Index = () => {
  // State for managing tournament data
  const [trendingTournaments, setTrendingTournaments] = useState<Tournament[]>(trendingData);
  const [liveTournaments, setLiveTournaments] = useState<Tournament[]>([]);
  const [upcomingTournaments, setUpcomingTournaments] = useState<Tournament[]>([]);
  const [registrationLive, setRegistrationLive] = useState<Tournament[]>([]);
  
  // State for loading and error UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/master-tournament-details", {
          method: "GET",
          headers: {
            Authorization: "Token 71b4dfe9b2eb0ce7d4e892aea998b2bf9b8b42fc",
          },
        });

        if (!response.ok) {
          throw new Error(`The tournament server is not responding. Please try again later.`);
        }

        const data = await response.json();
        
        if (!Array.isArray(data)) {
          console.error("Fetched data is not an array:", data);
          return;
        }

        const now = new Date();
        const live: Tournament[] = [];
        const upcoming: Tournament[] = [];
        const regLive: Tournament[] = [];

        data.forEach((t: any) => {
          const tournament: Tournament = {
            id: t.id.toString(),
            title: t.tournament_name,
            image: "https://images.wallpapersden.com/image/download/pubg-mobile-season-15_bGhmZ2iUmZqaraWkpJRpZWVlrWdnamY.jpg",
            category: t.game_id_id === 2 ? "BGMI" : `Game ID: ${t.game_id_id}`,
            prizePool: `${t.prize_pool_currency} ${t.prize_pool.toLocaleString()}`,
            participants: 0, 
            status: "upcoming",
            startDate: new Date(t.tournament_start_date).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
            }),
            location: t.tournament_location,
            registration_link: t.registration_link,
            tournament_start_date: t.tournament_start_date,
            tournament_end_date: t.tournament_end_date,
            registration_start_date: t.registration_start_date,
            registration_end_date: t.registration_end_date,
          };

          const startDate = new Date(tournament.tournament_start_date!);
          const endDate = new Date(tournament.tournament_end_date!);
          const regStartDate = new Date(tournament.registration_start_date!);
          const regEndDate = new Date(tournament.registration_end_date!);

          if (now >= startDate && now <= endDate) {
            tournament.status = "live";
            live.push(tournament);
          } else if (now < startDate) {
            tournament.status = "upcoming";
            upcoming.push(tournament);
          }

          if (now >= regStartDate && now <= regEndDate) {
            tournament.status = "registration";
            regLive.push(tournament);
          }
        });
        
        setLiveTournaments(live);
        setUpcomingTournaments(upcoming);
        setRegistrationLive(regLive);
        
      } catch (error: any) {
        console.error("Error fetching tournaments:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const renderContent = () => {
    if (loading) {
        return <div className="text-center py-10">Loading tournaments...</div>;
    }

    if (error) {
        return (
            <div className="text-center py-10 px-4">
                <h2 className="text-xl font-bold text-red-500">Something Went Wrong</h2>
                <p className="text-gray-400 mt-2">{error}</p>
            </div>
        );
    }

    return (
        <>
            <TournamentRow title="Live Now" tournaments={liveTournaments} />
            <TournamentRow
                title="Upcoming Events"
                tournaments={upcomingTournaments}
            />
            <TournamentRow
                title="Registration Live"
                tournaments={registrationLive}
            />
        </>
    );
  };

  return (
    <div className="min-h-screen bg-[#121417] font-chakra text-white">
      <Sidebar />
      <Header 
        liveTournaments={liveTournaments}
        upcomingTournaments={upcomingTournaments}
        trendingTournaments={trendingTournaments}
      />
      <main className="pt-0">
        <HeroSection />
        <div className="space-y-4 ">
          <TournamentRow
            title="Trending Tournaments"
            tournaments={trendingTournaments}
          />
          {renderContent()}
        </div>
        <div className="h-16"></div>
      </main>
    </div>
  );
};

export default Index;