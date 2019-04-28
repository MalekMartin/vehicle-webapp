import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';

@Component({
    selector: 'va-settings-form',
    templateUrl: 'settings-form.component.html',
    styleUrls: ['./settings-form.component.scss']
})

export class SettingsFormComponent implements OnInit {

    // @Input() set model(m: any) {
    //     this.form.setValue({
    //         vehicleId: m.vehicleId,
    //         units: m.units,
    //         subUnits: m.subUnits,
    //         tankCapacity: m.tankCapacity
    //     });
    // }

    @Output() saved = new EventEmitter();
    @Output() canceled = new EventEmitter();

    form = this._fb.group({
        vehicleId: ['', Validators.required],
        units: ['', Validators.required],
        subUnits: [''],
        tankCapacity: ['']
    });

    constructor(private _fb: FormBuilder,
                private _vehicles: VehicleService) { }

    ngOnInit() {
        this.form.setValue(this._remapInfo());
    }

    save() {
        this.saved.emit(this.form.value);
    }

    cancel() {
        this.canceled.emit();
    }

    private _remapInfo() {
        const i = this._vehicles.state.snapshot.vehicle.info;
        return {
            vehicleId: i.id,
            units: i.units,
            subUnits: i.subUnits,
            tankCapacity: i.tankCapacity
        };
    }
}
