// src/components/TournamentModal.tsx
import React from 'react';
import { X, Calendar, MapPin, ExternalLink } from 'lucide-react';

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
  registration_link?: string;
  tournament_start_date?: string;
  tournament_end_date?: string;
  registration_start_date?: string;
  registration_end_date?: string;
}

interface TournamentModalProps {
  tournament: Tournament;
  isOpen: boolean;
  onClose: () => void;
}

const TournamentModal: React.FC<TournamentModalProps> = ({ tournament, isOpen, onClose }) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-[#1a1c20] rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Modal Header */}
        <div className="relative">
          <img src={tournament.image} alt={tournament.title} className="w-full h-48 object-cover rounded-t-lg" />
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 bg-gray-800 bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75 transition"
          >
            <X size={24} />
          </button>
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black to-transparent w-full">
            <h2 className="text-3xl font-bold text-white">{tournament.title}</h2>
            <span className="text-sm bg-accent text-black font-bold px-2 py-1 rounded">{tournament.category}</span>
          </div>
        </div>
        
        {/* Modal Content - Make this area scrollable */}
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="text-accent" size={20} />
              <span>Starts: {formatDate(tournament.tournament_start_date)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="text-accent" size={20} />
              <span>Location: {tournament.location || 'Online'}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg mb-2 text-accent">Prize Pool</h3>
              <p className="text-gray-300 text-2xl font-bold">{tournament.prizePool}</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-accent">Registration</h3>
              <p className="text-gray-300">
                Opens: {formatDate(tournament.registration_start_date)}
              </p>
              <p className="text-gray-300">
                Closes: {formatDate(tournament.registration_end_date)}
              </p>
            </div>
             <div>
              <h3 className="font-bold text-lg mb-2 text-accent">Tournament Schedule</h3>
              <p className="text-gray-300">
                Start Date: {formatDate(tournament.tournament_start_date)}
              </p>
              <p className="text-gray-300">
                End Date: {formatDate(tournament.tournament_end_date)}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-700 mt-auto">
          {tournament.registration_link ? (
            <a 
              href={tournament.registration_link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-accent text-black font-bold py-3 px-4 rounded-lg flex items-center justify-center hover:bg-accent/50 transition-colors"
            >
              Register Now <ExternalLink className="ml-2" size={20} />
            </a>
          ) : (
            <button 
              disabled
              className="w-full bg-gray-600 text-white font-bold py-3 px-4 rounded-lg cursor-not-allowed"
            >
              Registration Not Available
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentModal;