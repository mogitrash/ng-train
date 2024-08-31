import { createReducer, on } from '@ngrx/store';
import { TripsState } from '../../models/trips.model';
import {
  carriagesLoadedSuccess,
  loadDataForOrdersViewSuccess,
  orderDeletedSuccess,
  ordersLoadedSuccess,
  rideLoadedByIdSuccess,
  routeLoadedByIdSuccess,
  routesLoadedSuccess,
  searchLoadedSuccess,
  setSearchDate,
  stationsLoadedSuccess,
  usersLoadedSuccess,
} from './trips.actions';

const inititalTripState: TripsState = {
  stations: [],
  routes: [],
  carriages: [],
  orders: [],
  rides: [],
  users: [],
  searchResponses: [],
};

export const tripsReducer = createReducer(
  inititalTripState,
  on(setSearchDate, (state, { date }): TripsState => {
    return { ...state, searchDate: date };
  }),
  on(searchLoadedSuccess, (state, { search }): TripsState => {
    return { ...state, searchResponses: [...state.searchResponses, search] };
  }),
  on(stationsLoadedSuccess, (state, { stations }): TripsState => {
    return { ...state, stations };
  }),
  on(routesLoadedSuccess, (state, { routes }): TripsState => {
    return { ...state, routes };
  }),
  on(carriagesLoadedSuccess, (state, { carriages }): TripsState => {
    return { ...state, carriages };
  }),
  on(ordersLoadedSuccess, (state, { orders }): TripsState => {
    return { ...state, orders };
  }),
  on(usersLoadedSuccess, (state, { users }): TripsState => {
    return { ...state, users };
  }),
  on(routeLoadedByIdSuccess, (state, { route }): TripsState => {
    return { ...state, routes: [...state.routes, route] };
  }),
  on(rideLoadedByIdSuccess, (state, { ride }): TripsState => {
    return { ...state, rides: [...state.rides, ride] };
  }),
  on(loadDataForOrdersViewSuccess, (state, { carriages, stations, orders }): TripsState => {
    return {
      ...state,
      carriages,
      stations,
      orders,
    };
  }),
  on(orderDeletedSuccess, (state, { orderId }): TripsState => {
    return {
      ...state,
      orders: state.orders.map((order) => {
        return order.id === orderId ? { ...order, status: 'canceled' } : order;
      }),
    };
  }),
);
