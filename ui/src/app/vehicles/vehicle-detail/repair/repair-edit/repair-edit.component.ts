import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { RepairFormComponent } from '../repair-form/repair-form.component';
import { RepairService } from '../repair.service';
import { ToastsManager } from 'ng6-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Repair } from '../_core/repair.interface';

@Component({
    selector: 'va-repair-edit',
    templateUrl: 'repair-edit.component.html'
})
export class RepairEditComponent implements OnInit, OnDestroy {
    @ViewChild(RepairFormComponent) formRef: RepairFormComponent;

    private _onDestroy$ = new Subject();

    constructor(
        private _repairService: RepairService,
        private _toastr: ToastsManager,
        private _dialogRef: MatDialogRef<RepairEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Repair
    ) {}

    ngOnInit() {
        this.formRef.form.setValue({
            id: this.data.id,
            vehicleId: this.data.vehicleId,
            title: this.data.title,
            odo: this.data.odo,
            odo2: this.data.odo2,
            date: this.data.date,
            garageId: this.data.garageId,
            totalPrice: this.data.totalPrice,
            notes: this.data.notes,
            tax: this.data.tax,
            taxToggle: !!this.data.tax
        });
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

    private _onSaveSuccess = (r) => {
        this._toastr.success('Oprava byla úspěšně uložena', 'Hotovo!');
        this._dialogRef.close(r);
    };

    private _onSaveError = () => {
        this._toastr.error('Servisní práci se nepodařilo uložit', 'Chyba!');
    };
}
