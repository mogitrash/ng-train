import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import {
  selectCarriages,
  selectOrders,
  selectRides,
  selectStations,
} from '../../core/store/trips/trips.selectors';
import {
  createOrder,
  deleteOrder,
  loadCarriages,
  loadOrders,
  loadRideById,
  loadStations,
} from '../../core/store/trips/trips.actions';
import { Order } from '../../features/trips/models/order.model';
import { selectAccess } from '../../core/store/user/user.selectors';
import { Access } from '../../core/models/user.model';
import { Carriage } from '../../features/trips/models/carriage.model';
import { Station } from '../../features/trips/models/station.model';
import { OrderForView } from './order/order.component';

interface CarriageData {
  number: number;
  type: string;
  seat: number;
}
@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
})
export class OrdersPageComponent implements OnInit {
  orders$: Observable<Order[] | null> = this.store.select(selectOrders);

  stations$: Observable<Station[] | null> = this.store.select(selectStations);

  carriages$: Observable<Carriage[] | null> = this.store.select(selectCarriages);

  role$!: Observable<Access>;

  ordersForView!: OrderForView[];

  constructor(private store: Store) {}

  ngOnInit(): void {
    /**/
    // ________________

    // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(createOrder({ rideId: 1, seat: 1, stationStart: 41, stationEnd: 4 }));

    // this.store.dispatch(createOrder({ rideId: 5, seat: 108, stationStart: 79, stationEnd: 71 }));

    // ________________

    this.role$ = this.store.select(selectAccess);

    // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(loadStations());
    this.role$.subscribe((role) => {
      if (role === 'manager') this.store.dispatch(loadOrders({ all: true }));
      else if (role === 'user') this.store.dispatch(loadOrders({}));
    });
    this.store.dispatch(loadCarriages());

    combineLatest([this.orders$, this.stations$, this.carriages$])
      .pipe(
        map(([orders, stations, carriages]) => {
          return this.TransformOrders(orders, stations, carriages);
        }),
      )
      .subscribe((result) => {
        this.ordersForView = result;
      });
  }

  private TransformOrders(
    orders: Order[] | null,
    stations: Station[] | null,
    carriages: Carriage[] | null,
  ) {
    const newOrders: OrderForView[] = orders!.map((order) => {
      return {
        id: order.id,
        startStation: this.getStationName(order.stationStart, stations) as string,
        startTime: formatDate(
          new Date(order.schedule.segments[0].time[0]),
          'MMMM dd hh:mm',
          'en-US',
        ) as string,
        endStation: this.getStationName(order.stationEnd, stations) as string,
        endTime: formatDate(
          new Date(order.schedule.segments[order.schedule.segments.length - 1].time[1]),
          'MMMM dd hh:mm',
          'en-US',
        ) as string,
        durationTrip: this.calculateDuration(
          new Date(order.schedule.segments[0].time[0]),
          new Date(order.schedule.segments[order.schedule.segments.length - 1].time[1]),
        ) as string,
        numberCarriage: this.getCarriageData(order, carriages).number as number,
        typeCarriage: this.getCarriageData(order, carriages).type as string,
        numberSeat: this.getCarriageData(order, carriages).seat as number,
        price: this.calculateTotalPrice(
          order,
          this.getCarriageData(order, carriages).type,
        ) as string,
        status: order.status as string,
      };
    });
    return newOrders;
  }

  private getStationName(number: number, stations: Station[] | null) {
    if (stations != null)
      return stations.find((station) => {
        return station.id === number;
      })?.city;
    return '';
  }

  private calculateDuration(startDate: Date, endDate: Date): string {
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

    if (carriages === null) {
      return {
        number: 0,
        type: '',
        seat: 0,
      };
    }

    if (!Array.isArray(order.carriages)) {
      return {
        number: 0,
        type: '',
        seat: 0,
      };
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

    return {
      number,
      type,
      seat,
    };
  }

  trackByOrderId(index: number, order: OrderForView): number {
    return order.id;
  }

  onDeleteOrder(orderId: number): void {
    console.log(orderId);
    this.store.dispatch(deleteOrder({ orderId }));
    // Dispatch loadOrders after deleting to refresh the list
    this.role$.subscribe((role) => {
      if (role === 'manager') this.store.dispatch(loadOrders({ all: true }));
      else if (role === 'user') this.store.dispatch(loadOrders({}));
    });
  }
}
