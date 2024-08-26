import { Component, Input } from '@angular/core';

export interface OrderForView {
  startStation: string;
  startTime: string;

  endStation: string;

  endTime: string;

  durationTrip: string;

  typeCarriage: string;

  numberCarriage: number;

  numberSeat: number;

  price: string;

  status: string;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  @Input({ required: true }) order!: OrderForView;

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

  delete() {
    this.price = '60';
  }
}
