import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarriageComponent } from './components/carriage/carriage.component';
import { SplitSeatsPipe } from './pipes/split-seats.pipe';

@NgModule({
  declarations: [CarriageComponent, SplitSeatsPipe],
  imports: [CommonModule],
  exports: [CarriageComponent],
})
export class SharedModule {}
