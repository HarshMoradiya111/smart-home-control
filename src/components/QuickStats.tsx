import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Device } from '@/types/devices';
import { Zap, Wifi, Shield, Home } from 'lucide-react';

interface QuickStatsProps {
  devices: Device[];
}

export const QuickStats = ({ devices }: QuickStatsProps) => {
  const totalDevices = devices.length;
  const activeDevices = devices.filter(d => d.isActive).length;
  const onlineDevices = devices.filter(d => d.isOnline).length;
  const securityDevices = devices.filter(d => d.type === 'security' && d.isActive).length;

  const stats = [
    {
      title: 'Total Devices',
      value: totalDevices,
      icon: Home,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Now',
      value: activeDevices,
      icon: Zap,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Online',
      value: onlineDevices,
      icon: Wifi,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Security Active',
      value: securityDevices,
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};