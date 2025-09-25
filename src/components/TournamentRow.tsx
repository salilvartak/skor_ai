import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import TournamentCard from './TournamentCard';

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
}

interface TournamentRowProps {
  title: string;
  tournaments: Tournament[];
  showSeeAll?: boolean;
  // This prop is now required, as shown in the error message
  onCardClick: (tournament: Tournament) => void;
}

const TournamentRow = ({ title, tournaments, showSeeAll = true, onCardClick }: TournamentRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const scrollAmount = 320; 
    const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    
    scrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  if (tournaments.length === 0) {
    return (
      <section className="py-4">
        <div className="px-4 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">{title}</h2>
          </div>
          <div className="text-center py-10 text-gray-500 italic">
            No {title.toLowerCase()} at the moment. Check back soon!
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4">
      <div className="px-4 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          {showSeeAll && (
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-black group"
            >
              See All
              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          )}
        </div>

        <div className="relative group">
          {canScrollLeft && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-background/80 hover:bg-background/90 backdrop-blur-sm border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}

          {canScrollRight && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-background/80 hover:bg-background/90 backdrop-blur-sm border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex space-x-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2 pt-4 -mt-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tournaments.map((tournament) => (
              <div key={tournament.id} className="flex-shrink-0">
                {/* Pass the onClick handler to each card */}
                <TournamentCard 
                    tournament={tournament} 
                    onClick={() => onCardClick(tournament)} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TournamentRow;