import { Carriage } from '../../features/trips/models/carriage.model';
import { Order } from '../../features/trips/models/order.model';
import { Ride } from '../../features/trips/models/ride.model';
import { Route } from '../../features/trips/models/route.model';
import { SearchResponse } from '../../features/trips/models/searchResponse.model';
import { Segment } from '../../features/trips/models/segment.model';
import { Station } from '../../features/trips/models/station.model';
import { User } from '../../features/trips/models/user.model';

export interface TripsState {
  stations: Station[];
  routes: Route[];
  carriages: Carriage[];
  orders: Order[];
  rides: Ride[];
  users: User[];
  searchResponses: SearchResponse[];
  searchDate?: Date;
}

export interface GroupedRides {
  [date: string]: RidesGroup[];
}

export interface RidesGroup {
  rideId: number;
  segments: Segment[];
  routeId: number;
}
