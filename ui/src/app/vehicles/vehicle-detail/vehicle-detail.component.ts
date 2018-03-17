import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../vehicle-stream/vehicle.service';
import { Vehicle } from '../vehicle-stream/vehicle';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs/Observable';
import { VehicleImageService } from '../vehicle-stream/vehicle-images.service';
import { SettingsService } from './vehicle-settings/settings.service';
import { Subscription } from 'rxjs/Subscription';
import { MaintenanceService } from '../../shared/api/maintenance/maintenance.service';

@Component({
    selector: 'va-vehicle-detail',
    templateUrl: './vehicle-detail.component.html',
    styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit, OnDestroy {

    vehicle;

    options: MenuOption[] = [
        {page: 'dashboard', label: 'Přehled', warning: 0, icon: 'stats'},
        {page: 'info', label: 'Info', warning: 0, icon: 'info'},
        {page: 'fuel', label: 'Tankování', warning: 0, icon: 'gas'},
        {page: 'costs', label: 'Náklady', warning: 0, icon: 'money'},
        {page: 'tires', label: 'Pneu', warning: 0, icon: 'radio-unchecked'},
        {page: 'technical', label: 'TK', warning: 0, icon: 'verified'},
        {page: 'maintenance', label: 'Údržba', warning: 0, icon: 'wrench'},
        {page: 'repairs', label: 'Servisí práce', warning: 0, icon: 'automobile'},
        {page: 'settings', label: 'Nastavení', warning: 0, icon: 'gears'},
        // {page: 'manuals', label: 'Manuály'}
    ];

    id = this._route.snapshot.params['id'] || null;
    page = this._route.snapshot.params['page'] || 'fuel';

    private _infoSubs: Subscription;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _vehicleService: VehicleService,
                public toastr: ToastsManager,
                private _images: VehicleImageService,
                private _settings: SettingsService,
                private _maintenanceService: MaintenanceService) {

        this._vehicleService.vehicleId = this._route.snapshot.params['id'];
    }

    ngOnInit() {
        if (this.id) {
            this.getVehicleInfo(this.id);
        }
    }

    ngOnDestroy() {
        if (this._infoSubs) {
            this._infoSubs.unsubscribe();
        }
    }

    getVehicleInfo(id: string) {
        this._infoSubs = this._vehicleService.getInfo(id)
            .subscribe(this._onInfoFound, this._onInfoNotfound);
    }

    private _onInfoFound = (info) => {
        this.vehicle = info;
        this._findVehicleImage();
    }

    private _onInfoNotfound = () => {
        this._router.navigate(['/vehicle/not-found']);
    }

    private _getImage() {
        this._settings
            .getImageByVehicleId(this.id)
            .subscribe(this._handleImage);
    }

    private _handleImage = (i) => {
        this._images.setImage(this.id, i.uri);
    }

    private _findVehicleImage() {
        const image = this._images.getImage(this.id);
        if (!image && this.vehicle.info.hasImage) {
            this._getImage();
        }
    }
}

interface MenuOption {
    page: string;
    label: string;
    warning: number;
    icon: string;
}
