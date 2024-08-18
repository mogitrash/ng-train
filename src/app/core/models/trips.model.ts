import { Carriage } from "../../features/trips/models/carriage.model";
import { Order } from "../../features/trips/models/order.model";
import { Route } from "../../features/trips/models/route.model";
import { Station } from "../../features/trips/models/station.model";
import { User } from "../../features/trips/models/user.model";

export interface TripsState {
    stations:Station[],
    routes:Route[],
    carriages:Carriage[],
    orders:Order[],
    rides:number[],
    users:User[]
}
