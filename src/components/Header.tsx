import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Bell, User, Menu } from 'lucide-react';
import AISearchOverlay from './AISearchOverlay';
import { ProfileOverlay } from './ProfileOverlay'; // Import the new component
import { auth } from '@/firebase'; // Import auth
import { signOut } from 'firebase/auth'; // Import signOut

// Defines the structure of a tournament object for props
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

interface HeaderProps {
  liveTournaments?: Tournament[];
  upcomingTournaments?: Tournament[];
  trendingTournaments?: Tournament[];
}

export const Header = ({ liveTournaments = [], upcomingTournaments = [], trendingTournaments = [] }: HeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State for profile overlay

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsProfileOpen(false); // Close the profile overlay on logout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-black/20">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <img src="/assets/logo.png" alt="SkorAI" className="h-12" />
            </div>
            
            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-white hover:bg-accent/80">
                Tournaments
              </Button>
              <Button variant="ghost" className="text-white hover:bg-accent/80">
                Live
              </Button>
              <Button variant="ghost" className="text-white hover:bg-accent/80">
                Upcoming
              </Button>
              <Button variant="ghost" className="text-white hover:bg-accent/80">
                My Events
              </Button>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="hover:bg-accent/80"
            >
              <Search className="h-5 w-5 text-white" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="hover:bg-accent/80 relative">
              <Bell className="h-5 w-5 text-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-black"></span>
            </Button>

            {/* User Profile */}
            <Button variant="ghost" size="icon" className="hover:bg-accent/80" onClick={() => setIsProfileOpen(true)}>
              <User className="h-5 w-5 text-white" />
            </Button>

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-accent/80">
              <Menu className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </header>

      {/* AI Search Overlay Component */}
      <AISearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        liveTournaments={liveTournaments}
        upcomingTournaments={upcomingTournaments}
        trendingTournaments={trendingTournaments}
      />
      
      {/* Profile Overlay Component */}
      <ProfileOverlay 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onLogout={handleLogout}
      />
    </>
  );
};