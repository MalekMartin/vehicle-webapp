import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';
import { Fuel } from '../../../../shared/api/fuel/fuel';
import { FuelService } from '../../../../shared/api/fuel/fuel.service';
import { VValidators } from '../../../../shared/forms/validators';

@Component({
    selector: 'va-fuel-form',
    templateUrl: './fuel-form.component.html',
    styleUrls: ['./fuel-form.component.scss']
})
export class FuelFormComponent implements OnInit, OnDestroy {
    id: string;
    vehicleId: string;
    fuelings: Fuel[];
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

    private _fueling: Fuel;
    private _onDestroy$ = new Subject();

    constructor(
        private _fuelings: FuelService,
        private _form: FormBuilder,
        private _router: Router,
        private _route: ActivatedRoute,
        private _toastr: ToastsManager,
        private _vehicles: VehicleService
    ) {}

    ngOnInit() {
        this._route.params.pipe(takeUntil(this._onDestroy$)).subscribe(p => {
            this.id = p['id'] || null;
            if(this.id) {
                this.getFueling(this.id);
            }
        });
        this._vehicles.state
            .select(s => s.vehicle)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(v => {
                this.units = v.info.units;
                this.subUnits = v.info.subUnits;
                this.vehicleId = v.info.id;
                this.form.get('vehicleId').setValue(v.info.id);
            });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    get fueling(): Fuel {
        return this._fueling;
    }

    getFueling(id) {
        this._fuelings.fueling(id).subscribe(this._onFuelingSuccess, this._onFuelingError);
    }

    save() {
        if (!this.id) {
            this._fuelings
                .addFueling(this.form.value)
                .subscribe(this._onSaveSuccess, this._onFuelingError);
        } else {
            this._fuelings
                .updateFueling(this.form.value)
                .subscribe(this._onSaveSuccess, this._onFuelingError);
        }
    }

    back() {
        if (this.id) {
            this._router.navigate(['/vehicle/' + this.vehicleId + '/fuel']);
        } else {
            this._router.navigate(['./'], { relativeTo: this._route.parent.parent });
        }
    }

    private _onSaveSuccess = () => {
        this._toastr.success('Tankování bylo uloženo', 'Hotovo');
        this._router.navigate(['./'], {
            relativeTo: this._route.parent.parent,
            queryParams: { itemChanged: true }
        });
    };

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

    private _onFuelingSuccess = (f: Fuel) => {
        this.form.setValue({
            id: f.id,
            vehicleId: f.vehicleId,
            date: f.date,
            quantity: f.quantity,
            pricePerLiter: f.pricePerLiter || 0,
            price: f.price || 0,
            odo: f.odo || 0,
            odo2: f.odo2 || 0,
            fullTank: f.fullTank,
            note: f.note
        });
    };

    private _onFuelingError = () => {
        this._toastr.error('Záznam nebyl nalezen.', 'Chyba!');
    };
}
