import { Component } from '@angular/core';
import { Carriage } from '../../features/trips/models/carriage.model';
import { CarriageSelectedSeats } from '../../shared/components/carriage/carriage.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  carriage: Carriage = {
    code: '123',
    name: 'mmm',
    rows: 16,
    leftSeats: 2,
    rightSeats: 3,
  };

  carriageNumber: number = 1;

  occupiedSeat: number[] = [1, 3, 4, 5, 6, 7];

  onSelectedSeatsChange(seatsData: CarriageSelectedSeats) {
    console.log('Selected seats:', seatsData.selectedSeats);
  }
}
