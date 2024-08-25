import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
})
export class OrdersPageComponent {
  constructor(private store: Store) {}
}
