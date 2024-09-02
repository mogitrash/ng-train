import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Route } from '../../../../features/trips/models/route.model';
import { Carriage } from '../../../../features/trips/models/carriage.model';
import { Station } from '../../../../features/trips/models/station.model';
import { selectCarriages, selectStations } from '../../../../core/store/trips/trips.selectors';
import { loadDataForRoutesView } from '../../../../core/store/trips/trips.actions';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrl: './update-form.component.scss',
})
export class UpdateFormComponent implements OnInit {
  @Input() public currentRoute!: Route;

  @Input() public cities!: number[];

  @Output() closeForm = new EventEmitter<boolean>();

  protected updateForm = this.FB.nonNullable.group({
    stations: this.FB.nonNullable.array([this.FB.control('')]),
    carriages: this.FB.nonNullable.array([this.FB.control('')]),
  });

  public carriages$: Observable<Carriage[]>;

  public stations$: Observable<Station[]>;

  public currentStations!: Station[];

  private snackBar = inject(MatSnackBar);

  private horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  public mode: 'update' | 'add' = 'update';

  constructor(
    private readonly store: Store,
    private FB: FormBuilder,
  ) {
    this.stations$ = this.store.select(selectStations);
    this.carriages$ = this.store.select(selectCarriages);
  }

  ngOnInit(): void {
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

  protected getLastStation(): string[] {
    const last = this.stations!.value;
    return last
      .filter((value: string) => {
        return value !== '';
      })
      .slice(-1);
  }

  private getConnectedList(index?: number): { id: number; distance: number }[] {
    const value: number = index || Number(...this.getLastStation());
    const indexStation = this.currentStations.findIndex((station) => {
      return station.id === value;
    });
    return this.currentStations[indexStation].connectedTo ?? { id: 0, distance: 0 };
  }

  public getConnectedCities(index?: number): Station[] {
    const list: Station[] = [];
    const connectedList = index ? this.getConnectedList(index) : this.getConnectedList();
    connectedList.forEach(({ id }) => {
      if (this.currentStations[id]) {
        list.push(this.currentStations[id]);
      } else {
        list.push({
          id: 0,
          city: `This station doesn't have connect`,
          latitude: 0,
          longitude: 0,
          connectedTo: [{ id: 0, distance: 0 }],
        });
      }
    });
    return list;
  }

  public addItem(goal: 'station' | 'carriage'): void {
    if (goal === 'station') this.stations.push(this.FB.control(''));
    if (goal === 'carriage') this.carriages.push(this.FB.control(''));
  }

  public changeStation(index: number): void {
    if (index === this.stations.length - 1) {
      this.addItem('station');
    } else {
      while (this.stations.length > index + 2) {
        this.stations.removeAt(1);
      }
      this.mode = 'add';
      console.log(this.stations.value);
    }
  }

  public onSubmit() {
    if (
      this.updateForm.value.carriages!.every((carriage) => {
        return typeof carriage === 'string';
      })
    ) {
      const pathes: number[] = [];
      this.updateForm.value.stations!.slice(0, -1).forEach((path: string | null) => {
        pathes.push(Number(path));
      });

      // this.store.dispatch(
      //   updateRoute({
      //     id: this.currentRoute.id,
      //     path: pathes,
      //     carriages: this.updateForm.value.carriages!.slice(0, -1),
      //   }),
      // );
    }

    console.log(this.updateForm.value);

    this.openSnackBarError(`Route ${this.currentRoute.id} was update`);

    this.store.dispatch(loadDataForRoutesView());
  }

  private reset() {
    while (this.carriages.length > 1) {
      this.carriages.removeAt(1);
    }
    while (this.stations.length > 1) {
      this.stations.removeAt(1);
    }
    this.updateForm.reset();
  }

  private openSnackBarError(message: string) {
    this.snackBar.open(`${message}`, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  public close() {
    this.closeForm.emit(false);
  }
}
