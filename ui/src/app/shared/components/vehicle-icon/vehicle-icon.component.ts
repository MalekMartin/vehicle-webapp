import { Component, Input } from '@angular/core';
import { Vehicle } from '../../../vehicles/vehicle-stream/vehicle';

@Component({
    selector: 'va-vehicle-icon',
    templateUrl: './vehicle-icon.component.html',
    styleUrls: ['./vehicle-icon.component.scss']
})
export class VehicleIconComponent {
    @Input() set vehicle(v: Vehicle) {
        if (!!v) {
            this._vehicle = v;
            this.colorString = !!this._vehicle
                ? this._vehicle.brand + ' ' + this._vehicle.model
                : 'emptyString';
            this.letter = !!this._vehicle ? this._vehicle.brand.charAt(0).toUpperCase() : '?';
        }
    }

    @Input() size = 'l';

    colorString = 'emptyString';
    letter = '?';

    private _vehicle: Vehicle;
}
