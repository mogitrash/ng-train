import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Route } from '../../../../features/trips/models/route.model';
import { Carriage } from '../../../../features/trips/models/carriage.model';
import { Station } from '../../../../features/trips/models/station.model';
import { selectCarriages, selectStations } from '../../../../core/store/trips/trips.selectors';
import { updateRoute } from '../../../../core/store/trips/trips.actions';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrl: './update-form.component.scss',
})
export class UpdateFormComponent implements OnInit, AfterViewInit {
  @Input() public currentRoute!: Route;

  @Output() closeForm = new EventEmitter<boolean>();

  protected updateForm = this.FB.nonNullable.group({
    stations: this.FB.nonNullable.array([this.FB.control('')]),
    carriages: this.FB.nonNullable.array([this.FB.control('')]),
  });

  public carriages$: Observable<Carriage[]>;

  public stations$: Observable<Station[]>;

  public currentStations!: Station[];

  private snackBar = inject(MatSnackBar);

  private horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  public updatePathes!: Station[][];

  public mode: 'update' | 'add' = 'update';

  constructor(
    private readonly store: Store,
    private FB: FormBuilder,
  ) {
    this.stations$ = this.store.select(selectStations);
    this.carriages$ = this.store.select(selectCarriages);
  }

  ngOnInit(): void {
    this.stations$.subscribe((stations) => {
      this.currentStations = stations;
      console.log(this.currentStations, 'stations');
    });
    console.log(this.currentRoute);
    this.currentRoute.path.forEach((step) => {
      this.stations.push(this.FB.control(`${step}`));
    });
    this.currentRoute.carriages.forEach((carriage) => {
      this.carriages.push(this.FB.control(`${carriage}`));
    });
    this.updatePathes = this.currentRoute.path.map((step) => {
      return this.getConnectedCities(step);
    });
  }

  ngAfterViewInit() {
    console.log(this.updateForm.value);
  }

  public get carriages(): FormArray {
    return this.updateForm.get('carriages') as FormArray;
  }

  public get stations(): FormArray {
    return this.updateForm.get('stations') as FormArray;
  }

  protected getLastStation(): string[] {
    const last = this.stations!.value;
    return last
      .filter((value: string) => {
        return value !== '';
      })
      .slice(-1);
  }

  private getConnectedList(index?: number): { id: number; distance: number }[] {
    console.log(index, 'value');
    const value: number = index || Number(...this.getLastStation());
    const indexStation = this.currentStations.find((station: Station) => {
      return station.id === +value;
    });
    console.log(indexStation);
    return indexStation ? indexStation.connectedTo : [{ id: 0, distance: 0 }];
  }

  public getConnectedCities(index?: number): Station[] {
    console.log(index);
    const list: Station[] = [];
    const connectedList = index ? this.getConnectedList(index) : this.getConnectedList();
    console.log(connectedList, 'Connected');
    connectedList.forEach(({ id }) => {
      if (this.currentStations[id]) {
        list.push(this.currentStations[id]);
      } else {
        list.push({
          id: 0,
          city: `This station doesn't have connect`,
          latitude: 0,
          longitude: 0,
          connectedTo: [{ id: 0, distance: 0 }],
        });
      }
    });
    return list;
  }

  public changeControls(index: number, goal: 'station' | 'carriage'): void {
    console.log(index);
    if (goal === 'station') {
      if (index === this.stations.length - 1) {
        this.stations.push(this.FB.control(''));
      } else {
        while (this.stations.length > index + 2) {
          this.stations.removeAt(1);
        }
      }
    } else if (index === this.carriages.length - 1) {
      this.carriages.push(this.FB.control(''));
    } else {
      while (this.carriages.length > index + 2) {
        this.carriages.removeAt(1);
      }
    }
    this.mode = 'add';
    console.log(this.mode);
    console.log(this.stations.value[0]);
  }

  public onSubmit() {
    if (
      this.updateForm.value.carriages!.every((carriage) => {
        return typeof carriage === 'string';
      })
    ) {
      const pathes: number[] = [];
      this.updateForm.value.stations!.forEach((path: string | null) => {
        if (path !== '' && path) {
          pathes.push(Number(path));
        }
      });
      console.log(
        pathes,
        this.updateForm.value.carriages!.filter((item) => {
          return item !== '';
        }),
      );
      this.store.dispatch(
        updateRoute({
          id: this.currentRoute.id,
          path: pathes,
          carriages: this.updateForm.value.carriages!.filter((item) => {
            return item !== '';
          }),
        }),
      );
    }

    this.openSnackBarError(`Route ${this.currentRoute.id} was update`);

    this.close();
  }

  private openSnackBarError(message: string) {
    this.snackBar.open(`${message}`, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  public close() {
    this.closeForm.emit(false);
  }
}
