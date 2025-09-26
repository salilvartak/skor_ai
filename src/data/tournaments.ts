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
export const trendingTournaments: Tournament[] = [
  {
    id: 'trending-1',
    title: 'Valorant Champions 2025',
    image: "/assets/vct.jpg",
    category: 'VALORANT',
    prizePool: '$2,250,000',
    participants: 16,
    status: 'live',
    startDate: 'Sep 15, 2025',
    duration: '12 days',
    registration_link: 'https://valorantesports.com/'
  },
  {
    id: 'trending-2',
    title: 'IEM Rio 2025',
    image: "/assets/CS2.jpg",
    category: 'CS2',
    prizePool: '$20,000',
    participants: 16,
    status: 'upcoming',
    startDate: 'Oct 10, 2025',
    duration: '7 days',
    registration_link: 'https://pro.eslgaming.com/cs/'
  },
  {
    id: 'trending-3',
    title: 'ALGS Year 6: Split 1 Pro League',
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPP7Dkw-uADGy0qyCaSb1jfA0ROrj-8RlKtg&s",
    category: 'Apex Legends',
    prizePool: '$500,000',
    participants: 30,
    status: 'registration',
    startDate: 'Oct 5, 2025',
    duration: '5 weeks',
    registration_link: 'https://www.ea.com/games/apex-legends/compete'
  },
  {
    id: 'trending-4',
    title: 'BATTLEGROUNDS MOBILE INDIA SERIES (BGIS) 2025',
    image: "https://images.wallpapersden.com/image/download/pubg-mobile-season-15_bGhmZ2iUmZqaraWkpJRpZWVlrWdnamY.jpg",
    category: 'BGMI',
    prizePool: '₹2,00,00,000',
    participants: 2000,
    status: 'registration',
    startDate: 'Oct 1, 2025',
    duration: '2 months',
    registration_link: 'https://www.battlegroundsmobileindia.com/esports'
  },
  {
    id: 'trending-5',
    title: 'Perfect World Shanghai Major 2025',
    image: "/assets/CS2.jpg",
    category: 'CS2',
    prizePool: '$1,250,000',
    participants: 24,
    status: 'upcoming',
    startDate: 'Dec 1, 2025',
    duration: '14 days',
    registration_link: 'https://pglesports.com/'
  },
  {
    id: 'trending-6',
    title: 'VCT Game Changers Championship 2025',
    image: "/assets/vct.jpg",
    category: 'VALORANT',
    prizePool: '$500,000',
    participants: 8,
    status: 'upcoming',
    startDate: 'Nov 15, 2025',
    duration: '6 days',
    registration_link: 'https://valorantesports.com/news/game-changers'
  },
  {
    id: 'trending-7',
    title: 'ALGS Year 6: Split 2 Playoffs',
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPP7Dkw-uADGy0qyCaSb1jfA0ROrj-8RlKtg&s",
    category: 'Apex Legends',
    prizePool: '$1,000,000',
    participants: 40,
    status: 'upcoming',
    startDate: 'Jan 15, 2026',
    duration: '4 days',
    registration_link: 'https://www.ea.com/games/apex-legends/compete'
  },
  {
    id: 'trending-8',
    title: 'BATTLEGROUNDS MOBILE INDIA PRO SERIES (BMPS) 2025',
    image: "https://images.wallpapersden.com/image/download/pubg-mobile-season-15_bGhmZ2iUmZqaraWkpJRpZWVlrWdnamY.jpg",
    category: 'BGMI',
    prizePool: '₹1,00,00,000',
    participants: 16,
    status: 'upcoming',
    startDate: 'Nov 20, 2025',
    duration: '3 weeks',
    registration_link: 'https://www.battlegroundsmobileindia.com/esports'
  },
  {
    id: 'trending-9',
    title: 'BLAST Premier World Final 2025',
    image: "/assets/CS2.jpg",
    category: 'CS2',
    prizePool: '$1,000,000',
    participants: 8,
    status: 'upcoming',
    startDate: 'Dec 13, 2025',
    duration: '5 days',
    registration_link: 'https://blast.tv/premier'
  },
  {
    id: 'trending-10',
    title: 'Red Bull Home Ground 2025',
    image: "/assets/vct.jpg",
    category: 'VALORANT',
    prizePool: '$100,000',
    participants: 8,
    status: 'upcoming',
    startDate: 'Oct 25, 2025',
    duration: '3 days',
    registration_link: 'https://www.redbull.com/int-en/event-series/home-ground'
  }
];

