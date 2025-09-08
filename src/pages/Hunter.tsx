import React, { useState, useMemo } from 'react';
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
  Youtube,
  Twitch,
  Users,
  Star,
  Globe,
  BarChart,
  Calendar,
  Layers,
  MessageSquare,
} from 'lucide-react';
import { allTournaments, Tournament } from '../data/tournaments';
import GeminiChatbot from '../components/GeminiChatbot';

// --- Interfaces ---
type FilterState = {
  game: string;
  region: string;
  skillBracket: string;
  type: string;
  timeline: string;
};

// --- Helper Components ---
const TournamentCard = ({ tournament }: { tournament: Tournament }) => (
  <Card className="border-none bg-white/5 backdrop-blur-sm overflow-hidden group text-white font-chakra h-full flex flex-col">
    <CardContent className="p-0 relative flex-grow flex flex-col">
      <div className="relative">
        <img
          src={tournament.image}
          alt={tournament.title}
          className="w-full h-40 object-contain"
        />
        <div
          className={`absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 text-xs font-bold rounded-full border ${
            tournament.status === 'live'
              ? 'bg-red-500/20 border-red-500/50 text-red-400'
              : 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'
          }`}
        >
          {tournament.status === 'live' && (
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
        <p className="text-white/80 text-sm text-center mb-4">
          Event Type: {tournament.eventType}
        </p>
        <Button className="w-full bg-gradient-to-r from-accent to-red-600">
          View Details
        </Button>
        <Button variant="outline" className="w-full mt-2">
          Join discussions
        </Button>
        <div className="text-xs text-white/50 mt-4 flex items-center gap-2">
          <MessageSquare className="w-3 h-3" />
          <span>{Math.floor(Math.random() * 50)} discussions</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const FilterSidebar = ({ filters, setFilters, games, regions, skillBrackets, tournamentTypes }) => (
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
            <SelectContent>{regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium text-white/70 block mb-2">Skill Bracket</label>
          <Select onValueChange={(value) => setFilters(f => ({ ...f, skillBracket: value }))} value={filters.skillBracket}>
            <SelectTrigger className="w-full bg-white/10 border-white/20 text-white"><SelectValue placeholder="Skill Bracket" /></SelectTrigger>
            <SelectContent>{skillBrackets.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium text-white/70 block mb-2">Tournament Type</label>
          <Select onValueChange={(value) => setFilters(f => ({ ...f, type: value }))} value={filters.type}>
            <SelectTrigger className="w-full bg-white/10 border-white/20 text-white"><SelectValue placeholder="Tournament Type" /></SelectTrigger>
            <SelectContent>{tournamentTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium text-white/70 block mb-2">Timeline</label>
          <Select onValueChange={(value) => setFilters(f => ({ ...f, timeline: value }))} value={filters.timeline}>
            <SelectTrigger className="w-full bg-white/10 border-white/20 text-white"><SelectValue placeholder="Timeline" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="weekend">This Weekend</SelectItem>
              <SelectItem value="month">Next 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

// --- Main Page Component ---
function HunterPage() {
  const [filters, setFilters] = useState<FilterState>({
    game: 'All',
    region: 'All',
    skillBracket: 'All',
    type: 'All',
    timeline: 'all',
  });

  const unique = (key: keyof Tournament) => ['All', ...Array.from(new Set(allTournaments.map(t => t[key])))];
  const games = unique('game');
  const regions = unique('region');
  const skillBrackets = unique('skillBracket');
  const tournamentTypes = unique('format');

  const filteredTournaments = useMemo(() => {
    return allTournaments.filter(t => {
      const gameMatch = filters.game === 'All' || t.game === filters.game;
      const regionMatch = filters.region === 'All' || t.region === filters.region;
      const skillMatch = filters.skillBracket === 'All' || t.skillBracket === filters.skillBracket;
      const typeMatch = filters.type === 'All' || t.format === filters.type;
      
      const now = new Date();
      const tournamentDate = new Date(t.startDate);
      const timelineMatch = filters.timeline === 'all' ||
        (filters.timeline === 'today' && tournamentDate.toDateString() === now.toDateString()) ||
        (filters.timeline === 'month' && tournamentDate <= new Date(new Date().setDate(now.getDate() + 30))) ||
        (filters.timeline === 'weekend' && tournamentDate.getDay() >= 5 && tournamentDate <= new Date(new Date().setDate(now.getDate() + (7-now.getDay()))));

      return gameMatch && regionMatch && skillMatch && typeMatch && timelineMatch;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#141110] to-[#2E201B] relative overflow-x-hidden font-chakra">
      <Header />
      <main className="relative z-10 pt-24 px-6 max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-black/20 p-6 rounded-lg mb-8">
            <h1 className="text-3xl font-bold text-white">Your Next Tournament Awaits</h1>
            <p className="text-white/60">Find, join, and conquer.</p>
          </div>

          <GeminiChatbot />

          {/* Persona Carousels */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Play Where You Belong</h2>
            <Carousel opts={{ align: 'start' }} className="relative">
              <CarouselContent className="-ml-4">
                {filteredTournaments.filter(t => t.eventType === 'Pro' || t.eventType === 'Community').map(t => (
                  <CarouselItem key={t.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <TournamentCard tournament={t} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 hidden md:inline-flex bg-white/10 border-white/20 text-white hover:bg-white/20" />
<CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 hidden md:inline-flex bg-white/10 border-white/20 text-white hover:bg-white/20" />
            </Carousel>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Watch & Support</h2>
             <Carousel opts={{ align: 'start' }} className="relative">
              <CarouselContent className="-ml-4">
                {filteredTournaments.filter(t => t.eventType === 'Livestream').map(t => (
                  <CarouselItem key={t.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <TournamentCard tournament={t} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 hidden md:inline-flex bg-white/10 border-white/20 text-white hover:bg-white/20" />
<CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 hidden md:inline-flex bg-white/10 border-white/20 text-white hover:bg-white/20" />
            </Carousel>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Start Your Journey</h2>
            <Carousel opts={{ align: 'start' }} className="relative">
              <CarouselContent className="-ml-4">
                {filteredTournaments.filter(t => t.skillBracket === 'Beginner' && t.eventType === 'Community').map(t => (
                  <CarouselItem key={t.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <TournamentCard tournament={t} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 hidden md:inline-flex bg-white/10 border-white/20 text-white hover:bg-white/20" />
<CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 hidden md:inline-flex bg-white/10 border-white/20 text-white hover:bg-white/20" />
            </Carousel>
          </section>

          {/* Personalized Modules */}
          <section className="grid md:grid-cols-3 gap-8 my-12">
            <div className="bg-white/5 p-6 rounded-lg">
              <h3 className="font-bold text-white mb-2">Because You Played Last Week</h3>
              <p className="text-white/60 text-sm">Tournaments matching your recent activity.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg">
              <h3 className="font-bold text-white mb-2">Trending in Your Region</h3>
              <p className="text-white/60 text-sm">Join the most popular local tournaments.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg">
              <h3 className="font-bold text-white mb-2">Players Like You Are Joining</h3>
              <div className="flex -space-x-2 overflow-hidden mt-2">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-800" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc" alt="" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-800" src="https://images.unsplash.com/photo-1550525811-e5869dd03032" alt="" />
              </div>
            </div>
          </section>

          {/* Community Hooks */}
          <div className="text-center my-12 p-6 bg-black/20 rounded-lg">
            <Button>
              <MessageSquare className="mr-2" /> Discuss these tournaments
            </Button>
            <div className="flex justify-center items-center gap-2 mt-4 text-white/60">
              <Star className="text-yellow-400" />
              <span>Join a trending tournament to unlock a new badge!</span>
            </div>
          </div>
        </div>
        
        {/* Right Sidebar */}
        <aside className="lg:col-span-1">
          <FilterSidebar 
            filters={filters} 
            setFilters={setFilters} 
            games={games} 
            regions={regions} 
            skillBrackets={skillBrackets} 
            tournamentTypes={tournamentTypes} 
          />
        </aside>
      </main>
    </div>
  );
}

export default HunterPage;