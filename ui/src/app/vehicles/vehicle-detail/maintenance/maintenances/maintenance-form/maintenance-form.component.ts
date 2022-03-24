import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../../../core/stores/vehicle/vehicle.service';
import { Interval } from '../../../../../shared/api/maintenance/interval.interface';
import { Maintenance } from '../../../../../shared/api/maintenance/maintenance.interface';
import { MaintenanceService } from '../../../../../shared/api/maintenance/maintenance.service';
import { VValidators } from '../../../../../shared/forms/validators';

@Component({
    selector: 'va-maintenance-form',
    templateUrl: './maintenance-form.component.html',
    styleUrls: ['./maintenance-form.component.scss']
})
export class MaintenaceFormComponent implements OnInit, OnDestroy {
    intervals: Interval[];
    selected: Maintenance;
    units: string;
    units2: string;

    form = this._form.group(
        {
            id: [''],
            vehicleId: ['', Validators.required],
            intervalId: ['', Validators.required],
            odo: [''],
            odo2: [''],
            date: ['']
        },
        { validators: VValidators.maintenanceStartValue }
    );

    private _onDestroy$ = new Subject();

    constructor(
        private _form: FormBuilder,
        private _maintenance: MaintenanceService,
        private _vehicles: VehicleService
    ) {}

    ngOnInit() {
        this._vehicles.vehicle
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(v => {
                this.units = v.info.units;
                this.units2 = v.info.subUnits;
            });

        this._maintenance.intervalsSubject
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(intervals => {
                this.intervals = !!this.form.get('id').value
                    ? intervals
                    : intervals.filter(item => !item.inProgress);
            });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }
}
