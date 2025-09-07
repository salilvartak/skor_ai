import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Search } from 'lucide-react';

// Expanded dummy data for teams
const teams = [
    { id: 1, name: 'Team Vitality', game: 'Valorant', region: 'EMEA', logo: 'https://www.thespike.gg/_next/image?url=https%3A%2F%2Fcdn.thespike.gg%2Fsalah%252F600px-Team_Vitality_2023_darkmode_1730891332550.png&w=640&q=75' },
    { id: 2, name: 'Fnatic', game: 'Valorant', region: 'EMEA', logo: 'https://yt3.googleusercontent.com/poDTPOpvyiYT0mHN-FTcSy67FVvF8eHZCP3DOiNIH7MYJyxNrDS9jQPbIeuJUupmXl9ypEmRIEw=s900-c-k-c0x00ffffff-no-rj' },
    { id: 3, name: 'Evil Geniuses', game: 'CS2', region: 'Americas', logo: 'https://pbs.twimg.com/media/FyUUbX_WAAEGQ9z.jpg' },
    { id: 4, name: 'G2 Esports', game: 'League of Legends', region: 'EMEA', logo: 'https://ae01.alicdn.com/kf/H36b51e7718e94d3abc022cd5419b2aa83.jpg' },
    { id: 5, name: 'Cloud9', game: 'Valorant', region: 'Americas', logo: 'https://pbs.twimg.com/profile_images/1846236998635606018/IYnjvvVx_200x200.jpg' },
    { id: 6, name: 'Team Liquid', game: 'Dota 2', region: 'Americas', logo: 'https://taiyoro.gg/_next/image?url=https%3A%2F%2Ftaiyoro-prod-media.s3.amazonaws.com%2Fteam_organization%2FgL0JpMyXGw.png&w=3840&q=75' },
    { id: 7, name: 'Natus Vincere', game: 'CS2', region: 'EMEA', logo: 'https://navi.gg/images/navi/navi-logo- खूबانی-v3.svg' },
    { id: 8, name: 'Sentinels', game: 'Valorant', region: 'Americas', logo: 'https://pbs.twimg.com/profile_images/1792964393685815296/A40k-8aC_400x400.jpg' },
    { id: 9, name: 'T1', game: 'League of Legends', region: 'APAC', logo: 'https://pbs.twimg.com/profile_images/1726073177399123968/mgw-8_a3_400x400.jpg' },
    { id: 10, name: 'Paper Rex', game: 'Valorant', region: 'APAC', logo: 'https://pbs.twimg.com/profile_images/1799045179228303360/L2oC-29N_400x400.jpg' },
];

const TeamsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGame, setSelectedGame] = useState('All');
    const [selectedRegion, setSelectedRegion] = useState('All');
    const navigate = useNavigate();

    const games = ['All', ...new Set(teams.map(team => team.game))];
    const regions = ['All', ...new Set(teams.map(team => team.region))];

    const filteredTeams = teams.filter(team => {
        return (
            (team.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (selectedGame === 'All' || team.game === selectedGame) &&
            (selectedRegion === 'All' || team.region === selectedRegion)
        );
    });

    const handleTeamClick = (teamId: number) => {
        navigate(`/teams/${teamId}`);
    };

    const handleFollowClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Add follow logic here
        console.log('Follow button clicked');
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2a2a2a] text-white font-chakra p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold mb-2 tracking-wider">Find Your Team</h1>
            <p className="text-lg text-gray-400">Follow the top esports teams across the globe.</p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input 
                    placeholder="Search for a team..."
                    className="pl-10 bg-white/5 border-white/10 focus:ring-accent focus:border-accent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Select onValueChange={setSelectedGame} defaultValue="All">
                <SelectTrigger className="w-full md:w-[180px] bg-white/5 border-white/10">
                    <SelectValue placeholder="Game" />
                </SelectTrigger>
                <SelectContent>
                    {games.map(game => <SelectItem key={game} value={game}>{game}</SelectItem>)}
                </SelectContent>
            </Select>
            <Select onValueChange={setSelectedRegion} defaultValue="All">
                <SelectTrigger className="w-full md:w-[180px] bg-white/5 border-white/10">
                    <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                    {regions.map(region => <SelectItem key={region} value={region}>{region}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTeams.map((team) => (
            <Card 
                key={team.id} 
                className="bg-white/5 border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-1 hover:border-accent cursor-pointer"
                onClick={() => handleTeamClick(team.id)}
            >
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4 border-2 border-accent">
                  <AvatarImage src={team.logo} alt={team.name} />
                  <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{team.name}</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span>{team.game}</span>
                    <span>•</span>
                    <span>{team.region}</span>
                </div>
                <Button 
                    className="mt-4 bg-accent hover:bg-accent/80 text-white font-semibold py-2 px-4 rounded-full w-full"
                    onClick={handleFollowClick}
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Follow
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;