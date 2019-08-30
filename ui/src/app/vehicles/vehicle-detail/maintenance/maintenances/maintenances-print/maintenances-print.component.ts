import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaintenanceService } from '../../../../../shared/api/maintenance/maintenance.service';
import { Maintenance } from '../../../../../shared/api/maintenance/maintenance.interface';
import { VehicleService } from '../../../../../core/stores/vehicle/vehicle.service';
import { Subject, of } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
    selector: 'va-maintenances-print',
    templateUrl: 'maintenances-print.component.html',
    styleUrls: ['./maintenances-print.component.scss']
})
export class MaintenancesPrintComponent implements OnInit, OnDestroy {
    maintenances: Maintenance[];
    vehicleId: string;

    private _onDestroy = new Subject();

    constructor(
        private _maintenances: MaintenanceService,
        private _vehicleService: VehicleService
    ) {}

    ngOnInit() {
        this._vehicleService.state
            .select(s => s.vehicle)
            .pipe(
                tap(v => {
                    this.vehicleId = v.info.id;
                }),
                switchMap(vehicle => {
                    return !!vehicle.info
                        ? this._maintenances.getAllMaintenances(vehicle.info.id)
                        : of([]);
                }),
                takeUntil(this._onDestroy)
            )
            .subscribe(m => {
                this.maintenances = m;
            });
    }

    ngOnDestroy() {
        this._onDestroy.next();
    }
}
