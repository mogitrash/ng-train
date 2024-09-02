import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { CarriageComponent } from './components/carriage/carriage.component';
import { SplitSeatsPipe } from './pipes/split-seats.pipe';
import { AdminCarriagesComponent } from './components/admin-carriages/admin-carriages.component';
import { CarriageCardComponent } from './components/admin-carriages/carriage-card/carriage-card.component';
import { CarriageFormComponent } from './components/admin-carriages/carriage-form/carriage-form.component';
import { CarriageSimpleComponent } from './components/admin-carriages/carriage-simple/carriage-simple.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { StationsComponent } from './components/stations/stations.component';
import { RoutesComponent } from './components/routes/routes.component';
import { UpdateFormComponent } from './components/routes/update-form/update-form.component';
import { CreateFormComponent } from './components/routes/create-form/create-form.component';

@NgModule({
  declarations: [
    CarriageComponent,
    SplitSeatsPipe,
    AdminCarriagesComponent,
    CarriageCardComponent,
    CarriageFormComponent,
    CarriageSimpleComponent,
    ReversePipe,
    RoutesComponent,
    StationsComponent,
    UpdateFormComponent,
    CreateFormComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    LeafletModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatExpansionModule,
    MatDialogModule,
  ],
  exports: [CarriageComponent, AdminCarriagesComponent, StationsComponent, RoutesComponent],
})
export class SharedModule {}
