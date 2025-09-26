// src/pages/Hunter.tsx
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TournamentRow from '@/components/TournamentRow';
import Sidebar from '@/components/sidebar';
import TournamentModal from '@/components/TournamentModal'; // Ensure this is imported
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

const getGameName = (gameId: number) => {
  switch (gameId) {
    case 2:
      return "BGMI";
    case 3:
      return "CS2";
    case 4:
      return "Valorant";
    default:
      return `Game ID: ${gameId}`;
  }
};

const getGameImage = (gameId: number) => {
  switch (gameId) {
    case 2:
      return "https://images.wallpapersden.com/image/download/pubg-mobile-season-15_bGhmZ2iUmZqaraWkpJRpZWVlrWdnamY.jpg";
    case 3:
      return "/assets/CS2.jpg";
    case 4:
      return "/assets/vct.jpg";
    default:
      return "https://images.wallpapersden.com/image/download/pubg-mobile-season-15_bGhmZ2iUmZqaraWkpJRpZWVlrWdnamY.jpg"; // Default image
  }
};

const Index = () => {
  // State for managing tournament data
  const [trendingTournaments, setTrendingTournaments] = useState<Tournament[]>(trendingData);
  const [liveTournaments, setLiveTournaments] = useState<Tournament[]>([]);
  const [cs2Tournaments, setCs2Tournaments] = useState<Tournament[]>([]);
  const [valorantTournaments, setValorantTournaments] = useState<Tournament[]>([]);
  const [bgmiTournaments, setBgmiTournaments] = useState<Tournament[]>([]);
  
  // State for loading and error UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for modal management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);

  // This function will be passed to your cards to handle a click
  const handleCardClick = (tournament: Tournament) => {
    setSelectedTournament(tournament);
    setIsModalOpen(true);
  };
  
  // You will also need a function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTournament(null);
  };

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("https://hunter-api.createc.in/api/master-tournament-details", {
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
        const cs2: Tournament[] = [];
        const valorant: Tournament[] = [];
        const bgmi: Tournament[] = [];

        data.forEach((t: any) => {
          const tournament: Tournament = {
            id: t.id.toString(),
            title: t.tournament_name,
            image: getGameImage(t.game_id),
            category: getGameName(t.game_id),
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
          
          if (now >= startDate && now <= endDate) {
            tournament.status = "live";
            live.push(tournament);
          }

          switch (t.game_id) {
            case 2:
              bgmi.push(tournament);
              break;
            case 3:
              cs2.push(tournament);
              break;
            case 4:
              valorant.push(tournament);
              break;
          }
        });
        
        setLiveTournaments(live);
        setCs2Tournaments(cs2);
        setValorantTournaments(valorant);
        setBgmiTournaments(bgmi);
        
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
        <TournamentRow title="Live Now" tournaments={liveTournaments} onCardClick={handleCardClick} />
        <TournamentRow title="CS2" tournaments={cs2Tournaments} onCardClick={handleCardClick} />
        <TournamentRow title="Valorant" tournaments={valorantTournaments} onCardClick={handleCardClick} />
        <TournamentRow title="BGMI" tournaments={bgmiTournaments} onCardClick={handleCardClick} />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#121417] font-chakra text-white">
      <Sidebar />
      <Header 
        liveTournaments={liveTournaments}
        upcomingTournaments={[]}
        trendingTournaments={trendingTournaments}
      />
      <main className="pt-0">
        <HeroSection />
        <div className="space-y-4 ">
          <TournamentRow
            title="Trending Tournaments"
            tournaments={trendingTournaments}
            onCardClick={handleCardClick}
          />
          {renderContent()}
        </div>
        <div className="h-16"></div>
      </main>

      {/* Conditionally render the modal if a tournament is selected */}
      {selectedTournament && (
        <TournamentModal
          tournament={selectedTournament}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Index;