import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { HttpService } from '../../../core/http.service';
import { VehicleService } from '../../../core/stores/vehicle/vehicle.service';
import { Subject } from 'rxjs';
import { pipe } from '@angular/core/src/render3';
import { takeUntil } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material';

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
        notes: ['']
    });

    private _onDestroy$ = new Subject();

    constructor(
        public dialogRef: MatDialogRef<VehicleAddComponent>,
        private _service: VehicleService,
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
        this.dialogRef.close(id);
    };

    private _onError = () => {
        this._toastr.error('Vozidlo nebylo vloženo', 'Chyba!');
    };
}
