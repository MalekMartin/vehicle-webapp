import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CostsService } from '../../../../shared/api/costs/costs.service';
import { VValidators } from '../../../../shared/forms/validators';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';
import { CostsCategory } from '../cost.interface';

@Component({
    selector: 'va-costs-form',
    templateUrl: './costs-form.component.html',
    styleUrls: ['./costs-form.component.scss']
})
export class CostsFormComponent implements OnInit, OnDestroy {

    form = this._form.group({
        id: [''],
        vehicleId: ['', Validators.required],
        category: ['', Validators.required],
        title: ['', [Validators.required, Validators.maxLength(255)]],
        note: ['', Validators.maxLength(500)],
        quantity: [1, [Validators.required, VValidators.validateNumber]],
        pricePerItem: [0, [Validators.required, VValidators.validateNumber]],
        totalPrice: [0, [Validators.required, VValidators.validateNumber]],
        odo: [0],
        odo2: [0],
        date: ['', Validators.required]
    });

    units: string;
    units2: string;
    categories: CostsCategory[];

    private _onDestroy$ = new Subject();

    constructor(
        private _form: FormBuilder,
        private _service: CostsService,
        private _vehicles: VehicleService
    ) {}

    ngOnInit() {
        merge(this.form.get('quantity').valueChanges, this.form.get('pricePerItem').valueChanges)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(res => {
                const q = Number(this.form.get('quantity').value);
                const p = Number(this.form.get('pricePerItem').value);
                this.form.get('totalPrice').patchValue(q * p);
            });

        this._service.categorySubject.pipe(takeUntil(this._onDestroy$)).subscribe(c => {
            this.categories = c;
        });

        this._vehicles.vehicle
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(v => {
                this.units = v.info.units;
                this.units2 = v.info.subUnits;
                this.form.get('vehicleId').setValue(v.info.id);
            });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }
}
