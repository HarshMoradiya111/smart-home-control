import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Room } from '@/types/devices';

interface RoomSelectorProps {
  rooms: Room[];
  selectedRoom: string;
  onRoomSelect: (roomName: string) => void;
}

export const RoomSelector = ({ rooms, selectedRoom, onRoomSelect }: RoomSelectorProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Rooms</h2>
      <div className="flex flex-wrap gap-2">
        {rooms.map((room) => (
          <Button
            key={room.id}
            variant={selectedRoom === room.name ? "default" : "outline"}
            onClick={() => onRoomSelect(room.name)}
            className="flex items-center gap-2 h-auto py-2 px-3"
            aria-label={`Select ${room.name}, ${room.activeDevices} of ${room.deviceCount} devices active`}
          >
            <span className="text-lg">{room.icon}</span>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{room.name}</span>
              <div className="flex gap-1">
                <Badge variant="secondary" className="text-xs px-1 py-0">
                  {room.activeDevices}/{room.deviceCount}
                </Badge>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};