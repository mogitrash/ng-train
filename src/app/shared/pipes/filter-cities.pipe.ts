import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Station } from '../../features/trips/models/station.model';
import { TripsService } from '../../features/trips/services/trips.service';

// because we need to get a few times the list of cities I thougth one time write the pipe is easier

@Pipe({
  name: 'filterCities',
})
export class FilterCitiesPipe implements PipeTransform {
  private stationsList: Observable<Station[]>;

  constructor(private readonly tripsService: TripsService) {
    this.stationsList = this.tripsService.getStationList();
  }

  transform(indexes: number[]): Observable<string[]> {
    const list: string[] = [];
    return this.stationsList.pipe(
      map((stations: Station[]) => {
        stations.forEach((station) => {
          if (indexes.includes(station.id)) {
            console.log(station.id);
            list.push(station.city);
          }
        });
        return list;
      }),
    );
  }
}
