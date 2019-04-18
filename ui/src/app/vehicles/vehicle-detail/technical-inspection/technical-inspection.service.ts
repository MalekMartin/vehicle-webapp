import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { Station } from './station';
import { Inspection } from './inspection';
import { Observable } from 'rxjs';
import { Pageable, Page } from '../../../utils/pageable';

@Injectable()
export class TechnicalInspectionService extends Pageable<Inspection> {

    vehicleId: string;

    constructor(private _http:HttpService) {
        super();
    }

    request(): Observable<Page<Inspection>> {
        return this._http
            .get(`/resource/inspections/${this.vehicleId}?` + this.paginationSegment());
    }

    getStations() {
        return this._http
            .get('/resource/stations');
    }

    saveStation(s:Station) {
        return this._http
                .post('/resource/stations/update', s);
    }

    deleteStation(s:Station) {
        return this._http
                .delete('/resource/stations/' + s.id);
    }

    saveInspection(i:Inspection) {
        return this._http
                .post('/resource/inspections/' + i.vehicleId + '/update', i);
    }

    deleteInspection(i:Inspection) {
        return this._http
                .delete('/resource/inspections/' + i.id);
    }

    getInspections(vehicleId:string) {
        return this._http
                .get('/resource/inspections/' + vehicleId);
    }

    getInspection(id: string) {
        return this._http
                .get('/resource/inspection/' + id);
    }
}
