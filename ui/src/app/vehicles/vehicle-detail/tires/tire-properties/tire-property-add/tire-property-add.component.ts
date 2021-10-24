import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastsManager } from 'ng6-toastr';
import { VehicleService } from '../../../../../core/stores/vehicle/vehicle.service';
import { TirePropertyFormComponent } from '../tire-property-form/tire-property-form.component';
import { TireProperty } from '../../tires.interface';
import { TirePropertiesService } from '../../core/tire-properties.service';

@Component({
    selector: 'va-tire-property-add',
    templateUrl: 'tire-property-add.component.html',
    styleUrls: ['./tire-property-add.component.scss']
})
export class TirePropertyAddComponent implements OnInit {
    @ViewChild(TirePropertyFormComponent) tireForm: TirePropertyFormComponent;

    constructor(
        private _tirePropService: TirePropertiesService,
        private _toastr: ToastsManager,
        private _vehicleService: VehicleService,
        private _dialogRef: MatDialogRef<TirePropertyAddComponent>
    ) {}

    ngOnInit() {
        this.tireForm.form
            .get('vehicleId')
            .setValue(this._vehicleService.state.snapshot.vehicle.info.id);
    }

    save() {
        this._tirePropService
            .updateProperty(this.tireForm.form.value)
            .subscribe(this._onAddSuccess, this._onAddError);
    }

    private _onAddSuccess = (p: TireProperty) => {
        this._toastr.success('Nový parametr byl úspěšně vložen.');
        this._dialogRef.close(p);
    };

    private _onAddError = () => {
        this._toastr.error('Parametr nebyl uložen.');
    };
}
