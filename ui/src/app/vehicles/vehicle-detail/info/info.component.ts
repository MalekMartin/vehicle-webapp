import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { VehicleService } from '../../../core/stores/vehicle/vehicle.service';
import { Vehicle, VehicleInfo } from '../../vehicle-stream/vehicle';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'va-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {
    vehicle: VehicleInfo;

    loading = true;

    private _onDestroy$ = new Subject();

    constructor(private _vehicleService: VehicleService) {}

    ngOnInit() {
        this._vehicleService.state
            .select(s => s.vehicle)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._handleContent);
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    get info() {
        return this.vehicle.info;
    }

    private _handleContent = (v: VehicleInfo) => {
        this.vehicle = v;
        this.loading = false;
    };
}
