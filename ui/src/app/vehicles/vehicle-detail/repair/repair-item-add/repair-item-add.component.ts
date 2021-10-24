import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { RepairItemFormComponent } from '../repair-item-form/repair-item-form.component';
import { Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Repair } from '../_core/repair.interface';
import { RepairService } from '../repair.service';
import { ToastsManager } from 'ng6-toastr';

@Component({
    selector: 'va-repair-item-add',
    templateUrl: 'repair-item-add.component.html'
})
export class RepairItemAddComponent implements OnInit, OnDestroy {
    @ViewChild(RepairItemFormComponent) formRef: RepairItemFormComponent;

    private _onDestroy$ = new Subject();
    constructor(
        private _dialogRef: MatDialogRef<RepairItemAddComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Repair,
        private _repairService: RepairService,
        private _toastr: ToastsManager
    ) {}

    ngOnInit() {
        this.formRef.form.get('repairId').setValue(this.data.id);
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    save() {
        this.formRef.form.patchValue({ price: this._calculatePrice() });

        this._repairService
            .addTask(this.formRef.form.value)
            .subscribe(this._onUpdateSuccess, this._onUpdateError);
    }

    private _onUpdateSuccess = v => {
        this._toastr.success('Nová položka byla přidána.', 'Hotovo!');
        this._dialogRef.close(v);
    };

    private _onUpdateError = () => {
        this._toastr.error('Nepodařilo se přidat zadanou položku.', 'Chyba!');
    };

    private _calculatePrice() {
        if (!!this.data.tax && this.data.tax > 0) {
            return this.formRef.form.get('priceNoTax').value * (this.data.tax / 100 + 1);
        } else {
            return this.formRef.form.get('priceNoTax').value;
        }
    }
}
