import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../core/stores/vehicle/vehicle.service';
import { Interval } from '../../../shared/api/maintenance/interval.interface';
import { Maintenance } from '../../../shared/api/maintenance/maintenance.interface';
import { MaintenanceService } from '../../../shared/api/maintenance/maintenance.service';
import { ConfirmDialogService } from '../../../shared/components/confirm-dialog/confirm-dialog.service';
import { Page } from '../../../utils/pageable';
import { MaintenanceAddComponent } from './maintenances/maintenance-add/maintenance-add.component';
import { MaintenanceDoneComponent } from './maintenances/maintenance-done/maintenance-done.component';
import { MaintenanceEditComponent } from './maintenances/maintenance-edit/maintenance-edit.component';

@Component({
    selector: 'va-maintenance-wrapper',
    templateUrl: 'maintenance-wrapper.component.html'
})
export class MaintenanceWrapperComponent implements OnInit, OnDestroy {
    @ViewChild('modal') modal: ModalDirective;

    vehicleId: string;
    action: 'NEW' | 'FINISH' | 'INTERVAL' = null;
    intervals: Interval[];
    selection: Maintenance[];

    form = this._fb.group({
        status: [''],
        interval: ['']
    });

    maintenances: Maintenance[];
    selectedMaintenance: Maintenance;

    private _onDestroy$ = new Subject();

    constructor(
        private _service: MaintenanceService,
        private _fb: FormBuilder,
        private _confirm: ConfirmDialogService,
        private _router: Router,
        private _vehicles: VehicleService,
        private _dialog: MatDialog
    ) {}

    ngOnInit() {
        this._service.pageSize = 5;

        this.vehicleId = this._vehicles.state.snapshot.vehicle.info.id;
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

    refreshIntervals(id: string) {
        this._service.getIntervals(id).subscribe(this._handleIntervals);
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
        this.action = 'INTERVAL';
        this._service.intervalSubject.next(this._service.buildEmptyInterval(this.vehicleId));
        this.modal.show();
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

    closeModal() {
        this.selectedMaintenance = null;
        this.modal.hide();
    }

    clearAction() {
        this.action = null;
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

    private _handleNewContent = (m: Page<Maintenance>) => {
        this._service.maintenanceSubject.next(m);
    };

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

            this.action = null;
            this._confirm.dialog
                .title('Přejít na servisní práce')
                .message('Přeješ si přejít na detail vytvořené servisní práce?')
                .ok('Ano')
                .cancel('Ne')
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
