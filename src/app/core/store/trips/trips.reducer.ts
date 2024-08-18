import { createReducer, on } from '@ngrx/store';
import { TripsState } from '../../models/trips.model';
import { carriagesLoadedSuccess, createRideSuccess, ordersLoadedSuccess, routeLoadedByIdSuccess, routesLoadedSuccess, stationsLoadedSuccess, usersLoadedSuccess } from './trips.actions';

const inititalTripState: TripsState = { stations: [], routes: [], carriages: [], orders: [], rides: [], users: [] };

export const tripsReducer = createReducer(
    inititalTripState,
    on(stationsLoadedSuccess, (state, { stations }): TripsState => {return { ...state, stations }}),
    on(routesLoadedSuccess, (state, { routes }): TripsState => {return { ...state, routes }}),
    on(carriagesLoadedSuccess, (state, { carriages }): TripsState => {return { ...state, carriages }}),
    on(ordersLoadedSuccess, (state, { orders }): TripsState => {return { ...state, orders }}),
    on(usersLoadedSuccess, (state, { users }): TripsState => {return { ...state, users }}),
    on(routeLoadedByIdSuccess, (state, { route }): TripsState => {return { ...state, routes: [...state.routes, route] }}),
    on(createRideSuccess, (state, { id }): TripsState => {return { ...state, rides: [...state.rides, id] }})
);
