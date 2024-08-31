import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CarriageComponent } from './components/carriage/carriage.component';
import { SplitSeatsPipe } from './pipes/split-seats.pipe';
import { AdminCarriagesComponent } from './components/admin-carriages/admin-carriages.component';
import { CarriageCardComponent } from './components/admin-carriages/carriage-card/carriage-card.component';
import { CarriageFormComponent } from './components/admin-carriages/carriage-form/carriage-form.component';
import { CarriageSimpleComponent } from './components/admin-carriages/carriage-simple/carriage-simple.component';
import { ReversePipe } from './pipes/reverse.pipe';

@NgModule({
  declarations: [
    CarriageComponent,
    SplitSeatsPipe,
    AdminCarriagesComponent,
    CarriageCardComponent,
    CarriageFormComponent,
    CarriageSimpleComponent,
    ReversePipe,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [CarriageComponent, AdminCarriagesComponent],
})
export class SharedModule {}
