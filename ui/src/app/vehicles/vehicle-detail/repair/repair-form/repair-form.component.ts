import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GarageService } from '../../../../car-services/garage/garage.service';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';
import { VValidators } from '../../../../shared/forms/validators';

@Component({
    selector: 'va-repair-form',
    templateUrl: './repair-form.component.html',
    styleUrls: ['./repair-form.component.scss']
})
export class RepairFormComponent implements OnInit, OnDestroy {
    @Output() hideDialog = new EventEmitter();

    form = this._form.group({
        id: [''],
        vehicleId: ['', Validators.required],
        title: ['', Validators.required],
        odo: [0, [Validators.required, VValidators.validateNumber]],
        odo2: [0, [Validators.required, VValidators.validateNumber]],
        date: ['', Validators.required],
        garageId: [null, Validators.required],
        totalPrice: 0,
        notes: '',
        tax: 0,
        taxToggle: [false]
    });

    garages = this._services.getGarages();

    units: string;
    units2: string;

    private _onDestroy$ = new Subject();

    constructor(
        private _form: FormBuilder,
        private _services: GarageService,
        private _vehicles: VehicleService
    ) {}

    ngOnInit() {
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
}
