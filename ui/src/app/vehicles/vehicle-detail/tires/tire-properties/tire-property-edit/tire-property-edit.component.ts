import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TireProperty } from '../../tires.interface';
import { ToastsManager } from 'ng6-toastr';
import { TirePropertyFormComponent } from '../tire-property-form/tire-property-form.component';
import { TirePropertiesService } from '../../core/tire-properties.service';

@Component({
    selector: 'va-tire-property-edit',
    templateUrl: 'tire-property-edit.component.html',
    styleUrls: ['./tire-property-edit.component.scss']
})
export class TirePropertyEditComponent implements OnInit {
    @ViewChild(TirePropertyFormComponent, {static: false}) tireForm: TirePropertyFormComponent;

    constructor(
        private _tirePropService: TirePropertiesService,
        private _toastr: ToastsManager,
        private _dialogRef: MatDialogRef<TirePropertyEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: TireProperty
    ) {}

    ngOnInit() {
        this.tireForm.form.setValue({
            id: this.data.id,
            vehicleId: this.data.vehicleId,
            name: this.data.name,
            value: this.data.value,
            tooltip: ''
        });
    }

    save() {
        this._tirePropService
            .updateProperty(this.tireForm.form.value)
            .subscribe(this._onSuccess, this._onError);
    }

    private _onSuccess = (p: TireProperty) => {
        this._toastr.success('Parametr byl úspěšně upraven.');
        this._dialogRef.close(p);
    };

    private _onError = () => {
        this._toastr.error('Parametr nebyl uložen.');
    };
}
