import { useState } from 'react';

const Sidebar = () => {
  // State to handle the mobile sidebar visibility
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  // State for the desktop hover functionality
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // SVG icons for demonstration
  const tournamentIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-swords"><path d="M21 3v5h-9L3 3l9-5v5z"/><path d="M3 21v-5h9l9 5v-5z"/></svg>
  );

  const couponIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ticket-percent"><path d="M2 10a2 2 0 0 1-1 1.732v1.536a2 2 0 0 1 1 1.732"/><path d="M12 2v20"/><path d="M22 10a2 2 0 0 0 1 1.732v1.536a2 2 0 0 0-1 1.732"/><path d="M12 2a2 2 0 0 1-1.732 1h-1.536a2 2 0 0 1-1.732-1"/><path d="M12 22a2 2 0 0 0-1.732-1h-1.536a2 2 0 0 0-1.732 1"/><path d="M10 10c.667 1.333 1.333 2.667 2 4c.667-1.333 1.333-2.667 2-4"/></svg>
  );

  const dealIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
  );

  const airdropIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud-upload"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>
  );

  const menuItems = [
    { name: "Tournaments", icon: tournamentIcon, href: "#" },
    { name: "Coupons", icon: couponIcon, href: "#" },
    { name: "Deals", icon: dealIcon, href: "#" },
    { name: "Airdrops", icon: airdropIcon, href: "#" },
  ];

  return (
    <>
      {/* Mobile toggle button (hamburger icon) */}
      <button 
        className="fixed top-5 left-5 z-50 text-white text-3xl md:hidden" 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        &#9776; 
      </button>

      {/* The main sidebar container */}
      <div 
        className={`
          flex flex-col h-screen overflow-hidden 
          bg-[#1e2025] shadow-lg transition-all duration-300 ease-in-out z-40 
          
          fixed top-0 left-0
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isHovered ? 'md:w-64' : 'md:w-20'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <nav className="flex-1 flex flex-col p-4 pt-20 space-y-4">
          {menuItems.map((item, index) => (
            <a 
              key={index} 
              href={item.href} 
              className={`
                flex items-center space-x-4 p-2 rounded
                hover:bg-[#2a2c30] transition-colors
              `}
            >
              <div className="flex-shrink-0 text-lg">
                {item.icon}
              </div>
              <span 
                className={`
                  whitespace-nowrap overflow-hidden transition-all duration-300
                  ${isHovered ? 'md:w-auto md:opacity-100' : 'md:w-0 md:opacity-0'}
                `}
              >
                {item.name}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
