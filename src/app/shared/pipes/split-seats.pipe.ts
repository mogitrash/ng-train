import { Pipe, PipeTransform } from '@angular/core';
import { Seat } from '../components/carriage/carriage.component';

@Pipe({
  name: 'splitSeats',
})
export class SplitSeatsPipe implements PipeTransform {
  transform(seats: Seat[], left: number, right: number): Seat[][] {
    const rightArray: Seat[] = [];
    const leftArray: Seat[] = [];
    const totalSeatsInColum = left + right;

    seats.forEach((seat, index) => {
      const seatInColumIndex = index % totalSeatsInColum;

      if (seatInColumIndex < left) {
        leftArray.push(seat);
      } else {
        rightArray.push(seat);
      }
    });

    return [rightArray, leftArray];
  }
}
