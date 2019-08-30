import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material';
import { VehicleStreamService } from '../../../core/stores/vehicle/vehicle-stream.service';
import { Vehicle } from '../vehicle';

@Component({
    selector: 'va-vehicle-add',
    templateUrl: './vehicle-add.component.html',
    styleUrls: ['./vehicle-add.component.scss']
})
export class VehicleAddComponent implements OnDestroy {
    @Output() saved = new EventEmitter();
    @Output() canceled = new EventEmitter();

    form = this._form.group({
        brand: ['', [Validators.required]],
        model: ['', [Validators.required]],
        manufactureYear: [20, [Validators.required, Validators.pattern('[0-9]{4}')]],
        spz: [''],
        previousOwners: [0, Validators.pattern('[0-9]+')],
        type: ['', Validators.required],
        notes: [''],
        units: ['km', Validators.required],
        subUnits: ['']
    });

    private _onDestroy$ = new Subject();

    constructor(
        public dialogRef: MatDialogRef<VehicleAddComponent>,
        private _service: VehicleStreamService,
        private _form: FormBuilder,
        private _toastr: ToastsManager
    ) {}

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    save() {
        this._service
            .addVehicle(this.form.value)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onSuccess, this._onError);
    }

    cancel() {
        this.dialogRef.close();
    }

    private _onSuccess = (id: string) => {
        this._toastr.success(
            'Vozidlo ' + this.form.value.brand + ' ' + this.form.value.model + ' vloženo',
            'Vloženo!'
        );
        this._service.state.update(f => f.addVehicle, this._buildVehicleModel(id, this.form.value));
        this.dialogRef.close(id);
    }

    private _onError = () => {
        this._toastr.error('Vozidlo nebylo vloženo', 'Chyba!');
    }

    private _buildVehicleModel(id: string, value: VehicleAddModel): Vehicle {
        return {
            id,
            brand: value.brand,
            model: value.model,
            manufactureYear: value.manufactureYear,
            purchaseDate: null,
            price: 0,
            mileage: 0,
            engineHours: 0,
            spz: value.spz,
            hasFile: false,
            dateOfSale: null,
            lastOdo: 0,
            units: value.units,
            subUnits: value.subUnits
        };
    }
}

interface VehicleAddModel {
    brand: string;
    model: string;
    manufactureYear: number;
    spz: string;
    previousOwners: number;
    type: 'CAR' | 'MOTORCYCLE';
    notes: string;
    units: string;
    subUnits: string;
}
