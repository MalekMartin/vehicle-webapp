import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { VehicleService } from '../../../core/stores/vehicle/vehicle.service';
import { Vehicle } from '../vehicle';
import { SettingsService } from '../../vehicle-detail/vehicle-settings/settings.service';
import { StorageService } from '../../../shared/api/storage.service';
import { VehicleImageService } from '../vehicle-images.service';

@Component({
    selector: 'va-vehicle-preview',
    templateUrl: './vehicle-preview.component.html',
    styleUrls: ['./vehicle-preview.component.scss']
})
export class VehiclePreviewComponent implements OnInit {

    @Input() vehicle: any;

    image: string;

    constructor(private _service: VehicleService,
                private _settings: SettingsService,
                private _images: VehicleImageService) { }

    ngOnInit() {
        this._getImageFromCache();
    }

    calculateOdo(before: string = '0', now: string = '0') {

        const result = (Number(now) - Number(before));

        if (result < 0) {
            return 0;
        } else {
            return result;
        }
    }

    calculateHours(before: string = '0', now: string = '0') {

        const result = (Number(now) - Number(before));

        if (result < 0) {
            return 0;
        } else {
            return result.toFixed(1);
        }
    }

    getImage() {
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

    private _getImageFromCache() {

        const image = this._images.getImage(this.vehicle.id);
        if (image) {
            this.image = image;
        } else {
            this.getImage();
        }
    }
}

interface ImageUri {
    uri: string;
}
