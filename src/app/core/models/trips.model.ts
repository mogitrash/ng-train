import { Carriage } from '../../features/trips/models/carriage.model';
import { Order } from '../../features/trips/models/order.model';
import { Ride } from '../../features/trips/models/ride.model';
import { Route } from '../../features/trips/models/route.model';
import { SearchResponse } from '../../features/trips/models/searchResponse.model';
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
  [date: string]: RideItemInfo[];
}

export interface RideItemInfo {
  rideId: number;
  fromCity: string;
  fromStationId: number;
  toCity: string;
  toStationId: number;
}

export interface RideItemConfig {
  startTime: Date;
  endTime: Date;
  startCity: string;
  endCity: string;
  price: RideItemPrice;
}

export interface RideItemPrice {
  [key: string]: number;
}
