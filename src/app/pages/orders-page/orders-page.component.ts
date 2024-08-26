import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectOrders } from '../../core/store/trips/trips.selectors';
import { loadOrders } from '../../core/store/trips/trips.actions';
import { Order } from '../../features/trips/models/order.model';
import { selectAccess } from '../../core/store/user/user.selectors';
import { Access } from '../../core/models/user.model';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
})
export class OrdersPageComponent implements OnInit {
  orders$: Observable<Order[] | null> = this.store.select(selectOrders);

  role$!: Observable<Access>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.role$ = this.store.select(selectAccess);
    // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    /*
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
        seat: 10,
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
    this.store.dispatch(loadOrders({ all: true }));
  }
}
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
