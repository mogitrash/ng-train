import { Component } from '@angular/core';
import { Seat } from '../../shared/components/carriage/carriage.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  private selectedSeatsMap = new Map<number, Seat>();

  selectedSeats: Seat[] = [];

  onSelectedSeatsChange(seats: Seat[]) {
    this.selectedSeatsMap.clear();
    seats.forEach((seat) => {
      return this.selectedSeatsMap.set(seat.numberInCarriage, seat);
    });

    this.selectedSeats = Array.from(this.selectedSeatsMap.values());
    console.log('Выбранные места:', this.selectedSeats);
  }
}
