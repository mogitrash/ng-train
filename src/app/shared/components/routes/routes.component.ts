import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Station } from '../../../features/trips/models/station.model';
import { TripsService } from '../../../features/trips/services/trips.service';
import { Carriage } from '../../../features/trips/models/carriage.model';
import { CityInfo, Route } from '../../../features/trips/models/route.model';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.scss',
})
export class RoutesComponent implements OnInit, OnDestroy {
  public routeForm: FormGroup = new FormGroup({});

  public routes: Observable<Route[]>;

  public stations: Observable<Station[]>;

  public carriages: Observable<Carriage[]>;

  public createMode: boolean = false;

  public showMode: boolean = false;

  public citiesList: CityInfo[] = [];

  private readonly destroyRef: DestroyRef;

  private subscription: Subscription | undefined;

  constructor(private readonly tripsService: TripsService) {
    this.routes = tripsService.getRouteList();
    this.stations = tripsService.getStationList();
    this.carriages = tripsService.getCarriageList();
    this.destroyRef = inject(DestroyRef);
  }

  ngOnInit() {
    this.routeForm = new FormGroup({
      stations: new FormGroup({
        station: new FormControl(''),
      }),
      carriages: new FormGroup({
        carriage: new FormControl(''),
      }),
    });

    this.subscription = this.stations.subscribe((stations) => {
      stations.forEach((station) => {
        this.citiesList?.push({ id: station.id, name: station.city });
      });
      console.log(this.citiesList);
    });
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

  public showButtonsGoal() {
    this.showMode = true;
  }

  public hideButtonsGoal() {
    this.showMode = false;
  }

  public onSubmit() {
    console.log(this.routeForm.value);
  }

  public changeCreateMode(): void {
    this.createMode = !this.createMode;
    console.log(this.createMode);
  }

  ngOnDestroy(): void {
    this.subscription!.unsubscribe();
  }
}
