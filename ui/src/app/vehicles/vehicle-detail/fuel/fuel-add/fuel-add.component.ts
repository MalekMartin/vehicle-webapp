import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { FuelFormComponent } from '../fuel-form/fuel-form.component';
import { FuelService } from '../../../../shared/api/fuel/fuel.service';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';

@Component({
    selector: 'va-fuel-add',
    templateUrl: 'fuel-add.component.html',
    styleUrls: ['./fuel-add.component.scss']
})
export class FuelAddComponent implements AfterViewInit, OnDestroy {
    @ViewChild(FuelFormComponent) fuelForm: FuelFormComponent;

    private _onDestroy$ = new Subject();

    constructor(
        private _fuelService: FuelService,
        public dialogRef: MatDialogRef<FuelAddComponent>,
        private _toastr: ToastrService,
        private _vehicleService: VehicleService
    ) {}

    ngAfterViewInit() {
        setTimeout(() => {
            this.fuelForm.form.get('date').setValue(new Date());
            this._vehicleService.vehicle
                .pipe(takeUntil(this._onDestroy$))
                .subscribe(v => {
                    console.log(v);
                    this.fuelForm.form.get('vehicleId').setValue(v.info.id);
                });
        })
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    save() {
        const value = this.fuelForm.form.value;
        this._fuelService
            .addFueling({
                id: "",
                date: value.date,
                fullTank: value.fullTank,
                note: value.note,
                odo: Number(value.odo),
                odo2: Number(value.odo2),
                price: Number(value.price),
                pricePerLiter: Number(value.pricePerLiter),
                quantity: Number(value.quantity),
                vehicleId: value.vehicleId,
            })
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onSuccess, this._onError);
    }
    private _onSuccess = () => {
        this._toastr.success('Tankování bylo uloženo', 'Hotovo');
        this.dialogRef.close('DONE');
    };

    private _onError = () => {
        this._toastr.error('Tankování se nepodařilo uložit', 'Chyba');
    };
}
