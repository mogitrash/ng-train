import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectSearchDate,
  selectSearchResponses,
} from '../../../../core/store/trips/trips.selectors';
import { SearchResponse } from '../../models/searchResponse.model';

@Component({
  selector: 'app-trips-filter',
  templateUrl: './trips-filter.component.html',
  styleUrl: './trips-filter.component.scss',
})
export class TripsFilterComponent implements OnInit {
  public searchResponses$ = this.store.select(selectSearchResponses);

  public lastResponse!: SearchResponse;

  public startDates!: Date[];

  public searchDate$ = this.store.select(selectSearchDate);

  public searchDate?: Date;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.searchResponses$.subscribe((responses) => {
      this.lastResponse = responses.at(responses.length - 1)!;
      // NOTE: I use slice(0, 50) cause in response we get > 1500 results and
      // lazy-loading of those tabs are not required :)
      this.startDates = this.getAllDates(this.lastResponse).slice(0, 50);

      this.searchDate$.subscribe((searchDate) => {
        this.searchDate = searchDate;
      });
    });
  }

  private getAllDates(response: SearchResponse): Date[] {
    const dates: Date[] = [];

    response.routes.forEach((route) => {
      if (route.schedule) {
        route.schedule.forEach((schedule) => {
          schedule.segments.forEach((segment) => {
            dates.push(new Date(segment.time[0]));
          });
        });
      }
    });

    return dates;
  }
}
