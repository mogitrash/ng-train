import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CarriageComponent } from './components/carriage/carriage.component';
import { SplitSeatsPipe } from './pipes/split-seats.pipe';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [CarriageComponent, SplitSeatsPipe, ScheduleComponent, DialogComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [CarriageComponent],
})
export class SharedModule {}
