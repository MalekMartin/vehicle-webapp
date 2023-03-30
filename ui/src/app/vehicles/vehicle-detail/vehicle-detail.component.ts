import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../core/stores/vehicle/vehicle.service';
import { VehicleImageService } from '../vehicle-stream/vehicle-images.service';
import { SettingsService } from './vehicle-settings/settings.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MenuOptionPage } from './vehicle-detail-menu/vehicle-detail-menu.interface';

@Component({
    selector: 'va-vehicle-detail',
    templateUrl: './vehicle-detail.component.html',
    styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit, OnDestroy {
    id: string;
    page: MenuOptionPage;

    loading = false;

    private _onDestroy$ = new Subject();

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _vehicleService: VehicleService,
        private _images: VehicleImageService,
        private _settings: SettingsService,
    ) {}

    ngOnInit() {
        this._route.params.pipe(takeUntil(this._onDestroy$)).subscribe(p => {
            this.id = p['id'] || null;
            this.page = p['page'] || 'fuel';
            if (!!this.id) {
                this.getVehicleInfo(this.id);
            }
        });

        this._vehicleService.loading.pipe(takeUntil(this._onDestroy$))
            .subscribe(v => {
                // this.vehicle = v;
                this.loading = v;
            });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    get vehicle() {
        return this._vehicleService.snapshot;
    }

    getVehicleInfo(id: string) {
        this._vehicleService
            .getInfo(id)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onInfoFound, this._onInfoNotfound);
    }

    private _onInfoFound = info => {
        this._findVehicleImage();
    };

    private _onInfoNotfound = () => {
        this._router.navigate(['/vehicle/not-found']);
    };

    private _getImage() {
        this._settings.getImageByVehicleId(this.id).subscribe(this._handleImage);
    }

    private _handleImage = i => {
        this._images.setImage(this.id, i.uri);
    };

    private _findVehicleImage() {
        const image = this._images.getImage(this.id);
        if (!image && this.vehicle.info.hasImage) {
            this._getImage();
        }
    }
}
