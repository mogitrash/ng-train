import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarriageComponent } from './components/carriage/carriage.component';
import { SplitSeatsPipe } from './pipes/split-seats.pipe';
import { ScheduleComponent } from './components/schedule/schedule.component';

@NgModule({
  declarations: [CarriageComponent, SplitSeatsPipe, ScheduleComponent],
  imports: [CommonModule],
  exports: [CarriageComponent],
})
export class SharedModule {}
