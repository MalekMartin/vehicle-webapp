import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../core/stores/vehicle/vehicle.service';
import { VehicleInfo } from '../../vehicle-stream/vehicle';
import { VehicleImageService } from '../../vehicle-stream/vehicle-images.service';

@Component({
    selector: 'va-detail-header',
    templateUrl: './detail-header.component.html',
    styleUrls: ['./detail-header.component.scss']
})
export class DetailHeaderComponent implements OnInit, OnDestroy {
    page: string;
    path: string;
    vehicle: VehicleInfo;

    private _onDestroy$ = new Subject();

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _vehicles: VehicleService,
        private _images: VehicleImageService
    ) {}

    ngOnInit() {
        this._vehicles.vehicle
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(v => {
                this.vehicle = v;
            });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    get vehicleIcon(): string | null {
        return !!this.vehicle ? this._images.getImage(this.vehicle.info.id) : null;
    }
}
