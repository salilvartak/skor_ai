import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/ui/carousel';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Globe,
  BarChart,
  Calendar,
  Layers,
  MessageSquare,
} from 'lucide-react';
import GeminiChatbot from '../components/GeminiChatbot';

// --- Interfaces ---
interface ApiTournament {
  championship_id: string;
  name: string;
  game_id: 'cs2';
  featured: boolean;
  faceit_url: string;
  championship_start: number;
  cover_image: string;
  region_hint: string | null;
  organizer: string | null;
  current_subscriptions: number;
  max_subscriptions: number | null;
}

interface ApiResponse {
  start: number;
  end: number;
  items: ApiTournament[];
}
interface Tournament {
  id: string;
  title: string;
  game: 'CS2';
  prize: string;
  participants: number;
  startDate: string;
  status: 'live' | 'upcoming' | 'ended' | 'ongoing';
  link: string;
  image: string;
  region: 'Unknown';
  skillBracket: 'All';
  format: 'TBD';
  eventType: 'TBD';
}

type FilterState = {
  game: string;
  region: string;
};

// --- Helper Components ---
const TournamentCard = ({ tournament }: { tournament: Tournament }) => (
  <Card className="border-none bg-white/5 backdrop-blur-sm overflow-hidden group text-white font-chakra h-full flex flex-col">
    <CardContent className="p-0 relative flex-grow flex flex-col">
      <div className="relative">
        <img
          src={tournament.image || '/assets/cs2.webp'} // Fallback image
          alt={tournament.title}
          className="w-full h-40 object-cover"
        />
        <div
          className={`absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 text-xs font-bold rounded-full border ${
            tournament.status === 'ongoing' || tournament.status === 'live'
              ? 'bg-red-500/20 border-red-500/50 text-red-400'
              : 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'
          }`}
        >
          {(tournament.status === 'ongoing' || tournament.status === 'live') && (
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          )}
          {tournament.status.toUpperCase()}
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-lg mb-2 truncate">{tournament.title}</h3>
        <div className="flex justify-between items-center mb-3">
          <Badge variant="secondary" className="bg-accent/20 text-accent border-none">
            {tournament.game}
          </Badge>
          <span className="text-lg font-bold text-green-400">{tournament.prize}</span>
        </div>
        <div className="space-y-2 text-sm text-white/70 flex-grow">
          <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-accent" /> Region: {tournament.region}</div>
          <div className="flex items-center gap-2"><Layers className="w-4 h-4 text-accent" /> Format: {tournament.format}</div>
          <div className="flex items-center gap-2"><BarChart className="w-4 h-4 text-accent" /> Skill: {tournament.skillBracket}</div>
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-accent" /> Starts: {new Date(tournament.startDate).toLocaleDateString()}</div>
        </div>
      </div>
       <div className="absolute inset-0 bg-black/80 p-4 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button asChild className="w-full bg-gradient-to-r from-accent to-red-600">
            <a href={tournament.link} target="_blank" rel="noopener noreferrer">View Details</a>
        </Button>
        <Button variant="outline" className="w-full mt-2">
          Join discussions
        </Button>
      </div>
    </CardContent>
  </Card>
);

