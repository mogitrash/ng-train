import { Component, Input, OnInit } from '@angular/core';
import { Carriage } from '../../../../features/trips/models/carriage.model';
import { Seat, SeatStatus } from '../../carriage/carriage.component';

@Component({
  selector: 'app-carriage-simple',
  templateUrl: './carriage-simple.component.html',
  styleUrl: './carriage-simple.component.scss',
})
export class CarriageSimpleComponent implements OnInit {
  @Input({ required: true }) carriage!: Carriage;

  protected seats: Seat[] = [];

  countOfSeats!: number;

  ngOnInit(): void {
    this.countOfSeats = this.calcCountTotalNumberOfSeats();
    this.createSeats();
  }

  private createSeats() {
    for (let i = 0; i < this.countOfSeats; i += 1) {
      const seat: Seat = {
        numberInCarriage: i + 1,
        status: SeatStatus.FREE,
      };
      this.seats.push(seat);
    }
  }

  private calcCountTotalNumberOfSeats(): number {
    return (
      this.carriage.rows * this.carriage.leftSeats + this.carriage.rows * this.carriage.rightSeats
    );
  }

  trackBySeat(index: number, seat: Seat): number {
    return seat.numberInCarriage;
  }
}
