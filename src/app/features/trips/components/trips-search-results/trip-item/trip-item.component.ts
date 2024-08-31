import { Store } from '@ngrx/store';
import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { loadRideById } from '../../../../../core/store/trips/trips.actions';
import { selectRides, selectStations } from '../../../../../core/store/trips/trips.selectors';
import { Ride } from '../../../models/ride.model';
import { Segment } from '../../../models/segment.model';
import { Station } from '../../../models/station.model';
import { RideInfo } from '../../../../../core/models/trips.model';

@Component({
  selector: 'app-trip-item',
  templateUrl: './trip-item.component.html',
  styleUrl: './trip-item.component.scss',
})
export class TripItemComponent implements OnInit {
  @Input({ required: true }) rideItemInfo!: RideInfo;

  public rides$ = this.store.select(selectRides);

  private stations$ = this.store.select(selectStations);

  private stations!: Station[];

  private ride?: Ride;

  public rideStartDate!: Date;

  public rideEndDate!: Date;

  public rideDuration!: string;

  public rideStartStation!: string;

  public rideEndStation!: string;

  public routeStartStation!: Station;

  public routeEndStation!: Station;

  constructor(
    private store: Store,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadRideById({ rideId: this.rideItemInfo.rideId }));

    const ridesSubscription = this.rides$.subscribe((rides) => {
      this.ride = rides.find((ride) => {
        return ride.rideId === this.rideItemInfo.rideId;
      });

      if (this.ride) {
        const rideSegments = this.getRideSegments(this.ride);

        this.initViewData(rideSegments);
      }
    });

    const stationsSubscription = this.stations$.subscribe((stations) => {
      this.stations = stations;
    });

    this.destroyRef.onDestroy(() => {
      ridesSubscription.unsubscribe();
      stationsSubscription.unsubscribe();
    });
  }

  private initViewData(rideSegments: Segment[]) {
    const [firstSegment] = rideSegments;
    const lastSegment = rideSegments.at(rideSegments.length - 1)!;

    this.rideStartDate = new Date(firstSegment.time[0]);
    this.rideEndDate = new Date(lastSegment.time[1]);

    this.initRideDuration();

    this.rideStartStation = this.rideItemInfo.from.city;
    this.rideEndStation = this.rideItemInfo.to.city;

    if (this.stations) {
      this.initRouteStations();
    }
  }

  private initRouteStations() {
    if (this.ride) {
      const { path } = this.ride;

      this.routeStartStation = this.stations.find((station) => {
        return station.id === this.ride?.path.at(0);
      })!;
      this.routeEndStation = this.stations.find((station) => {
        return station.id === this.ride?.path.at(path.length - 1);
      })!;
    }
  }

  private initRideDuration() {
    const durationMs = this.rideEndDate.getTime() - this.rideStartDate.getTime();

    const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
    const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    this.rideDuration = `${String(durationHours).padStart(2, '0')}:${String(durationMinutes).padStart(2, '0')}`;
  }

  private getRideSegments(ride: Ride): Segment[] {
    const { path, schedule } = ride;
    const { segments } = schedule;

    const firstStationId = path.findIndex((station) => {
      return this.rideItemInfo.from.stationId === station;
    });
    const lastStationId = path.findIndex((station) => {
      return this.rideItemInfo.to.stationId === station;
    });

    return segments.slice(firstStationId, lastStationId);
  }
}
