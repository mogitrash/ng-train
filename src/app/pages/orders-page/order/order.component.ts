import { Component } from '@angular/core';
import { Order } from '../../../features/trips/models/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  @Input() order!: Order;
}
