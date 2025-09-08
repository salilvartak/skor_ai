import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { allTournaments, Tournament } from '../data/tournaments';
import { Calendar, Users, Globe, Layers, BarChart, Trophy, MessageSquare } from 'lucide-react';

const TournamentDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const tournament = allTournaments.find(t => t.id === parseInt(id || ''));

  if (!tournament) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#141110] to-[#6E4A2A] text-white flex items-center justify-center">
        <Header />
        <main className="text-center">
          <p className="text-2xl">Tournament not found.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#141110] to-[#6E4A2A] text-white font-chakra">
      <Header />
      <main className="relative z-10 pt-24 px-6 max-w-5xl mx-auto">
        <div className="relative mb-8">
            <img 
              src={tournament.image} 
              alt={tournament.title} 
              className="w-full h-64 object-contain bg-black/20 rounded-lg"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/1000x400/141110/EE5946?text=Banner';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg"></div>
            <div className="absolute bottom-6 left-6">
                <h1 className="text-4xl font-bold text-white">{tournament.title}</h1>
                <Badge className="mt-2 bg-accent/80 text-white border-none">{tournament.game}</Badge>
            </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
                <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle>Event Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
                         <div className="flex items-center gap-3"><Trophy className="text-accent"/> <strong>Prize Pool:</strong> {tournament.prize}</div>
                         <div className="flex items-center gap-3"><Calendar className="text-accent"/> <strong>Date:</strong> {new Date(tournament.startDate).toLocaleDateString()}</div>
                         <div className="flex items-center gap-3"><Globe className="text-accent"/> <strong>Region:</strong> {tournament.region}</div>
                         <div className="flex items-center gap-3"><Users className="text-accent"/> <strong>Participants:</strong> {tournament.participants}</div>
                         <div className="flex items-center gap-3"><Layers className="text-accent"/> <strong>Format:</strong> {tournament.format}</div>
                         <div className="flex items-center gap-3"><BarChart className="text-accent"/> <strong>Skill Level:</strong> {tournament.skillBracket}</div>
                    </CardContent>
                </Card>
                 <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle>Description</CardTitle>
                    </CardHeader>
                    <CardContent className="text-white/80">
                       <p>More details about the tournament will be available here soon. Stay tuned for information on rules, schedule, and more.</p>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-1 space-y-6">
                <Card className="bg-white/5 border-white/10 text-center p-6">
                   <h3 className="text-xl font-bold mb-4">Registration</h3>
                   <p className="text-white/70 mb-4 text-sm">Registration for this event is now {tournament.status === 'upcoming' ? 'open' : 'closed'}.</p>
                   <Button className="w-full bg-gradient-to-r from-accent to-red-600" disabled={tournament.status !== 'upcoming'}>
                       Register Your Team
                   </Button>
                </Card>
                 <Card className="bg-white/5 border-white/10 text-center p-6">
                   <h3 className="text-xl font-bold mb-4">Community</h3>
                   <Button variant="outline" className="w-full">
                       <MessageSquare className="mr-2"/>
                       Join Discussion
                   </Button>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
};

export default TournamentDetailsPage;

