import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../core/stores/vehicle/vehicle.service';
import { Interval } from '../../../shared/api/maintenance/interval.interface';
import { Maintenance } from '../../../shared/api/maintenance/maintenance.interface';
import { MaintenanceService } from '../../../shared/api/maintenance/maintenance.service';
import { MaintenanceAddComponent } from './maintenances/maintenance-add/maintenance-add.component';
import { MaintenanceDoneComponent } from './maintenances/maintenance-done/maintenance-done.component';
import { MaintenanceEditComponent } from './maintenances/maintenance-edit/maintenance-edit.component';
import { IntervalAddComponent } from './intervals/interval-add/interval-add.component';
import { ConfirmService } from '../../../shared/components/confirm/confirm.service';

@Component({
    selector: 'va-maintenance-wrapper',
    templateUrl: 'maintenance-wrapper.component.html'
})
export class MaintenanceWrapperComponent implements OnInit, OnDestroy {
    vehicleId: string;
    intervals: Interval[];
    selection: Maintenance[];
    maintenances: Maintenance[];
    selectedMaintenance: Maintenance;

    private _onDestroy$ = new Subject();

    constructor(
        private _service: MaintenanceService,
        private _fb: UntypedFormBuilder,
        private _confirm: ConfirmService,
        private _router: Router,
        private _vehicles: VehicleService,
        private _dialog: MatDialog
    ) {}

    ngOnInit() {
        this._service.pageSize = 5;

        this.vehicleId = this._vehicles.snapshot.info.id;
        if (!!this.vehicleId) {
            this._service.vehicleId = this.vehicleId;
            this.refreshIntervals(this.vehicleId);
            this.fetchCurrentPage();
        }
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    get canRunInterval(): boolean {
        return !!this.intervals && !!this.intervals.find(i => !i.inProgress);
    }

    refreshIntervals(vehicleId: string) {
        this._service
            .getIntervals(vehicleId)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._handleIntervals);
    }

    refreshAll() {
        this.fetchCurrentPage();
        this.refreshIntervals(this.vehicleId);
    }

    runInterval() {
        this._dialog
            .open(MaintenanceAddComponent, {
                width: '600px'
            })
            .afterClosed()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._maintenanceAdded);
    }

    openAddInterval() {
        this._dialog
            .open(IntervalAddComponent, {
                width: '600px'
            })
            .afterClosed()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(res => {
                if (!!res) {
                    this.refreshIntervals(this.vehicleId);
                }
            });
    }

    finishMaintenance(m: Maintenance[]) {
        this._dialog
            .open(MaintenanceDoneComponent, {
                width: '600px',
                data: m
            })
            .afterClosed()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onMaintenanceFinished);
    }

    fetchCurrentPage() {
        this._service.fetchCurrentPage().subscribe();
    }

    editMaintenance(maintenance: Maintenance) {
        this._dialog
            .open(MaintenanceEditComponent, {
                width: '600px',
                data: maintenance
            })
            .afterClosed()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(res => {
                if (!!res) {
                    this.fetchCurrentPage();
                }
            });
    }

    private _handleIntervals = (i: Interval[]) => {
        this.intervals = i;
        this._service.intervalsSubject.next(i);
    };

    private _maintenanceAdded = res => {
        if (!!res) {
            this.fetchCurrentPage();
            this.refreshIntervals(this.vehicleId);
        }
    };

    private _onMaintenanceFinished = repairId => {
        if (!!repairId) {
            this.fetchCurrentPage();
            this._confirm.open('Přeješ si přejít na detail vytvořené servisní práce?', 'Přejít na servisní práce')
                .pipe(takeUntil(this._onDestroy$))
                .subscribe(res => {
                    if (res) {
                        this._router.navigate([
                            '/vehicle/' + this.vehicleId + '/repairs/' + repairId
                        ]);
                    }
                });
        }
    };
}
