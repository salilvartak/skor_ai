import { useState, useEffect, useRef } from 'react'; // 1. Import useRef
import { Button } from '@/components/ui/button';
import { Play, Volume2, VolumeX, Info } from 'lucide-react';
import heroImage from '@/assets/hero-tournament.jpg';

interface Tournament {
  id: string;
  title: string;
  description: string;
  image: string;
  // 2. Add video property to the interface
  video: string; 
  category: string;
  prizePool: string;
  status: 'live' | 'upcoming' | 'registration';
}

// 3. Add a unique video URL for each tournament object
const featuredTournaments: Tournament[] = [
  {
    id: '1',
    title: 'VCT Pacific Championship',
    description: 'The ultimate VALORANT tournament featuring the best teams from Asia-Pacific region competing for the championship title and a massive prize pool.',
    image: heroImage,
    video: '/assets/vid/vct.mp4',
    category: 'VALORANT',
    prizePool: '$250,000',
    status: 'live'
  },
  {
    id: '2',
    title: 'Counter-Strike Global Elite',
    description: 'Professional CS2 tournament with world-class teams battling it out in intense matches. Join the action or compete for glory.',
    image: heroImage,
    video: '/assets/vid/cs.mp4',
    category: 'CS2',
    prizePool: '$500,000',
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Apex Legends Championship',
    description: 'Battle royale championship featuring top-tier teams from around the globe. Experience the thrill of competitive Apex Legends.',
    image: heroImage,
    video: '/assets/vid/apex.mp4',
    category: 'Apex Legends',
    prizePool: '$300,000',
    status: 'registration'
  }
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null); // 4. Create a ref for the video element
  const currentTournament = featuredTournaments[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredTournaments.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // 5. Add a new useEffect to control the video playback
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Load the new video source
      videoRef.current.play().catch(error => {
        // Autoplay may be blocked by the browser, console.log helps to debug
        console.error("Video autoplay failed:", error);
      });
    }
  }, [currentIndex]); // This effect runs every time the currentIndex changes

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'text-red-500';
      case 'upcoming':
        return 'text-yellow-500';
      case 'registration':
        return 'text-green-500';
      default:
        return 'text-muted-foreground';
    }
  };

  const getActionButton = (status: string) => {
    switch (status) {
      case 'live':
        return 'Watch Live';
      case 'upcoming':
        return 'Set Reminder';
      case 'registration':
        return 'Join Tournament';
      default:
        return 'View Details';
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        // 6. Attach the ref to the video element
        ref={videoRef}
        key={currentTournament.video} // 7. Add a key to force re-render on source change
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted={isMuted}
        loop
        playsInline
      >
        {/* 8. Use the dynamic video source from the current tournament */}
        <source src={currentTournament.video} type="video/mp4" />
        {/* Fallback to image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${currentTournament.image})` }}
        />
      </video>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#12141799] to-[#121417]" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-end h-full px-4 lg:px-8 pb-20">
        <div className="max-w-2xl space-y-4 animate-fade-in">
          {/* Category and Status */}
          <div className="flex items-center space-x-4">
            <span className="text-accent font-semibold text-sm tracking-wide uppercase">
              {currentTournament.category}
            </span>
            <span className={`text-sm font-medium ${getStatusColor(currentTournament.status)}`}>
              ● {currentTournament.status.toUpperCase()}
            </span>
            <span className="text-white/45 text-sm">
              Prize Pool: {currentTournament.prizePool}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
            {currentTournament.title}
          </h1>

          {/* Description */}
          <p className="text-base text-white/80 leading-relaxed">
            {currentTournament.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 pt-2">
            <Button 
              size="lg" 
              className="bg-accent hover:opacity-90 transform hover:scale-105 transition-all duration-200 px-6 py-2 text-base font-semibold shadow-glow"
            >
              <Play className="mr-2 h-5 w-5" />
              {getActionButton(currentTournament.status)}
            </Button>
            
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-[#22252a] hover:bg-[#22252a] border border-border backdrop-blur-sm px-6 py-2 text-white"
            >
              <Info className="mr-2 h-5 w-5" />
              More Info
            </Button>
          </div>
        </div>

        {/* Tournament Indicators */}
        <div className="absolute bottom-6 left-4 lg:left-8 flex space-x-2">
          {featuredTournaments.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-accent shadow-glow' 
                  : 'bg-muted-accent/50 hover:bg-muted-foreground'
              }`}
            />
          ))}
        </div>

        {/* Volume Control */}
        <div className="absolute bottom-6 right-4 lg:right-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
            className="bg-#DA0B08/20 hover:bg-#DA0B08/40 backdrop-blur-sm border border-border/50"
          >
            {isMuted ? <VolumeX className="h-8 w-8 text-white" /> : <Volume2 className="h-8 w-8 text-white" />}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;