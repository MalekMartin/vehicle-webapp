import { Injectable } from '@angular/core';
import { Subjective } from 'subjective';
import { TirePropertiesState, tirePropertiesFns } from './tire-properties.state';
import { TireProperty } from '../tires.interface';
import { HttpService } from '../../../../core/http.service';
import { Observable } from 'rxjs';

@Injectable()
export class TirePropertiesService {
    state = new Subjective(new TirePropertiesState(), tirePropertiesFns);

    constructor(private _http: HttpService) {}

    deleteProperty(prop: TireProperty) {
        return this._http.delete(
            '/resource/tires/' + prop.vehicleId + '/delete-property/' + prop.id
        );
    }

    updateProperty(prop: TireProperty) {
        return this._http.post('/resource/tires/' + prop.vehicleId + '/update-property', prop);
    }

    getProperties(vehicleId: string): Observable<TireProperty[]> {
        return this._http.get('/resource/tires/' + vehicleId + '/properties');
    }
}
