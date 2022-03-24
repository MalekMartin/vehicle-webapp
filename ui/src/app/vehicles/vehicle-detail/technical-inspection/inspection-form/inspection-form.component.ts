import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';
import { TechnicalInspectionService } from '../technical-inspection.service';

@Component({
    selector: 'va-inspection-form',
    templateUrl: './inspection-form.component.html',
    styleUrls: ['./inspection-form.component.scss']
})
export class InspectionFormComponent implements OnInit, OnDestroy {
    vehicleId: string;
    id: string;

    form = this._form.group({
        id: [''],
        vehicleId: [''],
        date: ['', Validators.required],
        expirationDate: ['', Validators.required],
        repeated: [''],
        note: ['', Validators.maxLength(255)],
        stationId: [''],
        price: ['0', Validators.required],
        odo: ['0', Validators.required],
        odo2: ['0', Validators.required]
    });

    units: string;
    units2: string;

    stations = this._service.getStations();

    private _onDestroy$ = new Subject();

    constructor(
        private _form: FormBuilder,
        private _service: TechnicalInspectionService,
        private _vehicles: VehicleService
    ) {}

    ngOnInit() {
        this._vehicles.vehicle
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(v => {
                this.units = v.info.units;
                this.units2 = v.info.subUnits;
                this.vehicleId = v.info.id;
                this.form.get('vehicleId').setValue(v.info.id);
            });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }
}
