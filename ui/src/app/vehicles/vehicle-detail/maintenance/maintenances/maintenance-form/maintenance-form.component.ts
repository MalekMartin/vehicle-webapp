import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { VehicleService } from '../../../../../core/stores/vehicle/vehicle.service';
import { Interval } from '../../../../../shared/api/maintenance/interval.interface';
import { Maintenance } from '../../../../../shared/api/maintenance/maintenance.interface';
import { MaintenanceService } from '../../../../../shared/api/maintenance/maintenance.service';
import { VValidators } from '../../../../../shared/forms/validators';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'va-maintenance-form',
    templateUrl: './maintenance-form.component.html',
    styleUrls: ['./maintenance-form.component.scss']
})
export class MaintenaceFormComponent implements OnInit, OnDestroy {
    @Input() set maintenance(m: Maintenance) {
        if (!!m) {
            this.form.setValue({
                id: m.id,
                vehicleId: m.vehicleId,
                intervalId: m.interval.id,
                odo: m.odo,
                odo2: m.odo2,
                date: m.date
            });
            this.selected = m;
        }
    }

    @Input() set vehicleId(id: string) {
        this.form.patchValue({
            vehicleId: id
        });
    }

    @Output() canceled = new EventEmitter();

    @Output() saved = new EventEmitter();

    intervals: Interval[];

    allIntervals: Interval[];
    units: string;
    units2: string;

    form = this._form.group({
        id: [''],
        vehicleId: [this.vehicleId, Validators.required],
        intervalId: ['', Validators.required],
        odo: [0, [Validators.required, VValidators.validateNumber]],
        odo2: [0, [VValidators.validateNumber]],
        date: ['', Validators.required]
    });

    selected: Maintenance;

    private _onDestroy$ = new Subject();

    constructor(
        private _form: FormBuilder,
        private _maintenance: MaintenanceService,
        private _toastr: ToastsManager,
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

        this._maintenance.intervalsSubject.pipe(takeUntil(this._onDestroy$)).subscribe(i => {
            this.allIntervals = i;
            this.intervals = i.filter(interval => {
                return interval.inProgress === false;
            });
        });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    resetForm() {
        this.form.reset({
            odo: 0,
            odo2: 0,
            price: 0,
            vehicleId: this.vehicleId
        });
    }

    cancel() {
        this.resetForm();
        this.canceled.emit();
    }

    save() {
        this._maintenance
            .saveMaintenance(this.form.value)
            .subscribe(this._onSaveSucces, this._onSaveError);
    }

    private _onSaveSucces = () => {
        this._toastr.success('Údržba byla úspěšně uložena');
        this.saved.emit();
        this.resetForm();
    };

    private _onSaveError = () => {
        this._toastr.error('Chyba při ukládání údržby!');
    };
}
