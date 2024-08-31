import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { StationsComponent } from './components/stations/stations.component';
import { SplitSeatsPipe } from './pipes/split-seats.pipe';
import { RoutesComponent } from './components/routes/routes.component';
import { CarriageComponent } from './components/carriage/carriage.component';
import { UpdateFormComponent } from './components/routes/update-form/update-form.component';
import { CreateFormComponent } from './components/routes/create-form/create-form.component';

@NgModule({
  declarations: [
    CarriageComponent,
    SplitSeatsPipe,
    RoutesComponent,
    StationsComponent,
    UpdateFormComponent,
    CreateFormComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    LeafletModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatExpansionModule,
  ],
  exports: [CarriageComponent, StationsComponent],
})
export class SharedModule {}
