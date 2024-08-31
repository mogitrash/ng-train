import { Injectable } from '@angular/core';
import {
  catchError,
  delay,
  endWith,
  exhaustMap,
  forkJoin,
  map,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TripsService } from '../../../features/trips/services/trips.service';
import * as tripActions from './trips.actions';

@Injectable()
export class TripsEffects {
  loadSearch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.loadSearch),
      exhaustMap((action) => {
        return this.tripsService
          .search(
            action.fromLatitude,
            action.fromLongitude,
            action.toLatitude,
            action.toLongitude,
            action.time,
          )
          .pipe(
            map((search) => {
              return tripActions.searchLoadedSuccess({ search });
            }),
            catchError((error) => {
              return of(tripActions.failureSnackBar(error));
            }),
          );
      }),
    );
  });

  canDelete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.canDelete),
      exhaustMap((action) => {
        if (action.coordinates.length === 0) {
          return of(tripActions.deleteStation(action.station));
        }
        const searchRequests = action.coordinates.map((coordinate) => {
          const now = Date.now();
          return this.tripsService
            .search(
              coordinate.latitude,
              coordinate.longitude,
              action.station.latitude,
              action.station.longitude,
              now,
            )
            .pipe(
              map((route) => {
                return route.routes.length > 0;
              }),
            );
        });

        return forkJoin(searchRequests).pipe(
          delay(1000),
          switchMap((results) => {
            const canDelete = !results.some((hasRoutes) => {
              return hasRoutes;
            });
            if (canDelete) {
              return of(tripActions.deleteStation(action.station));
            }
            return of(
              tripActions.failureSnackBar({
                error: {
                  message: 'Cannot delete station with active rides',
                  reason: 'Cannot delete station with active rides',
                },
              }),
            );
          }),
          catchError((error) => {
            return of(tripActions.failureSnackBar(error));
          }),
          startWith(tripActions.loadingStarted()),
        );
      }),
    );
  });

  loadStations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.loadStations),
      exhaustMap(() => {
        return this.tripsService.getStationList().pipe(
          map((stations) => {
            return tripActions.stationsLoadedSuccess({ stations });
          }),
          catchError((error) => {
            return of(tripActions.failureSnackBar(error));
          }),
          startWith(tripActions.loadingStarted()),
          endWith(tripActions.loadingFinished()),
        );
      }),
    );
  });

  deleteStation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.deleteStation),
      exhaustMap((action) => {
        return this.tripsService.deleteStation(action.id).pipe(
          map(() => {
            return tripActions.stationDeleteSuccess();
          }),
          catchError((error) => {
            return of(tripActions.failureSnackBar(error));
          }),
          startWith(tripActions.loadingStarted()),
        );
      }),
    );
  });

  loadStationsAfterDelete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.stationDeleteSuccess),
      map(() => {
        return tripActions.loadStations();
      }),
    );
  });

  loadRoutes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.loadRoutes),
      exhaustMap(() => {
        return this.tripsService.getRouteList().pipe(
          map((routes) => {
            return tripActions.routesLoadedSuccess({ routes });
          }),
          catchError((error) => {
            return of(tripActions.failureSnackBar(error));
          }),
        );
      }),
    );
  });

  createRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.createRoute),
      exhaustMap((action) => {
        return this.tripsService.createRoute(action.path, action.carriages).pipe(
          map((id) => {
            return tripActions.routeCreatedSuccess(id);
          }),
          catchError((error) => {
            return of(tripActions.failureSnackBar(error));
          }),
        );
      }),
    );
  });

  updateRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.updateRoute),
      exhaustMap((action) => {
        return this.tripsService.updateRoute(action.id, action.path, action.carriages).pipe(
          map((id) => {
            return tripActions.routeUpdatedSuccess(id);
          }),
          catchError((error) => {
            return of(tripActions.failureSnackBar(error));
          }),
        );
      }),
    );
  });

  deleteRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.deleteRoute),
      exhaustMap((action) => {
        return this.tripsService.deleteRoute(action.id).pipe(
          map(() => {
            return tripActions.routeDeletedSuccess();
          }),
          catchError((error) => {
            return of(tripActions.failureSnackBar(error));
          }),
        );
      }),
    );
  });

  loadCarriage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.loadCarriages),
      exhaustMap(() => {
        return this.tripsService.getCarriageList().pipe(
          map((carriages) => {
            return tripActions.carriagesLoadedSuccess({ carriages });
          }),
          catchError((error) => {
            return of(tripActions.failureSnackBar(error));
          }),
        );
      }),
    );
  });

  createCarriage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.createCarriage),
      exhaustMap((action) => {
        return this.tripsService
          .createCarriageType(action.name, action.rows, action.leftSeats, action.rightSeats)
          .pipe(
            map((code) => {
              return tripActions.carriagesCreatedSuccess(code);
            }),
            catchError((error) => {
              return of(tripActions.failureSnackBar(error));
            }),
          );
      }),
    );
  });

  updateCarriage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.updateCarriage),
      exhaustMap((action) => {
        return this.tripsService
          .updateCarriageType(
            action.code,
            action.name,
            action.rows,
            action.leftSeats,
            action.rightSeats,
          )
          .pipe(
            map((code) => {
              return tripActions.carriageUpdatedSuccess(code);
            }),
            catchError((error) => {
              return of(tripActions.failureSnackBar(error));
            }),
          );
      }),
    );
  });

  loadOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.loadOrders),
      exhaustMap((action) => {
        return this.tripsService.getOrderList(action.all).pipe(
          map((orders) => {
            return tripActions.ordersLoadedSuccess({ orders });
          }),
          catchError((error) => {
            return of(tripActions.failureSnackBar(error));
          }),
        );
      }),
    );
  });

  createOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.createOrder),
      exhaustMap((action) => {
        return this.tripsService
          .createOrder(action.rideId, action.seat, action.stationStart, action.stationEnd)
          .pipe(
            map((response) => {
              return tripActions.createOrderSuccess(response);
            }),
            catchError((error) => {
              return of(tripActions.failureSnackBar(error));
            }),
          );
      }),
    );
  });

  deleteOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.deleteOrder),
      exhaustMap((action) => {
        return this.tripsService.deleteOrder(action.orderId).pipe(
          map(() => {
            return tripActions.orderDeletedSuccess({ orderId: action.orderId });
          }),
          catchError((error) => {
            const errorMessage = error.message || 'Failed to delete order';
            return of(
              tripActions.failureSnackBar({
                error: { message: errorMessage, reason: error.reason },
              }),
            );
          }),
        );
      }),
    );
  });

  loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.loadUsers),
      exhaustMap(() => {
        return this.tripsService.getUsersList().pipe(
          map((users) => {
            return tripActions.usersLoadedSuccess({ users });
          }),
          catchError((error) => {
            return of(tripActions.failureSnackBar(error));
          }),
        );
      }),
    );
  });

  loadRouteById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.loadRouteById),
      exhaustMap((action) => {
        return this.tripsService.getRouteById(action.id).pipe(
          map((route) => {
            return tripActions.routeLoadedByIdSuccess({ route });
          }),
          catchError((error) => {
            return of(tripActions.failureSnackBar(error));
          }),
        );
      }),
    );
  });

  createStation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.createStation),
      exhaustMap((action) => {
        return this.tripsService
          .createStation(action.city, action.latitude, action.longitude, action.relations)
          .pipe(
            map(() => {
              return tripActions.createStationSuccess();
            }),
            catchError((error) => {
              return of(tripActions.failureSnackBar(error));
            }),
            startWith(tripActions.loadingStarted()),
          );
      }),
    );
  });

  loadStationsAfterCreate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.createStationSuccess),
      map(() => {
        return tripActions.loadStations();
      }),
    );
  });

  loadRideById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.loadRideById),
      exhaustMap((action) => {
        return this.tripsService.getRideById(action.rideId).pipe(
          map((ride) => {
            return tripActions.rideLoadedByIdSuccess({ ride });
          }),
          catchError((error) => {
            return of(tripActions.failureSnackBar(error));
          }),
        );
      }),
    );
  });

  createRide$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.createRide),
      exhaustMap((action) => {
        return this.tripsService.createRide(action.routeId, action.segments).pipe(
          map((id) => {
            return tripActions.createRideSuccess(id);
          }),
          catchError((error) => {
            return of(tripActions.failureSnackBar(error));
          }),
        );
      }),
    );
  });

  updateRide$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.updateRide),
      exhaustMap((action) => {
        return this.tripsService.updateRide(action.routeId, action.rideId, action.segments).pipe(
          map(() => {
            return tripActions.updateRideSuccess();
          }),
          catchError((error) => {
            return of(tripActions.failureSnackBar(error));
          }),
        );
      }),
    );
  });

  displayErrorSnackBar = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(tripActions.failureSnackBar),
        tap((error) => {
          this.snackBar.open(error.error.message, 'Close', {
            duration: 5000,
          });
          tripActions.loadingFinished();
        }),
      );
    },
    { functional: true, dispatch: false },
  );

  loadDataForOrdersView$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tripActions.loadDataForOrdersView),
      switchMap((action) => {
        const loadOrdersAction =
          action.role === 'manager'
            ? this.tripsService.getOrderList(true)
            : this.tripsService.getOrderList();

        return forkJoin({
          carriages: this.tripsService.getCarriageList(),
          stations: this.tripsService.getStationList(),
          orders: loadOrdersAction,
        }).pipe(
          map(({ carriages, stations, orders }) => {
            return tripActions.loadDataForOrdersViewSuccess({ carriages, stations, orders });
          }),
          catchError((error) => {
            return of(tripActions.failureSnackBar({ error }));
          }),
        );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private tripsService: TripsService,
    private snackBar: MatSnackBar,
  ) {}
}
