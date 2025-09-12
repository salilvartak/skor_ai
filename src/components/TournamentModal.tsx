import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  Play,
  Plus,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Calendar,
  Trophy,
  Users,
  MapPin,
  Clock,
  Star,
  X
} from 'lucide-react';

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
}

interface TournamentModalProps {
  tournament: Tournament | null;
  isOpen: boolean;
  onClose: () => void;
}

const TournamentModal = ({ tournament, isOpen, onClose }: TournamentModalProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  if (!tournament) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-500 text-white';
      case 'upcoming':
        return 'bg-yellow-500 text-black';
      case 'registration':
        return 'bg-green-500 text-white';
      case 'ended':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getActionButton = (status: string) => {
    switch (status) {
      case 'live':
        return { text: 'Watch Live', icon: Play };
      case 'upcoming':
        return { text: 'Set Reminder', icon: Calendar };
      case 'registration':
        return { text: 'Join Tournament', icon: Plus };
      default:
        return { text: 'View Details', icon: Play };
    }
  };

  const actionButton = getActionButton(tournament.status);
  const ActionIcon = actionButton.icon;

  // Mock additional data that would come from an API
  const additionalInfo = {
    description: `Experience the ultimate ${tournament.category} competition with top-tier teams from around the globe. This tournament features the highest level of competitive play with strategic gameplay, incredible skill displays, and heart-stopping moments that will keep you on the edge of your seat.`,
    organizer: 'Skor AI Events',
    venue: 'Online Platform',
    format: 'Double Elimination',
    teamSize: '5v5',
    rating: '4.8',
    viewerCount: '2.3M',
    tags: ['Competitive', 'Professional', 'Live Broadcast', 'Championship'],
    schedule: [
      { date: 'Day 1', matches: 'Opening Ceremony & Group Stage' },
      { date: 'Day 2-3', matches: 'Group Stage Elimination' },
      { date: 'Day 4-5', matches: 'Playoffs & Semifinals' },
      { date: 'Day 6', matches: 'Grand Finals' }
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="font-chakra max-w-4xl max-h-[90vh] overflow-y-auto bg-[#121417] border-border border-accent p-0 text-white
        scrollbar scrollbar-thumb-gray-700 scrollbar-track-transparent scrollbar-thumb-rounded-full
        hover:scrollbar-thumb-gray-500 transition-colors duration-200"
      >
        <div className="relative">
          {/* Hero Section with Video/Image */}
          <div className="relative h-96 w-full overflow-hidden rounded-t-lg">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
              style={{ backgroundImage: `url(${tournament.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 bg-background/20 hover:bg-background/40 backdrop-blur-sm border border-border/50"
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
              <div className="space-y-4">
                {/* Title and Status */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(tournament.status)}>
                      {tournament.status.toUpperCase()}
                    </Badge>
                    <span className="text-accent text-sm font-semibold">
                      {tournament.category}
                    </span>
                    
                  </div>
                  <h1 className="text-4xl font-bold text-foreground">
                    {tournament.title}
                  </h1>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  <Button
                    size="lg"
                    className="bg-accent hover:opacity-90 hover:bg-accent px-8"
                  >
                    <ActionIcon className="mr-2 h-5 w-5" />
                    {actionButton.text}
                  </Button>

                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setIsInWatchlist(!isInWatchlist)}
                    className={`${isInWatchlist ? 'bg-accent text-primary-foreground' : ''}`}
                  >
                    <Plus className="h-5 w-5 " />
                  </Button>

                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => {
                      setIsLiked(!isLiked);
                      if (isDisliked) setIsDisliked(false);
                    }}
                    className={`${isLiked ? 'bg-green-600 text-white' : ''}`}
                  >
                    <ThumbsUp className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => {
                      setIsDisliked(!isDisliked);
                      if (isLiked) setIsLiked(false);
                    }}
                    className={`${isDisliked ? 'bg-red-600 text-white' : ''}`}
                  >
                    <ThumbsDown className="h-5 w-5" />
                  </Button>

                  <Button variant="secondary" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-8">
            {/* Tournament Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Trophy className="h-4 w-4" />
                  <span className="text-sm">Prize Pool</span>
                </div>
                <p className="text-lg font-semibold text-white">{tournament.prizePool}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Participants</span>
                </div>
                <p className="text-lg font-semibold">{tournament.participants} Teams</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Duration</span>
                </div>
                <p className="text-lg font-semibold">{tournament.duration || '5 Days'}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Format</span>
                </div>
                <p className="text-lg font-semibold">{additionalInfo.format}</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">About This Tournament</h3>
              <p className="text-muted-foreground leading-relaxed">
                {additionalInfo.description}
              </p>
            </div>

            {/* Tournament Details */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Schedule */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Tournament Schedule</h3>
                <div className="space-y-2">
                  {additionalInfo.schedule.map((day, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-accent/80 rounded-md">
                      <span className="font-medium">{day.date}</span>
                      <span className="text-sm text-muted-foreground">{day.matches}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Tournament Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Organizer</span>
                    <span className="font-medium">{additionalInfo.organizer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Team Size</span>
                    <span className="font-medium">{additionalInfo.teamSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expected Viewers</span>
                    <span className="font-medium">{additionalInfo.viewerCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Start Date</span>
                    <span className="font-medium">{tournament.startDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {additionalInfo.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1 bg-accent">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TournamentModal;