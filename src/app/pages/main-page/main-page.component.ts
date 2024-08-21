import { Component } from '@angular/core';
import {
  CarriageSelectedSeats,
  Seat,
} from '../../shared/components/carriage/carriage.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  selectedSeats: Seat[] = [];

  carriages = [
    {
      code: '1234',
      name: 'Wagon 1',
      rows: 16,
      leftSeats: 2,
      rightSeats: 3,
      carriageNumber: 1,
      occupiedSeat: [2, 6, 7, 8, 10],
    },
    {
      code: '5678',
      name: 'Wagon 2',
      rows: 16,
      leftSeats: 2,
      rightSeats: 3,
      carriageNumber: 2,
      occupiedSeat: [1, 3, 5, 9],
    },
  ];

  onSelectedSeatsChange(seatsData: CarriageSelectedSeats) {
    // Обновляем массив выбранных мест, исключая дублирование
    this.selectedSeats = seatsData.selectedSeats;

    // Логируем выбранные места для проверки
    console.log('Выбранные места:', this.selectedSeats);
  }
}
