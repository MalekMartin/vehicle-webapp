import { Component, OnInit, ViewChild, OnDestroy, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { Subscription } from 'rxjs';
import { Page } from '../../../../utils/pageable';
import { FormControl, FormBuilder } from '@angular/forms';
import { ConfirmDialogService } from '../../../../shared/components/confirm-dialog/confirm-dialog.service';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { VehicleService } from '../../../vehicle-stream/vehicle.service';
import { Interval } from '../../../../shared/api/maintenance/interval.interface';
import { Maintenance } from '../../../../shared/api/maintenance/maintenance.interface';
import { MaintenanceService } from '../../../../shared/api/maintenance/maintenance.service';

@Component({
    selector: 'va-maintenances',
    templateUrl: './maintenance.component.html',
    styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit, OnDestroy {

    @ViewChild('modal') modal: ModalDirective;

    @Output() onFinish = new EventEmitter();

    @Output() onUpdate = new EventEmitter<Maintenance>();

    @Output() refreshAll = new EventEmitter();

    action:string = null;

    maintenanceAction: boolean;

    vehicleId:string;
    intervals:Interval[];
    maintenances:MaintenanceSelectable[];
    now = 5;
    doneSelected: Maintenance;
    selectedMaintenance:Maintenance;
    status = 'IN_PROGRESS';

    selected: Maintenance[] = [];

    statuses = [
        {key: '', label: 'všechny stavy'},
        {key: 'IN_PROGRESS', label: 'Probíhající'},
        {key: 'CANCELED', label: 'Zrušené'},
        {key: 'DONE', label: 'Dokončené'}
    ];

    form = this._fb.group({
        status: [''],
        interval: ['']
    });

    private _selectedStatusSubs: Subscription;
    private _intervalsSubs: Subscription;
    private _maintenanceSubs: Subscription;
    private _pageSubs: Subscription;
    private _mSubjectSubs: Subscription;

    constructor(private _route: ActivatedRoute,
                private _maintenance: MaintenanceService,
                private _fb: FormBuilder,
                private _confirm: ConfirmDialogService,
                private _toastr: ToastsManager,
                private _router: Router,
                private _vehicles: VehicleService) {}

    ngOnInit() {

        this.vehicleId = this._vehicles.vehicleId;
        if (!!this.vehicleId) {
            this._maintenance.vehicleId = this.vehicleId;
            this.setFilters();
        }

        this._mSubjectSubs = this._maintenance.maintenanceSubject.subscribe(this._handleNewContent);

        this._selectedStatusSubs = this.form
            .valueChanges
            .subscribe((s: string) => {
                this._maintenance.reset();
                this._maintenance.filter = this.form.value;
                this._maintenanceSubs = this._maintenance.fetchCurrentPage().subscribe();
            });

        this._intervalsSubs = this._maintenance.intervalsSubject.subscribe(i => {
            this.intervals = i;
        });
    }

    ngOnDestroy() {
        if (this._intervalsSubs) {
            this._intervalsSubs.unsubscribe();
        }
        if (this._maintenanceSubs) {
            this._maintenanceSubs.unsubscribe();
        }
        if (this._selectedStatusSubs) {
            this._selectedStatusSubs.unsubscribe();
        }
        if (this._mSubjectSubs) {
            this._mSubjectSubs.unsubscribe();
        }
    }

    setFilters() {
        this._maintenance.filter = {
            status: this.form.get('status').value,
            interval: this.form.get('interval').value
        };
    }

    setAction(a) {
        this.maintenanceAction = a;

        if (!a) {
            this.selected = [];
            this.maintenances.forEach(v => {
                v.selected = false;
            });
        }
    }

    addToSelected(m: Maintenance) {
        this.selected.push(m);
    }

    removeFromSelected(m: Maintenance) {
        const index = this.selected.findIndex(v => v.id === m.id);
        if (index > -1) {
            this.selected.splice(index, 1);
        }
    }

    get maintenanceService() {
        return this._maintenance;
    }

    get hasSelection() {
        return this.selected.length > 0;
    }

    get itemsFormatLabel() {
        if (this.selected.length === 1) {
            return 'položku';
        } else if (this.selected.length > 1 && this.selected.length < 5) {
            return 'položky';
        } else {
            return 'položek';
        }
    }

    confirmDelete() {

        this._confirm
            .dialog
            .title('Smazat údržbu')
            .message('Opravdu chceš smazat <b>' + this.selected.length + '</b> ' + this.itemsFormatLabel + ' údržby?')
            .ok('Ano, smazat')
            .cancel('Zrušit')
            .subscribe(res => {
                if (res) {
                    this.delete();
                }
            });
    }

    confirmCancel() {
        this._confirm
            .dialog
            .title('Ukončit údržbu')
            .message('Opravdu chceš ukončit <b>' + this.selected.length + '</b> ' + this.itemsFormatLabel + ' údržby?')
            .ok('Ano, ukončit')
            .cancel('Zrušit')
            .subscribe(res => {
                if (res) {
                    this.cancel();
                }
            });
    }

    delete() {
        const ids = this.selected.map(m => m.id);
        this._maintenance
            .deleteMaintenance(ids)
            .subscribe(this._onDeleteSuccess, this._onDeleteError);
    }

    cancel() {
        const ids = this.selected.map(m => m.id);
        this._maintenance
            .cancelMaintenance(ids)
            .subscribe(this._onCancelSuccess, this._onCancelError);
    }

    fetchPage(p: number) {
        this.setFilters();
        this._pageSubs = this._maintenance.fetchPage(p)
            .subscribe(this._handleNewContent);
    }

    endValue(start, value) {
        return Number(start) + Number(value);
    }

    openUpdateDialog(maintenance:Maintenance) {
        this.onUpdate.emit(maintenance);
    }

    openFinishDialog() {
        this.action = 'FINISH';
        this.onFinish.emit({action: this.action, maintenances: this.selected});
        this.setAction(null);
    }

    doneCanceled() {
        // this.modal.hide();
        this.action = null;
    }

    newCanceled() {
        // this.modal.hide();
        this.selectedMaintenance = null;
    }

    private _onCancelSuccess = () => {
        this._toastr.success('Údržba byla úspěšně zrušena.');
        this.refreshAll.emit();
        this.setAction(false);
    }

    private _onCancelError = () => {
        this._toastr.error('Vybrané intervaly nebyly zrušeny.', 'Chyba!');
    }

    private _onDeleteSuccess = () => {
        this._toastr.success('Údržba byla úspěšně smazána.');
        this.refreshAll.emit();
        this.setAction(false);
    }

    private _onDeleteError = () => {
        this._toastr.error('Chyba.');
    }

    private _handleNewContent = (m: Page<Maintenance>) => {
        this.maintenances = m.content.map(v => {
            const index = this.selected.findIndex(s => s.id === v.id);
            return {...v, selected: index > -1 ? true : false};
        });
    }
}

interface MaintenanceSelectable extends Maintenance {
    selected: boolean;
}
