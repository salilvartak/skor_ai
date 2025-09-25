// src/components/TournamentCard.tsx
import { Button } from '@/components/ui/button';
import { Trophy, Calendar, MapPin } from 'lucide-react';

// The interface for the tournament object
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
  registration_link?: string; // Added registration_link
  tournament_location?: string;
}

interface TournamentCardProps {
  tournament: Tournament;
  onClick: () => void; // Add this line
}

const TournamentCard = ({ tournament, onClick }: TournamentCardProps) => {
  // Renders a "LIVE" badge if the tournament is live
  const getStatusBadge = () => {
    if (tournament.status === 'live') {
      return (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-red-600/90 px-3 py-1 rounded-md text-xs font-bold text-white flex items-center space-x-1.5 shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span>LIVE</span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Determines the text for the CTA button and wraps it in a link
  const getCtaButton = () => {
    let text = 'View Details';
    if (tournament.status === 'live') text = 'Watch Now';
    if (tournament.status === 'registration') text = 'Join Tournament';
    if (tournament.status === 'ended') text = 'View Results';

    // If there's no registration link, render a disabled button
    if (!tournament.registration_link) {
        return (
            <Button disabled className="w-full mt-5 bg-accent/50 text-white font-bold py-3 rounded-lg">
                {text}
            </Button>
        )
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
    <div
      onClick={onClick} // Add the onClick handler here
      className="w-80 bg-[#1a1c20] rounded-lg border border-gray-700/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-accent/50 hover:-translate-y-1 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-40">
        <img
          src={tournament.image}
          alt={tournament.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        {getStatusBadge()}
      </div>

      {/* Content Container */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-white truncate" title={tournament.title}>
          {tournament.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4">{tournament.category}</p>

        <div className="space-y-3 text-sm">
          <div className="flex items-center text-white">
            <Trophy className="h-4 w-4 mr-3 text-accent" />
            <span className="font-semibold">{tournament.prizePool}</span>
            <span className="text-gray-400 ml-1.5">- Prize Pool</span>
          </div>
          <div className="flex items-center text-white">
            <Calendar className="h-4 w-4 mr-3 text-accent" />
            <span className="font-semibold">{tournament.startDate}</span>
          </div>
          {tournament.location && (
            <div className="flex items-center text-white">
              <MapPin className="h-4 w-4 mr-3 text-accent" />
              <span className="font-semibold">{tournament.location}</span>
            </div>
          )}
        </div>

        {getCtaButton()}
      </div>
    </div>
  );
};

export default TournamentCard;