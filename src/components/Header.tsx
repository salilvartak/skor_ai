import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Bell, User, Menu } from 'lucide-react';
import AISearchOverlay from './AISearchOverlay'; // Import the AISearchOverlay

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm ">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <img src="/assets/logo.png" alt="Sportify" className="h-12" />
            </div>
            
            
            
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)} // This now opens the overlay
              className="hover:bg-accent/80"
            >
              <Search className="h-5 w-5 text-white" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="hover:bg-accent/80 relative hover:text-black">
              <Bell className="h-5 w-5 text-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></span>
            </Button>

            {/* User Profile */}
            <Button variant="ghost" size="icon" className="hover:bg-accent/80 ">
              <User className="h-5 w-5 text-white " />
            </Button>

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-accent/80 hover:text-black">
              <Menu className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </header>

      {/* AI Search Overlay Component */}
      <AISearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;