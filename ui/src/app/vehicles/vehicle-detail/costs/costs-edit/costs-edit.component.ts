import { Component, OnInit, ViewChild, OnDestroy, Inject, AfterViewInit } from '@angular/core';
import { CostsFormComponent } from '../costs-form/costs-form.component';
import { Subject } from 'rxjs';
import { CostsService } from '../../../../shared/api/costs/costs.service';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Cost } from '../cost.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'va-costs-edit',
    templateUrl: 'costs-edit.component.html',
    styleUrls: ['./costs-edit.component.scss']
})
export class CostsEditComponent implements AfterViewInit, OnDestroy {
    @ViewChild(CostsFormComponent) costsRef: CostsFormComponent;

    private _onDestroy$ = new Subject();

    constructor(
        private _costsService: CostsService,
        private _toastr: ToastrService,
        private _dialogRef: MatDialogRef<CostsEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Cost
    ) {}

    ngAfterViewInit() {
        if (!!this.costsRef) {
            this.costsRef.form.setValue({
                id: this.data.id,
                vehicleId: this.data.vehicleId,
                category: this.data.category.id,
                title: this.data.title,
                note: this.data.note,
                quantity: this.data.quantity,
                pricePerItem: this.data.pricePerItem,
                totalPrice: this.data.totalPrice,
                odo: this.data.odo,
                odo2: this.data.odo2,
                date: this.data.date
            });
        }
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    save() {
        this._costsService
            .saveCost(this.costsRef.form.value)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onSaveSuccess, this._onSaveError);
    }

    private _onSaveSuccess = () => {
        this._toastr.success('Položka nákladů byl úspěšně upravena.', 'Hotovo');
        this._dialogRef.close('DONE');
    };

    private _onSaveError = () => {
        this._toastr.success('Při úpravě nákladů došlo k chybě.', 'Chyba!');
    };
}
