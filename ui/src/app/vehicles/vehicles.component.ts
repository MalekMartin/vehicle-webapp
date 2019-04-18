import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { VehicleService } from '../core/stores/vehicle/vehicle.service';

@Component({
    selector: 'va-vehicles',
    templateUrl: './vehicles.component.html',
    styleUrls: ['./vehicles.component.scss'],
})
export class VehiclesComponent implements OnInit {

    constructor(private _vehicles: VehicleService) { }

    ngOnInit() {
        this._vehicles.refresh();
    }
}
