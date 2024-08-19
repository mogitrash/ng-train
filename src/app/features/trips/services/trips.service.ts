import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Station } from '../models/station.model';
import { Route } from '../models/route.model';
import { Carriage } from '../models/carriage.model';
import { Order } from '../models/order.model';
import { User } from '../models/user.model';
import { Ride } from '../models/ride.model';
import { SearchResponse } from '../models/searchResponse.model';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  constructor(private http: HttpClient) {
  }

  // search +
  search(fromLatitude: number, fromLongitude: number, toLatitude: number, toLongitude: number, time?: number) {

    const params: { fromLatitude: number, fromLongitude: number, toLatitude: number, toLongitude: number, time?: number } =
      { fromLatitude, fromLongitude, toLatitude, toLongitude };
    if (time !== undefined) {
      params.time = time;
    }
    return this.http.get<SearchResponse>(`/api/search`, { params });
  }

  // Get station list +
  getStationList() {
    return this.http.get<Station[]>('/api/station');
  }

  // Create new station +
  createStation(city: string, latitude: number, longitude: number, relations: number[]) {


    return this.http.post<{ id: number }>('/api/station', {
      city,
      latitude,
      longitude,
      relations
    });
  }

  // Delete station +
  deleteStation(id: number) {

    return this.http.delete(`/api/station/${id}`);
  }

  // Get routes +
  getRouteList() {
    return this.http.get<Route[]>('/api/route');
  }

  // Create route +
  createRoute(path: number[], carriages: string[]) {

    return this.http.post<{ id: number }>('/api/route', { path, carriages });
  }

  // Update route +
  updateRoute(id: number, path: number[], carriages: string[]) {

    return this.http.put<{ id: number }>(`/api/route/${id}`, { path, carriages });
  }

  // Delete route +
  deleteRoute(id: number) {

    return this.http.delete<{ id: number }>(`/api/route/${id}`);
  }

  // Get carriage list +
  getCarriageList() {
    return this.http.get<Carriage[]>('/api/carriage');
  }

  // Create carriage type +
  createCarriageType(name: string, rows: number, leftSeats: number, rightSeats: number) {

    return this.http.post<{ code: string }>('/api/carriage', { name, rows, leftSeats, rightSeats });
  }

  // Update carriage type +
  updateCarriageType(code: string, name: string, rows: number, leftSeats: number, rightSeats: number) {

    return this.http.put<{ code: string }>(`/api/carriage/${code}`, { name, rows, leftSeats, rightSeats });
  }

  // Get orders +
  getOrderList(all?: boolean) {

    const params: { all?: boolean } = {};
    if (all !== undefined) {
      params.all = all;
    }
    return this.http.get<Order[]>('/api/order', { params });
  }

  // Make order +
  createOrder(rideId: number, seat: number, stationStart: number, stationEnd: number) {

    return this.http.post<{ id: string }>('/api/order', { rideId, seat, stationStart, stationEnd });
  }

  // To cancel active order -
  deleteOrder(orderId: number) {

    return this.http.delete(`/api/order/${orderId}`);
  }

  // Get users +
  getUsersList() {

    return this.http.get<User[]>('/api/users');
  }

  // Get route information +
  getRouteById(id: number) {

    return this.http.get<Route>(`/api/route/${id}`);
  }

  // get ride infromation +
  getRideById(rideId: number) {

    return this.http.get<Ride>(`/api/search/${rideId}`);
  }

  // Create ride +
  createRide(routeId: number, segments: {
    time: [string, string],
    price: { [key: string]: number }
  }[]) {

    if (!Array.isArray(segments)) {
      throw new TypeError('data.segments is not an array');
    }
    return this.http.post<{ id: number }>(`/api/route/${routeId}/ride`, { segments });
  }


  // Update ride +
  updateRide(routeId: number, rideId: number, segments: {
    time: [string, string],
    price: { [key: string]: number }
  }[]) {
    return this.http.put(`/api/route/${routeId}/ride/${rideId}`, { segments });
  }

  public signIn(email: string, password: string) {
    return this.http.post<{ token: string }>('/api/signin', { email, password })
  }

}
