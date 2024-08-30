import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Carriage } from '../../../../features/trips/models/carriage.model';
import { Seat, SeatStatus } from '../../carriage/carriage.component';

@Component({
  selector: 'app-carriage-card',
  templateUrl: './carriage-card.component.html',
  styleUrl: './carriage-card.component.scss',
})
export class CarriageCardComponent implements OnInit {
  @Input({ required: true }) carriage!: Carriage;

  @Input({ required: true }) isDisabled!: boolean;

  @Output() updatedCarriage = new EventEmitter<Carriage>();

  countOfSeats!: number;

  protected seats: Seat[] = [];

  ngOnInit(): void {
    this.countOfSeats = this.calcCountTotalNumberOfSeats();
    this.createSeats();
  }

  private calcCountTotalNumberOfSeats(): number {
    return (
      this.carriage.rows * this.carriage.leftSeats + this.carriage.rows * this.carriage.rightSeats
    );
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

  trackBySeat(index: number, seat: Seat): number {
    return seat.numberInCarriage;
  }

  onUpdateCarriage(carriage: Carriage) {
    this.updatedCarriage.emit(carriage);
  }
}
