import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const NotificationsTab = () => {
  return (
    <Card className="bg-white/10 backdrop-blur-md rounded-2xl text-white border-0 min-h-[500px]">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-full min-h-[400px]">
          <p className="text-gray-400">No notifications yet.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;