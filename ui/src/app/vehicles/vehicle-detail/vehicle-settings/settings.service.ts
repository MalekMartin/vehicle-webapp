import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import * as _ from 'lodash';

@Injectable()
export class SettingsService {

    constructor(private http:HttpService) { }

    getAllImages(id) {
        return this.http
                .get('/resource/files/' + id);
    }

    removeImage(id) {
        return this.http
                .delete('/resource/file/' + id);
    }

    getImageByVehicleId(id) {
        return this.http
                .get('/resource/file/' + id);
    }

    saveSettings(model: Settings) {
        return this.http
                .post('/resource/vehicle/' + model.vehicleId + '/settings', _.omit(model, 'vehicleId'));
    }
}

export interface Settings {
    vehicleId: string;
    units: string;
    subUnits: string;
    tankCapacity: number;
}
