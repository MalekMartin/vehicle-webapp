import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { VehicleService } from '../../vehicle-stream/vehicle.service';
import { Vehicle, VehicleInfo } from '../../vehicle-stream/vehicle';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'va-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {

    vehicle: VehicleInfo;
    vehicleId: string;

    loading = false;

    private _vehicleSubs: Subscription;

    constructor(private _service: VehicleService,
                private _route: ActivatedRoute) { }

    ngOnInit() {
        this.loading = true;
        this.vehicleId = this._service.vehicleId;
        this._vehicleSubs = this._service.getInfo(this.vehicleId)
            .subscribe(this._handleContent);
    }

    ngOnDestroy() {
        if (this._vehicleSubs) {
            this._vehicleSubs.unsubscribe();
        }
    }

    get info() {
        return this.vehicle.info;
    }

    private _handleContent = (v:VehicleInfo) => {
        this.vehicle = v;
        this.loading = false;
    }
}
