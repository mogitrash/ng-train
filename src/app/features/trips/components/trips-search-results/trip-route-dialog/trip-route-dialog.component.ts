import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, inject } from '@angular/core';
import { Segment } from '../../../models/segment.model';

export interface RouteDialogData {
  rideId: number;
  segments: Segment[];
}

@Component({
  selector: 'app-trip-route-dialog',
  templateUrl: './trip-route-dialog.component.html',
  styleUrl: './trip-route-dialog.component.scss',
})
export class TripRouteDialogComponent {
  private dialogRef = inject(MatDialogRef<TripRouteDialogComponent>);

  public data = inject<RouteDialogData>(MAT_DIALOG_DATA);

  public onClose() {
    this.dialogRef.close();
  }
}
