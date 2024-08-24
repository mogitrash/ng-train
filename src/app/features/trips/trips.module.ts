import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TripsComponent } from './trips.component';
import { TripsSearchComponent } from './components/trips-search/trips-search.component';
import { TripsFilterComponent } from './components/trips-filter/trips-filter.component';

@NgModule({
  providers: [provideNativeDateAdapter()],
  declarations: [TripsComponent, TripsSearchComponent, TripsFilterComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
  ],
  exports: [TripsSearchComponent, TripsFilterComponent],
})
export class TripsModule {}
