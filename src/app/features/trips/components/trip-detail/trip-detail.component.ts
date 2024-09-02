import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  createOrder,
  loadCarriages,
  loadRideById,
  loadStations,
} from '../../../../core/store/trips/trips.actions';
import { getTimeDifference } from '../../../../shared/utilities/getTimeDifference.utility';
import { Segment } from '../../models/segment.model';
import { TripRouteDialogComponent } from '../trips-search-results/trip-route-dialog/trip-route-dialog.component';
import {
  selectCarriages,
  selectRides,
  selectStations,
} from '../../../../core/store/trips/trips.selectors';
import { Ride } from '../../models/ride.model';
import { Station } from '../../models/station.model';
import { getRidePath } from '../../../../shared/utilities/getRidePath.utility';
import { Carriage } from '../../models/carriage.model';
import { CarriageSelectedSeats } from '../../../../shared/components/carriage/carriage.component';
import { getRideSegments } from '../../../../shared/utilities/getRideSegments.utility';

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

  public prices: [string, string][] = [];

  public carriages!: Carriage[];

  public rideSegments!: Segment[];

  public isSeatsSelected: boolean = false;

  private carriages$ = this.store.select(selectCarriages);

  private stations$ = this.store.select(selectStations);

  private stations!: Station[];

  private ride?: Ride;

  private rideId!: number;

  private fromId!: number;

  private toId!: number;

  private selectedSeats?: CarriageSelectedSeats;

  constructor(
    private store: Store,
    private destroyRef: DestroyRef,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
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

    this.store.dispatch(loadStations());

    const stationsSubscription = this.stations$.subscribe((stations) => {
      this.stations = stations;

      if (this.ride && this.stations.length > 0) {
        this.rideSegments = getRideSegments(
          this.ride.schedule.segments,
          this.ride.path,
          this.fromId,
          this.toId,
        );

        this.initViewData(this.rideSegments);

        this.store.dispatch(loadCarriages());
      }
    });

    const carriagesSubscription = this.carriages$.subscribe((carriages) => {
      this.carriages = carriages.filter((carriage) => {
        return this.prices.find((price) => {
          return price[0] === carriage.name;
        });
      });
    });

    this.destroyRef.onDestroy(() => {
      carriagesSubscription.unsubscribe();
      ridesSubscription.unsubscribe();
      stationsSubscription.unsubscribe();
    });
  }

  public onSeatsSelect(seats: CarriageSelectedSeats) {
    this.isSeatsSelected = seats.selectedSeats.length > 0;

    this.selectedSeats = seats;
  }

  public onSeatsBook() {
    this.store.dispatch(
      createOrder({
        rideId: this.rideId,
        seat: this.selectedSeats!.selectedSeats[0]!.numberInCarriage,
        stationEnd: this.toId,
        stationStart: this.fromId,
      }),
    );
  }

  public openRouteDialog() {
    this.dialog.open(TripRouteDialogComponent, {
      data: {
        rideId: this.ride?.rideId,
        segments: this.rideSegments,
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
