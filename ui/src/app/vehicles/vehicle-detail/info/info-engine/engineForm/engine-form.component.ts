import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Engine } from '../../../_core/engine';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Vehicle } from '../../../../vehicle-stream/vehicle';

@Component({
    selector: 'va-engine-form',
    templateUrl: './engine-form.component.html',
    styleUrls: ['./engine-form.component.scss']
})
export class EngineFormComponent {

    @Input() set engine(engine: Engine) {
        this._engine = engine;
        this.form.setValue({
            vehicleId: engine.vehicleId,
            displacement: engine.displacement,
            transmission: engine.transmission,
            transmissionType: engine.transmissionType,
            power: engine.power,
            engineType: engine.engineType,
            cylinders: engine.cylinders,
            fuel: engine.fuel,
            engineOil: engine.engineOil,
            fuelOil: engine.fuelOil,
            dilutionRatio: engine.dilutionRatio
        });
    }

    @Output() engineUpdated = new EventEmitter();

    @Output() engineCanceled = new EventEmitter();

    form = this._form.group({
        vehicleId: ['', [Validators.required]],
        'displacement': ['', [Validators.required, Validators.pattern('[0-9]+')]],
        'transmission': ['', [Validators.required,Validators.pattern('[0-9]{1,2}')]],
        transmissionType: ['', Validators.required],
        power: ['', [Validators.required,Validators.pattern('[0-9]+')]],
        engineType: ['', Validators.required],
        cylinders: ['', [Validators.required,Validators.pattern('[0-9]{1,2}')]],
        fuel: ['', Validators.required],
        engineOil: ['', Validators.required],
        fuelOil: [''],
        dilutionRatio: ['']
    });

    private _engine:Engine;

    constructor(private _form: FormBuilder) { }

    get engine(): Engine {
        return this._engine;
    }

    save() {
        this.engineUpdated.emit(this.form.value);
    }

    cancel() {
        this.form.reset();
        this.engineCanceled.emit();
    }
}
