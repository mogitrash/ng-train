import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, switchMap, take } from 'rxjs';
import {
  selectRidesGroupedByDates,
  selectSearchDate,
} from '../../../../core/store/trips/trips.selectors';
import { RidesGroup } from '../../../../core/models/trips.model';
import { getISOSDate } from '../../../../shared/utilities/getISOSDate.utility';

@Component({
  selector: 'app-trips-search-results',
  templateUrl: './trips-search-results.component.html',
  styleUrl: './trips-search-results.component.scss',
})
export class TripsSearchResultsComponent implements OnInit {
  private groupedRides$ = this.store.select(selectRidesGroupedByDates);

  private selectedDate$ = this.store.select(selectSearchDate);

  private selectedGroup$!: Observable<RidesGroup[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.selectedGroup$ = this.selectedDate$.pipe(
      switchMap((selectedDate) => {
        return this.groupedRides$.pipe(
          map((groupedRides) => {
            const date = getISOSDate(selectedDate!);
            return groupedRides[date];
          }),
        );
      }),
      take(1),
    );

    this.selectedGroup$.subscribe((group) => {
      console.log(group);
    });
  }
}
