import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Station } from '../../../../features/trips/models/station.model';
import { Carriage } from '../../../../features/trips/models/carriage.model';
import { selectCarriages, selectStations } from '../../../../core/store/trips/trips.selectors';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss',
})
export class CreateFormComponent {
  protected createForm = this.FB.nonNullable.group({
    stations: this.FB.array([new FormControl('')]),
    carriages: this.FB.array([new FormControl('')]),
  });

  public stations$: Observable<Station[]>;

  public carriages$: Observable<Carriage[]>;

  constructor(
    private readonly store: Store,
    private FB: FormBuilder,
  ) {
    this.stations$ = this.store.select(selectStations);
    this.carriages$ = this.store.select(selectCarriages);
  }

  public get carriages(): FormArray {
    return this.createForm.get('stations') as FormArray;
  }

  public get stations(): FormArray {
    return this.createForm.get('carriages') as FormArray;
  }

  public addItem(goal: 'station' | 'carriage'): void {
    if (goal === 'station') this.stations.push(this.FB.control(''));
    if (goal === 'carriage') this.carriages.push(this.FB.control(''));
  }

  public onSubmit() {
    console.log(this.createForm.value);
  }
}
