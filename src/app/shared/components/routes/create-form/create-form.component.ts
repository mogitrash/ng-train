import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Station } from '../../../../features/trips/models/station.model';
import { TripsService } from '../../../../features/trips/services/trips.service';
import { Carriage } from '../../../../features/trips/models/carriage.model';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss',
})
export class CreateFormComponent implements OnInit {
  protected createForm: FormGroup = new FormGroup({});

  public stations: Observable<Station[]>;

  public carriages: Observable<Carriage[]>;

  constructor(private readonly tripsService: TripsService) {
    this.stations = tripsService.getStationList();
    this.carriages = tripsService.getCarriageList();
  }

  ngOnInit() {
    this.createForm = new FormGroup({
      stations: new FormGroup({
        station: new FormControl(''),
      }),
      carriages: new FormGroup({
        carriage: new FormControl(''),
      }),
    });
  }

  public onSubmit() {
    console.log(this.createForm.value);
  }
}
