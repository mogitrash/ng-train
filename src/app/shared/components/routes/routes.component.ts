import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { Station } from '../../../features/trips/models/station.model';
import { Carriage } from '../../../features/trips/models/carriage.model';
import { CityInfo, Route } from '../../../features/trips/models/route.model';
import {
  selectCarriages,
  selectLoading,
  selectRoutes,
  selectStations,
} from '../../../core/store/trips/trips.selectors';
import { deleteRoute, loadDataForRoutesView } from '../../../core/store/trips/trips.actions';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.scss',
})
export class RoutesComponent implements OnInit {
  public routes$: Observable<Route[]>;

  public stations$: Observable<Station[]>;

  public carriages$: Observable<Carriage[]>;

  public readonly isLoading$: Observable<boolean>;

  public createMode: boolean = false;

  public updateMode: boolean = false;

  public showMode: boolean = false;

  public citiesList: CityInfo[] = [];

  public currentRoute: Route;

  public NumberPage: number;

  public isOpen: boolean = false;

  public isReverse: boolean = false;

  public panelOpenState$: BehaviorSubject<boolean>;

  private readonly destroyRef: DestroyRef;

  private subscription: Subscription | undefined;

  constructor(private readonly store: Store) {
    this.isLoading$ = this.store.select(selectLoading);
    this.routes$ = this.store.select(selectRoutes);
    this.stations$ = this.store.select(selectStations);
    this.carriages$ = this.store.select(selectCarriages);
    this.destroyRef = inject(DestroyRef);
    this.currentRoute = { id: 0, path: [], carriages: [] };
    this.NumberPage = 1;
    this.panelOpenState$ = new BehaviorSubject(this.isOpen);
  }

  ngOnInit() {
    this.store.dispatch(loadDataForRoutesView());
  }

  // public getCarriageTypes(carriages: string[]): Set<string> {
  //   return new Set(carriages);
  // }

  public getCities(indexes: number[]): Observable<string[]> {
    const list: string[] = [];
    return this.stations$.pipe(
      take(1),
      map((stations) => {
        stations.forEach((station) => {
          if (indexes.includes(station.id)) {
            list.push(station.city);
          }
        });
        return list;
      }),
    );
  }

  protected updateRoute(route: Route): void {
    this.currentRoute = { ...route };
    this.updateMode = true;
  }

  public showButtonsGoal() {
    this.showMode = true;
  }

  public hideButtonsGoal() {
    this.showMode = false;
  }

  public changePage(goal: 'plus' | 'minus', count: 1 | 10) {
    if (goal === 'plus') {
      if (count === 1) {
        this.NumberPage += 1;
      } else {
        this.NumberPage += 10;
      }
    }
    if (goal === 'minus') {
      if (count === 1) {
        this.NumberPage -= 1;
      } else {
        this.NumberPage -= 10;
      }
    }
  }

  public changeCreateMode(): void {
    this.createMode = !this.createMode;
  }

  protected onDeleteRoute(id: number) {
    this.store.dispatch(deleteRoute({ id }));
  }

  // ngOnDestroy(): void {
  //   this.subscription!.unsubscribe();
  // }
}
