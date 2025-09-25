import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Calendar, MapPin, AlignLeft, List, Newspaper } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Tournament {
  id: string;
  title: string;
  image: string;
  category: string;
  prizePool: string;
  participants: number;
  status: 'live' | 'upcoming' | 'registration' | 'ended';
  startDate?: string;
  location?: string;
  registration_link?: string;
  tournament_start_date?: string;
  tournament_end_date?: string;
  registration_start_date?: string;
  registration_end_date?: string;
  tournament_location?: string;
}

interface TournamentModalProps {
  tournament: Tournament | null;
  isOpen: boolean;
  onClose: () => void;
}

// Hardcoded showcase data
const detailedTournamentInfo = {
  overview:
    "The Skor Elite  Championship is the ultimate battle for glory, featuring the top teams from across the nation. Compete for a massive prize pool and earn your place among the legends of the game. The tournament spans three days of intense action, culminating in a grand finale to crown the champion.",
  schedule: [
    { date: 'Day 1', event: 'Group Stage - Round 1', time: '10:00 AM IST' },
    { date: 'Day 1', event: 'Group Stage - Round 2', time: '02:00 PM IST' },
    { date: 'Day 2', event: 'Semifinals - Group A', time: '11:00 AM IST' },
    { date: 'Day 2', event: 'Semifinals - Group B', time: '03:00 PM IST' },
    { date: 'Day 3', event: 'Grand Finale', time: '05:00 PM IST' },
  ],
  rules: [
    "All players must register with their in-game name (IGN).",
    "No use of third-party software or hacks is allowed. Violation will result in immediate disqualification.",
    "Teams must consist of four players.",
    "Communication is restricted to team members only.",
    "Decisions made by tournament organizers are final.",
  ],
};

const TournamentModal = ({ tournament, isOpen, onClose }: TournamentModalProps) => {
  if (!tournament) {
    return null;
  }

  const getStatusBadge = () => {
    if (tournament.status === 'live') {
      return (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-red-600/90 px-3 py-1 rounded-md text-xs font-bold text-white flex items-center space-x-1.5 shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span>LIVE</span>
          </div>
        </div>
      );
    }
    return null;
  };

  const getCtaButton = () => {
    let text = 'View Details';
    if (tournament.status === 'live') text = 'Watch Now';
    if (tournament.status === 'registration') text = 'Join Tournament';
    if (tournament.status === 'ended') text = 'View Results';

    if (!tournament.registration_link) {
      return (
        <Button disabled className="w-full mt-5 bg-accent/50 text-white font-bold py-3 rounded-lg">
          {text}
        </Button>
      );
    }

    return (
      <a href={tournament.registration_link} target="_blank" rel="noopener noreferrer" className="block">
        <Button className="w-full mt-5 bg-accent hover:bg-accent/80 text-white font-bold py-3 rounded-lg transition-transform hover:scale-105">
          {text}
        </Button>
      </a>
    );
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden border-gray-700/50 bg-[#1a1c20] text-white font-chakra">
        <div className="relative w-full h-60 md:h-80">
          <img
            src={tournament.image}
            alt={tournament.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c20] to-transparent" />
          {getStatusBadge()}
          <div className="absolute bottom-0 left-0 p-6 z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">
              {tournament.title}
            </h2>
            <p className="text-lg text-gray-400">{tournament.category}</p>
          </div>
        </div>

        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
          {/* Details Section */}
          <div className="space-y-6">
            <div className="flex items-center text-white">
              <Trophy className="h-5 w-5 mr-4 text-accent" />
              <div>
                <span className="font-semibold text-xl">{tournament.prizePool}</span>
                <span className="text-gray-400 ml-2 text-sm">- Prize Pool</span>
              </div>
            </div>
            
            <div className="flex items-center text-white">
              <Calendar className="h-5 w-5 mr-4 text-accent" />
              <div>
                <p className="font-semibold text-xl">
                    {tournament.startDate}
                </p>
                <p className="text-gray-400 text-sm">Start Date</p>
              </div>
            </div>

            {tournament.location && (
              <div className="flex items-center text-white">
                <MapPin className="h-5 w-5 mr-4 text-accent" />
                <div>
                    <p className="font-semibold text-xl">{tournament.location}</p>
                    <p className="text-gray-400 text-sm">Location</p>
                </div>
              </div>
            )}
          </div>

          {/* Registration/CTA Section */}
          <div className="flex flex-col justify-end">
            <DialogDescription className="text-gray-400 mb-6">
              Full details about the tournament, including rules, schedule, and team information, are available below.
            </DialogDescription>
            {getCtaButton()}
          </div>
        </div>

        {/* New Tabbed Section for Detailed Content */}
        <div className="p-6 md:p-8 pt-0">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#1a1c20] border-t border-gray-700/50">
              <TabsTrigger value="overview" className="flex items-center gap-2 text-white/60 data-[state=active]:text-accent data-[state=active]:bg-[#2c2f35]">
                <AlignLeft className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center gap-2 text-white/60 data-[state=active]:text-accent data-[state=active]:bg-[#2c2f35]">
                <Calendar className="w-4 h-4" />
                Schedule
              </TabsTrigger>
              <TabsTrigger value="rules" className="flex items-center gap-2 text-white/60 data-[state=active]:text-accent data-[state=active]:bg-[#2c2f35]">
                <Newspaper className="w-4 h-4" />
                Rules
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4 text-gray-400">
              <p>{detailedTournamentInfo.overview}</p>
            </TabsContent>
            <TabsContent value="schedule" className="mt-4">
              <ul className="space-y-4">
                {detailedTournamentInfo.schedule.map((item, index) => (
                  <li key={index} className="flex items-center justify-between border-b border-gray-700/50 pb-2">
                    <div>
                      <h4 className="font-bold text-white">{item.event}</h4>
                      <p className="text-gray-400 text-sm">{item.date}</p>
                    </div>
                    <span className="text-accent font-semibold">{item.time}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="rules" className="mt-4">
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                {detailedTournamentInfo.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TournamentModal;