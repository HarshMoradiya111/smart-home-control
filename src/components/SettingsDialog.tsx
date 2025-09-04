import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Wifi, 
  Bell, 
  Moon, 
  Sun, 
  Shield,
  Smartphone,
  Save
} from 'lucide-react';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoRefresh: true,
    securityAlerts: true,
    mobileSync: false,
    refreshInterval: '5',
    wifiNetwork: 'SmartHome_Network'
  });

  const handleSave = () => {
    // In a real app, this would save to backend/localStorage
    console.log('Settings saved:', settings);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Smart Home Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Network Settings */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              Network
            </h3>
            <div className="space-y-2">
              <Label htmlFor="wifi-network">WiFi Network</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="wifi-network"
                  value={settings.wifiNetwork}
                  onChange={(e) => setSettings(prev => ({ ...prev, wifiNetwork: e.target.value }))}
                  className="flex-1"
                />
                <Badge variant="outline" className="text-green-600">
                  Connected
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Notification Settings */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Push Notifications</Label>
                <Switch
                  id="notifications"
                  checked={settings.notifications}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notifications: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="security-alerts">Security Alerts</Label>
                <Switch
                  id="security-alerts"
                  checked={settings.securityAlerts}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, securityAlerts: checked }))}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* App Settings */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">App Preferences</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="flex items-center gap-2">
                  {settings.darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  Dark Mode
                </Label>
                <Switch
                  id="dark-mode"
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, darkMode: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-refresh">Auto Refresh</Label>
                <Switch
                  id="auto-refresh"
                  checked={settings.autoRefresh}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoRefresh: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="mobile-sync" className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Mobile Sync
                </Label>
                <Switch
                  id="mobile-sync"
                  checked={settings.mobileSync}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, mobileSync: checked }))}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Advanced Settings */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Advanced
            </h3>
            <div className="space-y-2">
              <Label htmlFor="refresh-interval">Refresh Interval (seconds)</Label>
              <Input
                id="refresh-interval"
                type="number"
                min="1"
                max="60"
                value={settings.refreshInterval}
                onChange={(e) => setSettings(prev => ({ ...prev, refreshInterval: e.target.value }))}
              />
            </div>
          </div>

          {/* Save Button */}
          <Button onClick={handleSave} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};