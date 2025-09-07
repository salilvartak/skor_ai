import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Globe, Trophy, Users, BarChart2, Calendar, Gamepad2, Twitter, Instagram, Twitch, Youtube } from 'lucide-react';

const TeamDetailsPage: React.FC = () => {
  // Dummy data for a single team
  const team = {
    name: 'Team Vitality',
    abbreviation: 'VIT',
    logo: 'https://www.thespike.gg/_next/image?url=https%3A%2F%2Fcdn.thespike.gg%2Fsalah%252F600px-Team_Vitality_2023_darkmode_1730891332550.png&w=640&q=75',
    region: 'EMEA',
    primaryGame: 'Valorant',
    tier: 'T1',
    motto: 'V for Victory',
    worldRanking: 5,
    regionalRanking: 2,
    winRate: '68%',
    followers: '1.2M',
    prizeMoney: '$5.6M',
    yearsActive: 8,
    activeRoster: [
      { name: 'Player 1', inGameName: 'P1', role: 'Duelist', avatar: '', rating: 4.8, yearsWithTeam: 2, contractStatus: 'Active' },
      { name: 'Player 2', inGameName: 'P2', role: 'Controller', avatar: '', rating: 4.6, yearsWithTeam: 3, contractStatus: 'Active' },
      { name: 'Player 3', inGameName: 'P3', role: 'Initiator', avatar: '', rating: 4.7, yearsWithTeam: 1, contractStatus: 'Active' },
      { name: 'Player 4', inGameName: 'P4', role: 'Sentinel', avatar: '', rating: 4.5, yearsWithTeam: 4, contractStatus: 'Active' },
      { name: 'Player 5', inGameName: 'P5', role: 'Flex', avatar: '', rating: 4.9, yearsWithTeam: 1, contractStatus: 'Active' },
    ],
    coachingStaff: [
      { name: 'Coach 1', role: 'Head Coach' },
      { name: 'Coach 2', role: 'Assistant Coach' },
      { name: 'Analyst 1', role: 'Analyst' },
    ],
    inactivePlayers: [
      { name: 'Sub 1', role: 'Substitute' },
    ],
    recentMatches: [
      { opponent: 'Fnatic', result: 'W', score: '2-1', tournament: 'VCT EMEA', date: '2025-08-28' },
      { opponent: 'Team Liquid', result: 'L', score: '0-2', tournament: 'VCT EMEA', date: '2025-08-25' },
    ],
    tournamentResults: [
        { name: 'VCT Champions 2024', placement: '1st', prize: '$1,000,000' },
        { name: 'VCT EMEA Stage 2', placement: '2nd', prize: '$50,000' },
    ],
    upcomingMatches: [
        { opponent: 'G2 Esports', date: '2025-09-05', tournament: 'VCT EMEA Playoffs' },
    ],
    about: {
        founded: 2013,
        background: 'Team Vitality is a French esports organization with teams in various games.',
        playstyle: 'Aggressive and strategic',
    },
    socials: {
        twitter: 'https://twitter.com/teamvitality',
        instagram: 'https://instagram.com/teamvitality',
        twitch: 'https://twitch.tv/team/vitality',
        youtube: 'https://youtube.com/teamvitality',
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#141110] to-[#6E4A2A] text-white font-chakra p-6">
      <div className="max-w-7xl mx-auto">
        {/* Team Identity */}
        <Card className="bg-white/5 border-white/10 rounded-lg mb-6">
          <CardContent className="p-6 flex items-center space-x-6">
            <Avatar className="w-32 h-32 border-4 border-accent">
              <AvatarImage src={team.logo} alt={team.name} />
              <AvatarFallback>{team.abbreviation}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl font-bold">{team.name} ({team.abbreviation})</h1>
              <p className="text-lg text-gray-400">{team.motto}</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Globe className="h-4 w-4" />
                  <span>{team.region}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Gamepad2 className="h-4 w-4" />
                  <span>{team.primaryGame}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Trophy className="h-4 w-4" />
                  <span>{team.tier}</span>
                </div>
              </div>
            </div>
            <Button className="ml-auto bg-accent hover:bg-accent/80 text-white font-semibold py-2 px-4 rounded-full">
              Follow
            </Button>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-6">
            <Card className="bg-white/5 border-white/10 rounded-lg text-center p-4">
                <p className="text-3xl font-bold">{team.worldRanking}</p>
                <p className="text-sm text-gray-400">World Rank</p>
            </Card>
            <Card className="bg-white/5 border-white/10 rounded-lg text-center p-4">
                <p className="text-3xl font-bold">{team.regionalRanking}</p>
                <p className="text-sm text-gray-400">Regional Rank</p>
            </Card>
            <Card className="bg-white/5 border-white/10 rounded-lg text-center p-4">
                <p className="text-3xl font-bold">{team.winRate}</p>
                <p className="text-sm text-gray-400">Win Rate</p>
            </Card>
            <Card className="bg-white/5 border-white/10 rounded-lg text-center p-4">
                <p className="text-3xl font-bold">{team.followers}</p>
                <p className="text-sm text-gray-400">Followers</p>
            </Card>
            <Card className="bg-white/5 border-white/10 rounded-lg text-center p-4">
                <p className="text-3xl font-bold">{team.prizeMoney}</p>
                <p className="text-sm text-gray-400">Prize Money</p>
            </Card>
            <Card className="bg-white/5 border-white/10 rounded-lg text-center p-4">
                <p className="text-3xl font-bold">{team.yearsActive}</p>
                <p className="text-sm text-gray-400">Years Active</p>
            </Card>
        </div>

        <Tabs defaultValue="roster" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="roster">Roster</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          {/* Roster */}
          <TabsContent value="roster">
            <Card className="bg-white/5 border-white/10 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Active Roster</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {team.activeRoster.map(player => (
                  <Card key={player.inGameName} className="p-4 bg-white/10 text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-2">
                      <AvatarImage src={player.avatar} />
                      <AvatarFallback>{player.inGameName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold">{player.inGameName}</p>
                    <p className="text-sm text-gray-400">{player.role}</p>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Matches */}
          <TabsContent value="matches">
            <Card className="bg-white/5 border-white/10 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Recent Matches</h3>
              <ul>
                {team.recentMatches.map((match, index) => (
                  <li key={index} className="flex justify-between items-center p-2 border-b border-white/10">
                    <span>vs {match.opponent}</span>
                    <span className={match.result === 'W' ? 'text-green-400' : 'text-red-400'}>{match.score}</span>
                    <span>{match.tournament}</span>
                    <span>{match.date}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </TabsContent>
          
          {/* Tournaments */}
          <TabsContent value="tournaments">
            <Card className="bg-white/5 border-white/10 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4">Tournament Results</h3>
                <ul>
                    {team.tournamentResults.map((result, index) => (
                        <li key={index} className="flex justify-between items-center p-2 border-b border-white/10">
                            <span>{result.name}</span>
                            <span>{result.placement}</span>
                            <span>{result.prize}</span>
                        </li>
                    ))}
                </ul>
            </Card>
          </TabsContent>

          {/* Stats */}
            <TabsContent value="stats">
                <Card className="bg-white/5 border-white/10 rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-4">Team Statistics</h3>
                    {/* Placeholder for more detailed stats */}
                    <p>Detailed statistics coming soon.</p>
                </Card>
            </TabsContent>

            {/* About */}
            <TabsContent value="about">
                <Card className="bg-white/5 border-white/10 rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-4">About {team.name}</h3>
                    <p>Founded: {team.about.founded}</p>
                    <p>Background: {team.about.background}</p>
                    <p>Playstyle: {team.about.playstyle}</p>
                    <div className="flex space-x-4 mt-4">
                        <a href={team.socials.twitter} target="_blank" rel="noopener noreferrer"><Twitter /></a>
                        <a href={team.socials.instagram} target="_blank" rel="noopener noreferrer"><Instagram /></a>
                        <a href={team.socials.twitch} target="_blank" rel="noopener noreferrer"><Twitch /></a>
                        <a href={team.socials.youtube} target="_blank" rel="noopener noreferrer"><Youtube /></a>
                    </div>
                </Card>
            </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default TeamDetailsPage;