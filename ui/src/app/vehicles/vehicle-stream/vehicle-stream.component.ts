import {
    Component,
    OnDestroy,
    OnInit,
    HostListener,
    AfterViewInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../core/stores/vehicle/vehicle.service';
import { Vehicle } from './vehicle';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { VehicleDeleteConfirmComponent } from './vehicle-delete-confirm/vehicle-delete-confirm.component';

@Component({
    selector: 'va-vehicle-stream',
    templateUrl: './vehicle-stream.component.html',
    styleUrls: ['./vehicle-stream.component.scss']
})
export class VehicleStreamComponent implements OnInit, AfterViewInit, OnDestroy {
    filter: string;
    expanded = false;
    query = new FormControl('');
    gridCols = 5;
    vehicles: Vehicle[];

    private _onDestroy$ = new Subject();

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this._resize(event.target.innerWidth);
    }

    constructor(
        public dialog: MatDialog,
        private _service: VehicleService,
        private _router: Router
    ) {}

    ngOnInit() {
        this.query.valueChanges.pipe(takeUntil(this._onDestroy$)).subscribe(res => {
            this.filter = res;
        });
        this.getAllVehicles();
    }

    ngAfterViewInit() {
        this._resize(window.innerWidth);
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    getAllVehicles() {
        this._service
            .refresh()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(v => {
                this.vehicles = v;
            });
    }
    // get vehicles(): Vehicle[] {
    //     return this._service.allVehicles;
    // }

    addVehicle(e: MouseEvent) {
        e.preventDefault();
        this.dialog
            .open(VehicleAddComponent, {
                width: '500px'
            })
            .afterClosed()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onSave);
    }

    onDelete(vehicle: Vehicle) {
        this.dialog
            .open(VehicleDeleteConfirmComponent, {
                width: '300px',
                data: {
                    name: `${vehicle.brand} ${vehicle.model}`,
                    id: vehicle.id
                }
            })
            .afterClosed()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onDeleteSuccess);
    }

    private _onSave = (vehicleId: string) => {
        if (!!vehicleId) {
            this._router.navigate(['vehicle', vehicleId, 'settings']);
            this.getAllVehicles();
        }
    };

    private _onDeleteSuccess = res => {
        if (!!res) {
            this.getAllVehicles();
        }
    };

    private _resize(width: number) {
        if (width > 796) {
            this.gridCols = 5;
        } else if (width <= 796 && width > 640) {
            this.gridCols = 3;
        } else if (width <= 640 && width > 440) {
            this.gridCols = 2;
        } else {
            this.gridCols = 1;
        }
    }
}
