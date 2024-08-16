import { TripsState } from './trips/trips.model';
import { UserState } from './user/user.model';

export interface TrainState {
  user: UserState;
  trips: TripsState;
}
