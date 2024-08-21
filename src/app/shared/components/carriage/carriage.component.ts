import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum SeatStatus {
  FREE = 'free',
  OCCUPIED = 'occupied',
  BOOKED = 'booked',
}
export interface Seat {
  numberInCarriage: number;
  status: SeatStatus.FREE | SeatStatus.OCCUPIED | SeatStatus.BOOKED;
}

export interface CarriageSelectedSeats {
  carriageNumber: number;
  carriageCode: string;
  carriageName: string;
  selectedSeats: Seat[];
}

@Component({
  selector: 'app-carriage',
  templateUrl: './carriage.component.html',
  styleUrl: './carriage.component.scss',
})
export class CarriageComponent implements OnInit {
  // code - auto-generated unique code for item. User to update carriage.
  @Input() code!: string;

  // name - unique name of the carriage type.
  @Input() name!: string;

  // rows - number of rows
  @Input() rows!: number;

  // leftSeats - - the number of seats to the left of the aisle in a row (2 in example below)
  @Input() leftSeats!: number;

  // rightSeats - the number of seats to the right of the aisle in a row (3 in example below)
  @Input() rightSeats!: number;

  // is calculated by the index of the carriage in the train+1
  @Input() carriageNumber!: number;

  // is calculated by the index of occupied seats in the train based on the number and order of carriages and the number of seats in each of them
  @Input() occupiedSeat!: number[];

  // passing data on selected places to the parent component for order placement
  @Output() selectedSeatsChange = new EventEmitter<CarriageSelectedSeats>();

  private countOfSeats!: number;

  protected countOfFreeSeats!: number;

  protected seats: Seat[] = [];

  public selectedSeats: Seat[] = [];

  public seatStatus = SeatStatus;

  ngOnInit(): void {
    this.countOfSeats = this.calcCountTotalNumberOfSeats();
    this.countOfFreeSeats = this.calcCountFreeOfSeats();
    this.createSeats();
  }

  private calcCountTotalNumberOfSeats(): number {
    return this.rows * this.leftSeats + this.rows * this.rightSeats;
  }

  private calcCountFreeOfSeats(): number {
    return this.countOfSeats - this.occupiedSeat.length;
  }

  private createSeats() {
    for (let i = 0; i < this.countOfSeats; i += 1) {
      const seat: Seat = {
        numberInCarriage: i + 1,
        status: this.occupiedSeat.some((item) => {
          return item === i + 1;
        })
          ? SeatStatus.OCCUPIED
          : SeatStatus.FREE,
      };
      this.seats.push(seat);
    }
  }

  public onSeatSelectionChange(seat: Seat, event: Event) {
    const currentSeat = seat;
    const { checked } = event.target as HTMLInputElement;
    if (checked) {
      currentSeat.status = SeatStatus.BOOKED;
      this.selectedSeats.push(seat);
    } else {
      currentSeat.status = SeatStatus.FREE;
      this.selectedSeats = this.selectedSeats.filter((item) => {
        return item.numberInCarriage !== seat.numberInCarriage;
      });
    }

    // saving the location data for ordering
    // maybe some of them will turn out to be unnecessary in the future.
    const selectedSeatData: CarriageSelectedSeats = {
      carriageNumber: this.carriageNumber,
      carriageCode: this.code,
      carriageName: this.name,
      selectedSeats: this.selectedSeats,
    };

    this.selectedSeatsChange.emit(selectedSeatData);
  }
}
