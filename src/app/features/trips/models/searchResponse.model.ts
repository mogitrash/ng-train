import { Route } from "./route.model";
import { StationRequestInfo } from "./stationRequestInfo.model";

export interface SearchResponse {
  from: StationRequestInfo,
  to: StationRequestInfo,
  routes: Route[]
}
