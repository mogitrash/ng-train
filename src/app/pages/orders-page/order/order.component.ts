import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ActionsTrip from '../../../core/store/trips/trips.actions';
// import { Order } from '../../../features/trips/models/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  // @Input() order!: Order;

  /*
 - Станция начала поездки
- Время начала поездки - "MMMM dd hh:mm".
- Станция конечной поездки
- Время конечной поездки - "MMMM dd hh:mm".
- Продолжительность поездки - отображается в часах и минутах
- Тип вагона
- Номер вагона
- Номер места
- Цена - $50.00
*/
  startStation: string = 'Station Start';

  startTime: string = 'December 25 03:45';

  endStation: string = 'Station End';

  endTime: string = 'December 25 06:12';

  durationTrip: string = '02:37';

  typeCarriage: string = 'standard';

  numberCarriage: number = 1;

  numberSeat: number = 10;

  price: string = '50.00';

  status: string = 'active';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      ActionsTrip.createOrder({ rideId: 1, seat: 2, stationStart: 1, stationEnd: 6 }),
    );
  }

  delete() {
    this.price = '60';
  }
}
