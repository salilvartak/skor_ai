import {Header} from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TournamentRow from '@/components/TournamentRow';
import { 
  trendingTournaments, 
  liveTournaments, 
  upcomingTournaments, 
  yourTournaments, 
  esportsChampionships, 
  amateurLeagues 
} from '@/data/tournaments';
import Sidebar from '@/components/sidebar';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#121417] font-chakra text-white">
      {/* Header */}
      <Sidebar />
      <Header />

      {/* Main Content */}
      <main className="pt-0">
        {/* Hero Section */}
        <HeroSection />

        {/* Tournament Sections */}
        <div className="space-y-4 ">
          <TournamentRow 
          
            title="Trending Tournaments" 
            tournaments={trendingTournaments} 
          />
          
          <TournamentRow 
            title="Live Now" 
            tournaments={liveTournaments} 
          />
          
          <TournamentRow 
            title="Upcoming Events" 
            tournaments={upcomingTournaments} 
          />
          
          <TournamentRow 
            title="Your Tournaments" 
            tournaments={yourTournaments} 
          />
          
          <TournamentRow 
            title="Esports Championships" 
            tournaments={esportsChampionships} 
          />
          
          <TournamentRow 
            title="Amateur Leagues" 
            tournaments={amateurLeagues} 
          />
        </div>

        {/* Footer Space */}
        <div className="h-16"></div>
      </main>
    </div>
  );
};

export default Index;
