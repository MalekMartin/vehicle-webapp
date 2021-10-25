import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';
import { VValidators } from '../../../../shared/forms/validators';

@Component({
    selector: 'va-fuel-form',
    templateUrl: './fuel-form.component.html',
    styleUrls: ['./fuel-form.component.scss']
})
export class FuelFormComponent implements OnInit, OnDestroy {
    units: string;
    subUnits: string;

    form = this._form.group({
        id: [''],
        vehicleId: [''],
        date: ['', [Validators.required]],
        quantity: ['', [Validators.required, VValidators.validateNumber]],
        pricePerLiter: ['0', [Validators.required, VValidators.validateNumber]],
        price: ['0', [Validators.required, VValidators.validateNumber]],
        odo: ['', [Validators.required, VValidators.validateNumber]],
        odo2: ['0', VValidators.validateNumber],
        fullTank: [true],
        note: ['', Validators.maxLength(255)]
    });
    private _onDestroy$ = new Subject();

    constructor(private _form: FormBuilder, private _vehicles: VehicleService) {}

    ngOnInit() {
        this._vehicles.vehicle
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(v => {
                if (v) {
                    this.units = v.info.units;
                    this.subUnits = v.info.subUnits;
                }
            });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    calculatePricePerLiter() {
        const price = this.form.value.price;
        let pricePerLiter = this.form.value.pricePerLiter;
        const quantity = this.form.value.quantity;
        let result = '0';

        if (quantity > 0 && price > 0) {
            result = pricePerLiter = (parseFloat(price) / parseFloat(quantity)).toFixed(2);
        }

        this.form.controls['pricePerLiter'].setValue(result);
    }

    calculatePrice() {
        const price = this.form.value.price;
        const pricePerLiter = this.form.value.pricePerLiter;
        const quantity = this.form.value.quantity;
        let result = '0';

        if (parseFloat(quantity) > 0 && parseFloat(pricePerLiter) > 0) {
            result = (parseFloat(pricePerLiter) * parseFloat(quantity)).toFixed(2);
        }

        this.form.controls['price'].setValue(result);
    }

    resetPrice() {
        this.form.controls['price'].setValue(0);
        this.form.controls['pricePerLiter'].setValue(0);
    }
}
