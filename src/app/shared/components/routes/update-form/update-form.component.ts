import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { Route } from '../../../../features/trips/models/route.model';
import { Carriage } from '../../../../features/trips/models/carriage.model';
import { Station } from '../../../../features/trips/models/station.model';
import { selectCarriages, selectStations } from '../../../../core/store/trips/trips.selectors';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrl: './update-form.component.scss',
})
export class UpdateFormComponent implements OnInit {
  protected updateForm: FormGroup = new FormGroup({});

  @Input() public currentRoute: Route | undefined;

  @Input() public cities: string[] | null = null;

  public carriages$: Observable<Carriage[]>;

  public stations$: Observable<Station[]>;

  public currentStations!: Station[];

  constructor(private readonly store: Store) {
    this.stations$ = this.store.select(selectStations);
    this.carriages$ = this.store.select(selectCarriages);
  }

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      stations: new FormGroup({
        station: new FormControl(''),
      }),
      carriages: new FormGroup({
        carriage: new FormControl(''),
      }),
    });

    this.stations$.subscribe((stations) => {
      this.currentStations = stations;
    });
  }

  public get carriages(): FormArray {
    return this.updateForm.get('carriages') as FormArray;
  }

  public get stations(): FormArray {
    return this.updateForm.get('stations') as FormArray;
  }

  public getConnectedStationList(value: string): Station[] {
    const list: Station[] = [];
    this.stations$.pipe(take(1)).subscribe((stations: Station[]) => {
      const connect = stations.filter((station: Station) => {
        return station.city === value;
      });
      if (connect.length) {
        connect[0].connectedTo.forEach((item) => {
          list.push(
            stations[
              stations.findIndex((station) => {
                return station.id === item.id;
              })
            ],
          );
        });
        return list;
      }
      return [];
    });
    return list;
  }

  public onSubmit() {
    console.log(this.updateForm.value);
  }
}
