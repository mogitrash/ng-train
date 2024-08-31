import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('formElement') formElement!: ElementRef;

  protected carriages$: Observable<Carriage[] | null> = this.store.select(selectCarriages);

  protected updatedCarriage: Carriage | null = null;

  protected isOpenForm: boolean = false;

  protected formType: 'create' | 'update' = 'create';

  protected carriagesCount = 0;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadCarriages());
    this.carriages$.subscribe((carriages) => {
      if (carriages) this.carriagesCount = carriages.length;
    });
  }

  onSelectedUpdateCarriage(carriage: Carriage) {
    this.isOpenForm = true;
    this.formType = 'update';
    this.updatedCarriage = carriage;
    if (this.isOpenForm) {
      this.scrollToForm();
    }
  }

  toggleOpenForm() {
    if (!this.isOpenForm) {
      this.updatedCarriage = null;
    }
    this.isOpenForm = !this.isOpenForm;
  }

  scrollToForm() {
    this.formElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
