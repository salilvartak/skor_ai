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
  registration_link?: string;
}

// Data based on the esports calendar around September 2025
export const under: Tournament[] = [
  {
    id: 'under-1',
    title: 'BGMI TDM Tournament',
    image: "https://images.wallpapersden.com/image/download/pubg-mobile-season-15_bGhmZ2iUmZqaraWkpJRpZWVlrWdnamY.jpg",
    category: 'BGMI',
    prizePool: 'INR 35,000',
    participants: 16,
    status: 'upcoming',
    startDate: 'Sep 28, 2025',
    duration: '12 days',
    registration_link: 'https://valorantesports.com/'
  },
  {
    id: 'under-2',
    title: 'Clash Arena S2',
    image: "https://images.wallpapersden.com/image/download/pubg-mobile-season-15_bGhmZ2iUmZqaraWkpJRpZWVlrWdnamY.jpg",
    category: 'BGMI',
    prizePool: 'INR 30,000',
    participants: 16,
    status: 'upcoming',
    startDate: 'Oct 1, 2025',
    duration: '7 days',
    registration_link: 'https://pro.eslgaming.com/cs/'
  },
  {
    id: 'under-3',
    title: 'VLH Conquerors Cup',
    image: "https://images.wallpapersden.com/image/download/pubg-mobile-season-15_bGhmZ2iUmZqaraWkpJRpZWVlrWdnamY.jpg",
    category: 'BGMI',
    prizePool: 'INR 20,000',
    participants: 30,
    status: 'registration',
    startDate: 'Sep 28, 2025',
    duration: '5 weeks',
    registration_link: 'https://www.ea.com/games/apex-legends/compete'
  },
  {
    id: 'tunder-4',
    title: 'Weekly war Season 14 COH Esports',
    image: "https://images.wallpapersden.com/image/download/pubg-mobile-season-15_bGhmZ2iUmZqaraWkpJRpZWVlrWdnamY.jpg",
    category: 'BGMI',
    prizePool: '₹ 10,000',
    participants: 2000,
    status: 'registration',
    startDate: 'Sep 28, 2025',
    duration: '2 months',
    registration_link: 'https://www.battlegroundsmobileindia.com/esports'
  },
  
];

