import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../core/stores/vehicle/vehicle.service';
import { VehicleImageService } from '../vehicle-stream/vehicle-images.service';
import { SettingsService } from './vehicle-settings/settings.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MenuOptionPage } from './vehicle-detail-menu/vehicle-detail-menu.interface';
import { VehicleInfo } from '../vehicle-stream/vehicle';

@Component({
    selector: 'va-vehicle-detail',
    templateUrl: './vehicle-detail.component.html',
    styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit, OnDestroy {
    vehicle: VehicleInfo;
    id: string;
    page: MenuOptionPage;

    private _onDestroy$ = new Subject();

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _vehicleService: VehicleService,
        private _images: VehicleImageService,
        private _settings: SettingsService
    ) {}

    ngOnInit() {
        this._route.params.pipe(takeUntil(this._onDestroy$)).subscribe(p => {
            this.id = p['id'] || null;
            this._vehicleService.vehicleId = p['id'] || null;
            this.page = p['page'] || 'fuel';
            if (!!this.id) {
                this.getVehicleInfo(this.id);
            }
        });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    getVehicleInfo(id: string) {
        this._vehicleService
            .getInfo(id)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onInfoFound, this._onInfoNotfound);
    }

    private _onInfoFound = info => {
        this.vehicle = info;
        this._vehicleService.state.update(f => f.replaceVehicle, info);
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
