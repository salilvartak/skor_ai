import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface AISearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// Hardcoded results for the suggestions
const hardcodedResults: { [key: string]: string } = {
  "Upcoming BGMI tournaments": "There are several BGMI tournaments coming up next month, including the 'BGMI Champions League' with a prize pool of ₹5,00,000.",
  "Trending Tournaments": "The most popular tournament right now is the 'VCT Pacific Masters' for VALORANT, featuring top teams from the APAC region.",
  "Live tournaments right now": "The 'CS2 Major Championship' is currently live. You can watch the finals on the official Twitch stream."
};

const AISearchOverlay = ({ isOpen, onClose }: AISearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState('');

  // Updated suggestions
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
    setSearchResult('');

    // Simulate a network delay for a better user experience
    setTimeout(() => {
      const result = hardcodedResults[searchQuery];
      if (result) {
        setSearchResult(result);
      } else {
        setSearchResult("Sorry, I can only provide information on the suggested topics. Please select one of the suggestions.");
      }
      setIsLoading(false);
    }, 500);
  };
  
  // Close on 'Escape' key press
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
            <div className="max-w-2xl mx-auto">
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

                {/* Suggestions & Results */}
                <div className="mt-6 text-white">
                    {!searchResult && !isLoading && (
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

                    {isLoading && <p className="text-center">Finding an answer...</p>}
                    
                    {searchResult && (
                        <div className="bg-[#1a1c20]/80 p-4 rounded-lg border border-gray-700">
                            <p className="whitespace-pre-wrap">{searchResult}</p>
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