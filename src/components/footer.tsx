import React from 'react';
import { Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#121417] text-white py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">SKOR.AI</h3>
          <p className="text-gray-400">The ultimate platform for competitive gaming.</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/selection/hunter" className="text-gray-400 hover:text-white">Tournaments</a></li>
            <li><a href="/selection/airdrops" className="text-gray-400 hover:text-white">AirDrops</a></li>
            <li><a href="/selection/coupons" className="text-gray-400 hover:text-white">coupons</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/theskorai/?hl=en" className="text-gray-400 hover:text-white"><Instagram /></a>
            <a href="https://x.com/theskorai" className="text-gray-400 hover:text-white"><Twitter /></a>
            <a href="https://www.linkedin.com/company/skorai/posts/?feedView=all" className="text-gray-400 hover:text-white"><Linkedin /></a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} SKOR.AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;