import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CarriageComponent } from './components/carriage/carriage.component';
import { SplitSeatsPipe } from './pipes/split-seats.pipe';
import { RoutesComponent } from './components/routes/routes.component';
import { UpdateFormComponent } from './components/routes/update-form/update-form.component';
import { CreateFormComponent } from './components/routes/create-form/create-form.component';
import { FilterCitiesPipe } from './pipes/filter-cities.pipe';

@NgModule({
  declarations: [
    CarriageComponent,
    SplitSeatsPipe,
    RoutesComponent,
    UpdateFormComponent,
    CreateFormComponent,
    FilterCitiesPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
  ],
  exports: [CarriageComponent, RoutesComponent],
})
export class SharedModule {}
