import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Device, DeviceAction } from '@/types/devices';
import { 
  Lightbulb, 
  Thermometer, 
  Video, 
  Lock, 
  Unlock,
  Play,
  Pause,
  Plus,
  Minus
} from 'lucide-react';

interface DeviceControlsProps {
  device: Device;
  onAction: (action: DeviceAction) => void;
}

export const DeviceControls = ({ device, onAction }: DeviceControlsProps) => {
  const { type, properties } = device;

  switch (type) {
    case 'light':
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Brightness</span>
            <Badge variant="outline">{properties.brightness}%</Badge>
          </div>
          <Slider
            value={[properties.brightness || 0]}
            onValueChange={([value]) => 
              onAction({ type: 'SET_BRIGHTNESS', deviceId: device.id, brightness: value })
            }
            max={100}
            step={1}
            className="w-full"
            aria-label="Adjust brightness"
          />
        </div>
      );

    case 'thermostat':
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Current</span>
            <Badge variant="outline">{properties.temperature}°C</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Target</span>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => 
                  onAction({ 
                    type: 'SET_TEMPERATURE', 
                    deviceId: device.id, 
                    temperature: (properties.targetTemperature || 20) - 1 
                  })
                }
                aria-label="Decrease temperature"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Badge className="min-w-[60px] justify-center">
                {properties.targetTemperature}°C
              </Badge>
              <Button
                size="sm"
                variant="outline"
                onClick={() => 
                  onAction({ 
                    type: 'SET_TEMPERATURE', 
                    deviceId: device.id, 
                    temperature: (properties.targetTemperature || 20) + 1 
                  })
                }
                aria-label="Increase temperature"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Mode</span>
            <Badge variant={properties.mode === 'heating' ? 'destructive' : 'secondary'}>
              {properties.mode}
            </Badge>
          </div>
        </div>
      );

    case 'security':
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Recording</span>
            <Button
              size="sm"
              variant={properties.isRecording ? "default" : "outline"}
              onClick={() => onAction({ type: 'TOGGLE_RECORDING', deviceId: device.id })}
              className="flex items-center gap-1"
              aria-label={properties.isRecording ? "Stop recording" : "Start recording"}
            >
              {properties.isRecording ? (
                <>
                  <Pause className="h-3 w-3" />
                  Recording
                </>
              ) : (
                <>
                  <Play className="h-3 w-3" />
                  Start
                </>
              )}
            </Button>
          </div>
          {properties.motionDetected && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Motion</span>
              <Badge variant="destructive" className="animate-pulse">
                Detected
              </Badge>
            </div>
          )}
        </div>
      );

    case 'lock':
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status</span>
            <Button
              size="sm"
              variant={properties.isLocked ? "default" : "destructive"}
              onClick={() => onAction({ type: 'TOGGLE_LOCK', deviceId: device.id })}
              className="flex items-center gap-1"
              aria-label={properties.isLocked ? "Unlock door" : "Lock door"}
            >
              {properties.isLocked ? (
                <>
                  <Lock className="h-3 w-3" />
                  Locked
                </>
              ) : (
                <>
                  <Unlock className="h-3 w-3" />
                  Unlocked
                </>
              )}
            </Button>
          </div>
        </div>
      );

    default:
      return (
        <div className="text-sm text-muted-foreground">
          No controls available
        </div>
      );
  }
};