import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../../../core/stores/vehicle/vehicle.service';
import { Interval } from '../../../../../shared/api/maintenance/interval.interface';
import { MaintenanceService } from '../../../../../shared/api/maintenance/maintenance.service';
import { VValidators } from '../../../../../shared/forms/validators';

@Component({
    selector: 'va-interval-form',
    templateUrl: './interval-form.component.html',
    styleUrls: ['./interval-form.component.scss']
})
export class IntervalFormComponent implements OnInit, OnDestroy {
    interval: Interval;

    @Output() canceled = new EventEmitter();

    @Output() saved = new EventEmitter();

    form = this._form.group({
        id: [''],
        vehicleId: ['', Validators.required],
        name: ['', Validators.required],
        odo: ['', [Validators.required, VValidators.validateNumber]],
        odo2: ['', VValidators.validateNumber],
        months: ['', VValidators.validateNumber],
        note: ['']
    });

    units: string;
    units2: string;

    private _onDestroy$ = new Subject();

    constructor(
        private _form: FormBuilder,
        private _maintenances: MaintenanceService,
        private _toastr: ToastrService,
        private _vehicles: VehicleService
    ) {}

    ngOnInit() {
        // this._maintenances.intervalSubject
        //     .pipe(takeUntil(this._onDestroy$))
        //     .subscribe(v => this._setForm(v));

        this._vehicles.vehicle
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(v => {
                this.units = v.info.units;
                this.units2 = v.info.subUnits;
            });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    // save() {
    //     this._maintenances
    //         .saveInterval(this.form.value)
    //         .subscribe(this._onSaveSuccess, this._onSaveError);
    // }

    cancel() {
        this.form.reset();
        this.canceled.emit();
    }

    private _setForm(i: Interval) {
        this.form.setValue({
            id: !!i ? i.id : null,
            vehicleId: i.vehicleId,
            name: i.name,
            odo: i.odo,
            odo2: i.odo2,
            months: i.months,
            note: i.note
        });
    }

    // private _onSaveSuccess = () => {
    //     this._toastr.success('Interval byl úspěšně uložen.');
    //     this.form.reset();
    //     this.saved.emit();
    // };

    // private _onSaveError = () => {
    //     this._toastr.error('Chyba při ukládání intervalu1');
    // };
}
