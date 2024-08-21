import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarriageComponent } from './components/carriage/carriage.component';

@NgModule({
  declarations: [CarriageComponent],
  imports: [CommonModule],
  exports: [CarriageComponent],
})
export class SharedModule {}
