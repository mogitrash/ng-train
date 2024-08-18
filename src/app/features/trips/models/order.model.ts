export interface Order {
    id: number,
    rideId: number,
    routeId: number,
    seatId: number,
    userId: number,
    status: 'active' | 'completed' | 'rejected' | 'canceled',
    path: number[],
    carriages: string[],
    schedule: {
        segments: {
            time: [string, string],
            price: { [key: string]: number }
        }[]
    }
}