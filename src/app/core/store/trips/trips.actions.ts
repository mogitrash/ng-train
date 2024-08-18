import { createAction, props } from "@ngrx/store";
import { Station } from "../../../features/trips/models/station.model";
import { Route } from "../../../features/trips/models/route.model";
import { Carriage } from "../../../features/trips/models/carriage.model";
import { Order } from "../../../features/trips/models/order.model";
import { User } from "../../../features/trips/models/user.model";

export const loadStations = createAction(
    '[Admin Page] Load Stations'
);
export const stationsLoadedSuccess = createAction(
    '[Admin Page] Stations Loaded Success',
    props<{ stations: Station[] }>()
);
export const stationsLoadedFailure = createAction(
    '[Admin Page] Stations Loaded Failure',
    props<{ errorMsg: string }>()
);
export const deleteStation = createAction(
    '[Admin Page] Delete Station', props<{ id: number, token: string }>()
);
export const stationDeleteSuccess = createAction(
    '[Admin Page] Station Deleted Success',
);
export const stationDeleteFailure = createAction(
    '[Admin Page] Station Deleted Failure',
    props<{ errorMsg: string }>()
);
export const loadRoutes = createAction(
    '[Admin Page] Load Routes'
);
export const routesLoadedSuccess = createAction(
    '[Admin Page] Routes Loaded Success',
    props<{ routes: Route[] }>()
);
export const routesLoadedFailure = createAction(
    '[Admin Page] Routes Loaded Failure',
    props<{ errorMsg: string }>()
);
export const createRoute = createAction(
    '[Admin Page] Create Routes', props<{ path: number[], carriages: string[], token: string }>()
);
export const routeCreatedSuccess = createAction(
    '[Admin Page] Route Created Success',
    props<{ id: number }>()
);
export const routeCreatedFailure = createAction(
    '[Admin Page] Route Created Failure',
    props<{ errorMsg: string }>()
);

export const updateRoute = createAction(
    '[Admin Page] Update Routes', props<{ id: number, path: number[], carriages: string[], token: string }>()
);
export const routeUpdatedSuccess = createAction(
    '[Admin Page] Route Updated Success',
    props<{ id: number }>()
);
export const routeUpdatedFailure = createAction(
    '[Admin Page] Route Updated Failure',
    props<{ errorMsg: string }>()
);

export const deleteRoute = createAction(
    '[Admin Page] Delete Routes', props<{ id: number, token: string }>()
);
export const routeDeletedSuccess = createAction(
    '[Admin Page] Route Deleted Success',
);
export const routeDeletedFailure = createAction(
    '[Admin Page] Route Deleted Failure',
    props<{ errorMsg: string }>()
);

export const loadCarriages = createAction(
    '[Admin Page] Load Carriages'
);
export const carriagesLoadedSuccess = createAction(
    '[Admin Page] Carriages Loaded Success',
    props<{ carriages: Carriage[] }>()
);
export const carriagesLoadedFailure = createAction(
    '[Admin Page] Carriages Loaded Failure',
    props<{ errorMsg: string }>()
);
export const createCarriage = createAction(
    '[Admin Page] Create Carriage', props<{ name: string, rows: number, leftSeats: number, rightSeats: number, token: string }>()
);
export const carriagesCreatedSuccess = createAction(
    '[Admin Page] Carriage Created Success',
    props<{ code: string }>()
);
export const carriagesCreatedFailure = createAction(
    '[Admin Page] Carriages Created Failure',
    props<{ errorMsg: string }>()
);
export const updateCarriage = createAction(
    '[Admin Page] Update Carriages', props<{ code: string, name: string, rows: number, leftSeats: number, rightSeats: number, token: string }>()
);
export const carriageUpdatedSuccess = createAction(
    '[Admin Page] Carriage Updated Success',
    props<{ code: string }>()
);
export const carriageUpdatedFailure = createAction(
    '[Admin Page] Carriage Updated Failure',
    props<{ errorMsg: string }>()
);
export const loadOrders = createAction(
    '[Admin Page] Load Orders', props<{ token: string }>()
);
export const ordersLoadedSuccess = createAction(
    '[Admin Page] Orders Loaded Success',
    props<{ orders: Order[] }>()
);
export const ordersLoadedFailure = createAction(
    '[Admin Page] Orders Loaded Failure',
    props<{ errorMsg: string }>()
);
export const deleteOrder = createAction(
    '[Admin Page] Delete Order', props<{ orderId:number,token: string }>()
);
export const orderDeletedSuccess = createAction(
    '[Admin Page] Order Deleted Success'
);
export const orderDeletedFailure = createAction(
    '[Admin Page] Order Deleted Failure',
    props<{ errorMsg: string }>()
);
export const loadUsers = createAction(
    '[Admin Page] Load Users', props<{ token: string }>()
);
export const usersLoadedSuccess = createAction(
    '[Admin Page] Users Loaded Success',
    props<{ users: User[] }>()
);
export const usersLoadedFailure = createAction(
    '[Admin Page] Users Loaded Failure',
    props<{ errorMsg: string }>()
);
export const loadRouteById = createAction(
    '[Admin Page] Load Route By Id', props<{ id: number, token: string }>()
);
export const routeLoadedByIdSuccess = createAction(
    '[Admin Page] Routes Loaded By Id Success',
    props<{ route: Route }>()
);
export const routeLoadedByIdFailure = createAction(
    '[Admin Page] Routes Loaded Failure',
    props<{ errorMsg: string }>()
);
export const createStation = createAction(
    '[Admin Page] Create Station', props<{ city: string, latitude: number, longitude: number, relations: number[], token: string }>()
);
export const createStationSuccess = createAction(
    '[Admin Page] Create Station Success', props<{ id: number }>
);
export const createStationFailure = createAction(
    '[Admin Page] Create Station Failure',
    props<{ errorMsg: string }>()
);
export const createRide = createAction(
    '[Admin Page] Create Ride', props<{
        routeId: number,
        segments: {
            time: [string, string],
            price: { [key: string]: number }
        }[]
        , token: string
    }>()
);
export const createRideSuccess = createAction(
    '[Admin Page] Create Ride Success', props<{ id: number }>()
);
export const createRideFailure = createAction(
    '[Admin Page] Create Ride Failure',
    props<{ errorMsg: string }>()
);
export const createOrder = createAction(
    '[Admin Page] Create Order', props<{
        rideId: number, seat: number, stationStart: number, stationEnd: number, token: string
    }>()
);
export const createOrderSuccess = createAction(
    '[Admin Page] Create Order Success', props<{ id: string }>()
);
export const createOrderFailure = createAction(
    '[Admin Page] Create Order Failure',
    props<{ errorMsg: string }>()
);