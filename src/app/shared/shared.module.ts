import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarriageComponent } from './components/carriage/carriage.component';
import { SplitSeatsPipe } from './pipes/split-seats.pipe';
import { TransformOrderPipe } from './pipes/order-view.pipe';
import { RoutesComponent } from './components/routes/routes.component';

@NgModule({
  declarations: [CarriageComponent, SplitSeatsPipe, TransformOrderPipe, RoutesComponent],
  imports: [CommonModule],
  exports: [CarriageComponent, TransformOrderPipe, RoutesComponent],
})
export class SharedModule {}
