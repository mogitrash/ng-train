import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TripsState } from '../../models/trips.model';
import { getISOSDate } from '../../../shared/utilities/getISOSDate.utility';

const selectTripsState = createFeatureSelector<TripsState>('trips');

export const selectUniqueSearchDates = createSelector(selectTripsState, (state: TripsState) => {
  const dates: Set<string> = new Set();
  const lastResponse = state.searchResponses.at(state.searchResponses.length - 1);

  lastResponse?.routes.forEach((route) => {
    if (route.schedule) {
      route.schedule.forEach((schedule) => {
        schedule.segments.forEach((segment) => {
          const date = new Date(segment.time[0]);

          date.setHours(0, 0, 0, 0);

          if (date >= new Date()) {
            dates.add(getISOSDate(date));
          }
        });
      });
    }
  });

  // NOTE: I use slice(0, 50) cause in response we get > 1500 results and
  // lazy-loading of those tabs are not required :)
  return Array.from(dates)
    .map((date) => {
      return new Date(date);
    })
    .slice(0, 50)
    .sort((a, b) => {
      return a.getTime() - b.getTime();
    });
});

export const selectSearchDate = createSelector(selectTripsState, (state: TripsState) => {
  return state.searchDate;
});

export const selectStations = createSelector(selectTripsState, (state: TripsState) => {
  return state.stations;
});

export const selectRoutes = createSelector(selectTripsState, (state: TripsState) => {
  return state.routes;
});

export const selectCarriages = createSelector(selectTripsState, (state: TripsState) => {
  return state.carriages;
});

export const selectOrders = createSelector(selectTripsState, (state: TripsState) => {
  return state.orders;
});

export const selectRides = createSelector(selectTripsState, (state: TripsState) => {
  return state.rides;
});

export const selectUsers = createSelector(selectTripsState, (state: TripsState) => {
  return state.users;
});

export const selectSearchResponses = createSelector(selectTripsState, (state: TripsState) => {
  return state.searchResponses;
});
