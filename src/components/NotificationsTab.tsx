import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Trophy, Users, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Hardcoded notifications for showcase
const showcaseNotifications = [
  {
    id: '1',
    type: 'tournament',
    title: 'New Tournament: Winter Scrims!',
    message: 'Registrations are now open for the Winter Scrims. Join the battle for a chance to win amazing rewards.',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    type: 'team',
    title: 'Your team "Phoenix Fire" has a new match!',
    message: 'Your next match is scheduled for 8:00 PM IST on Friday.',
    timestamp: '5 hours ago',
  },
  {
    id: '3',
    type: 'tournament',
    title: 'Skor AI Championship is now LIVE!',
    message: 'Watch your favorite teams compete live on the main stage.',
    timestamp: '1 day ago',
  },
  {
    id: '4',
    type: 'team',
    title: 'New member joined your team',
    message: 'A new player has joined your team "Phoenix Fire". Welcome them to the squad!',
    timestamp: '2 days ago',
  },
  {
    id: '5',
    type: 'tournament',
    title: 'Match Results: Valorant Masters',
    message: 'The results for the Valorant Masters tournament are now available.',
    timestamp: '3 days ago',
  },
];

const NotificationsTab = () => {
  const getIcon = (type: 'tournament' | 'team') => {
    switch (type) {
      case 'tournament':
        return <Trophy className="h-5 w-5 text-accent" />;
      case 'team':
        return <Users className="h-5 w-5 text-accent" />;
      default:
        return null;
    }
  };

  return (
    // The class below is already set to match the other cards.
    <Card className="bg-white/10 backdrop-blur-md rounded-2xl text-white border-0 min-h-[500px]">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {showcaseNotifications.map((notification) => (
          <div key={notification.id} className="flex items-start gap-4 p-4 rounded-lg transition-all duration-300 bg-black/20 hover:bg-black/30">
            <div className="flex-shrink-0 mt-1">
              {getIcon(notification.type as 'tournament' | 'team')}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white">{notification.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{notification.message}</p>
              <div className="flex items-center text-xs text-gray-500 mt-2">
                <Clock className="h-3 w-3 mr-1" />
                <span>{notification.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;