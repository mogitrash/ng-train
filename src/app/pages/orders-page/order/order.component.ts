import { Component, Input, OnInit } from '@angular/core';

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
export class OrderComponent implements OnInit {
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
  startStation!: string;

  startTime!: string;

  endStation!: string;

  endTime!: string;

  durationTrip!: string;

  typeCarriage!: string;

  numberCarriage!: number;

  numberSeat!: number;

  price!: string;

  status!: string;

  ngOnInit(): void {
    this.startStation = this.order.startStation;

    this.startTime = this.order.startTime;

    this.endStation = this.order.endStation;

    this.endTime = this.order.endTime;

    this.durationTrip = this.order.durationTrip;

    this.typeCarriage = this.order.typeCarriage;

    this.numberCarriage = this.order.numberCarriage;

    this.numberSeat = this.order.numberSeat;

    this.price = this.order.price;

    this.status = this.order.status;
  }

  delete() {
    this.status = 'cancelled';
  }
}
