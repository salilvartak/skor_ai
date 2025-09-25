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
  registration_link?: string; // Added registration_link
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
    duration: '5 days',
    registration_link: '#' // Added placeholder link
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
    duration: '7 days',
    registration_link: '#' // Added placeholder link
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
    duration: '3 days',
    registration_link: '#' // Added placeholder link
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
    duration: '4 days',
    registration_link: '#' // Added placeholder link
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
    duration: '6 days',
    registration_link: '#' // Added placeholder link
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
    duration: '8 days',
    registration_link: '#' // Added placeholder link
  }
];

// ... (rest of the file remains the same)