import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VValidators } from '../../../../../shared/forms/validators';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { VehicleService } from '../../../../vehicle-stream/vehicle.service';
import { Interval } from '../../../../../shared/api/maintenance/interval.interface';
import { MaintenanceService } from '../../../../../shared/api/maintenance/maintenance.service';
import { Subscription } from 'rxjs';

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
        odo: ['', [Validators.required,VValidators.validateNumber]],
        odo2: ['',VValidators.validateNumber],
        months: ['', VValidators.validateNumber],
        note: ['']
    });

    private _intSubs: Subscription;

    constructor(private _form:FormBuilder,
                private _maintenances: MaintenanceService,
                private _toastr:ToastsManager,
                private _vehicles: VehicleService) {
    }

    ngOnInit() {
        this._intSubs = this._maintenances.intervalSubject.subscribe(v => this._setForm(v));
    }

    ngOnDestroy() {
        if (this._intSubs) {
            this._intSubs.unsubscribe();
        }
    }

    get units(): string {
        return this._vehicles.units;
    }

    get units2(): string {
        return this._vehicles.Units2;
    }

    save() {
        this._maintenances
            .saveInterval(this.form.value)
            .subscribe(this._onSaveSuccess, this._onSaveError);
    }

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

    private _onSaveSuccess = () => {
        this._toastr.success('Interval byl úspěšně uložen.');
        this.form.reset();
        this.saved.emit();
    }

    private _onSaveError = () => {
        this._toastr.error('Chyba při ukládání intervalu1');
    }
}
