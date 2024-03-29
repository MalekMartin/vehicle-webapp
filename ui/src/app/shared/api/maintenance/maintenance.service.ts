import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { Pageable, Page } from '../../../utils/pageable';
import { Maintenance } from './maintenance.interface';
import { Observable, ReplaySubject } from 'rxjs';
import { Interval } from './interval.interface';
import { tap } from 'rxjs/operators';
import { Subjective } from 'subjective';
import { MaintenanceState, maintenanceStateFns } from './maintenance.state';

@Injectable()
export class MaintenanceService extends Pageable<Maintenance> {
    state = new Subjective(new MaintenanceState(), maintenanceStateFns);

    vehicleId: string;
    filter: any;

    // TODO: move to the state!!
    // maintenanceSubject = new ReplaySubject(1);
    intervalsSubject = new ReplaySubject<Interval[]>(1);

    expiredSubject = new ReplaySubject(1);

    intervalSubject = new ReplaySubject<Interval>(1);

    constructor(private _http: HttpService) {
        super();

        // fix backend
        // this.getExpiredCount().subscribe();
    }

    request(): Observable<Page<Maintenance>> {
        return this._http
            .post<Maintenance, Page<Maintenance>>(
                '/resource/maintenance/' + this.vehicleId + '?' + this.paginationSegment(),
                this.filter
            )
            .pipe(
                tap(m => {
                    // this.maintenanceSubject.next(i);
                    this.state.update(f => f.replaceMaintenances, m);
                })
            );
    }

    saveMaintenance(maintenance) {
        return this._http.post('/resource/maintenance/update', maintenance);
    }

    getMaintenances(filter: any = null) {
        this.filter = filter;
        return this._http.post(
            '/resource/maintenance/' + this.vehicleId + '?' + this.paginationSegment(),
            this.filter
        );
    }

    getAllMaintenances(vehicleId: string): Observable<Maintenance[]> {
        return this._http.get(`/resource/maintenance/${vehicleId}/all`);
    }

    deleteMaintenance(ids: string[]) {
        return this._http.post('/resource/maintenance/delete', ids);
    }

    cancelMaintenance(ids: string[]) {
        return this._http.post('/resource/maintenance/cancel', ids);
    }

    finishMaintenance(maintenances: any) {
        return this._http.post('/resource/maintenance/finish', maintenances);
    }

    saveInterval(interval: Interval) {
        return this._http.post('/resource/intervals/update', interval);
    }

    deleteInterval(id: String) {
        return this._http.delete('/resource/intervals/' + id);
    }

    getIntervals(vehicleId: string) {
        return this._http.get('/resource/intervals/' + vehicleId).pipe(
            tap((i: Interval[]) => {
                this.intervalsSubject.next(i);
            })
        );
    }

    getExpiredCount() {
        return this._http.get(`/resource/maintenance/expired`).pipe(
            tap(res => {
                this.expiredSubject.next(res);
            })
        );
    }

    buildEmptyInterval(vehicleId: string): Interval {
        return {
            id: '',
            vehicleId: vehicleId,
            name: '',
            odo: 0,
            odo2: 0,
            months: 0,
            note: ''
        };
    }
}
