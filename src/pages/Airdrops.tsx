import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { allAirdrops, Airdrop } from '@/data/airdrop';
import { ExternalLink, Coins, HandCoins, Info, SquareStack, X, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const airdropCategories = [
  { name: 'All', count: allAirdrops.length, icon: <SquareStack className="h-5 w-5" /> },
  { name: 'Ethereum', count: allAirdrops.filter(a => a.chain === 'Ethereum').length, icon: <Coins className="h-5 w-5" /> },
  { name: 'Solana', count: allAirdrops.filter(a => a.chain === 'Solana').length, icon: <HandCoins className="h-5 w-5" /> },
  { name: 'Arbitrum', count: allAirdrops.filter(a => a.chain === 'Arbitrum').length, icon: <Rocket className="h-5 w-5" /> },
];

const AirdropCard = ({ airdrop }: { airdrop: Airdrop }) => (
  <Link to={`/airdrops/${airdrop.id}`} className="block">
    <Card className="bg-white/5 border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-1 hover:border-accent cursor-pointer">
      <CardContent className="p-4 flex items-center gap-4">
        <img src={airdrop.image} alt={airdrop.project} className="w-16 h-16 object-contain rounded-full" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white">{airdrop.project}</h3>
            <span className={cn("px-2 py-1 text-xs font-semibold rounded-full", {
              'bg-green-500/20 text-green-400': airdrop.status === 'Live',
              'bg-yellow-500/20 text-yellow-400': airdrop.status === 'Upcoming',
              'bg-gray-500/20 text-gray-400': airdrop.status === 'Ended',
            })}>
              {airdrop.status}
            </span>
          </div>
          <p className="text-sm text-gray-400">Chain: {airdrop.chain}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-white">{airdrop.totalValueLocked}</p>
          <p className="text-xs text-gray-500">Total Value Locked</p>
        </div>
      </CardContent>
    </Card>
  </Link>
);

const Airdrops = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredAirdrops = activeCategory === 'All'
    ? allAirdrops
    : allAirdrops.filter(airdrop => airdrop.chain === activeCategory || airdrop.project === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141110] via-[#2a1f1a] to-back font-chakra text-white">
      <Header />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 bg-accent rounded-full blur-xl animate-pulse opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>
      <div className="flex pt-24 min-h-screen px-6 max-w-full mx-auto">
        {/* Sidebar with Filters */}
        <aside className="w-64 min-h-[calc(100vh-6rem)] p-4 border-r border-white/10 hidden lg:block">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 space-y-2">
              {airdropCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(category.name)}
                  className={`flex w-full items-center justify-between px-3 py-2 rounded-lg transition-colors focus:outline-none ${
                    activeCategory === category.name ? 'bg-white/10' : 'hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {category.icon}
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <span className="text-xs text-gray-400">{category.count}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {activeCategory === 'All' ? 'All Airdrops' : `${activeCategory} Airdrops`}
              </h2>
              <Link to="/airdrops" className="text-accent text-sm font-semibold hover:underline flex items-center gap-1">
                See All <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
            {filteredAirdrops.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAirdrops.map((airdrop) => (
                  <AirdropCard key={airdrop.id} airdrop={airdrop} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-12">No airdrops found for this category.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Airdrops;