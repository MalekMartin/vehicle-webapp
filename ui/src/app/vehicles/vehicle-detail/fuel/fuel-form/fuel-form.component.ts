import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpService } from '../../../../core/http.service';
import { FuelService } from '../../../../shared/api/fuel/fuel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fuel } from '../../../../shared/api/fuel/fuel';
import { VValidators } from '../../../../shared/forms/validators';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { VehicleService } from '../../../vehicle-stream/vehicle.service';

@Component({
    selector: 'va-fuel-form',
    templateUrl: './fuel-form.component.html',
    styleUrls: ['./fuel-form.component.scss']
})
export class FuelFormComponent implements OnInit {

    vehicleId: string;
    id: string;
    fuelings: Fuel[];

    form = this._form.group({
        id: [''],
        vehicleId: [''],
        date: ['',[Validators.required]],
        quantity: ['',[Validators.required, VValidators.validateNumber]],
        pricePerLiter: ['0',[Validators.required, VValidators.validateNumber]],
        price: ['0',[Validators.required, VValidators.validateNumber]],
        odo: ['',[Validators.required, VValidators.validateNumber]],
        odo2: ['0', VValidators.validateNumber],
        fullTank: [true],
        note: ['', Validators.maxLength(255)]
    });

    private _vehicleId: string;
    private _fueling: Fuel;

    constructor(private _fuelings: FuelService,
                private _form: FormBuilder,
                private _router: Router,
                private _route: ActivatedRoute,
                private _toastr: ToastsManager,
                private _vehicles: VehicleService) { }

    ngOnInit() {
        this._route
        .params
        .map(par => par)
        .subscribe(p => {
            if (p['vehicleId']) {
                this.vehicleId = p['vehicleId'];
                this.form.get('vehicleId').setValue(this.vehicleId);
            }

            if (p['id']) {
                this.id = p['id'];
                this.getFueling(p['id']);
            }
        });
    }

    get fueling(): Fuel {
        return this._fueling;
    }

    getFueling(id) {
        this._fuelings.fueling(id)
            .subscribe(this._onFuelingSuccess, this._onFuelingError);
    }

    get units(): string {
        return this._vehicles.units;
    }

    get subUnits(): string {
        return this._vehicles.Units2;
    }

    save() {
        if (!this.id) {
            this._fuelings.addFueling(this.form.value)
                .subscribe(this._onSaveSuccess, this._onFuelingError);
        } else {
            this._fuelings.updateFueling(this.form.value)
                .subscribe(this._onSaveSuccess, this._onFuelingError);
        }
    }

    back() {
        if (this.vehicleId) {
            this._router.navigate(['/vehicle/' + this.vehicleId + '/fuel']);
        } else {
            this._router.navigate(['./'], {relativeTo: this._route.parent.parent});
        }
    }

    private _onSaveSuccess = () => {
        this._toastr.success('Tankování bylo uloženo', 'Hotovo');
        this._router.navigate(['./'], {relativeTo: this._route.parent.parent, queryParams: { itemChanged: true }});
        // this._fuelings.refresh();
    }

    private _onSaveError = () => {
        this._toastr.error('Tankování nebylo uloženo', 'Chyba!');
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

    private _onFuelingSuccess = (f: Fuel) => {
        this.vehicleId = f.vehicleId;

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
    }

    private _onFuelingError = () => {
        this._toastr.error('Záznam nebyl nalezen.', 'Chyba!');
    }
}
