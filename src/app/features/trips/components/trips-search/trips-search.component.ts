import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { TripsService } from '../../services/trips.service';
import { Station } from '../../models/station.model';

@Component({
  selector: 'app-trips-search',
  templateUrl: './trips-search.component.html',
  styleUrl: './trips-search.component.scss',
})
export class TripsSearchComponent implements OnInit {
  protected stations!: Station[];

  protected filteredFromStations$!: Observable<Station[]>;

  protected filteredToStations$!: Observable<Station[]>;

  protected minDate = new Date();

  protected searchForm = this.formBuilder.group({
    startCity: ['', Validators.required],
    endCity: ['', Validators.required],
    date: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private tripsService: TripsService,
  ) {}

  ngOnInit(): void {
    this.tripsService.getStationList().subscribe((stations) => {
      this.stations = stations;
    });

    this.filteredFromStations$ = this.searchForm.controls.startCity.valueChanges.pipe(
      map((value) => {
        return this.autocompleteFilter(value || '');
      }),
    );

    this.filteredToStations$ = this.searchForm.controls.endCity.valueChanges.pipe(
      map((value) => {
        return this.autocompleteFilter(value || '');
      }),
    );
  }

  private autocompleteFilter(value: string): Station[] {
    const filterValue = value.toLowerCase();
    return this.stations.filter(({ city }) => {
      return city.toLocaleLowerCase().includes(filterValue);
    });
  }
}
