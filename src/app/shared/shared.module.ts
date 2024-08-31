import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CarriageComponent } from './components/carriage/carriage.component';
import { SplitSeatsPipe } from './pipes/split-seats.pipe';
import { ScheduleComponent } from './components/schedule/schedule.component';

@NgModule({
  declarations: [CarriageComponent, SplitSeatsPipe, ScheduleComponent],
  imports: [CommonModule, MatCardModule, MatDividerModule],
  exports: [CarriageComponent],
})
export class SharedModule {}
