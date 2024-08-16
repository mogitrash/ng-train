import { createReducer } from '@ngrx/store';
import { TripsState } from './trips.model';

const inititalState: TripsState = {};

export const tripsReducer = createReducer(inititalState);
