import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { Fuel } from './fuel';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { Pageable, Page } from '../../../utils/pageable';
import { Observable } from 'rxjs';
import { MultiStatsModel } from '../stats.interface';

@Injectable()
export class FuelService extends Pageable<Fuel> {

    public id: string;

    constructor(private _http: HttpService,
                private _toastr:ToastsManager) {
        super();
        this.pageSize = 5;
    }

    request(): Observable<Page<Fuel>> {
        return this._http
            .get('resource/' + this.id + '/fuelings?' + super.paginationSegment());
    }

    refresh() {
        this._http
            .get('/resource/' + this.id + '/fuelings?' + super.paginationSegment())
            .subscribe();
    }

    addFueling(fueling) {
        return this._http
            .post('/resource/fuelings/new', fueling);
    }

    updateFueling(fueling) {
        return this._http
            .post('/resource/fuelings/' + fueling.vehicleId + '/' + fueling.id, fueling);
    }

    delete(fueling) {
        return this._http
            .post('/resource/fuelings/delete', fueling);
    }

    fueling(id: string) {
        return this._http
            .get('/resource/fueling/' + id);
    }

    stats(id: string) {
        return this._http
            .get('/resource/fuelings/' + id + '/stats');
    }

    currentMileage(id: string) {
        return this._http
            .get(`resource/fuelings/${id}/last-mileage`);
    }

    annualMileages(id: string) {
        return this._http
            .get(`resource/fuelings/${id}/annual-mileages`);
    }

    mileageStats(id: string): Observable<MultiStatsModel[]> {
        return this._http
            .get(`resource/fuelings/${id}/mileage-stats`);
    }

    fuelStats(id: string, limit: number): Observable<MultiStatsModel[]> {
        return this._http
            .get(`resource/fuelings/${id}/fuel-stats?limit=${limit}`);
    }
}
