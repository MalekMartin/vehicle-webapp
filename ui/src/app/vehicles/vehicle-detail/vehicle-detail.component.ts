import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../core/stores/vehicle/vehicle.service';
import { VehicleImageService } from '../vehicle-stream/vehicle-images.service';
import { SettingsService } from './vehicle-settings/settings.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'va-vehicle-detail',
    templateUrl: './vehicle-detail.component.html',
    styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit, OnDestroy {
    vehicle;

    options: MenuOption[] = [
        { page: 'dashboard', label: 'Přehled', warning: 0, icon: 'stats' },
        { page: 'info', label: 'Info', warning: 0, icon: 'info' },
        { page: 'fuel', label: 'Tankování', warning: 0, icon: 'gas' },
        { page: 'costs', label: 'Náklady', warning: 0, icon: 'money' },
        { page: 'tires', label: 'Pneu', warning: 0, icon: 'radio-unchecked' },
        { page: 'technical', label: 'TK', warning: 0, icon: 'verified' },
        { page: 'maintenance', label: 'Údržba', warning: 0, icon: 'wrench' },
        { page: 'repairs', label: 'Servisí práce', warning: 0, icon: 'automobile' },
        { page: 'settings', label: 'Nastavení', warning: 0, icon: 'gears' }
        // {page: 'manuals', label: 'Manuály'}
    ];

    id: string;
    page: MenuOptionPage;

    private _onDestroy$ = new Subject();

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _vehicleService: VehicleService,
        private _images: VehicleImageService,
        private _settings: SettingsService
    ) {
        // this._vehicleService.vehicleId = this._route.snapshot.params['id'];
    }

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

interface MenuOption {
    page: MenuOptionPage;
    label: string;
    warning: number;
    icon: string;
}

type MenuOptionPage =
    | 'dashboard'
    | 'info'
    | 'fuel'
    | 'costs'
    | 'tires'
    | 'technical'
    | 'maintenance'
    | 'repairs'
    | 'settings';
