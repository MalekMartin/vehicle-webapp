import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VValidators } from '../../../../shared/forms/validators';
import { Cost, CostsCategory } from '../cost.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { VehicleService } from '../../../vehicle-stream/vehicle.service';
import { CostsService } from '../../../../shared/api/costs/costs.service';

@Component({
    selector: 'va-costs-form',
    templateUrl: './costs-form.component.html',
    styleUrls: ['./costs-form.component.scss']
})
export class CostsFormComponent implements OnInit {

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

    private _vehicleId: string;
    private _categories:CostsCategory[];
    private _cost:Cost;

    constructor(private _form:FormBuilder,
                private _service:CostsService,
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
                this.getCost(p['id']);
            }
        });

        this._service.categorySubject.subscribe((c) => {
          this._categories = c;
        });
    }

    get units(): string {
        return this._vehicles.units;
    }

    get units2(): string {
        return this._vehicles.Units2;
    }

    get totalPrice() {
        return this.form.value.quantity * this.form.value.pricePerItem;
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
        this._service.getCost(id)
            .subscribe((cost: Cost) => {
                this.cost = cost;
            });
    }

    get categories(): CostsCategory[] {
      return this._categories;
    }

    save() {
        this._service
            .saveCost(this.form.value)
            .subscribe(this._onSaveSuccess, this._onSaveError);
    }

    cancel() {
        if (this.vehicleId) {
            this._router.navigate(['/vehicle/' + this.vehicleId + '/costs']);
        } else {
            this._router.navigate(['./'], {relativeTo: this._route.parent.parent});
        }
    }

    back() {
        if (this.vehicleId) {
            this._router.navigate(['/vehicle/' + this.vehicleId + '/costs']);
        } else {
            this._router.navigate(['./'], {relativeTo: this._route.parent.parent});
        }
    }

    private _onSaveSuccess = () => {
        this._toastr.success('Byla přidána nová položka do nákladů.', 'Hotovo');
        this.back();
    }

    private _onSaveError = () => {
      this._toastr.success('Nová položka nebyla přidána', 'Chyba!');
      this.back();
  }
}
