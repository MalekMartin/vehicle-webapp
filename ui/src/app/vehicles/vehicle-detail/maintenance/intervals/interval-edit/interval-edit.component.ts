import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IntervalFormComponent } from '../interval-form/interval-form.component';
import { MaintenanceService } from '../../../../../shared/api/maintenance/maintenance.service';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Interval } from '../../../../../shared/api/maintenance/interval.interface';

@Component({
    selector: 'va-interval-edit',
    templateUrl: 'interval-edit.component.html'
})
export class IntervalEditComponent implements OnInit, OnDestroy {
    @ViewChild(IntervalFormComponent) formRef: IntervalFormComponent;
    private _onDestroy$ = new Subject();
    constructor(
        private _dialogRef: MatDialogRef<IntervalEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Interval,
        private _maintenance: MaintenanceService,
        private _toastr: ToastrService
    ) {}

    ngOnInit() {
        this.formRef.form.setValue({
            id: this.data.id,
            vehicleId: this.data.vehicleId,
            name: this.data.name,
            odo: this.data.odo,
            odo2: this.data.odo2,
            months: this.data.months,
            note: this.data.note
        });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    save() {
        this._maintenance
            .saveInterval(this.formRef.form.value)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onSaveSuccess, this._onSaveError);
    }

    private _onSaveSuccess = () => {
        this._toastr.success('Změny byly úspěšně uloženy.', 'Hotovo');
        this._dialogRef.close('DONE');
    };

    private _onSaveError = () => {
        this._toastr.error('Chyba při ukládání intervalu.', 'Chyba');
    };
}
