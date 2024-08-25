import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectOrders } from '../../core/store/trips/trips.selectors';
import { createOrder, loadOrders } from '../../core/store/trips/trips.actions';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
})
export class OrdersPageComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(
      createOrder({
        rideId: 1,
        seat: 1,
        stationStart: 1,
        stationEnd: 2,
      }),
    );

    // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(loadOrders());

    // eslint-disable-next-line @ngrx/no-store-subscription
    this.store.select(selectOrders).subscribe((orders) => {
      console.log('Current User:', orders);
    });
  }
}
