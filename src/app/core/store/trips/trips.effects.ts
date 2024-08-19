import { Injectable } from '@angular/core';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TripsService } from '../../../features/trips/services/trips.service';
import {
  carriagesCreatedSuccess,
  carriagesLoadedSuccess, carriageUpdatedSuccess,
  createCarriage, createOrder, createOrderSuccess, createRide,
  createRideSuccess, createRoute, createStation, createStationSuccess,
  deleteOrder, deleteRoute, deleteStation, failureSnackBar, loadCarriages, loadOrders,
  loadRideById, loadRouteById, loadRoutes, loadSearch, loadStations, loadUsers, orderDeletedSuccess,
  ordersLoadedSuccess, rideLoadedByIdSuccess, routeCreatedSuccess, routeDeletedSuccess,
  routeLoadedByIdSuccess, routesLoadedSuccess, routeUpdatedSuccess, searchLoadedSuccess,
  stationDeleteSuccess, stationsLoadedSuccess, updateCarriage, updateRide, updateRideSuccess,
  updateRoute, usersLoadedSuccess
} from './trips.actions';

@Injectable()
export class TripsEffects {
  loadSearch$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadSearch),
        exhaustMap((action) => {
          return this.tripsService.search(action.fromLatitude, action.fromLongitude, action.toLatitude, action.toLongitude, action.time).pipe(
            map((search) => { return searchLoadedSuccess({ search }) }),
            catchError((error) => {
              return of(failureSnackBar(error));
            })
          )
        }
        )
      )
    },
  );

  loadStations$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadStations),
        exhaustMap(() => {
          return this.tripsService.getStationList().pipe(
            map((stations) => { return stationsLoadedSuccess({ stations }) }),
            catchError((error) => {
              return of(failureSnackBar(error));
            })
          )
        }
        )
      )
    },
  );

  deleteStation$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deleteStation),
        exhaustMap((action) => {
          return this.tripsService.deleteStation(action.id).pipe(
            map(() => { return stationDeleteSuccess() }),
            catchError((error) => {
              return of(failureSnackBar(error));
            })
          )
        }
        )
      )
    },
  );

  loadRoutes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadRoutes),
      exhaustMap(() => {
        return this.tripsService.getRouteList().pipe(
          map((routes) => { return routesLoadedSuccess({ routes }) }),
          catchError((error) => {
            return of(failureSnackBar(error));
          })
        )
      }
      )
    )
  });

  createRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createRoute),
      exhaustMap((action) => {
        return this.tripsService.createRoute(action.path, action.carriages).pipe(
          map((id) => { return routeCreatedSuccess(id) }),
          catchError((error) => {
            return of(failureSnackBar(error));
          })
        )
      }
      )
    )
  });

  updateRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateRoute),
      exhaustMap((action) => {
        return this.tripsService.updateRoute(action.id, action.path, action.carriages
        ).pipe(
          map((id) => { return routeUpdatedSuccess(id) }),
          catchError((error) => {
            return of(failureSnackBar(error));
          })
        )
      }
      )
    )
  });

  deleteRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteRoute),
      exhaustMap((action) => {
        return this.tripsService.deleteRoute(action.id).pipe(
          map(() => { return routeDeletedSuccess() }),
          catchError((error) => {
            return of(failureSnackBar(error));
          })
        )
      }
      )
    )
  });

  loadCarriage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCarriages),
      exhaustMap(() => {
        return this.tripsService.getCarriageList().pipe(
          map((carriages) => { return carriagesLoadedSuccess({ carriages }) }),
          catchError((error) => {
            return of(failureSnackBar(error));
          })
        )
      }
      )
    )
  });

  createCarriage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createCarriage),
      exhaustMap((action) => {
        return this.tripsService.createCarriageType(action.name, action.rows, action.leftSeats, action.rightSeats).pipe(
          map((code) => { return carriagesCreatedSuccess(code) }),
          catchError((error) => {
            return of(failureSnackBar(error));
          })
        )
      }
      )
    )
  });

  updateCarriage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateCarriage),
      exhaustMap((action) => {
        return this.tripsService.updateCarriageType(action.code, action.name, action.rows, action.leftSeats, action.rightSeats).pipe(
          map((code) => { return carriageUpdatedSuccess(code) }),
          catchError((error) => {
            return of(failureSnackBar(error));
          })
        )
      }
      )
    )
  });

  loadOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadOrders),
      exhaustMap(() => {
        return this.tripsService.getOrderList().pipe(
          map((orders) => { return ordersLoadedSuccess({ orders }) }),
          catchError((error) => {
            return of(failureSnackBar(error));
          })
        )
      }
      )
    )
  });

  createOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createOrder),
      exhaustMap(action => {
        return this.tripsService.createOrder(action.rideId, action.seat, action.stationStart, action.stationEnd).pipe(
          map(response => {
            return createOrderSuccess(response);
          }),
          catchError((error) => {
            return of(failureSnackBar(error));
          })
        );
      })
    )
  }
  );

  deleteOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteOrder),
      exhaustMap(action => {
        return this.tripsService.deleteOrder(action.orderId).pipe(
          map(() => {
            return orderDeletedSuccess();
          }),
          catchError((error) => {
            return of(failureSnackBar(error));
          })
        );
      })
    )
  }
  );


  loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUsers),
      exhaustMap(() => {
        return this.tripsService.getUsersList().pipe(
          map((users) => { return usersLoadedSuccess({ users }) }),
          catchError((error) => {
            return of(failureSnackBar(error));
          })
        )
      }
      )
    )
  });

  loadRouteById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadRouteById),
      exhaustMap((action) => {
        // Вывод значения action
        return this.tripsService.getRouteById(action.id).pipe(
          map((route) => {
            return routeLoadedByIdSuccess({ route });
          }),
          catchError((error) => {
            return of(failureSnackBar(error));
          })
        );
      })
    )
  }
  );

  createStation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createStation),
      exhaustMap(action => {
        return this.tripsService.createStation(action.city, action.latitude, action.longitude, action.relations).pipe(
          map(() => {
            return createStationSuccess();
          }),
          catchError((error) => {
            return of(failureSnackBar(error));
          })
        );
      })
    )
  }
  );

  loadRideById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadRideById),
      exhaustMap(action => {
        return this.tripsService.getRideById(action.rideId).pipe(
          map(ride => {
            return rideLoadedByIdSuccess({ ride });
          }),
          catchError((error) => {
            return of(failureSnackBar(error));
          })
        );
      })
    )
  }
  );

  createRide$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createRide),
      exhaustMap(action => {
        return this.tripsService.createRide(action.routeId, action.segments).pipe(
          map(id => {
            return createRideSuccess(id);
          }),
          catchError((error) => {
            return of(failureSnackBar(error));
          })
        );
      })
    )
  }
  );

  updateRide$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateRide),
      exhaustMap(action => {
        return this.tripsService.updateRide(action.routeId, action.rideId, action.segments).pipe(
          map(() => {
            return updateRideSuccess();
          }),
          catchError((error) => {
            return of(failureSnackBar(error));
          })
        );
      })
    )
  }
  );

  displayErrorSnackBar = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(failureSnackBar),
        tap((error) => {
          this.snackBar.open(error.error.message, 'Close', {
            duration: 5000, // Duration in milliseconds
          });
        })
      );
    },
    { functional: true, dispatch: false }
  );


  constructor(
    private actions$: Actions,
    private tripsService: TripsService,
    private snackBar: MatSnackBar
  ) { }
}
