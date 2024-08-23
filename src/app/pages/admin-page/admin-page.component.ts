import { AfterViewInit, Component, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Station } from '../../features/trips/models/station.model';
import { PopUpService } from '../../features/admin/services/popup.service';
import { deleteStation, loadStations } from '../../core/store/trips/trips.actions';
import { selectStations } from '../../core/store/trips/trips.selectors';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent implements AfterViewInit {
  protected stations$: Observable<Station[]>;

  private map!: L.Map;

  protected visualisation$!: Observable<Station[]>;

  private dataSource = new MatTableDataSource<Station>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3,
    });
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }

  constructor(private store: Store, private popupService: PopUpService) {
    this.store.dispatch(loadStations());
    this.stations$ = this.store.select(selectStations);
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.stations$.subscribe((stations) => {
      this.dataSource.data = stations;
      this.visualisation$ = this.dataSource.connect();
      this.dataSource.paginator = this.paginator;
      stations.forEach((station) => {
        const lon = station.longitude;
        const lat = station.latitude;
        const marker = L.marker([lat, lon]);
        marker.bindPopup(this.popupService.makeCapitalPopup(station.city));
        marker.addTo(this.map);
      });
    });
  }

  findStationNameById(id: number, stations: Station[]): string {
    const foundStation = stations.find((station) => {return station.id === id});
    return foundStation ? foundStation.city : 'Station not found';
  }

  onDelete(id: number){
    this.store.dispatch(deleteStation({id}));
    // this.store.dispatch(loadStations());
  }
}
