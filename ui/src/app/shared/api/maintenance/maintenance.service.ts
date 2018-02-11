import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { Pageable, Page } from '../../../utils/pageable';
import { Maintenance } from './maintenance.interface';
import { Observable } from 'rxjs/Rx';
import { Interval } from './interval.interface';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MaintenanceService extends Pageable<Maintenance> {

    vehicleId: string;
    filter: any;

    maintenanceSubject = new ReplaySubject(1);
    intervalsSubject = new ReplaySubject<Interval[]>(1);

    intervalSubject = new ReplaySubject<Interval>(1);

    constructor(private _http:HttpService) {
        super();
    }

    request(): Observable<Page<Maintenance>> {
        return this._http
            .post<Maintenance, Page<Maintenance>>('/resource/maintenance/' + this.vehicleId + '?' + this.paginationSegment(), this.filter)
            .do((i:Page<Maintenance>) => {
                this.maintenanceSubject.next(i);
            });
    }

    saveMaintenance(maintenance) {
        return this._http
            .post('/resource/maintenance/update', maintenance);
    }

    getMaintenances(filter: any = null) {
        this.filter = filter;
        return this._http
            .post('/resource/maintenance/' + this.vehicleId + '?' + this.paginationSegment(), this.filter);
    }

    deleteMaintenance(ids:string[]) {
        return this._http
            .post('/resource/maintenance/delete', ids);
    }

    cancelMaintenance(ids:string[]) {
        return this._http
            .post('/resource/maintenance/cancel', ids);
    }

    finishMaintenance(maintenances: any) {
        return this._http
            .post('/resource/maintenance/finish', maintenances);
    }

    saveInterval(interval:Interval) {
        return this._http
            .post('/resource/intervals/update', interval);
    }

    deleteInterval(id:String) {
        return this._http
            .delete('/resource/intervals/' + id);
    }

    getIntervals(vehicleId:string) {
        return this._http
            .get('/resource/intervals/' + vehicleId)
            .do((i: Interval[]) => {
                this.intervalsSubject.next(i);
            });
    }

    getExpiredCount(id) {
        return this._http
            .get(`/resource/maintenance/${id}/expired`);
    }

    buildEmptyInterval(vehicleId: string): Interval {
        return {
            id: '',
            vehicleId: vehicleId,
            name: '',
            odo: 0,
            odo2: 0,
            months: 0,
            note: '',
        };
    }
}
