import React, { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Bell,
  Palette,
  Shield,
  Cog,
  Camera,
  LogOut,
  ChevronRight,
  Plus,
} from 'lucide-react';

interface ProfileOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const SettingsRow = ({ label, children }: { label: string, children: React.ReactNode }) => (
  <div className="flex items-center justify-between p-4 rounded-lg transition-colors hover:bg-white/5">
    <Label className="text-gray-300">{label}</Label>
    {children}
  </div>
);

export const ProfileOverlay: React.FC<ProfileOverlayProps> = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState('general');
  const { user } = useUser();
  const [customInstruction, setCustomInstruction] = useState('');

 const presetInstructions = [
    "Coach",
    "Witty",
    "Professional",
    "Encouraging",
    "Novice-friendly",
  ];

  const handlePresetClick = (preset: string) => {
    setCustomInstruction(prev => prev ? `${prev}, ${preset}` : preset);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] bg-black/50 backdrop-blur-xl border border-white/10 text-white p-0 flex font-chakra shadow-2xl overflow-hidden">
        {/* Sidebar */}
        <aside className="w-1/4 bg-black/20 p-6 flex flex-col justify-between">
          <div className="pt-8">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              orientation="vertical"
              className="w-full"
            >
              <TabsList className="flex flex-col items-start bg-transparent p-0 space-y-1 mt-10">
                {[
                  { value: 'general', label: 'General', icon: Cog },
                  { value: 'notifications', label: 'Notifications', icon: Bell },
                  { value: 'personalization', label: 'Personalization', icon: Palette },
                  { value: 'security', label: 'Security', icon: Shield },
                  { value: 'account', label: 'Account', icon: User },
                ].map(({ value, label, icon: Icon }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="w-full text-sm font-medium justify-start data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md px-3 py-2"
                  >
                    <Icon className="mr-2 h-4 w-4" /> {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full justify-start text-red-400 hover:bg-red-500/20 hover:text-red-400 rounded-md px-3 py-2"
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </aside>

        {/* Vertical Separator */}
        <Separator orientation="vertical" className="bg-white/10" />

        {/* Main Content with styled scrollbar */}
        <main className="w-3/4 p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-accent scrollbar-track-transparent">
          <Tabs value={activeTab}>
            <TabsContent value="general" className="mt-0">
              <h2 className="text-2xl font-semibold mb-6">General</h2>
              <div className="space-y-2">
                <SettingsRow label="Theme">
                  <Select defaultValue="dark">
                    <SelectTrigger className="w-48 bg-white/5 border-white/20">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent><SelectItem value="dark">Dark</SelectItem></SelectContent>
                  </Select>
                </SettingsRow>
                 <SettingsRow label="Language">
                   <Select defaultValue="en">
                    <SelectTrigger className="w-48 bg-white/5 border-white/20">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent><SelectItem value="en">English</SelectItem></SelectContent>
                  </Select>
                </SettingsRow>
                <SettingsRow label="Region">
                   <Select defaultValue="us">
                    <SelectTrigger className="w-48 bg-white/5 border-white/20">
                      <SelectValue placeholder="Region" />
                    </SelectTrigger>
                    <SelectContent><SelectItem value="us">USA</SelectItem></SelectContent>
                  </Select>
                </SettingsRow>
                <div className="p-4 rounded-lg">
                  <Label className="text-gray-300">Game Interest</Label>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {['Valorant', 'CS2', 'League of Legends', 'Apex Legends'].map((game) => (
                      <Button key={game} variant="outline" className="bg-white/5 border-white/20 hover:bg-white/10">{game}</Button>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications">
              <h2 className="text-2xl font-semibold mb-6">Notifications</h2>
              <div className="space-y-2">
                <SettingsRow label="Response Notifications">
                  <Switch id="response-notifications" />
                </SettingsRow>
                <SettingsRow label="Tournament Updates">
                  <Switch id="tournament-updates" />
                </SettingsRow>
              </div>
            </TabsContent>

            <TabsContent value="personalization">
               <h2 className="text-2xl font-semibold mb-6">Personalization</h2>
               <div className="space-y-6">
                <div className="p-4">
                  <Label htmlFor="custom-instructions">Custom instruction (for AI)</Label>
                  <div className="flex flex-wrap gap-2 my-3">
                    {presetInstructions.map((preset) => (
                      <Button
                        key={preset}
                        variant="outline"
                        className="bg-white/10 border-white/20 hover:bg-white/20"
                        onClick={() => handlePresetClick(preset)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        {preset}
                      </Button>
                    ))}
                  </div>
                  <Textarea 
                    id="custom-instructions" 
                    placeholder="e.g., I am a casual gamer..." 
                    className="mt-2 bg-white/5 border-white/20 min-h-[100px]"
                    value={customInstruction}
                    onChange={(e) => setCustomInstruction(e.target.value)}
                  />
                </div>
                <Separator className="bg-white/10" />
                <div className="p-4 space-y-4">
                  <h3 className="text-lg font-medium">About You</h3>
                  <Input placeholder="Name" className="bg-white/5 border-white/20" />
                  <Input placeholder="Gamer ID" className="bg-white/5 border-white/20" />
                  <Input placeholder="Team" className="bg-white/5 border-white/20" />
                  <Textarea placeholder="More about you..." className="bg-white/5 border-white/20" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security">
              <h2 className="text-2xl font-semibold mb-6">Security</h2>
              <div className="space-y-2">
                <SettingsRow label="Multi-factor authentication">
                  <Switch id="mfa" />
                </SettingsRow>
                <Separator className="my-4 bg-white/10" />
                <Button variant="outline" className="w-full justify-between p-4 h-auto text-base bg-white/5 border-white/20 hover:bg-white/10">
                  Log out of this device <ChevronRight />
                </Button>
                <Button variant="outline" className="w-full justify-between p-4 h-auto text-base bg-white/5 border-white/20 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50">
                  Log out of all devices <ChevronRight />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="account">
              <h2 className="text-2xl font-semibold mb-6">Account</h2>
              <div className="p-4">
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <Avatar className="w-24 h-24 border-2 border-accent">
                      <AvatarImage src={user?.photoURL ?? undefined} />
                      <AvatarFallback className="text-3xl bg-black/50">{user?.displayName?.[0]}</AvatarFallback>
                    </Avatar>
                    <Button size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-white/10 hover:bg-white/20">
                      <Camera className="h-4 w-4"/>
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input id="displayName" type="text" defaultValue={user?.displayName ?? ''} className="bg-white/5 border-white/20 mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" readOnly defaultValue={user?.email ?? ''} className="bg-black/50 border-gray-600 mt-1 cursor-not-allowed" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </DialogContent>
    </Dialog>
  );
};