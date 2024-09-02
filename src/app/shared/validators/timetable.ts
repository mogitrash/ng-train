import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';
import { Ride } from '../../features/trips/models/ride.model';

export function timetableValidator(ride: Ride, idx: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const departure = formGroup.get('departure')?.value;
    const arrival = idx > 0 ? formGroup.get('arrival')?.value : null;
    const datedeparture = new Date(departure.replace(' ', 'T'));
    const isoStringDeparture = datedeparture.toISOString();
    const datearrival = new Date(arrival.replace(' ', 'T'));
    const isoStringArrival = datearrival.toISOString();
    const previousSegmentArrival = idx > 0 ? ride.schedule.segments[idx - 1].time[1] : null;
    const nextSegmentDeparture = ride.schedule.segments[idx]?.time[0];

    if (arrival && previousSegmentArrival && isoStringDeparture <= previousSegmentArrival) {
      return { invalidDeparture: 'Departure time must be after previous segment arrival time' };
    }

    if (isoStringDeparture >= isoStringArrival) {
      return { invalidDeparture: 'Departure time must be before arrival time' };
    }

    if (isoStringArrival >= nextSegmentDeparture) {
      return { invalidArrival: 'Arrival time must be before next segment departure time' };
    }

    return null;
  };
}
