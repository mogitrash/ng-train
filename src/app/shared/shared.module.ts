import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarriageComponent } from './components/carriage/carriage.component';
import { SplitSeatsPipe } from './pipes/split-seats.pipe';
import { TransformOrderPipe } from './pipes/order-view.pipe';

@NgModule({
  declarations: [CarriageComponent, SplitSeatsPipe, TransformOrderPipe],
  imports: [CommonModule],
  exports: [CarriageComponent, TransformOrderPipe],
})
export class SharedModule {}
