import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import TournamentCard from '@/components/TournamentCard';
import TournamentModal from '@/components/TournamentModal';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from 'lucide-react';

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
  tournament_location?: string;
  tournament_start_date?: string;
  tournament_end_date?: string;
  registration_start_date?: string;
  registration_end_date?: string;
  registration_link?: string;
}

const getGameName = (gameId: number) => {
    switch (gameId) {
        case 2: return "BGMI";
        case 3: return "CS2";
        case 4: return "Valorant";
        case 6: return "Dota 2";
        default: return `Game ID: ${gameId}`;
    }
};

const getGameImage = (gameId: number) => {
    switch (gameId) {
        case 2: return "https://images.wallpapersden.com/image/download/pubg-mobile-season-15_bGhmZ2iUmZqaraWkpJRpZWVlrWdnamY.jpg";
        case 3: return "/assets/CS2.jpg";
        case 4: return "/assets/vct.jpg";
        case 6: return "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/capsule_616x353.jpg?t=1757000652";
        default: return "https://images.wallpapersden.com/image/download/pubg-mobile-season-15_bGhmZ2iUmZqaraWkpJRpZWVlrWdnamY.jpg";
    }
};

const getTournamentStatus = (
    tournamentStartDate: string,
    tournamentEndDate: string,
    registrationStartDate: string,
    registrationEndDate: string
): 'live' | 'upcoming' | 'registration' | 'ended' => {
    const now = new Date();
    const startDate = new Date(tournamentStartDate);
    const endDate = new Date(tournamentEndDate);
    const regStartDate = new Date(registrationStartDate);
    const regEndDate = new Date(registrationEndDate);

    if (now >= startDate && now <= endDate) {
        return 'live';
    }
    if (now >= regStartDate && now <= regEndDate) {
        return 'registration';
    }
    if (now < startDate) {
        return 'upcoming';
    }
    return 'ended';
};

const GameTournamentsPage = () => {
  const { game } = useParams<{ game: string }>();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);

  const handleCardClick = (tournament: Tournament) => {
    setSelectedTournament(tournament);
    setIsModalOpen(true);
  };

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

        const gameMap: { [key: string]: number } = {
            "cs2": 3,
            "valorant": 4,
            "bgmi": 2,
            "dota 2": 6,
        };
        
        let tournamentsToDisplay = data;

        if (game) {
            const lowercasedGame = decodeURIComponent(game.toLowerCase());
            if (lowercasedGame === "live") {
                tournamentsToDisplay = data.filter((t: any) => {
                    const status = getTournamentStatus(
                        t.tournament_start_date,
                        t.tournament_end_date,
                        t.registration_start_date,
                        t.registration_end_date
                    );
                    return status === 'live';
                });
            } else {
                const gameId = gameMap[lowercasedGame];
                if (gameId !== undefined) {
                    tournamentsToDisplay = data.filter((t: any) => t.game_id === gameId);
                } else {
                    tournamentsToDisplay = [];
                }
            }
        }

        const mappedTournaments = tournamentsToDisplay.map((t: any) => ({
            id: t.id.toString(),
            title: t.tournament_name,
            image: getGameImage(t.game_id),
            category: getGameName(t.game_id),
            prizePool: `${t.prize_pool_currency} ${t.prize_pool.toLocaleString()}`,
            participants: 0,
            status: getTournamentStatus(
                t.tournament_start_date,
                t.tournament_end_date,
                t.registration_start_date,
                t.registration_end_date
            ),
            startDate: new Date(t.tournament_start_date).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
            }),
            location: t.tournament_location,
            registration_link: t.registration_link,
            tournament_start_date: t.tournament_start_date,
            tournament_end_date: t.tournament_end_date,
            registration_start_date: t.registration_start_date,
            registration_end_date: t.registration_end_date,
        }));

        setTournaments(mappedTournaments);
      } catch (error: any) {
        console.error("Error fetching tournaments:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, [game]);

  const renderContent = () => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="flex flex-col space-y-3">
                        <Skeleton className="h-[125px] w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    if (error) {
        return (
            <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }
    if (tournaments.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500 italic">
                No tournaments found for {game}.
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tournaments.map((tournament) => (
                <TournamentCard
                    key={tournament.id}
                    tournament={tournament}
                    onClick={() => handleCardClick(tournament)}
                />
            ))}
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#121417] font-chakra text-white">
      <Header />
      <main className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-8">
              {game ? `${game.toUpperCase().replace('%20', ' ')} Tournaments` : 'All Tournaments'}
          </h1>
          {renderContent()}
      </main>
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
export default GameTournamentsPage;