export interface Route {
    id: number,
    path: number[],
    carriages: string[],
    schedule?: {
        rideId: number,
        segments: {
            time: [string, string],
            price: { [key: string]: number }
        }[]
    }[]
}