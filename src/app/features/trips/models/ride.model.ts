export interface Ride {
  rideId: number,
  path: number[],
  carriages: string[],
  schedule: {
    rideId: number,
    segments: {
      time: [string, string],
      price: { [key: string]: number },
      occupiedSeats: number[]
    }[]
  }[]
}
