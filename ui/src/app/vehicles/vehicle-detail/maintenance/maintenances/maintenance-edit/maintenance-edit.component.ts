import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaintenaceFormComponent } from '../maintenance-form/maintenance-form.component';
import { MaintenanceService } from '../../../../../shared/api/maintenance/maintenance.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Maintenance } from '../../../../../shared/api/maintenance/maintenance.interface';

@Component({
    selector: 'va-maintenance-edit',
    templateUrl: 'maintenance-edit.component.html'
})
export class MaintenanceEditComponent implements OnInit, OnDestroy {
    @ViewChild(MaintenaceFormComponent) formRef: MaintenaceFormComponent;
    private _onDestroy$ = new Subject();

    constructor(
        private _dialogRef: MatDialogRef<MaintenanceEditComponent>,
        private _maintenance: MaintenanceService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: Maintenance
    ) {}

    ngOnInit() {
        this.formRef.form.setValue({
            id: this.data.id,
            vehicleId: this.data.vehicleId,
            intervalId: this.data.interval.id,
            odo: this.data.odo,
            odo2: this.data.odo2,
            date: this.data.date
        });
        this.formRef.form.get('intervalId').disable();
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    save() {
        this._maintenance
            .saveMaintenance(this.formRef.form.getRawValue())
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onSaveSucces, this._onSaveError);
    }

    private _onSaveSucces = () => {
        this._toastr.success('Interval byl úspěšně upraven.', 'Hotovo');
        this._dialogRef.close('DONE');
    };

    private _onSaveError = () => {
        this._toastr.error('Interval se nepodařilo upravit', 'Chyba!');
    };
}
