import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Route } from '../../../../features/trips/models/route.model';
import { Carriage } from '../../../../features/trips/models/carriage.model';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrl: './update-form.component.scss',
})
export class UpdateFormComponent implements OnInit {
  protected updateForm: FormGroup = new FormGroup({});

  @Input() public currentRoute: Route | undefined;

  @Input() public cities: string[] | null = null;

  @Input() public carriages: Carriage[] | null = null;

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      stations: new FormGroup({
        station: new FormControl(''),
      }),
      carriages: new FormGroup({
        carriage: new FormControl(''),
      }),
    });
  }

  public onSubmit() {
    console.log(this.updateForm.value);
  }
}
