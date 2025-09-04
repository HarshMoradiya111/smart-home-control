import { useState, useEffect, useCallback } from 'react';
import { Device, DeviceAction, Room } from '@/types/devices';

// Mock data for demonstration
const initialDevices: Device[] = [
  {
    id: '1',
    name: 'Living Room Light',
    type: 'light',
    room: 'Living Room',
    isOnline: true,
    isActive: true,
    lastUpdated: new Date(),
    properties: { brightness: 80, color: '#ffffff' }
  },
  {
    id: '2',
    name: 'Bedroom Light',
    type: 'light',
    room: 'Bedroom',
    isOnline: true,
    isActive: false,
    lastUpdated: new Date(),
    properties: { brightness: 0, color: '#ffffff' }
  },
  {
    id: '3',
    name: 'Main Thermostat',
    type: 'thermostat',
    room: 'Living Room',
    isOnline: true,
    isActive: true,
    lastUpdated: new Date(),
    properties: { temperature: 22, targetTemperature: 24, mode: 'heating' }
  },
  {
    id: '4',
    name: 'Front Door Camera',
    type: 'security',
    room: 'Entrance',
    isOnline: true,
    isActive: true,
    lastUpdated: new Date(),
    properties: { isRecording: true, motionDetected: false }
  },
  {
    id: '5',
    name: 'Front Door Lock',
    type: 'lock',
    room: 'Entrance',
    isOnline: true,
    isActive: true,
    lastUpdated: new Date(),
    properties: { isLocked: true }
  },
  {
    id: '6',
    name: 'Kitchen Light',
    type: 'light',
    room: 'Kitchen',
    isOnline: true,
    isActive: false,
    lastUpdated: new Date(),
    properties: { brightness: 0, color: '#ffffff' }
  },
  {
    id: '7',
    name: 'Kitchen Temperature Sensor',
    type: 'sensor',
    room: 'Kitchen',
    isOnline: true,
    isActive: true,
    lastUpdated: new Date(),
    properties: { value: 23, unit: '°C', threshold: 25 }
  }
];

export const useDevices = () => {
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [selectedRoom, setSelectedRoom] = useState<string>('All Rooms');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prevDevices => 
        prevDevices.map(device => ({
          ...device,
          lastUpdated: new Date(),
          // Randomly simulate some property changes
          properties: {
            ...device.properties,
            ...(device.type === 'thermostat' && {
              temperature: Math.round((device.properties.temperature || 20) + (Math.random() - 0.5) * 2)
            }),
            ...(device.type === 'sensor' && {
              value: Math.round((device.properties.value || 20) + (Math.random() - 0.5) * 3)
            }),
            ...(device.type === 'security' && Math.random() > 0.9 && {
              motionDetected: !device.properties.motionDetected
            })
          }
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const dispatchDeviceAction = useCallback((action: DeviceAction) => {
    setDevices(prevDevices => 
      prevDevices.map(device => {
        if (device.id !== action.deviceId) return device;

        switch (action.type) {
          case 'TOGGLE_POWER':
            return {
              ...device,
              isActive: !device.isActive,
              lastUpdated: new Date(),
              properties: {
                ...device.properties,
                ...(device.type === 'light' && { brightness: device.isActive ? 0 : 75 })
              }
            };
          case 'SET_BRIGHTNESS':
            return {
              ...device,
              isActive: action.brightness > 0,
              lastUpdated: new Date(),
              properties: {
                ...device.properties,
                brightness: action.brightness
              }
            };
          case 'SET_TEMPERATURE':
            return {
              ...device,
              lastUpdated: new Date(),
              properties: {
                ...device.properties,
                targetTemperature: action.temperature
              }
            };
          case 'TOGGLE_LOCK':
            return {
              ...device,
              lastUpdated: new Date(),
              properties: {
                ...device.properties,
                isLocked: !device.properties.isLocked
              }
            };
          case 'TOGGLE_RECORDING':
            return {
              ...device,
              lastUpdated: new Date(),
              properties: {
                ...device.properties,
                isRecording: !device.properties.isRecording
              }
            };
          default:
            return device;
        }
      })
    );
  }, []);

  const rooms: Room[] = [
    { id: 'all', name: 'All Rooms', deviceCount: devices.length, activeDevices: devices.filter(d => d.isActive).length, icon: '🏠' },
    ...Array.from(new Set(devices.map(d => d.room))).map(roomName => ({
      id: roomName.toLowerCase().replace(' ', '-'),
      name: roomName,
      deviceCount: devices.filter(d => d.room === roomName).length,
      activeDevices: devices.filter(d => d.room === roomName && d.isActive).length,
      icon: roomName === 'Living Room' ? '🛋️' : roomName === 'Bedroom' ? '🛏️' : roomName === 'Kitchen' ? '🍳' : roomName === 'Entrance' ? '🚪' : '📱'
    }))
  ];

  const filteredDevices = selectedRoom === 'All Rooms' 
    ? devices 
    : devices.filter(device => device.room === selectedRoom);

  return {
    devices: filteredDevices,
    allDevices: devices,
    rooms,
    selectedRoom,
    setSelectedRoom,
    dispatchDeviceAction
  };
};