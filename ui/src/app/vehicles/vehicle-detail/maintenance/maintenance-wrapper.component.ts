import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MaintenanceService } from '../../../shared/api/maintenance/maintenance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ConfirmDialogService } from '../../../shared/components/confirm-dialog/confirm-dialog.service';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { VehicleService } from '../../../core/stores/vehicle/vehicle.service';
import { Page } from '../../../utils/pageable';
import { Maintenance } from '../../../shared/api/maintenance/maintenance.interface';
import { Subscription } from 'rxjs';
import { Interval } from '../../../shared/api/maintenance/interval.interface';
import { ModalDirective } from 'ngx-bootstrap';

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

    private _selectedStatusSubs: Subscription;
    private _maintenanceSubs: Subscription;

    constructor(private _service: MaintenanceService,
                private _route: ActivatedRoute,
                private _fb: FormBuilder,
                private _confirm: ConfirmDialogService,
                private _toastr: ToastsManager,
                private _router: Router,
                private _vehicles: VehicleService) { }

    ngOnInit() {
        this._service.pageSize = 5;

        this.vehicleId = this._vehicles.state.snapshot.vehicle.info.id;
        if (!!this.vehicleId) {
            this._service.vehicleId = this.vehicleId;
            this.refreshIntervals(this.vehicleId);
            this._maintenanceSubs = this._service.fetchCurrentPage().subscribe();
        }
    }

    ngOnDestroy() {
        if (this._maintenanceSubs) {
            this._maintenanceSubs.unsubscribe();
        }
    }

    get hasNonActiveIntervals(): boolean {
        return this.intervals
                    ? this.intervals.filter(i => {
                            return i.inProgress === false;
                        })
                        .length > 0
                    : false;
    }

    refreshIntervals(id: string) {
        this._service.getIntervals(id)
            .subscribe(this._handleIntervals);
    }

    refreshAll() {
        this._maintenanceSubs = this._service.fetchCurrentPage().subscribe();
        this.refreshIntervals(this.vehicleId);
    }

    openNewDialog() {
        this.action = 'NEW';
        this.modal.show();
    }

    openAddInterval() {
        this.action = 'INTERVAL';
        this._service.intervalSubject.next(this._service.buildEmptyInterval(this.vehicleId));
        this.modal.show();
    }

    openFinishDialog(m: {action: 'NEW' | 'FINISH' | 'INTERVAL'; maintenances: Maintenance[]}) {
        this.action = m.action;
        this.selection = m.maintenances;
        this.modal.show();
    }

    closeModal() {
        this.selectedMaintenance = null;
        this.modal.hide();
    }

    clearAction() {
        this.action = null;
    }

    addedMaintenance() {
        this.modal.hide();
        this._maintenanceSubs = this._service.fetchCurrentPage().subscribe();
        this.refreshIntervals(this.vehicleId);
    }

    onUpdate(m: Maintenance) {
        // this._service.intervalSubject.next(m);
        this.selectedMaintenance = m;
        this.action = 'NEW';
        this.modal.show();
    }

    finished(repair) {
        this.modal.hide();
        this.action = null;
        this._maintenanceSubs = this._service.fetchCurrentPage().subscribe();
        // this.setAction(null);
        this.action = null;
        this._confirm.dialog
            .title('Přejít na servisní práce')
            .message('Přeješ si přejít na detail vytvořené servisní práce?')
            .ok('Ano')
            .cancel('Ne')
            .subscribe((res) => {
                if (res) {
                    this._router.navigate(['/vehicle/' + this.vehicleId + '/repairs/' + repair]);
                }
            });
    }

    private _handleNewContent = (m: Page<Maintenance>) => {
        this._service.maintenanceSubject.next(m);
    }

    private _handleIntervals = (i: Interval[]) => {
        this.intervals = i;
        this._service.intervalsSubject.next(i);
    }
}
