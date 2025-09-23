import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { allAirdrops } from '@/data/airdrop';
import { Globe, BadgeCheck, Coins, ExternalLink, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const AirdropDetails = () => {
    const { id } = useParams<{ id: string }>();
    const airdrop = allAirdrops.find(a => a.id === id);

    if (!airdrop) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141110] via-[#2a1f1a] to-back text-white font-chakra">
                <Header />
                <p className="text-2xl">Airdrop not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#141110] via-[#2a1f1a] to-back text-white font-chakra p-6 pt-24">
            <Header />
            <main className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Project Image and Details */}
                    <Card className="bg-white/5 border-white/10 rounded-lg p-6 space-y-4">
                        <img 
                            src={airdrop.image} 
                            alt={airdrop.project} 
                            className="w-full h-auto object-contain rounded-lg"
                        />
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold text-accent">{airdrop.project}</h1>
                            <div className="flex items-center gap-2 text-gray-300 text-sm">
                                <span className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-1">
                                    <Coins className="w-3 h-3 text-white/70" />
                                    {airdrop.chain}
                                </span>
                                <span className={cn("px-2 py-1 text-xs font-semibold rounded-full", {
                                    'bg-green-500/20 text-green-400': airdrop.status === 'Live',
                                    'bg-yellow-500/20 text-yellow-400': airdrop.status === 'Upcoming',
                                    'bg-gray-500/20 text-gray-400': airdrop.status === 'Ended',
                                })}>
                                    {airdrop.status}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-3 text-gray-300">
                            <h3 className="text-xl font-bold text-white">Total Value Locked</h3>
                            <p className="text-2xl font-bold text-green-400">{airdrop.totalValueLocked}</p>
                            <p className="text-sm">{airdrop.description}</p>
                        </div>
                    </Card>

                    {/* Right Column: Requirements and Actions */}
                    <Card className="bg-white/5 border-white/10 rounded-lg p-6 space-y-4">
                        <h3 className="text-2xl font-bold text-accent">Requirements</h3>
                        <ul className="space-y-2 text-gray-300">
                            {airdrop.requirements.map((req, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <BadgeCheck className="w-4 h-4 text-blue-400" />
                                    <span>{req}</span>
                                </li>
                            ))}
                        </ul>
                        <a href={airdrop.link} target="_blank" rel="noopener noreferrer" className="block">
                            <Button className="w-full bg-accent hover:bg-accent/80 flex items-center gap-2">
                                <LinkIcon className="h-5 w-5" />
                                Join Airdrop
                            </Button>
                        </a>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default AirdropDetails;