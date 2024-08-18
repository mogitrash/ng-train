import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Station } from '../models/station.model';
import { Route } from '../models/route.model';
import { Carriage } from '../models/carriage.model';
import { Order } from '../models/order.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  constructor(private http: HttpClient) {
  }

  // Get station list +
  getStationList() {
    return this.http.get<Station[]>('/api/station');
  }

  // Create new station +
  createStation(city: string, latitude: number, longitude: number, relations: number[], token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
    });

    return this.http.post<{ id: number }>('/api/station', {
      city,
      latitude,
      longitude,
      relations
    }, { headers });
  }

  // Delete station +
  deleteStation(id: number, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`/api/station/${id}`, { headers });
  }

  // Get routes +
  getRouteList() {
    return this.http.get<Route[]>('/api/route');
  }

  // Create route +
  createRoute(path: number[], carriages: string[], token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
    });
    return this.http.post<{ id: number }>('/api/route', { path, carriages }, { headers });
  }

  // Update route +
  updateRoute(id: number, path: number[], carriages: string[], token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
    });
    return this.http.put<{ id: number }>(`/api/route/${id}`, { path, carriages }, { headers });
  }

  // Delete route +
  deleteRoute(id: number, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
    });
    return this.http.delete<{ id: number }>(`/api/route/${id}`, { headers });
  }

  // Get carriage list +
  getCarriageList() {
    return this.http.get<Carriage[]>('/api/carriage');
  }

  // Create carriage type +
  createCarriageType(name: string, rows: number, leftSeats: number, rightSeats: number, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
    });
    return this.http.post<{ code: string }>('/api/carriage', { name, rows, leftSeats, rightSeats }, { headers });
  }

  // Update carriage type +
  updateCarriageType(code: string, name: string, rows: number, leftSeats: number, rightSeats: number, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
    });
    return this.http.put<{ code: string }>(`/api/carriage/${code}`, { name, rows, leftSeats, rightSeats }, { headers });
  }

  // Get orders +
  getOrderList(token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
    });
    return this.http.get<Order[]>('/api/order', { params: { all: true }, headers });
  }

  // Make order +
  createOrder(rideId: number, seat: number, stationStart: number, stationEnd: number, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
    });
    return this.http.post<{ id: string }>('/api/order', { rideId, seat, stationStart, stationEnd }, { headers });
  }

  // To cancel active order -
  deleteOrder(orderId:number, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
    });
    return this.http.delete<{ id: string }>(`/api/order/${orderId}`, { headers });
  }

  // Get users +
  getUsersList(token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
    });
    return this.http.get<User[]>('/api/users', { headers });
  }

  // Get route information +
  getRouteById(id: number, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
    });
    return this.http.get<Route>(`/api/route/${id}`, { headers });
  }

  // Create ride -
  createRide(routeId: number, segments: {
    time: [string, string],
    price: { [key: string]: number }
  }[], token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
    });
    return this.http.post<{ id: number }>(`/api/route/${routeId}/ride`, segments, { headers });
  }

  // Update ride -
  updateRide(routeId: number, rideId: number, segments: {
    time: [string, string],
    price: { [key: string]: number }
  }[], token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
    });
    return this.http.put(`/api/route/${routeId}/ride/${rideId}`, segments, { headers });
  }

  public signIn(email: string, password: string) {
    return this.http.post<{ token: string }>('/api/signin', { email, password })
  }
}
