import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { RepairItemFormComponent } from '../repair-item-form/repair-item-form.component';
import { Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Repair } from '../_core/repair.interface';
import { RepairService } from '../repair.service';
import { ToastrService } from 'ngx-toastr';
import { RepairTask } from '../_core/repair-task.interface';

@Component({
    selector: 'va-repair-item-edit',
    templateUrl: 'repair-item-edit.component.html'
})
export class RepairItemEditComponent implements OnInit, OnDestroy {
    @ViewChild(RepairItemFormComponent) formRef: RepairItemFormComponent;

    private _onDestroy$ = new Subject();
    constructor(
        private _dialogRef: MatDialogRef<RepairItemEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { repair: Repair; item: RepairTask },
        private _repairService: RepairService,
        private _toastr: ToastrService
    ) {}

    ngOnInit() {
        this.formRef.form.setValue(this.data.item);
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
        this._toastr.success('Položka byla upravena.', 'Hotovo!');
        this._dialogRef.close(v);
    };

    private _onUpdateError = () => {
        this._toastr.error('Nepodařilo se upravit zvolenou položku.', 'Chyba!');
    };

    private _calculatePrice() {
        if (!!this.data.repair.tax && this.data.repair.tax > 0) {
            return this.formRef.form.get('priceNoTax').value * (this.data.repair.tax / 100 + 1);
        } else {
            return this.formRef.form.get('priceNoTax').value;
        }
    }
}
