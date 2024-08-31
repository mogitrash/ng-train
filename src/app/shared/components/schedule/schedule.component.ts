import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Route } from '../../../features/trips/models/route.model';
import { createRide, loadRouteById, loadStations } from '../../../core/store/trips/trips.actions';
import {
  selectRides,
  selectRoutes,
  selectStations,
} from '../../../core/store/trips/trips.selectors';
import { Station } from '../../../features/trips/models/station.model';
import { Ride } from '../../../features/trips/models/ride.model';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
})
export class ScheduleComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  protected route$!: Observable<Route[]>;

  protected stations$: Observable<Station[]>;

  protected rides$!: Observable<Ride[]>;

  selectedId!: number;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
    this.store.dispatch(loadStations());
    this.stations$ = this.store.select(selectStations);
  }

  ngOnInit() {
    this.selectedId = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(loadRouteById({ id: this.selectedId }));
    this.route$ = this.store.select(selectRoutes);
    this.rides$ = this.store.select(selectRides);
  }

  protected findStationNameById(id: number, stations: Station[]): string {
    const foundStation = stations.find((station) => {
      return station.id === id;
    });
    return foundStation ? foundStation.city : 'Station not found';
  }

  private onCreateRide(
    routeId: number,
    segments: {
      time: [string, string];
      price: { [key: string]: number };
    }[],
  ) {
    this.store.dispatch(createRide({ routeId, segments }));
  }

  getKeys(obj: { [key: string]: number }): string[] {
    return Object.keys(obj);
  }

  openDialog(rideId: number) {
    this.dialog.open(DialogComponent, {
      data: {
        routeId: this.selectedId,
        rideId,
      },
    });
  }
}
