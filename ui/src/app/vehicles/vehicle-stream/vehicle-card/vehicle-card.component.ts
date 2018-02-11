import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Vehicle } from '../vehicle';
import { VehicleImageService, ImageUri } from '../vehicle-images.service';
import { SettingsService } from '../../vehicle-detail/vehicle-settings/settings.service';

@Component({
    selector: 'va-vehicle-card',
    templateUrl: 'vehicle-card.component.html',
    styleUrls: ['./vehicle-card.component.scss']
})

export class VehicleCardComponent implements OnInit {

    @Input() vehicle: Vehicle;

    @Output() deleted = new EventEmitter();

    image: string;

    constructor(private _images: VehicleImageService,
                private _settings: SettingsService) { }

    ngOnInit() {
        this.getImageFromCache();
    }

    getImageFromCache() {
        const image = this._images.getImage(this.vehicle.id);
        if (image) {
            this.image = image;
        } else {
            this._getImage();
        }
    }

    private _getImage() {
        if (!!this.vehicle && this.vehicle.hasFile) {
            this._settings
                .getImageByVehicleId(this.vehicle.id)
                .subscribe(this._handleImage);
        }
    }

    private _handleImage = (i: ImageUri) => {
        this.image = i.uri;
        this._addToCache(i);
    }

    private _addToCache(i: ImageUri) {
        this._images.setImage(this.vehicle.id, i.uri);
    }
}
