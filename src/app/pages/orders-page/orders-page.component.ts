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
    /*
    // ________________

    // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(loadRideById({ rideId: 1 }));

    // eslint-disable-next-line @ngrx/no-store-subscription
    this.store.select(selectRides).subscribe((rides) => {
      console.log('Rides:', rides);
    });

    // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(
      createOrder({
        rideId: 1,
        seat: 180,
        stationStart: 100,
        stationEnd: 7,
      }),
    );

    // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(
      createOrder({
        rideId: 1,
        seat: 140,
        stationStart: 20,
        stationEnd: 3,
      }),
    );
    */

    // ________________
    this.role$ = this.store.select(selectAccess);
    // Dispatch all actions needed to fetch data
    // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(loadOrders({ all: true }));
    // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(loadStations());
    // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(loadCarriages());

    // Use combineLatest to combine all observables
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
      console.log(segment.price[type]);
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
}
/*
// eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(
      createOrder({
        rideId: 1,
        seat: 2,
        stationStart: 3,
        stationEnd: 20,
      }),
    );

     // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(
      createOrder({
        rideId: 2,
        seat: 140,
        stationStart: 3,
        stationEnd: 20,
      }),
    );

     // eslint-disable-next-line @ngrx/no-store-subscription
    this.store.select(selectRides).subscribe((rides) => {
      console.log('Rides:', rides);
    });

    // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(loadRideById({ rideId: 2 }));

    // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(loadCarriages());

     // eslint-disable-next-line @ngrx/no-store-subscription
    this.store.select(selectCarriages).subscribe((carriages) => {
      console.log('Carriages:', carriages);
    });
    */

// eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially

/*
const response = {
  id: 2,
  userId: 8,
  routeId: 1,
  rideId: 2,
  seatId: 10,
  path: [3, 57, 11, 73, 23, 9, 2, 31, 17, 46, 80, 82, 4, 72, 93, 79, 50, 10, 90, 20],
  carriages: [
    'carriage4',
    'carriage4',
    'carriage4',
    'carriage2',
    'carriage3',
    'carriage3',
    'carriage4',
    'carriage4',
    'carriage2',
    'carriage1',
    'carriage2',
    'carriage3',
    'carriage2',
    'carriage2',
  ],
  stationStart: 3,
  stationEnd: 20,
  schedule: {
    segments: [
      {
        time: ['2024-08-25T13:30:41.463Z', '2024-08-27T22:07:41.463Z'],
        price: {
          carriage4: 1318,
          carriage2: 1733,
          carriage3: 294,
          carriage1: 724,
        },
      },
      {
        time: ['2024-08-27T22:52:41.463Z', '2024-08-30T10:57:41.463Z'],
        price: {
          carriage4: 2325,
          carriage2: 462,
          carriage3: 705,
          carriage1: 1565,
        },
      },
      {
        time: ['2024-08-30T11:04:41.463Z', '2024-09-02T03:12:41.463Z'],
        price: {
          carriage4: 1296,
          carriage2: 2367,
          carriage3: 1726,
          carriage1: 222,
        },
      },
      {
        time: ['2024-09-02T03:38:41.463Z', '2024-09-05T15:00:41.463Z'],
        price: {
          carriage4: 1734,
          carriage2: 2103,
          carriage3: 214,
          carriage1: 1144,
        },
      },
      {
        time: ['2024-09-05T15:49:41.463Z', '2024-09-08T20:59:41.463Z'],
        price: {
          carriage4: 1522,
          carriage2: 133,
          carriage3: 1947,
          carriage1: 1190,
        },
      },
      {
        time: ['2024-09-08T21:41:41.463Z', '2024-09-11T18:39:41.463Z'],
        price: {
          carriage4: 1651,
          carriage2: 1502,
          carriage3: 1141,
          carriage1: 1281,
        },
      },
      {
        time: ['2024-09-11T19:18:41.463Z', '2024-09-14T23:52:41.463Z'],
        price: {
          carriage4: 595,
          carriage2: 1550,
          carriage3: 859,
          carriage1: 2424,
        },
      },
      {
        time: ['2024-09-15T00:31:41.463Z', '2024-09-18T03:52:41.463Z'],
        price: {
          carriage4: 794,
          carriage2: 914,
          carriage3: 397,
          carriage1: 1755,
        },
      },
      {
        time: ['2024-09-18T04:45:41.463Z', '2024-09-20T19:29:41.463Z'],
        price: {
          carriage4: 2339,
          carriage2: 714,
          carriage3: 123,
          carriage1: 365,
        },
      },
      {
        time: ['2024-09-20T20:03:41.463Z', '2024-09-24T01:06:41.463Z'],
        price: {
          carriage4: 1507,
          carriage2: 1478,
          carriage3: 2206,
          carriage1: 166,
        },
      },
      {
        time: ['2024-09-24T01:58:41.463Z', '2024-09-27T23:20:41.463Z'],
        price: {
          carriage4: 622,
          carriage2: 1864,
          carriage3: 692,
          carriage1: 2115,
        },
      },
      {
        time: ['2024-09-28T00:02:41.463Z', '2024-09-30T22:42:41.463Z'],
        price: {
          carriage4: 2261,
          carriage2: 1674,
          carriage3: 545,
          carriage1: 1964,
        },
      },
      {
        time: ['2024-09-30T23:32:41.463Z', '2024-10-04T09:06:41.463Z'],
        price: {
          carriage4: 501,
          carriage2: 1886,
          carriage3: 451,
          carriage1: 1957,
        },
      },
      {
        time: ['2024-10-04T09:19:41.463Z', '2024-10-05T17:07:41.463Z'],
        price: {
          carriage4: 845,
          carriage2: 2254,
          carriage3: 1165,
          carriage1: 1715,
        },
      },
      {
        time: ['2024-10-05T17:52:41.463Z', '2024-10-07T18:48:41.463Z'],
        price: {
          carriage4: 633,
          carriage2: 1623,
          carriage3: 307,
          carriage1: 1194,
        },
      },
      {
        time: ['2024-10-07T19:01:41.463Z', '2024-10-10T20:06:41.462Z'],
        price: {
          carriage4: 1777,
          carriage2: 1210,
          carriage3: 1852,
          carriage1: 1003,
        },
      },
      {
        time: ['2024-10-10T20:42:41.462Z', '2024-10-11T23:40:41.462Z'],
        price: {
          carriage4: 1177,
          carriage2: 509,
          carriage3: 332,
          carriage1: 1048,
        },
      },
      {
        time: ['2024-10-11T23:48:41.462Z', '2024-10-15T07:33:41.462Z'],
        price: {
          carriage4: 1997,
          carriage2: 657,
          carriage3: 1756,
          carriage1: 427,
        },
      },
      {
        time: ['2024-10-15T08:18:41.462Z', '2024-10-19T00:35:41.462Z'],
        price: {
          carriage4: 1079,
          carriage2: 1380,
          carriage3: 101,
          carriage1: 539,
        },
      },
    ],
  },
  status: 'active',
};
*/
