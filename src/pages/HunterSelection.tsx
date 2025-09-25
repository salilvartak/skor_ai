import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Gift, Coins } from 'lucide-react';
import {Header} from '@/components/Header';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
  transition: {
    type: 'spring',
    stiffness: 100,
    damping: 10,
  },
};

const HunterSelection: React.FC = () => {
  return (
    <div>
      

    <div className="min-h-screen bg-[#121417] font-chakra text-white flex flex-col items-center justify-center relative overflow-hidden p-4">
      
      
      {/* Background - Faint Grid and Swirling Nebula Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Subtle grid pattern for texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>
        
        {/* Swirling orbs for a nebula effect */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse"
            style={{
              background: i % 2 === 0 ? 'radial-gradient(circle, rgba(238,89,70,0.5) 0%, rgba(238,89,70,0) 70%)' : 'radial-gradient(circle, rgba(65,105,225,0.5) 0%, rgba(65,105,225,0) 70%)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
              transform: `translate(${Math.random() * 20 - 10}%, ${Math.random() * 20 - 10}%)`,
            }}
          ></div>
        ))}
      </div>
      
      <main className="relative z-10 text-center space-y-8 max-w-7xl mx-auto">
        {/* Title with gradient effect */}
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-accent"
        >
          AGENT <span className="text-accent-glow">HUNTER</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg text-gray-300 max-w-2xl mx-auto"
        >
          Welcome to the Agent Hunter's selection page. Choose your challenge.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Orb 1: Tournaments */}
          <motion.div variants={itemVariants} className="relative group">
            <Link to="/selection/hunter" className="block">
              <div className="relative w-56 h-56 mx-auto orb bg-white/10 backdrop-blur-sm border border-accent/50 rounded-full flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:border-accent hover:shadow-2xl hover:shadow-accent/40">
                <Trophy className="w-24 h-24 text-accent transition-transform duration-300 group-hover:scale-110" />
              </div>
            </Link>
            <span className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 text-xl font-bold opacity-0 group-hover:opacity-100 group-hover:bottom-[-2rem] transition-all duration-300">Tournaments</span>
          </motion.div>

          {/* Orb 2: Coupons */}
          <motion.div variants={itemVariants} className="relative group">
            <Link to="/selection/coupons" className="block">
              <div className="relative w-56 h-56 mx-auto orb bg-white/10 backdrop-blur-sm border border-blue-400/50 rounded-full flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-400/40">
                <Gift className="w-24 h-24 text-blue-400 transition-transform duration-300 group-hover:scale-110" />
              </div>
            </Link>
            <span className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 text-xl font-bold opacity-0 group-hover:opacity-100 group-hover:bottom-[-2rem] transition-all duration-300">Coupons</span>
          </motion.div>

          {/* Orb 3: Airdrops */}
          <motion.div variants={itemVariants} className="relative group">
            <Link to="/selection/airdrops" className="block">
              <div className="relative w-56 h-56 mx-auto orb bg-white/10 backdrop-blur-sm border border-purple-400/50 rounded-full flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-400/40">
                <Coins className="w-24 h-24 text-purple-400 transition-transform duration-300 group-hover:scale-110" />
              </div>
            </Link>
            <span className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 text-xl font-bold opacity-0 group-hover:opacity-100 group-hover:bottom-[-2rem] transition-all duration-300">Airdrops</span>
          </motion.div>
        </motion.div>
      </main>
      
      <style>{`
        .text-accent-glow {
          text-shadow: 0 0 10px rgba(238, 89, 70, 0.7), 0 0 20px rgba(238, 89, 70, 0.5);
        }
      `}</style>
    </div>
    </div>
  );
};

export default HunterSelection;