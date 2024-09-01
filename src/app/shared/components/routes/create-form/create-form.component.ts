import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Station } from '../../../../features/trips/models/station.model';
import { Carriage } from '../../../../features/trips/models/carriage.model';
import { selectCarriages, selectStations } from '../../../../core/store/trips/trips.selectors';
import { createRoute } from '../../../../core/store/trips/trips.actions';
import { selectReasonError } from '../../../../core/store/user/user.selectors';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss',
})
export class CreateFormComponent {
  protected createForm = this.FB.nonNullable.group({
    stations: this.FB.nonNullable.array([new FormControl('')]),
    carriages: this.FB.nonNullable.array([new FormControl('')]),
  });

  public stations$: Observable<Station[]>;

  public carriages$: Observable<Carriage[]>;

  private hasError$: Observable<string>;

  private snackBar = inject(MatSnackBar);

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

  public get carriages(): FormArray {
    return this.createForm.get('carriages') as FormArray;
  }

  public get stations(): FormArray {
    return this.createForm.get('stations') as FormArray;
  }

  public addItem(goal: 'station' | 'carriage'): void {
    if (goal === 'station') this.stations.push(this.FB.control(''));
    if (goal === 'carriage') this.carriages.push(this.FB.control(''));
  }

  public onSubmit() {
    console.log(this.createForm.value);
    if (
      this.createForm.value.carriages!.every((carriage) => {
        return typeof carriage === 'string';
      })
    ) {
      const pathes: number[] = [];
      this.createForm.value.stations!.forEach((path: string | null) => {
        pathes.push(Number(path));
      });

      console.log(pathes, this.createForm.value.carriages!);

      this.store.dispatch(
        createRoute({
          path: pathes,
          carriages: this.createForm.value.carriages!.slice(0, -1),
        }),
      );
    }
    this.createForm.reset();
    this.openSnackBarError('New route was create');
  }

  private openSnackBarError(message: string) {
    this.snackBar.open(`${message}`, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
