export interface Segment {
  time: [string, string];
  price: { [key: string]: number };
  occupiedSeats: number[];
}
