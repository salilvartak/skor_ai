import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import TournamentCard from './TournamentCard';

// Defines the structure of a tournament object
interface Tournament {
  id: string;
  title: string;
  image: string;
  category: string;
  prizePool: string;
  participants: number;
  status: 'live' | 'upcoming' | 'registration' | 'ended';
  startDate?: string;
  registration_link?: string;
}

interface AISearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  liveTournaments: Tournament[];
  upcomingTournaments: Tournament[];
  trendingTournaments: Tournament[];
}

const AISearchOverlay = ({
    isOpen,
    onClose,
    liveTournaments,
    upcomingTournaments,
    trendingTournaments
}: AISearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Tournament[]>([]);

  const suggestions = [
    "Upcoming BGMI tournaments",
    "Trending Tournaments",
    "Live tournaments right now",
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setSearchResults([]);

    // Simulates a network delay for a better user experience
    setTimeout(() => {
      let results: Tournament[] = [];
      switch (searchQuery) {
        case "Upcoming BGMI tournaments":
          results = upcomingTournaments.filter(t => t.category === "BGMI");
          break;
        case "Trending Tournaments":
          results = trendingTournaments;
          break;
        case "Live tournaments right now":
          results = liveTournaments;
          break;
        default:
          results = [];
      }
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  };

  // Resets the search when the overlay is closed
  useEffect(() => {
    if (!isOpen) {
        setQuery('');
        setSearchResults([]);
    }
  }, [isOpen]);

  // Allows closing the overlay with the 'Escape' key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center bg-gray-900/95 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '-20%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-20%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full h-full pt-16 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-6xl mx-auto">
                <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    value={query}
                    // This line has been corrected
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                    placeholder="Ask about any tournament..."
                    className="w-full bg-[#1a1c20] text-white border border-gray-700 rounded-lg py-4 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-accent"
                    autoFocus
                />
                <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                    <X />
                </button>
                </div>

                {/* Suggestions & Results */}
                <div className="mt-6 text-white">
                    {searchResults.length === 0 && !isLoading && (
                        <>
                            <h3 className="text-sm font-semibold text-gray-400">Suggestions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                                {suggestions.map((item) => (
                                    <button
                                    key={item}
                                    onClick={() => handleSuggestionClick(item)}
                                    className="bg-[#1a1c20]/80 p-3 rounded-lg text-left text-sm hover:bg-accent/20 border border-gray-700 transition-colors"
                                    >
                                    {item}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {isLoading && <p className="text-center">Searching...</p>}

                    {searchResults.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {searchResults.map(tournament => (
                                <TournamentCard key={tournament.id} tournament={tournament} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AISearchOverlay;