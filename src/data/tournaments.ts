export interface Tournament {
  id: number;
  title: string;
  game: 'Valorant' | 'CS2' | 'Dota 2' | 'BGMI';
  prize: string;
  participants: number;
  startDate: string;
  status: 'live' | 'upcoming' | 'ended';
  link: string;
  image: string;
  region: 'Global' | 'EMEA' | 'Americas' | 'APAC' | 'China';
  skillBracket: 'Pro' | 'Semi-Pro' | 'Beginner';
  format: 'LAN' | 'Online';
  eventType: 'Pro' | 'Community' | 'Qualifier' | 'Livestream'; // New variable
}

export const allTournaments: Tournament[] = [
  {
    id: 1,
    title: "VCT 2025: Pacific Stage 2",
    game: "Valorant",
    prize: "$250,000",
    participants: 10,
    startDate: "2025-08-15",
    status: "live",
    link: "/live-match",
    image: "https://static.gosugamers.net/a8/3f/51/f5cc81ee017c05d77dd3004fca8800aa8e6f335b53d9e1f2263d0e2f41.webp?w=1600",
    region: 'APAC',
    skillBracket: 'Pro',
    format: 'LAN',
    eventType: 'Livestream'
  },
  {
    id: 2,
    title: "Esports World Cup 2025",
    game: "Dota 2",
    prize: "$10,000,000",
    participants: 16,
    startDate: "2025-09-01",
    status: "upcoming",
    link: "/submission",
    image: "https://esportsinsider.com/wp-content/uploads/2025/04/Screenshot-2025-04-15-165049.png",
    region: 'Global',
    skillBracket: 'Pro',
    format: 'LAN',
    eventType: 'Pro'
  },
  {
    id: 3,
    title: "Skyesports Championship",
    game: "CS2",
    prize: "$150,000",
    participants: 12,
    startDate: "2025-09-10",
    status: "upcoming",
    link: "/submission",
    image: "https://esportsinsider.com/wp-content/uploads/2024/10/skyesports-championship-large.jpg",
    region: 'APAC',
    skillBracket: 'Pro',
    format: 'Online',
    eventType: 'Pro'
  },
  {
    id: 4,
    title: "BGMI India Series (BGIS)",
    game: "BGMI",
    prize: "₹2,00,00,000",
    participants: 32,
    startDate: "2025-08-20",
    status: "live",
    link: "/live-match",
    image: "https://afkgaming.com/mobileesports/news/bgis-2024-format-dates-registration-prize-pool-distribution-and-more",
    region: 'APAC',
    skillBracket: 'Pro',
    format: 'LAN',
    eventType: 'Livestream'
  },
  {
    id: 5,
    title: "VCT 2025: EMEA Stage 2",
    game: "Valorant",
    prize: "$250,000",
    participants: 10,
    startDate: "2025-08-18",
    status: "live",
    link: "/live-match",
    image: "https://i.ytimg.com/vi/VgHMtZBWLlk/hqdefault.jpg?v=6802c018",
    region: 'EMEA',
    skillBracket: 'Pro',
    format: 'LAN',
    eventType: 'Livestream'
  },
  {
    id: 6,
    title: "College Gaming League",
    game: "Valorant",
    prize: "$5,000",
    participants: 64,
    startDate: "2025-10-01",
    status: "upcoming",
    link: "/submission",
    image: "https://esportsinsider.com/wp-content/uploads/2025/07/PlayVS-College-League--large.png",
    region: 'Americas',
    skillBracket: 'Beginner',
    format: 'Online',
    eventType: 'Community'
  },
  {
    id: 7,
    title: "IEM Chengdu 2025",
    game: "CS2",
    prize: "$250,000",
    participants: 16,
    startDate: "2025-09-05",
    status: "upcoming",
    link: "/submission",
    image: "https://admin.esports.gg/wp-content/uploads/2024/01/IEM-Chengdu.jpg",
    region: 'China',
    skillBracket: 'Pro',
    format: 'LAN',
    eventType: 'Pro'
  },
  {
    id: 8,
    title: "The International 2025",
    game: "Dota 2",
    prize: "$15,000,000",
    participants: 20,
    startDate: "2025-10-10",
    status: "upcoming",
    link: "/submission",
    image: "https://clan.fastly.steamstatic.com/images/3703047/6c52d654ed6cf25f7e3f548e729c93c86e414aa7.png",
    region: 'Global',
    skillBracket: 'Pro',
    format: 'LAN',
    eventType: 'Pro'
  },
  {
    id: 9,
    title: "Valorant Game Changers NA",
    game: "Valorant",
    prize: "$50,000",
    participants: 8,
    startDate: "2025-09-12",
    status: "upcoming",
    link: "/submission",
    image: "https://cdn.sanity.io/images/dsfx7636/news/52cf9139eac80dad75e48f3f0e2f8d580739c2eb-1920x1080.jpg",
    region: 'Americas',
    skillBracket: 'Semi-Pro',
    format: 'Online',
    eventType: 'Qualifier'
  },
  {
    id: 10,
    title: "Local LAN Scrims",
    game: "CS2",
    prize: "$1,000",
    participants: 8,
    startDate: "2025-09-15",
    status: "upcoming",
    link: "/submission",
    image: "https://img-cdn.hltv.org/gallerypicture/B0nnWjSrSuhhKSQUfI6B5C.png?ixlib=java-2.1.0&w=1200&s=83a9703dadb51e47877ce0704a730f0d",
    region: 'EMEA',
    skillBracket: 'Beginner',
    format: 'LAN',
    eventType: 'Community'
  }
];