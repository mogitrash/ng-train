import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Carriage } from '../../../features/trips/models/carriage.model';
import { selectCarriages } from '../../../core/store/trips/trips.selectors';
import { loadCarriages } from '../../../core/store/trips/trips.actions';

@Component({
  selector: 'app-admin-carriages',
  templateUrl: './admin-carriages.component.html',
  styleUrl: './admin-carriages.component.scss',
})
export class AdminCarriagesComponent implements OnInit, OnDestroy {
  @ViewChild('formElement') formElement!: ElementRef;

  protected carriages$: Observable<Carriage[] | null> = this.store.select(selectCarriages);

  protected updatedCarriage: Carriage | null = null;

  protected isOpenForm: boolean = false;

  protected formType: 'create' | 'update' = 'create';

  protected carriagesCount = 0;

  private destroy$ = new Subject<void>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadCarriages());
    this.carriages$.pipe(takeUntil(this.destroy$)).subscribe((carriages) => {
      if (carriages) this.carriagesCount = carriages.length;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
