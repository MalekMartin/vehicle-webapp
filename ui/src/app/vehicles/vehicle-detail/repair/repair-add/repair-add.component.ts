import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { RepairFormComponent } from '../repair-form/repair-form.component';
import { RepairService } from '../repair.service';
import { ToastsManager } from 'ng6-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';

@Component({
    selector: 'va-repair-add',
    templateUrl: 'repair-add.component.html'
})
export class RepairAddComponent implements OnInit, OnDestroy {
    @ViewChild(RepairFormComponent, {static: false}) formRef: RepairFormComponent;

    private _onDestroy$ = new Subject();

    constructor(
        private _repairService: RepairService,
        private _toastr: ToastsManager,
        private _dialogRef: MatDialogRef<RepairAddComponent>,
        private _vehicleService: VehicleService
    ) {}

    ngOnInit() {
        this.formRef.form
            .get('vehicleId')
            .setValue(this._vehicleService.state.snapshot.vehicle.info.id);
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    save() {
        const repair = this.formRef.form.value;
        repair.garageId = !!repair.garageId ? repair.garageId : null;
        this._repairService
            .update(repair)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onSaveSuccess, this._onSaveError);
    }

    close() {
        this._dialogRef.close();
    }

    private _onSaveSuccess = r => {
        this._toastr.success('Oprava byla úspěšně uložena', 'Hotovo!');
        this._dialogRef.close(r);
    };

    private _onSaveError = () => {
        this._toastr.error('Servisní práci se nepodařilo uložit', 'Chyba!');
    };
}
