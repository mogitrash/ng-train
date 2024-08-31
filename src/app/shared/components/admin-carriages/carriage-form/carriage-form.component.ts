import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Carriage } from '../../../../features/trips/models/carriage.model';

@Component({
  selector: 'app-carriage-form',
  templateUrl: './carriage-form.component.html',
  styleUrl: './carriage-form.component.scss',
})
export class CarriageFormComponent implements OnInit {
  @Input() carriage!: Carriage;

  protected carriageForm!: FormGroup;

  protected prototypeCarriage!: Carriage;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.carriageForm = this.fb.group({
      carriageName: [
        this.carriage?.name || '',
        [Validators.required, Validators.min(1), Validators.max(36)],
      ],
      rowCount: [
        this.carriage?.rows || '',
        [Validators.required, Validators.min(1), Validators.pattern('^[1-9][0-9]*$')],
      ],
      leftSeats: [
        this.carriage?.leftSeats || '',

        [Validators.required, Validators.min(1), Validators.pattern('^[1-9][0-9]*$')],
      ],
      rightSeats: [
        this.carriage?.rightSeats || '',
        [Validators.required, Validators.min(1), Validators.pattern('^[1-9][0-9]*$')],
      ],
    });

    this.prototypeCarriage = {
      code: this.carriage?.code || '',
      name: this.carriage?.name || '',
      rows: this.carriage?.rows || 0,
      leftSeats: this.carriage?.leftSeats || 0,
      rightSeats: this.carriage?.rightSeats || 0,
    };

    this.carriageForm.valueChanges.subscribe((formValues) => {
      console.log(this.prototypeCarriage);
      if (
        formValues.carriageName &&
        formValues.rowCount &&
        formValues.leftSeats &&
        formValues.rightSeats
      ) {
        this.prototypeCarriage = {
          ...this.prototypeCarriage,
          name: formValues.carriageName,
          rows: formValues.rowCount,
          leftSeats: formValues.leftSeats,
          rightSeats: formValues.rightSeats,
        };
      }

      console.log(this.prototypeCarriage);
    });
  }

  onSubmit(): void {
    if (this.carriageForm.valid) {
      // console.log(this.carriageForm.value);
    }
  }
}
