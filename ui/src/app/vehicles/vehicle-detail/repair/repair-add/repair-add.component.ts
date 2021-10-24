import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';
import { RepairFormComponent } from '../repair-form/repair-form.component';
import { RepairService } from '../repair.service';

@Component({
    selector: 'va-repair-add',
    templateUrl: 'repair-add.component.html'
})
export class RepairAddComponent implements OnInit, OnDestroy {
    @ViewChild(RepairFormComponent) formRef: RepairFormComponent;

    private _onDestroy$ = new Subject();

    constructor(
        private _repairService: RepairService,
        private _toastr: ToastrService,
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
