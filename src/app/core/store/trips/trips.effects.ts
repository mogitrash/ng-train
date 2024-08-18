import { Injectable } from '@angular/core';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TripsService } from '../../../features/trips/services/trips.service';
import { carriagesCreatedFailure, carriagesCreatedSuccess, carriagesLoadedFailure, carriagesLoadedSuccess, carriageUpdatedFailure, carriageUpdatedSuccess, createCarriage, createOrder, createOrderSuccess, createRide, createRideFailure, createRideSuccess, createRoute, createStation, createStationFailure, createStationSuccess, deleteOrder, deleteRoute, deleteStation, loadCarriages, loadOrders, loadRouteById, loadRoutes, loadStations, loadUsers, orderDeletedFailure, orderDeletedSuccess, ordersLoadedFailure, ordersLoadedSuccess, routeCreatedFailure, routeCreatedSuccess, routeDeletedFailure, routeDeletedSuccess, routeLoadedByIdFailure, routeLoadedByIdSuccess, routesLoadedFailure, routesLoadedSuccess, routeUpdatedFailure, routeUpdatedSuccess, stationDeleteFailure, stationDeleteSuccess, stationsLoadedFailure, stationsLoadedSuccess, updateCarriage, updateRoute, usersLoadedFailure, usersLoadedSuccess } from './trips.actions';

@Injectable()
export class TripsEffects {
    loadStations$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loadStations),
                exhaustMap(() => {
                    return this.tripsService.getStationList().pipe(
                        map((stations) => { return stationsLoadedSuccess({ stations }) }),
                        catchError((error: { message: string }) => { return of(stationsLoadedFailure({ errorMsg: error.message })) }
                        )
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
                    return this.tripsService.deleteStation(action.id, action.token).pipe(
                        map(() => { return stationDeleteSuccess() }),
                        catchError((error: { message: string }) => { return of(stationDeleteFailure({ errorMsg: error.message })) }
                        )
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
                    catchError((error: { message: string }) => { return of(routesLoadedFailure({ errorMsg: error.message })) }
                    )
                )
            }
            )
        )
    });

    createRoute$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createRoute),
            exhaustMap((action) => {
                return this.tripsService.createRoute(action.path, action.carriages, action.token).pipe(
                    map((id) => { return routeCreatedSuccess(id) }),
                    catchError((error: { message: string }) => { return of(routeCreatedFailure({ errorMsg: error.message })) }
                    )
                )
            }
            )
        )
    });

    updateRoute$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateRoute),
            exhaustMap((action) => {
                return this.tripsService.updateRoute(action.id, action.path, action.carriages, action.token).pipe(
                    map((id) => { return routeUpdatedSuccess(id) }),
                    catchError((error: { message: string }) => { return of(routeUpdatedFailure({ errorMsg: error.message })) }
                    )
                )
            }
            )
        )
    });

    deleteRoute$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteRoute),
            exhaustMap((action) => {
                return this.tripsService.deleteRoute(action.id, action.token).pipe(
                    map(() => { return routeDeletedSuccess() }),
                    catchError((error: { message: string }) => { return of(routeDeletedFailure({ errorMsg: error.message })) }
                    )
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
                    catchError((error: { message: string }) => { return of(carriagesLoadedFailure({ errorMsg: error.message })) }
                    )
                )
            }
            )
        )
    });

    createCarriage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createCarriage),
            exhaustMap((action) => {
                return this.tripsService.createCarriageType(action.name, action.rows, action.leftSeats, action.rightSeats, action.token).pipe(
                    map((code) => { return carriagesCreatedSuccess(code) }),
                    catchError((error: { message: string }) => { return of(carriagesCreatedFailure({ errorMsg: error.message })) }
                    )
                )
            }
            )
        )
    });

    updateCarriage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateCarriage),
            exhaustMap((action) => {
                return this.tripsService.updateCarriageType(action.code, action.name, action.rows, action.leftSeats, action.rightSeats, action.token).pipe(
                    map((code) => { return carriageUpdatedSuccess(code) }),
                    catchError((error: { message: string }) => { return of(carriageUpdatedFailure({ errorMsg: error.message })) }
                    )
                )
            }
            )
        )
    });

    loadOrder$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadOrders),
            exhaustMap((action) => {
                return this.tripsService.getOrderList(action.token).pipe(
                    map((orders) => { return ordersLoadedSuccess({ orders }) }),
                    catchError((error: { message: string }) => { return of(ordersLoadedFailure({ errorMsg: error.message })) }
                    )
                )
            }
            )
        )
    });

    createOrder$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createOrder),
            mergeMap(action => {
                return this.tripsService.createOrder(action.rideId, action.seat, action.stationStart, action.stationEnd, action.token).pipe(
                    map(response => {
                        return createOrderSuccess(response);
                    }),
                    catchError((error: { message: string }) => {
                        return of(createStationFailure({ errorMsg: error.message }));
                    })
                );
            })
        )
    }
    );

    deleteOrder$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteOrder),
            mergeMap(action => {
                return this.tripsService.deleteOrder(action.orderId, action.token).pipe(
                    map(() => {
                        return orderDeletedSuccess();
                    }),
                    catchError((error: { message: string }) => {
                        return of(orderDeletedFailure({ errorMsg: error.message }));
                    })
                );
            })
        )
    }
    );

    loadUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadUsers),
            exhaustMap((action) => {
                return this.tripsService.getUsersList(action.token).pipe(
                    map((users) => { return usersLoadedSuccess({ users }) }),
                    catchError((error: { message: string }) => { return of(usersLoadedFailure({ errorMsg: error.message })) }
                    )
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
                return this.tripsService.getRouteById(action.id, action.token).pipe(
                    map((route) => {
                        return routeLoadedByIdSuccess({ route });
                    }),
                    catchError((error: { message: string }) => { return of(routeLoadedByIdFailure({ errorMsg: error.message })) }
                    )
                );
            })
        )
    }
    );

    createStation$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createStation),
            mergeMap(action => {
                return this.tripsService.createStation(action.city, action.latitude, action.longitude, action.relations, action.token).pipe(
                    map(() => {
                        return createStationSuccess();
                    }),
                    catchError((error: { message: string }) => {
                        return of(createStationFailure({ errorMsg: error.message }));
                    })
                );
            })
        )
    }
    );



    createRide$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createRide),
            mergeMap(action => {
                return this.tripsService.createRide(action.routeId, action.segments, action.token).pipe(
                    map(id => {
                        return createRideSuccess(id);
                    }),
                    catchError((error: { message: string }) => {
                        return of(createRideFailure({ errorMsg: error.message }));
                    })
                );
            })
        )
    }
    );

    constructor(
        private actions$: Actions,
        private tripsService: TripsService
    ) { }
}