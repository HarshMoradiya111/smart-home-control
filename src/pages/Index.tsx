import { useState } from 'react';
import { useDevices } from '@/hooks/useDevices';
import { QuickStats } from '@/components/QuickStats';
import { RoomSelector } from '@/components/RoomSelector';
import { DeviceCard } from '@/components/DeviceCard';
import { SettingsDialog } from '@/components/SettingsDialog';
import { Button } from '@/components/ui/button';
import { RefreshCw, Settings } from 'lucide-react';

export default function SmartHomeDashboard() {
  const {
    devices,
    allDevices,
    rooms,
    selectedRoom,
    setSelectedRoom,
    dispatchDeviceAction
  } = useDevices();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleRefresh = () => {
    // Force a refresh by updating all device timestamps
    allDevices.forEach(device => {
      dispatchDeviceAction({ type: 'TOGGLE_POWER', deviceId: device.id });
      dispatchDeviceAction({ type: 'TOGGLE_POWER', deviceId: device.id });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Smart Home Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Control and monitor your connected devices
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => setIsSettingsOpen(true)}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <QuickStats devices={allDevices} />

        {/* Room Selector */}
        <RoomSelector 
          rooms={rooms}
          selectedRoom={selectedRoom}
          onRoomSelect={setSelectedRoom}
        />

        {/* Device Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {selectedRoom} {selectedRoom !== 'All Rooms' && 'Devices'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {devices.length} device{devices.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {devices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No devices found in this room.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {devices.map((device) => (
                <DeviceCard
                  key={device.id}
                  device={device}
                  onAction={dispatchDeviceAction}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>Smart Home Dashboard - Real-time device monitoring and control</p>
        </div>
      </div>

      {/* Settings Dialog */}
      <SettingsDialog 
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
      />
    </div>
  );
}