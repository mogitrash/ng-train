import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import {
  selectSearchDate,
  selectSearchResponses,
  selectUniqueSearchDates,
} from '../../../../core/store/trips/trips.selectors';
import { getISOSDate } from '../../../../shared/utilities/getISOSDate.utility';
import { setSearchDate } from '../../../../core/store/trips/trips.actions';

@Component({
  selector: 'app-trips-filter',
  templateUrl: './trips-filter.component.html',
  styleUrl: './trips-filter.component.scss',
})
export class TripsFilterComponent implements OnInit {
  public searchResponses$ = this.store.select(selectSearchResponses);

  public uniqueSearchDates$ = this.store.select(selectUniqueSearchDates);

  public searchDate$ = this.store.select(selectSearchDate);

  public uniqueSearchDates!: Date[];

  public searchDate?: Date;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.searchResponses$.subscribe(() => {
      this.uniqueSearchDates$.pipe(take(1)).subscribe((uniqueDates) => {
        this.uniqueSearchDates = uniqueDates;
      });

      this.searchDate$.subscribe((searchDate) => {
        this.searchDate = searchDate;
      });

      if (!this.searchDate) {
        this.setSearchDateByIndex(0);
      }
    });
  }

  public getTabIndexAccordingDate(date: Date): number {
    const index = this.uniqueSearchDates.findIndex((value) => {
      return getISOSDate(value) === getISOSDate(date);
    });
    return index;
  }

  public setSearchDateByIndex(index: number) {
    this.store.dispatch(setSearchDate({ date: this.uniqueSearchDates.at(index)! }));
  }
}
