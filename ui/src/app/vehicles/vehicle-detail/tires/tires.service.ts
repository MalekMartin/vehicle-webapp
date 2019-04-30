import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { Tire, TireProperty } from './tires.interface';
import { Observable } from 'rxjs';

@Injectable()
export class TiresService {

    constructor(private _http:HttpService) { }

    newTire(tire:Tire) {
        return this._http
            .post('resource/tires/' + tire.vehicleId + '/add',tire);
    }

    saveTire(tire:Tire) {
        if (tire.id) {
            return this.update(tire);
        } else {
            return this.newTire(tire);
        }
    }

    getByStatuses(vehicleId) {
        return this._http
            .get('/resource/tires/' + vehicleId);
    }

    updateStatus(newStatus:{tire:Tire, status:string}) {
        return this._http
            .post('/resource/tires/' + newStatus.tire.id + '/status', newStatus);
    }

    update(tire:Tire) {
        return this._http
            .post('/resource/tires/' + tire.id + '/update', tire);
    }

    change(tire: {tire:Tire, date: string}) {
        return this._http
            .post('/resource/tires/' + tire.tire.id + '/change', tire);
    }

    delete(tire:Tire) {
        return this._http
            .delete('/resource/tires/' + tire.id + '/delete');
    }

    deleteProperty(prop:TireProperty) {
        return this._http
            .delete('/resource/tires/' + prop.vehicleId + '/delete-property/' + prop.id);
    }

    updateProperty(prop:TireProperty) {
        return this._http
            .post('/resource/tires/' + prop.vehicleId + '/update-property', prop);
    }

    getProperties(vehicleId:string): Observable<TireProperty[]> {
        return this._http
            .get('/resource/tires/' + vehicleId + '/properties');
    }

    getHistory(tire:Tire) {
        return this._http
            .get('/resource/tires/' + tire.id + '/history');
    }
}
