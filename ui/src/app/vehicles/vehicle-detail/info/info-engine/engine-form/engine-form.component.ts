import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../../../core/stores/vehicle/vehicle.service';
import { VehicleInfo } from '../../../../vehicle-stream/vehicle';

@Component({
    selector: 'va-engine-form',
    templateUrl: './engine-form.component.html',
    styleUrls: ['./engine-form.component.scss']
})
export class EngineFormComponent implements OnInit, OnDestroy {
    form = this._form.group({
        displacement: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        transmission: ['', [Validators.required, Validators.pattern('[0-9]{1,2}')]],
        transmissionType: ['', Validators.required],
        power: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        engineType: ['', Validators.required],
        cylinders: ['', [Validators.required, Validators.pattern('[0-9]{1,2}')]],
        fuel: ['', Validators.required],
        engineOil: ['', Validators.required],
        fuelOil: [''],
        dilutionRatio: ['']
    });

    private _onDestroy$ = new Subject();

    constructor(
        private _form: FormBuilder,
        public dialogRef: MatDialogRef<EngineFormComponent>,
        private _vehicleService: VehicleService,
        private _toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: VehicleInfo
    ) {}

    ngOnInit() {
        if (!!this.data && !!this.data.engine) {
            this.form.setValue({
                displacement: this.data.engine.displacement,
                transmission: this.data.engine.transmission,
                transmissionType: this.data.engine.transmissionType,
                power: this.data.engine.power,
                engineType: this.data.engine.engineType,
                cylinders: this.data.engine.cylinders,
                fuel: this.data.engine.fuel,
                engineOil: this.data.engine.engineOil,
                fuelOil: this.data.engine.fuelOil,
                dilutionRatio: this.data.engine.dilutionRatio
            });
        }
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    save() {
        this._vehicleService
            .updateEngineInfo(this.data.info.id, this.form.value)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onSaveSuccess, this._onError);
    }

    cancel() {
        this.dialogRef.close();
    }

    private _onSaveSuccess = () => {
        this._vehicleService.state.update(f => f.replaceEngine, this.form.value);
        this._toastr.success('Změny byly úspěšně uloženy.', 'Uloženo!');
        this.dialogRef.close();
    };

    private _onError = () => {
        this._toastr.success('Změny se nepodařilo uložit.', 'Chyba!');
    };
}
