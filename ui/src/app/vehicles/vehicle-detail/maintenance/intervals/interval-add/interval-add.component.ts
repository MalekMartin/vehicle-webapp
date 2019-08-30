import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material';
import { VehicleService } from '../../../../../core/stores/vehicle/vehicle.service';
import { IntervalFormComponent } from '../interval-form/interval-form.component';
import { MaintenanceService } from '../../../../../shared/api/maintenance/maintenance.service';
import { takeUntil } from 'rxjs/operators';
import { ToastsManager } from 'ng6-toastr';

@Component({
    selector: 'va-interval-add',
    templateUrl: 'interval-add.component.html'
})
export class IntervalAddComponent implements OnInit, OnDestroy {
    @ViewChild(IntervalFormComponent, {static: false}) formRef: IntervalFormComponent;
    private _onDestroy$ = new Subject();
    constructor(
        private _dialogRef: MatDialogRef<IntervalAddComponent>,
        private _vehilceService: VehicleService,
        private _maintenance: MaintenanceService,
        private _toastr: ToastsManager,
    ) {}

    ngOnInit() {
        this.formRef.form
            .get('vehicleId')
            .setValue(this._vehilceService.state.snapshot.vehicle.info.id);
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
        this._toastr.success('Interval byl úspěšně uložen.', 'Hotovo');
        this._dialogRef.close('DONE');
    };

    private _onSaveError = () => {
        this._toastr.error('Chyba při ukládání intervalu.', 'Chyba');
    };
}
