import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadRideById, loadStations } from '../../../../core/store/trips/trips.actions';
import { getTimeDifference } from '../../../../shared/utilities/getTimeDifference.utility';
import { Segment } from '../../models/segment.model';
import { TripRouteDialogComponent } from '../trips-search-results/trip-route-dialog/trip-route-dialog.component';
import { selectRides, selectStations } from '../../../../core/store/trips/trips.selectors';
import { Ride } from '../../models/ride.model';
import { Station } from '../../models/station.model';
import { getRidePath } from '../../../../shared/utilities/getRidePath.utility';
import { getRideSegments } from '../../../../shared/utilities/getRideSegmets.utility';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrl: './trip-detail.component.scss',
})
export class TripDetailComponent implements OnInit {
  public rides$ = this.store.select(selectRides);

  public rideStartDate!: Date;

  public rideEndDate!: Date;

  public rideDuration!: string;

  public rideStartCity!: string;

  public rideEndCity!: string;

  public routeStartStation!: Station;

  public routeEndStation!: Station;

  public prices!: [string, string][];

  private stations$ = this.store.select(selectStations);

  private stations!: Station[];

  private ride?: Ride;

  private rideId!: number;

  private fromId!: number;

  private toId!: number;

  constructor(
    private store: Store,
    private destroyRef: DestroyRef,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadStations());

    this.route.queryParams.subscribe((params) => {
      this.rideId = +params['rideId'];
      this.fromId = +params['fromId'];
      this.toId = +params['toId'];
    });

    this.store.dispatch(loadRideById({ rideId: this.rideId }));

    const ridesSubscription = this.rides$.subscribe((rides) => {
      this.ride = rides.find((ride) => {
        return ride.rideId === this.rideId;
      });
    });

    const stationsSubscription = this.stations$.subscribe((stations) => {
      this.stations = stations;

      if (this.ride && this.stations.length > 0) {
        const rideSegments = getRideSegments(this.ride, this.fromId, this.toId);

        this.initViewData(rideSegments);
      }
    });

    this.destroyRef.onDestroy(() => {
      ridesSubscription.unsubscribe();
      stationsSubscription.unsubscribe();
    });
  }

  public openRouteDialog() {
    this.dialog.open(TripRouteDialogComponent, {
      data: {
        rideId: this.ride?.rideId,
        segments: getRideSegments(this.ride!, this.fromId, this.toId),
        path: getRidePath(this.ride!, this.fromId, this.toId),
      },
    });
  }

  private initViewData(rideSegments: Segment[]) {
    const [firstSegment] = rideSegments;
    const lastSegment = rideSegments.at(rideSegments.length - 1)!;

    this.rideStartDate = new Date(firstSegment.time[0]);
    this.rideEndDate = new Date(lastSegment.time[1]);

    this.rideDuration = getTimeDifference(this.rideStartDate, this.rideEndDate);

    this.prices = Object.entries(firstSegment.price).map((price) => {
      return [price[0], (price[1] / 100).toFixed(2)];
    });

    if (this.stations) {
      this.initRouteStations();
      this.initRideStations();
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

  private initRideStations() {
    this.rideStartCity = this.stations.find((station) => {
      return station.id === this.fromId;
    })!.city;
    this.rideEndCity = this.stations.find((station) => {
      return station.id === this.toId;
    })!.city;
  }
}
