import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { VehicleService } from '../../../../../core/stores/vehicle/vehicle.service';
import { IntervalFormComponent } from '../interval-form/interval-form.component';
import { MaintenanceService } from '../../../../../shared/api/maintenance/maintenance.service';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'va-interval-add',
    templateUrl: 'interval-add.component.html'
})
export class IntervalAddComponent implements AfterViewInit, OnDestroy {
    @ViewChild(IntervalFormComponent) formRef: IntervalFormComponent;
    private _onDestroy$ = new Subject();
    constructor(
        private _dialogRef: MatDialogRef<IntervalAddComponent>,
        private _vehilceService: VehicleService,
        private _maintenance: MaintenanceService,
        private _toastr: ToastrService
    ) {}

    ngAfterViewInit() {
        setTimeout(() => {
            this.formRef.form
                .get('vehicleId')
                .setValue(this._vehilceService.snapshot.info.id);
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
        this._toastr.success('Interval byl úspěšně uložen.', 'Hotovo');
        this._dialogRef.close('DONE');
    };

    private _onSaveError = () => {
        this._toastr.error('Chyba při ukládání intervalu.', 'Chyba');
    };
}
