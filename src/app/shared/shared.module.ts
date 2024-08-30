import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CarriageComponent } from './components/carriage/carriage.component';
import { SplitSeatsPipe } from './pipes/split-seats.pipe';
import { AdminCarriagesComponent } from './components/admin-carriages/admin-carriages.component';
import { CarriageCardComponent } from './components/admin-carriages/carriage-card/carriage-card.component';

@NgModule({
  declarations: [CarriageComponent, SplitSeatsPipe, AdminCarriagesComponent, CarriageCardComponent],
  imports: [CommonModule, MatCardModule],
  exports: [CarriageComponent, AdminCarriagesComponent],
})
export class SharedModule {}
