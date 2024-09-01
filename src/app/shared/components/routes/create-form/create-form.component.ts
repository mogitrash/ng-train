import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Station } from '../../../../features/trips/models/station.model';
import { Carriage } from '../../../../features/trips/models/carriage.model';
import { selectCarriages, selectStations } from '../../../../core/store/trips/trips.selectors';
import { createRoute, loadDataForRoutesView } from '../../../../core/store/trips/trips.actions';
import { selectReasonError } from '../../../../core/store/user/user.selectors';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss',
})
export class CreateFormComponent implements OnInit {
  protected createForm = this.FB.nonNullable.group({
    stations: this.FB.nonNullable.array([new FormControl('')]),
    carriages: this.FB.nonNullable.array([new FormControl('')]),
  });

  @Output() changeOpen = new EventEmitter<boolean>();

  public stations$: Observable<Station[]>;

  public carriages$: Observable<Carriage[]>;

  private hasError$: Observable<string>;

  private snackBar = inject(MatSnackBar);

  public currentStations!: Station[];

  private horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private readonly store: Store,
    private FB: FormBuilder,
  ) {
    this.stations$ = this.store.select(selectStations);
    this.carriages$ = this.store.select(selectCarriages);
    this.hasError$ = this.store.select(selectReasonError);
  }

  ngOnInit(): void {
    this.stations$.subscribe((stations) => {
      this.currentStations = stations;
    });
  }

  public get carriages(): FormArray {
    return this.createForm.get('carriages') as FormArray;
  }

  public get stations(): FormArray {
    return this.createForm.get('stations') as FormArray;
  }

  public getLastStation(): string | null {
    const last = this.stations!.value;
    return this.createForm.value.stations![last.length - 2];
  }

  public getConnectedStationList(): Station[] {
    const list: Station[] = [];
    this.stations$.pipe(take(1)).subscribe((stations: Station[]) => {
      const lastValue = this.getLastStation();
      const connect = stations.filter((station: Station) => {
        return station.id === Number(lastValue);
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

  public addItem(goal: 'station' | 'carriage'): void {
    if (goal === 'station') this.stations.push(this.FB.control(''));
    if (goal === 'carriage') this.carriages.push(this.FB.control(''));
  }

  private reset() {
    while (this.carriages.length > 1) {
      this.carriages.removeAt(1);
    }
    while (this.stations.length > 1) {
      this.stations.removeAt(1);
    }
    this.createForm.reset();
  }

  public onSubmit() {
    console.log(this.stations.value[-2]);
    if (
      this.createForm.value.carriages!.every((carriage) => {
        return typeof carriage === 'string';
      })
    ) {
      const pathes: number[] = [];
      this.createForm.value.stations!.slice(0, -1).forEach((path: string | null) => {
        pathes.push(Number(path));
      });

      this.store.dispatch(
        createRoute({
          path: pathes,
          carriages: this.createForm.value.carriages!.slice(0, -1),
        }),
      );
    }

    this.reset();

    this.openSnackBarError('New route was create');

    this.store.dispatch(loadDataForRoutesView());

    this.changeOpen.emit(false);
  }

  private openSnackBarError(message: string) {
    this.snackBar.open(`${message}`, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
