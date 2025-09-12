import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Users, Trophy, Calendar } from 'lucide-react';

interface TournamentCardProps {
  tournament: {
    id: string;
    title: string;
    image: string;
    category: string;
    prizePool: string;
    participants: number;
    status: 'live' | 'upcoming' | 'registration' | 'ended';
    startDate?: string;
    duration?: string;
  };
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const TournamentCard = ({ tournament, size = 'medium', onClick }: TournamentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-48 h-32';
      case 'large':
        return 'w-80 h-48';
      default:
        return 'w-80 h-48';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-500 bg-opacity-60';
      case 'upcoming':
        return 'bg-yellow-500 bg-opacity-60';
      case 'registration':
        return 'bg-green-500 bg-opacity-60';
      case 'ended':
        return 'bg-gray-500 bg-opacity-60';
      default:
        return 'bg-muted bg-opacity-60';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'live':
        return 'LIVE';
      case 'upcoming':
        return 'UPCOMING';
      case 'registration':
        return 'OPEN';
      case 'ended':
        return 'ENDED';
      default:
        return status.toUpperCase();
    }
  };

  return (
    <div
      className={`relative ${getSizeClasses()} rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-card hover:z-20`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 hover:scale-110"
        style={{ backgroundImage: `url(${tournament.image})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
      
      {/* Status Badge */}
      <div className="absolute top-2 left-2 z-10">
        <div className={`${getStatusColor(tournament.status)} px-2 py-1 rounded-md text-xs font-bold text-white flex items-center space-x-1`}>
          {tournament.status === 'live' && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
          <span>{getStatusLabel(tournament.status)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
        <div className="space-y-1">
          {/* Title */}
          <h3 className="font-bold text-sm leading-tight line-clamp-2">
            {tournament.title}
          </h3>
        </div>
      </div>

      {/* Hover Actions */}
      {isHovered && (
        <div className="absolute inset-0 bg-background/90 flex items-center justify-center animate-scale-in">
          <Button 
            size="lg" 
            className=" bg-accent  hover:bg-accent"
          >
            
            {tournament.status === 'live' ? 'Watch' : tournament.status === 'registration' ? 'Join' : 'View'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TournamentCard;