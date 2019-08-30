import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';
import { Tire, TireProperty } from '../tires.interface';
import { Observable } from 'rxjs';
import { Subjective } from 'subjective';
import { TiresState, tiresStateFns } from './tires.state';

@Injectable()
export class TiresService {

    state = new Subjective(new TiresState(), tiresStateFns);

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

    getTires(vehicleId): Observable<Tire[]> {
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

    getHistory(tire:Tire) {
        return this._http
            .get('/resource/tires/' + tire.id + '/history');
    }
}
