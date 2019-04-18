import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { merge, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CostsService } from '../../../../shared/api/costs/costs.service';
import { VValidators } from '../../../../shared/forms/validators';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';
import { Cost, CostsCategory } from '../cost.interface';

@Component({
    selector: 'va-costs-form',
    templateUrl: './costs-form.component.html',
    styleUrls: ['./costs-form.component.scss']
})
export class CostsFormComponent implements OnInit, OnDestroy {
    id: string;
    vehicleId: string;

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

    private _onDestroy$ = new Subject();

    categories: CostsCategory[];
    private _cost: Cost;

    constructor(
        private _form: FormBuilder,
        private _service: CostsService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _toastr: ToastsManager,
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

        this._route.params
            .pipe(
                map(par => par),
                takeUntil(this._onDestroy$)
            )
            .subscribe(p => {
                if (p['vehicleId']) {
                    this.vehicleId = p['vehicleId'];
                    this.form.get('vehicleId').setValue(this.vehicleId);
                }

                if (p['id']) {
                    this.id = p['id'];
                    this.getCost(p['id']);
                }
            });

        this._service.categorySubject.pipe(takeUntil(this._onDestroy$)).subscribe(c => {
            this.categories = c;
        });

        this._vehicles.state
            .select(s => s.vehicle)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(v => {
                this.units = v.info.units;
                this.units2 = v.info.subUnits;
            });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    get cost(): Cost {
        return this._cost;
    }

    set cost(c: Cost) {
        this._cost = c;
        this.vehicleId = c.vehicleId;

        this.form.setValue({
            id: c.id,
            vehicleId: c.vehicleId,
            category: c.category,
            title: c.title,
            note: c.note,
            quantity: c.quantity,
            pricePerItem: c.pricePerItem,
            totalPrice: c.totalPrice,
            odo: c.odo,
            odo2: c.odo2,
            date: c.date
        });
    }

    getCost(id: string) {
        this._service
            .getCost(id)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((cost: Cost) => {
                this.cost = cost;
            });
    }

    save() {
        this._service
            .saveCost(this.form.value)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onSaveSuccess, this._onSaveError);
    }

    cancel() {
        if (this.vehicleId) {
            this._router.navigate(['/vehicle/' + this.vehicleId + '/costs']);
        } else {
            this._router.navigate(['./'], { relativeTo: this._route.parent.parent });
        }
    }

    back() {
        if (this.vehicleId) {
            this._router.navigate(['/vehicle/' + this.vehicleId + '/costs']);
        } else {
            this._router.navigate(['./'], { relativeTo: this._route.parent.parent });
        }
    }

    private _onSaveSuccess = () => {
        this._toastr.success('Byla přidána nová položka do nákladů.', 'Hotovo');
        this.back();
    };

    private _onSaveError = () => {
        this._toastr.success('Nová položka nebyla přidána', 'Chyba!');
        this.back();
    };
}
