import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Route } from '../../../features/trips/models/route.model';
import { createRide, loadRouteById } from '../../../core/store/trips/trips.actions';
import { selectRoutes } from '../../../core/store/trips/trips.selectors';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
})
export class ScheduleComponent implements OnInit {
  route$!: Observable<Route[]>;

  selectedId!: number;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {}

  ngOnInit() {
    this.route$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.selectedId = Number(params.get('id'));
        this.store.dispatch(loadRouteById({ id: this.selectedId }));
        return this.store.select(selectRoutes);
      }),
    );
  }

  private onCreateNewRide(
    routeId: number,
    segments: {
      time: [string, string];
      price: { [key: string]: number };
    }[],
  ) {
    this.store.dispatch(createRide({ routeId, segments }));
  }
}
