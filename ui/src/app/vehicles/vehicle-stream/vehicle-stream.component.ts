import { Component, OnDestroy, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Vehicle } from './vehicle';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { VehicleDeleteConfirmComponent } from './vehicle-delete-confirm/vehicle-delete-confirm.component';
import { VehicleStreamService } from '../../core/stores/vehicle/vehicle-stream.service';

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

    state = merge(
        this._service.state.select(s => s.vehicles, true),
        this._service.state.select(s => s.loading, true)
    );

    private _onDestroy$ = new Subject();

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this._resize(event.target.innerWidth);
    }

    constructor(
        public dialog: MatDialog,
        private _service: VehicleStreamService,
        private _router: Router
    ) {}

    ngOnInit() {
        this.query.valueChanges.pipe(takeUntil(this._onDestroy$)).subscribe(res => {
            this.filter = res;
        });
        if (!this._service.state.snapshot.vehicles) {
            this.getAllVehicles();
        }
    }

    ngAfterViewInit() {
        this._resize(window.innerWidth);
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    getAllVehicles() {
        this._service.state.update(f => f.replaceLoading, true);
        this._service
            .refresh()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(v => {
                this._service.state.update(f => f.replaceVehicles, v);
                this._service.state.update(f => f.replaceLoading, false);
            });
    }

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
