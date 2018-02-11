import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class VehicleImageService {

    ids = [];
    images = {};

    constructor() { }

    getImage(vehicleId: string) {
        if (this.ids.indexOf(vehicleId) > -1) {
            return this.images[vehicleId];
        } else {
            return null;
        }
    }

    setImage(vehicleId: string, uri: string) {
        this.ids.push(vehicleId);
        this.ids = _.uniq(this.ids);
        this.images[vehicleId] = uri;
    }

    deleteImage(vehicleId) {
        const images = this.images[vehicleId] = null;
    }
}

export interface ImageUri {
    uri: string;
}
