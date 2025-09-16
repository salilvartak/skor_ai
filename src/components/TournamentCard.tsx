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
    previewVideo?: string;
  };
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const fallbackVideos = [
  '/assets/vid/apex.mp4',
  '/assets/vid/vct.mp4',
  '/assets/vid/cs.mp4',
];

const TournamentCard = ({ tournament, size = 'medium', onClick }: TournamentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const stringHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
    }
    return Math.abs(hash);
  };

  const videoSrc = tournament.previewVideo
    ? tournament.previewVideo
    : fallbackVideos[stringHash(tournament.id) % fallbackVideos.length];

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
    // Adjust the padding of this outer container to ensure there is enough space.
    // This is the container that must not clip the content.
    <div 
      className={`relative rounded-lg overflow-visible transition-all duration-300 hover:z-20`}
      style={{
        width: size === 'small' ? '192px' : '320px',
        height: size === 'small' ? '128px' : '192px',
        // Increased padding to accommodate a scale of 1.25 (125%)
        padding: size === 'small' ? '8px' : '14px',
      }}
    >
      <div
        className={`relative w-full h-full rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.25] hover:shadow-card`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {/* Container for the image and video to handle the fade effect */}
        <div className="relative w-full h-full">
          {/* Background Image - will fade out on hover */}
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
            style={{ backgroundImage: `url(${tournament.image})` }}
          />
          
          {/* Video - will fade in on hover */}
          <video
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered && videoSrc ? 'opacity-100' : 'opacity-0'}`}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

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
              className="bg-accent hover:bg-accent"
            >
              {tournament.status === 'live' ? 'Watch' : tournament.status === 'registration' ? 'Join' : 'View'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentCard;