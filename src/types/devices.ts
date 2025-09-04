export interface Device {
  id: string;
  name: string;
  type: 'light' | 'thermostat' | 'security' | 'lock' | 'sensor';
  room: string;
  isOnline: boolean;
  isActive: boolean;
  lastUpdated: Date;
  properties: DeviceProperties;
}

export interface DeviceProperties {
  // Light properties
  brightness?: number;
  color?: string;
  
  // Thermostat properties
  temperature?: number;
  targetTemperature?: number;
  mode?: 'heating' | 'cooling' | 'auto' | 'off';
  
  // Security properties
  isRecording?: boolean;
  motionDetected?: boolean;
  
  // Lock properties
  isLocked?: boolean;
  
  // Sensor properties
  value?: number;
  unit?: string;
  threshold?: number;
}

export interface Room {
  id: string;
  name: string;
  deviceCount: number;
  activeDevices: number;
  icon: string;
}

export type DeviceAction = 
  | { type: 'TOGGLE_POWER'; deviceId: string }
  | { type: 'SET_BRIGHTNESS'; deviceId: string; brightness: number }
  | { type: 'SET_TEMPERATURE'; deviceId: string; temperature: number }
  | { type: 'TOGGLE_LOCK'; deviceId: string }
  | { type: 'TOGGLE_RECORDING'; deviceId: string };