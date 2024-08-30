import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Carriage } from '../../../features/trips/models/carriage.model';
import { selectCarriages } from '../../../core/store/trips/trips.selectors';
import { loadCarriages } from '../../../core/store/trips/trips.actions';

@Component({
  selector: 'app-admin-carriages',
  templateUrl: './admin-carriages.component.html',
  styleUrl: './admin-carriages.component.scss',
})
export class AdminCarriagesComponent implements OnInit {
  protected carriages$: Observable<Carriage[] | null> = this.store.select(selectCarriages);

  protected updatedCarriage: Carriage | null = null;

  protected isOpenForm: boolean = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadCarriages());
  }

  onSelectedUpdateCarriage(carriage: Carriage) {
    this.isOpenForm = true;
    console.log('Selected carriage:', carriage);
  }
}
