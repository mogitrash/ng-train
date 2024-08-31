import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Station } from '../../../features/trips/models/station.model';
import { Carriage } from '../../../features/trips/models/carriage.model';
import { CityInfo, Route } from '../../../features/trips/models/route.model';
import {
  selectCarriages,
  selectRoutes,
  selectStations,
} from '../../../core/store/trips/trips.selectors';
import { deleteRoute, loadDataForRoutesView } from '../../../core/store/trips/trips.actions';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.scss',
})
export class RoutesComponent implements OnInit, OnDestroy {
  public routes: Observable<Route[]>;

  public stations: Observable<Station[]>;

  public carriages: Observable<Carriage[]>;

  public createMode: boolean = false;

  public updateMode: boolean = false;

  public showMode: boolean = false;

  public citiesList: CityInfo[] = [];

  public currentRoute: Route;

  private readonly destroyRef: DestroyRef;

  private subscription: Subscription | undefined;

  constructor(private readonly store: Store) {
    this.routes = this.store.select(selectRoutes);
    this.stations = this.store.select(selectStations);
    this.carriages = this.store.select(selectCarriages);
    this.destroyRef = inject(DestroyRef);
    this.currentRoute = { id: 0, path: [], carriages: [] };
  }

  ngOnInit() {
    this.store.dispatch(loadDataForRoutesView());
  }

  public getCarriageTypes(carriages: string[]): Set<string> {
    return new Set(carriages);
  }

  public getCities(indexes: number[]): string[] {
    const list: string[] = [];
    this.citiesList.forEach((station) => {
      if (indexes.includes(station.id)) {
        list.push(station.name);
      }
    });
    return list;
  }

  protected updateRoute(route: Route): void {
    this.currentRoute = { ...route };
    console.log(this.currentRoute);
    this.updateMode = true;
  }

  public showButtonsGoal() {
    this.showMode = true;
  }

  public hideButtonsGoal() {
    this.showMode = false;
  }

  public changeCreateMode(): void {
    this.createMode = !this.createMode;
    console.log(this.createMode);
  }

  protected onDeleteRoute(id: number) {
    this.store.dispatch(deleteRoute({ id }));
  }

  ngOnDestroy(): void {
    this.subscription!.unsubscribe();
  }
}
