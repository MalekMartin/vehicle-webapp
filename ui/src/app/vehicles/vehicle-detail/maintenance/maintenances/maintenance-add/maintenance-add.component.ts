import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { MaintenaceFormComponent } from '../maintenance-form/maintenance-form.component';
import { MaintenanceService } from '../../../../../shared/api/maintenance/maintenance.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../../../core/stores/vehicle/vehicle.service';

@Component({
    selector: 'va-maintenance-add',
    templateUrl: 'maintenance-add.component.html'
})
export class MaintenanceAddComponent implements AfterViewInit, OnDestroy {
    @ViewChild(MaintenaceFormComponent) formRef: MaintenaceFormComponent;
    private _onDestroy$ = new Subject();

    constructor(
        private _dialogRef: MatDialogRef<MaintenanceAddComponent>,
        private _maintenance: MaintenanceService,
        private _toastr: ToastrService,
        private _vehicleService: VehicleService
    ) {}

    ngAfterViewInit() {
        setTimeout(() => {
            this.formRef.form
                .get('vehicleId')
                .setValue(this._vehicleService.snapshot.info.id);
        })
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    save() {
        this._maintenance
            .saveMaintenance(this.formRef.form.value)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onSaveSucces, this._onSaveError);
    }

    private _onSaveSucces = () => {
        this._toastr.success('Zadaný interval byl úspěšně spuštěn.', 'Hotovo');
        this._dialogRef.close(true);
    };

    private _onSaveError = () => {
        this._toastr.error('Zadaný interval se nepodařilo spustit', 'Chyba!');
    };
}
