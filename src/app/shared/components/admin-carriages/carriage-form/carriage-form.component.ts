import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Carriage } from '../../../../features/trips/models/carriage.model';
import { createCarriage, updateCarriage } from '../../../../core/store/trips/trips.actions';

@Component({
  selector: 'app-carriage-form',
  templateUrl: './carriage-form.component.html',
  styleUrl: './carriage-form.component.scss',
})
export class CarriageFormComponent implements OnInit {
  @Input() carriage!: Carriage;

  @Output() formSubmitted = new EventEmitter<void>();

  protected carriageForm!: FormGroup;

  protected prototypeCarriage!: Carriage;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

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
    });
  }

  onSubmit(): void {
    if (this.carriageForm.valid) {
      if (this.carriage) {
        this.store.dispatch(updateCarriage(this.prototypeCarriage));
      } else {
        this.store.dispatch(
          createCarriage({
            name: this.prototypeCarriage.name,
            rows: this.prototypeCarriage.rows,
            leftSeats: this.prototypeCarriage.leftSeats,
            rightSeats: this.prototypeCarriage.rightSeats,
          }),
        );
      }
    }
    this.formSubmitted.emit();
  }
}
