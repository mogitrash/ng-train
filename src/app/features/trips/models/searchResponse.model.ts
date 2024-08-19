import { Route } from "./route.model";

export interface SearchResponse {
  from: {
    stationId: number,
    city: string,
    geolocation: { latitude: number, longitude: number },
  },
  to: {
    stationId: number,
    city: string,
    geolocation: { latitude: number, longitude: number },
  },
  routes: Route[]
}
