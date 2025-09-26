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
  const hasResults = searchResults.length > 0;

  const suggestions = [
    "Upcoming BGMI tournaments",
    "Trending Tournaments",
    "Live tournaments right now",
    "Tournaments under $50,000",
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
      const lowerCaseQuery = searchQuery.toLowerCase();

      // Scenarios for "tournaments under 50,000"
      if (lowerCaseQuery.includes('under 50k') || lowerCaseQuery.includes('< 50000') || lowerCaseQuery.includes('less than 50000') || lowerCaseQuery.includes('under 50000')) {
        const allTournaments = [...liveTournaments, ...upcomingTournaments];
        results = allTournaments.filter(t => {
            const prizePoolValue = parseInt(t.prizePool.replace(/[^0-9]/g, ''));
            return prizePoolValue < 50000;
        });
      } else {
        // Existing search cases
        switch (lowerCaseQuery) {
          case "upcoming bgmi tournaments":
            results = upcomingTournaments.filter(t => t.category === "BGMI");
            break;
          case "trending tournaments":
            results = trendingTournaments;
            break;
          case "live tournaments right now":
            results = liveTournaments;
            break;
          default:
            results = [];
            break;
        }
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
            // ✨ Change 1: Layout is now conditional. It centers content when there are no results.
            className={`w-full h-full ${hasResults ? 'pt-16' : 'flex items-center justify-center'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ✨ Change 2: Container also adapts based on whether there are results. */}
            <div className={`w-full max-w-6xl mx-auto px-4 ${hasResults ? 'h-full flex flex-col' : ''}`}>
                <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    value={query}
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

                {/* Suggestions & Results Area */}
                <div className={`text-white mt-6 ${hasResults ? 'flex-1 min-h-0 overflow-y-auto pb-16 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent' : ''}`}>
                    {!hasResults && !isLoading && (
                        <>
                            <h3 className="text-sm font-semibold text-gray-400 text-center">Suggestions</h3>
                            {/* ✨ Change 3: Replaced grid with flex-wrap for self-sizing suggestion boxes. */}
                            <div className="flex flex-wrap justify-center gap-3 mt-3">
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

                    {hasResults && (
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