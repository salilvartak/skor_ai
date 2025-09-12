import tournament1 from '@/assets/tournament-1.jpg';
import tournament2 from '@/assets/tournament-2.jpg';
import tournament3 from '@/assets/tournament-3.jpg';

export interface Tournament {
  id: string;
  title: string;
  image: string;
  category: string;
  prizePool: string;
  participants: number;
  status: 'live' | 'upcoming' | 'registration' | 'ended';
  startDate?: string;
  duration?: string;
}

export const trendingTournaments: Tournament[] = [
  {
    id: 'trending-1',
    title: 'VCT Pacific Masters',
    image: tournament1,
    category: 'VALORANT',
    prizePool: '$250,000',
    participants: 16,
    status: 'live',
    startDate: 'Jan 15, 2024',
    duration: '5 days'
  },
  {
    id: 'trending-2',
    title: 'CS2 Major Championship',
    image: tournament2,
    category: 'CS2',
    prizePool: '$500,000',
    participants: 24,
    status: 'upcoming',
    startDate: 'Jan 20, 2024',
    duration: '7 days'
  },
  {
    id: 'trending-3',
    title: 'Apex Legends Global Series',
    image: tournament3,
    category: 'Apex Legends',
    prizePool: '$300,000',
    participants: 32,
    status: 'registration',
    startDate: 'Jan 25, 2024',
    duration: '3 days'
  },
  {
    id: 'trending-4',
    title: 'Overwatch Champions Cup',
    image: tournament1,
    category: 'Overwatch 2',
    prizePool: '$150,000',
    participants: 20,
    status: 'upcoming',
    startDate: 'Feb 1, 2024',
    duration: '4 days'
  },
  {
    id: 'trending-5',
    title: 'Rocket League World Championship',
    image: tournament2,
    category: 'Rocket League',
    prizePool: '$400,000',
    participants: 16,
    status: 'registration',
    startDate: 'Feb 5, 2024',
    duration: '6 days'
  },
  {
    id: 'trending-6',
    title: 'League of Legends Masters',
    image: tournament3,
    category: 'League of Legends',
    prizePool: '$750,000',
    participants: 12,
    status: 'upcoming',
    startDate: 'Feb 10, 2024',
    duration: '8 days'
  }
];

export const liveTournaments: Tournament[] = [
  {
    id: 'live-1',
    title: 'VCT Pacific Showdown',
    image: tournament2,
    category: 'VALORANT',
    prizePool: '$100,000',
    participants: 8,
    status: 'live',
    duration: '2 days'
  },
  {
    id: 'live-2',
    title: 'CS2 Elite Series',
    image: tournament3,
    category: 'CS2',
    prizePool: '$200,000',
    participants: 16,
    status: 'live',
    duration: '3 days'
  },
  {
    id: 'live-3',
    title: 'Apex Legends Pro League',
    image: tournament1,
    category: 'Apex Legends',
    prizePool: '$180,000',
    participants: 20,
    status: 'live',
    duration: '4 days'
  },
  {
    id: 'live-4',
    title: 'Fortnite Championship',
    image: tournament2,
    category: 'Fortnite',
    prizePool: '$350,000',
    participants: 100,
    status: 'live',
    duration: '1 day'
  }
];

export const upcomingTournaments: Tournament[] = [
  {
    id: 'upcoming-1',
    title: 'World Championship 2024',
    image: tournament3,
    category: 'VALORANT',
    prizePool: '$1,000,000',
    participants: 24,
    status: 'upcoming',
    startDate: 'Mar 1, 2024',
    duration: '14 days'
  },
  {
    id: 'upcoming-2',
    title: 'CS2 Global Masters',
    image: tournament1,
    category: 'CS2',
    prizePool: '$800,000',
    participants: 32,
    status: 'upcoming',
    startDate: 'Feb 15, 2024',
    duration: '10 days'
  },
  {
    id: 'upcoming-3',
    title: 'International Dota Championship',
    image: tournament2,
    category: 'Dota 2',
    prizePool: '$2,500,000',
    participants: 18,
    status: 'upcoming',
    startDate: 'Mar 15, 2024',
    duration: '12 days'
  },
  {
    id: 'upcoming-4',
    title: 'Call of Duty World League',
    image: tournament3,
    category: 'Call of Duty',
    prizePool: '$600,000',
    participants: 16,
    status: 'upcoming',
    startDate: 'Feb 28, 2024',
    duration: '5 days'
  }
];

export const yourTournaments: Tournament[] = [
  {
    id: 'your-1',
    title: 'Weekly VALORANT Cup',
    image: tournament1,
    category: 'VALORANT',
    prizePool: '$5,000',
    participants: 64,
    status: 'registration',
    startDate: 'This Weekend',
    duration: '2 days'
  },
  {
    id: 'your-2',
    title: 'Amateur CS2 League',
    image: tournament2,
    category: 'CS2',
    prizePool: '$2,500',
    participants: 32,
    status: 'upcoming',
    startDate: 'Next Week',
    duration: '3 days'
  },
  {
    id: 'your-3',
    title: 'Local Esports Tournament',
    image: tournament3,
    category: 'Mixed',
    prizePool: '$1,000',
    participants: 48,
    status: 'ended',
    startDate: 'Last Week',
    duration: '1 day'
  }
];

export const esportsChampionships: Tournament[] = [
  {
    id: 'esports-1',
    title: 'Global Esports Championship',
    image: tournament2,
    category: 'Multi-Game',
    prizePool: '$5,000,000',
    participants: 128,
    status: 'upcoming',
    startDate: 'Jun 1, 2024',
    duration: '30 days'
  },
  {
    id: 'esports-2',
    title: 'International Gaming Olympics',
    image: tournament3,
    category: 'Multi-Game',
    prizePool: '$3,000,000',
    participants: 200,
    status: 'registration',
    startDate: 'Apr 1, 2024',
    duration: '21 days'
  },
  {
    id: 'esports-3',
    title: 'Professional Gaming League',
    image: tournament1,
    category: 'Multi-Game',
    prizePool: '$2,000,000',
    participants: 96,
    status: 'upcoming',
    startDate: 'May 1, 2024',
    duration: '15 days'
  }
];

export const amateurLeagues: Tournament[] = [
  {
    id: 'amateur-1',
    title: 'Beginner VALORANT League',
    image: tournament1,
    category: 'VALORANT',
    prizePool: '$1,000',
    participants: 128,
    status: 'registration',
    startDate: 'Every Month',
    duration: '1 week'
  },
  {
    id: 'amateur-2',
    title: 'Student Gaming Championship',
    image: tournament2,
    category: 'Mixed',
    prizePool: '$2,500',
    participants: 256,
    status: 'upcoming',
    startDate: 'Feb 20, 2024',
    duration: '5 days'
  },
  {
    id: 'amateur-3',
    title: 'Community Cup Series',
    image: tournament3,
    category: 'Mixed',
    prizePool: '$500',
    participants: 64,
    status: 'registration',
    startDate: 'Weekly',
    duration: '2 days'
  }
];

// Combine all tournament arrays into one and export it
export const allTournaments: Tournament[] = [
  ...trendingTournaments,
  ...liveTournaments,
  ...upcomingTournaments,
  ...yourTournaments,
  ...esportsChampionships,
  ...amateurLeagues
];
