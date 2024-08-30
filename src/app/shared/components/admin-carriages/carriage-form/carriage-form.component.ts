import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Carriage } from '../../../../features/trips/models/carriage.model';

@Component({
  selector: 'app-carriage-form',
  templateUrl: './carriage-form.component.html',
  styleUrl: './carriage-form.component.scss',
})
export class CarriageFormComponent implements OnInit {
  @Input() carriage!: Carriage;

  carriageForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.carriageForm = this.fb.group({
      carriageName: [
        this.carriage?.name || '',
        [Validators.required, Validators.min(1), Validators.max(36)],
      ],
      rowCount: [
        this.carriage?.rows || '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(20),
          Validators.pattern('^[1-9][0-9]*$'),
        ],
      ],
      leftSeats: [
        this.carriage?.leftSeats || '',

        [
          Validators.required,
          Validators.min(1),
          Validators.max(6),
          Validators.pattern('^[1-9][0-9]*$'),
        ],
      ],
      rightSeats: [
        this.carriage?.rightSeats || '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(6),
          Validators.pattern('^[1-9][0-9]*$'),
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.carriageForm.valid) {
      // console.log(this.carriageForm.value);
    }
  }
}
