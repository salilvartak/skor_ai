import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Header} from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CouponCard } from '@/components/CouponCard';
import {
  Gamepad,
  Gift,
  Monitor,
  CreditCard,
  ExternalLink,
} from 'lucide-react';
import { allCoupons, Coupon } from '@/data/coupons';

// Use the provided categories as filters
const couponCategories = [
  { name: 'All', count: allCoupons.length, icon: <Gamepad className="h-5 w-5" /> },
  { name: 'Mobile Game Cards', count: allCoupons.filter(c => c.category === 'Mobile Game Cards').length, icon: <Gamepad className="h-5 w-5" /> },
  { name: 'Game Cards', count: allCoupons.filter(c => c.category === 'Game Cards').length, icon: <Monitor className="h-5 w-5" /> },
  { name: 'Payment Cards', count: allCoupons.filter(c => c.category === 'Payment Cards').length, icon: <CreditCard className="h-5 w-5" /> },
  { name: 'Gift Cards', count: allCoupons.filter(c => c.category === 'Gift Cards').length, icon: <Gift className="h-5 w-5" /> },
];

const CouponsAndGiftCards = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter coupons based on the active category
  const filteredCoupons = activeCategory === 'All'
    ? allCoupons
    : allCoupons.filter(coupon => coupon.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141110] via-[#2a1f1a] to-back font-chakra text-white">
      <Header 
      liveTournaments={[]}
          upcomingTournaments={[]}
          trendingTournaments={[]}/>
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
              {couponCategories.map((category, index) => (
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/5 border-white/10 h-64" />
            <Card className="bg-white/5 border-white/10 h-64" />
            <Card className="bg-white/5 border-white/10 h-64" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {activeCategory === 'All' ? 'All Coupons' : activeCategory}
              </h2>
              <Link to="/coupons" className="text-accent text-sm font-semibold hover:underline flex items-center gap-1">
                See All <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
            {filteredCoupons.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {filteredCoupons.map((coupon) => (
                  <CouponCard key={coupon.id} id={coupon.id} title={coupon.name} image={coupon.image} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-12">No coupons found for this category.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CouponsAndGiftCards;