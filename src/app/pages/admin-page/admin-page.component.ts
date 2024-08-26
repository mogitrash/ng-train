import { AfterViewInit, Component, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Station } from '../../features/trips/models/station.model';
import { PopUpService } from '../../features/admin/services/popup.service';
import {
  canDelete,
  createStation,
  loadStations,
} from '../../core/store/trips/trips.actions';
import { selectStations } from '../../core/store/trips/trips.selectors';
import { TripsService } from '../../features/trips/services/trips.service';

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
const redIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
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

  private markers: L.Marker[] = [];

  private marker: L.Marker | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  protected stationForm = this.formBuilder.nonNullable.group({
    city: ['', Validators.required],
    latitude: [
      0,
      [Validators.required, Validators.min(-180), Validators.max(180)],
    ],
    longitude: [
      0,
      [Validators.required, Validators.min(-180), Validators.max(180)],
    ],
    relations: this.formBuilder.array(
      [this.formBuilder.control(0, Validators.required)],
      Validators.required
    ),
  });

  constructor(
    private store: Store,
    private popupService: PopUpService,
    private formBuilder: FormBuilder,
    private service: TripsService
  ) {
    this.store.dispatch(loadStations());
    this.stations$ = this.store.select(selectStations);
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.stations$.subscribe((stations) => {
      this.updateMap(stations);
    });
  }

  get relations(): FormArray {
    return this.stationForm.get('relations') as FormArray;
  }

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
    const southWest = L.latLng(-90, -180);
    const northEast = L.latLng(90, 180);
    const bounds = L.latLngBounds(southWest, northEast);

    this.map.setMaxBounds(bounds);
    this.map.on('drag', () => {
      this.map.panInsideBounds(bounds, { animate: false });
    });
    this.map.on('click', this.onMapClick.bind(this));
  }

  private updateMap(stations: Station[]): void {
    this.markers.forEach((marker) => {
      return this.map.removeLayer(marker);
    });
    this.markers = [];
    this.dataSource.data = stations;
    this.visualisation$ = this.dataSource.connect();
    this.dataSource.paginator = this.paginator;
    stations.forEach((station) => {
      const lon = station.longitude;
      const lat = station.latitude;
      const marker = L.marker([lat, lon]);
      marker.bindPopup(this.popupService.makeCapitalPopup(station.city));
      marker.addTo(this.map);
      this.markers.push(marker);
    });
  }

  private onMapClick(e: L.LeafletMouseEvent): void {
    const { lat } = e.latlng;
    const { lng } = e.latlng;
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.marker = L.marker([lat, lng], {
      icon: redIcon,
      draggable: true,
    }).addTo(this.map);
    this.stationForm.patchValue({
      latitude: lat,
      longitude: lng,
    });
  }

  findStationNameById(id: number, stations: Station[]): string {
    const foundStation = stations.find((station) => {
      return station.id === id;
    });
    return foundStation ? foundStation.city : 'Station not found';
  }

  onRelationChange(event: MatSelectChange): void {
    const selectedRelations = event.value;
    this.relations.clear();
    selectedRelations.forEach((relation: number) => {
      this.relations.push(
        this.formBuilder.control(relation, Validators.required)
      );
    });
  }

  onSubmit(): void {
    if (this.stationForm.valid) {
      const formValue = this.stationForm.value as {
        city: string;
        latitude: number;
        longitude: number;
        relations: number[];
      };
      this.store.dispatch(
        createStation({
          city: formValue.city,
          latitude: formValue.latitude,
          longitude: formValue.longitude,
          relations: formValue.relations,
        })
      );
    }
  }

  onDelete(id: number, stations: Station[]) {
    const station = stations.find((s) => {
      return s.id === id;
    });
    if (!station) {
      throw new Error('Station not found');
    }

    const coordinates = station.connectedTo.map((connection) => {
      const connectedStation = stations.find((s) => {
        return s.id === connection.id;
      });
      if (!connectedStation) {
        throw new Error(`Connected station with id ${connection.id} not found`);
      }
      return {
        latitude: connectedStation.latitude,
        longitude: connectedStation.longitude,
      };
    });
    this.store.dispatch(canDelete({station,coordinates}));
  }
}
