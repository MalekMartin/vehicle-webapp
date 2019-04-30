import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TiresService } from '../../tires.service';
import { TirePropertyExt } from '../../tires.interface';
import { ToastsManager } from 'ng6-toastr';
import { TirePropertyFormComponent } from '../tire-property-form/tire-property-form.component';

@Component({
    selector: 'va-tire-property-edit',
    templateUrl: 'tire-property-edit.component.html',
    styleUrls: ['./tire-property-edit.component.scss']
})
export class TirePropertyEditComponent implements OnInit {
    @ViewChild(TirePropertyFormComponent) tireForm: TirePropertyFormComponent;

    constructor(
        private _tireService: TiresService,
        private _toastr: ToastsManager,
        private _dialogRef: MatDialogRef<TirePropertyEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: TirePropertyExt
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
        this._tireService
            .updateProperty(this.tireForm.form.value)
            .subscribe(this._onSuccess, this._onError);
    }

    private _onSuccess = (p: TirePropertyExt) => {
        this._toastr.success('Parametr byl úspěšně upraven.');
        this._dialogRef.close(p);
    };

    private _onError = () => {
        this._toastr.error('Parametr nebyl uložen.');
    };
}
