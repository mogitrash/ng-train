import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CarriageComponent } from './components/carriage/carriage.component';
import { SplitSeatsPipe } from './pipes/split-seats.pipe';

import { RoutesComponent } from './components/routes/routes.component';

@NgModule({
  declarations: [CarriageComponent, SplitSeatsPipe, RoutesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [CarriageComponent, RoutesComponent],
})
export class SharedModule {}
