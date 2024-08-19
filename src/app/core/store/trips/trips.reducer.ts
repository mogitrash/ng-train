import { createReducer } from '@ngrx/store';
import { TripsState } from '../../models/trips.model';

const inititalState: TripsState = {};

export const tripsReducer = createReducer(inititalState);
