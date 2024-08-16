import { TripsState } from '../models/trips.model';
import { UserState } from '../models/user.model';

export interface TrainState {
  user: UserState;
  trips: TripsState;
}