const TournamentCarousel = ({ title, tournaments }: { title: string, tournaments: Tournament[] }) => (
    <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        {tournaments.length === 0 ? (
            <p className="text-white/70">No tournaments match the current filters.</p>
        ) : (
            <Carousel opts={{ align: 'start' }} className="relative">
                <CarouselContent className="-ml-4">
                    {tournaments.map(t => (
                        <CarouselItem key={t.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                            <TournamentCard tournament={t} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {tournaments.length > 3 && (
                    <>
                        <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 hidden md:inline-flex bg-white/10 border-white/20 text-white hover:bg-white/20" />
                        <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 hidden md:inline-flex bg-white/10 border-white/20 text-white hover:bg-white/20" />
                    </>
                )}
            </Carousel>
        )}
    </section>
);

const FilterSidebar = ({ filters, setFilters, games, regions }) => (
    <div className="bg-black/20 backdrop-blur-md p-6 rounded-lg sticky top-24">
      <h2 className="text-xl font-bold text-white mb-6">Smart Filters</h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-white/70 block mb-2">Game</label>
          <Select onValueChange={(value) => setFilters(f => ({ ...f, game: value }))} value={filters.game}>
            <SelectTrigger className="w-full bg-white/10 border-white/20 text-white"><SelectValue placeholder="Game" /></SelectTrigger>
            <SelectContent className='bg-gray-900/95 text-white'>{games.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium text-white/70 block mb-2">Region</label>
          <Select onValueChange={(value) => setFilters(f => ({ ...f, region: value }))} value={filters.region}>
            <SelectTrigger className="w-full bg-white/10 border-white/20 text-white"><SelectValue placeholder="Region" /></SelectTrigger>
            <SelectContent className='bg-gray-900/95 text-white'>{regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

// --- Main Page Component ---
function HunterPage() {
    const [upcomingTournaments, setUpcomingTournaments] = useState<Tournament[]>([]);
    const [ongoingTournaments, setOngoingTournaments] = useState<Tournament[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [filters, setFilters] = useState<FilterState>({
        game: 'All',
        region: 'All',
    });

  useEffect(() => {
    const formatApiResponse = (data: ApiResponse, status: Tournament['status']): Tournament[] => {
        if (!data || !Array.isArray(data.items)) {
            console.error("Invalid API response structure:", data);
            return [];
        }
        return data.items.map(item => ({
            id: item.championship_id,
            title: item.name,
            game: 'CS2',
            prize: 'TBD',
            participants: item.current_subscriptions,
            startDate: new Date(item.championship_start * 1000).toISOString(),
            status: status,
            link: item.faceit_url.replace('{lang}', 'en'),
            image: item.cover_image,
            region: 'Unknown',
            skillBracket: 'All',
            format: 'TBD',
            eventType: 'TBD',
        }));
    };

    const fetchAllTournaments = async () => {
      try {
        const types: Tournament['status'][] = ['upcoming', 'ongoing'];
        
        const responses = await Promise.all(
            types.map(type => fetch(`/api/cs2/tournaments/latest?type=${type}&limit=10&offset=0`))
        );

        responses.forEach(res => {
            if (!res.ok) throw new Error(`API request failed with status: ${res.status}`);
        });

        const data: ApiResponse[] = await Promise.all(responses.map(res => res.json()));

        setUpcomingTournaments(formatApiResponse(data[0], 'upcoming'));
        setOngoingTournaments(formatApiResponse(data[1], 'ongoing'));

      } catch (err) {
        console.error("An error occurred while fetching tournaments:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTournaments();
  }, []);

  const allFetchedTournaments = useMemo(() => {
    return [...ongoingTournaments, ...upcomingTournaments];
  }, [ongoingTournaments, upcomingTournaments]);

  const unique = (key: keyof Tournament) => ['All', ...Array.from(new Set(allFetchedTournaments.map(t => t[key])))];
  const games = unique('game');
  const regions = unique('region');

  const filteredTournaments = useMemo(() => {
    return allFetchedTournaments.filter(t => {
      const gameMatch = filters.game === 'All' || t.game === filters.game;
      const regionMatch = filters.region === 'All' || t.region === filters.region;
      return gameMatch && regionMatch;
    });
  }, [filters, allFetchedTournaments]);


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#141110] to-[#2E201B] relative overflow-x-hidden font-chakra">
      <Header />
      <main className="relative z-10 pt-24 px-6 max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-black/20 p-6 rounded-lg mb-8">
            <h1 className="text-3xl font-bold text-white">Your Next Tournament Awaits</h1>
            <p className="text-white/60">Find, join, and conquer.</p>
          </div>

          <GeminiChatbot />

            {loading && <p className="text-white/70 text-center text-lg">Loading tournaments...</p>}
            {error && <p className="text-red-400 text-center text-lg">Could not load tournaments. Error: {error}</p>}

            {!loading && !error && (
                <>
                    <TournamentCarousel title="Ongoing Tournaments" tournaments={filteredTournaments.filter(t => t.status === 'ongoing')} />
                    <TournamentCarousel title="Upcoming Tournaments" tournaments={filteredTournaments.filter(t => t.status === 'upcoming')} />
                    <TournamentCarousel title="All Tournaments" tournaments={filteredTournaments} />
                </>
            )}
        </div>
        <aside className="lg:col-span-1">
            <FilterSidebar 
                filters={filters}
                setFilters={setFilters}
                games={games}
                regions={regions}
            />
        </aside>
      </main>
    </div>
  );
}

export default HunterPage;