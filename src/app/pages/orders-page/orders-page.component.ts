import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, Subject, switchMap, take, takeUntil } from 'rxjs';
import { formatDate } from '@angular/common';
import {
  selectCarriages,
  selectOrders,
  selectStations,
  selectUsers,
} from '../../core/store/trips/trips.selectors';
import {
  deleteOrder,
  loadCarriages,
  loadDataForOrdersView,
  loadOrders,
  loadStations,
  loadUsers,
} from '../../core/store/trips/trips.actions';
import { Order } from '../../features/trips/models/order.model';
import { selectAccess } from '../../core/store/user/user.selectors';
import { Access } from '../../core/models/user.model';
import { Carriage } from '../../features/trips/models/carriage.model';
import { Station } from '../../features/trips/models/station.model';
import { OrderForView } from './order/order.component';
import { User } from '../../features/trips/models/user.model';

interface CarriageData {
  number: number;
  type: string;
  seat: number;
}

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
})
export class OrdersPageComponent implements OnInit, OnDestroy {
  orders$: Observable<Order[] | null> = this.store.select(selectOrders);

  stations$: Observable<Station[] | null> = this.store.select(selectStations);

  carriages$: Observable<Carriage[] | null> = this.store.select(selectCarriages);

  users$: Observable<User[] | null> = this.store.select(selectUsers);

  role$!: Observable<Access>;

  ordersForView!: OrderForView[];

  warningOrderId: number | null = null;

  private destroy$ = new Subject<void>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.role$ = this.store.select(selectAccess);

    this.role$
      .pipe(
        switchMap((role) => {
          if (role !== 'guest') {
            this.store.dispatch(loadDataForOrdersView({ role }));
          }
          return combineLatest([this.orders$, this.stations$, this.carriages$, this.users$]);
        }),
        map(([orders, stations, carriages, users]) => {
          console.log('stations', stations);
          return this.TransformOrders(orders, stations, carriages, users);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((result) => {
        this.ordersForView = result;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private TransformOrders(
    orders: Order[] | null,
    stations: Station[] | null,
    carriages: Carriage[] | null,
    users: User[] | null,
  ): OrderForView[] {
    if (!orders || !stations || !carriages || !users) {
      return [];
    }

    return orders.map((order) => {
      const carriageData = this.getCarriageData(order, carriages);
      return {
        id: order.id,
        user: this.getUserName(order.userId, users),
        startStation: this.getStationName(order.stationStart, stations),
        startTime: this.getStartData(order),
        endStation: this.getStationName(order.stationEnd, stations),
        endTime: this.getEndData(order),
        durationTrip: this.calculateDuration(order),
        numberCarriage: carriageData.number,
        typeCarriage: carriageData.type,
        numberSeat: carriageData.seat,
        price: this.calculateTotalPrice(order, carriageData.type),
        status: order.status,
      };
    });
  }

  private getStationName(number: number, stations: Station[]): string {
    const currentStation = stations.find((station) => {
      return station.id === number;
    });
    return currentStation ? currentStation.city : 'Unknown Station';
  }

  private calculateDuration(order: Order): string {
    const startStationIndex = order.path.indexOf(order.stationStart);
    const startTime = order.schedule.segments[startStationIndex].time[0];
    const startDate = new Date(startTime);

    const endStationIndex = order.path.indexOf(order.stationEnd);
    const endTime = order.schedule.segments[endStationIndex - 1].time[1];
    const endDate = new Date(endTime);

    const durationMs = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  private calculateTotalPrice(order: Order, type: string): string {
    let totalPrice = 0;
    order.schedule.segments.forEach((segment) => {
      totalPrice += segment.price[type];
    });
    return (totalPrice / 100).toFixed(2);
  }

  private getCarriageData(order: Order, carriages: Carriage[] | null): CarriageData {
    let seat = order.seatId;
    let number = 1;
    let type = '';

    if (!carriages) {
      return { number: 0, type: '', seat: 0 };
    }

    order.carriages.forEach((carriage) => {
      const carriageType = carriages.find((item) => {
        return item.code === carriage;
      });
      if (carriageType) {
        type = carriageType.name;
        const countSeats =
          carriageType.rows * carriageType.rightSeats + carriageType.rows * carriageType.leftSeats;

        if (seat > countSeats) {
          number += 1;
          seat -= countSeats;
        }
      }
    });

    return { number, type, seat };
  }

  private getUserName(userId: number, users: User[] | null): string {
    if (users) {
      const user = users.find((item) => {
        return item.id === userId;
      });
      if (user) return user.name !== '' ? user.name : userId.toString();
    }
    return '';
  }

  private getStartData(order: Order): string {
    const startStationIndex = order.path.indexOf(order.stationStart);
    const startTime = order.schedule.segments[startStationIndex].time[0];
    return formatDate(new Date(startTime), 'MMMM dd hh:mm', 'en-US');
  }

  private getEndData(order: Order): string {
    const endStationIndex = order.path.indexOf(order.stationEnd);
    const endTime = order.schedule.segments[endStationIndex - 1].time[1];
    return formatDate(new Date(endTime), 'MMMM dd hh:mm', 'en-US');
  }

  trackByOrderId(index: number, order: OrderForView): number {
    return order.id;
  }

  onDeleteOrder(orderId: number): void {
    this.warningOrderId = orderId;
  }

  closeWarning(): void {
    this.warningOrderId = null;
  }

  deleteOrder(orderId: number): void {
    this.warningOrderId = null;
    this.store.dispatch(deleteOrder({ orderId }));
    this.role$
      .pipe(
        take(1),
        switchMap((role) => {
          if (role === 'manager') {
            this.store.dispatch(loadOrders({ all: true }));
          } else if (role === 'user') {
            this.store.dispatch(loadOrders({}));
          }
          return [];
        }),
      )
      .subscribe();
  }
}
