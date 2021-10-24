import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { FuelFormComponent } from '../fuel-form/fuel-form.component';
import { FuelService } from '../../../../shared/api/fuel/fuel.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Fuel } from '../../../../shared/api/fuel/fuel';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'va-fuel-edit',
    templateUrl: 'fuel-edit.component.html',
    styleUrls: ['./fuel-edit.component.scss']
})
export class FuelEditComponent implements OnInit, OnDestroy {
    @ViewChild(FuelFormComponent) fuelForm: FuelFormComponent;

    private _onDestroy$ = new Subject();

    constructor(
        private _fuelService: FuelService,
        public dialogRef: MatDialogRef<FuelEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Fuel,
        private _toastr: ToastrService
    ) {}

    ngOnInit() {
        if (!!this.data) {
            this.fuelForm.form.setValue({
                id: this.data.id,
                vehicleId: this.data.vehicleId,
                date: this.data.date,
                quantity: this.data.quantity,
                pricePerLiter: this.data.pricePerLiter,
                price: this.data.price,
                odo: this.data.odo,
                odo2: this.data.odo2,
                fullTank: this.data.fullTank,
                note: this.data.note
            });
        }
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    save() {
        this._fuelService
            .updateFueling(this.fuelForm.form.value)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onSuccess, this._onError);
    }
    private _onSuccess = () => {
        this._toastr.success('Tankování bylo změněno', 'Hotovo');
        this.dialogRef.close('DONE');
    };

    private _onError = () => {
        this._toastr.error('Tankování se nepodařilo upravit', 'Chyba');
    };
}
