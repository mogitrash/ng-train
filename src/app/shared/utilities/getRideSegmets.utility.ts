import { Ride } from '../../features/trips/models/ride.model';
import { Segment } from '../../features/trips/models/segment.model';

export function getRideSegments(ride: Ride, fromId: number, toId: number): Segment[] {
  const { path, schedule } = ride;
  const { segments } = schedule;

  const firstStationId = path.findIndex((station) => {
    return fromId === station;
  });
  const lastStationId = path.findIndex((station) => {
    return toId === station;
  });

  return segments.slice(firstStationId, lastStationId + 1);
}
