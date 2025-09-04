import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Device, DeviceAction } from '@/types/devices';
import { DeviceControls } from './DeviceControls';
import { 
  Lightbulb, 
  Thermometer, 
  Video, 
  Lock, 
  Wifi, 
  WifiOff,
  Power,
  Activity
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface DeviceCardProps {
  device: Device;
  onAction: (action: DeviceAction) => void;
}

const deviceIcons = {
  light: Lightbulb,
  thermostat: Thermometer,
  security: Video,
  lock: Lock,
  sensor: Activity
};

export const DeviceCard = ({ device, onAction }: DeviceCardProps) => {
  const Icon = deviceIcons[device.type];
  const lastUpdatedText = formatDistanceToNow(device.lastUpdated, { addSuffix: true });

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${
      !device.isOnline ? 'opacity-60' : ''
    } ${device.isActive ? 'ring-2 ring-blue-200' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${
              device.isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
            }`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">{device.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{device.room}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1">
              {device.isOnline ? (
                <Wifi className="h-4 w-4 text-green-500" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-500" />
              )}
              <Badge variant={device.isActive ? "default" : "secondary"}>
                {device.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            <Button
              size="sm"
              variant={device.isActive ? "outline" : "default"}
              onClick={() => onAction({ type: 'TOGGLE_POWER', deviceId: device.id })}
              disabled={!device.isOnline}
              className="flex items-center gap-1"
              aria-label={`Turn ${device.isActive ? 'off' : 'on'} ${device.name}`}
            >
              <Power className="h-3 w-3" />
              {device.isActive ? "Turn Off" : "Turn On"}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <DeviceControls device={device} onAction={onAction} />
        
        <div className="mt-4 pt-3 border-t">
          <p className="text-xs text-muted-foreground">
            Last updated {lastUpdatedText}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};