import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TripsService } from './features/trips/services/trips.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'train';

  constructor(private service: TripsService, private store: Store) {
    /* this.service.signIn('admin@admin.com', 'my-password').subscribe(
      (authResponse) => {
        const { token } = authResponse;
        localStorage.setItem('token',token);
        this.store.dispatch(loadRideById({ rideId: 1 }));
        this.store.dispatch(loadStations());
        // this.store.dispatch(createOrder({rideId:2,seat:2,stationStart:61,stationEnd:50,token}));
        this.store.dispatch(loadOrders());
        this.store.dispatch(deleteOrder({orderId:1}))
        this.store.dispatch(loadSearch({ fromLatitude: -70.85841883771992, fromLongitude: -34.686683845696535, toLatitude: -76.28943646990568, toLongitude: -59.55076846049832 }));
      }
    ) */
  }
}
