import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { Observable } from 'rxjs/Observable';
import { RepairTask } from './_core/repair-task.interface';
import { Repair } from './_core/repair.interface';
import { Pageable, Page } from '../../../utils/pageable';

@Injectable()
export class RepairService extends Pageable<Repair> {

    vehicleId: string;
    query: string;
    filter: any;

    private _repairs: Repair[];

    private _isLoading = false;

    constructor(private _http: HttpService) {
        super();
    }

    request(): Observable<Page<Repair>> {
        return this._http
            .post('/resource/repairs/' + this.vehicleId + '?q=' + this.query + '&' + this.paginationSegment(), this.filter);
    }

    getRepairs(vehicleId:string) {
        this._isLoading = true;
        this._http
            .get('/resource/repairs/' + vehicleId)
            .subscribe((r: Repair[]) => {
                this._repairs = r;
                this._isLoading = false;
            });
    }

    getStats(vehicleId: string) {
        return this._http
            .get('/resource/repairs/' + vehicleId + '/stats');
    }

    get repairs(): Repair[] {
        return this._repairs;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    getRepair(id: string): Observable<Repair> {
        return this._http
            .get('/resource/repair/' + id);
    }

    update(repair: Repair) {
        return this._http
            .post('/resource/repairs/update', repair);
    }

    delete(repair: Repair) {
        return this._http
            .delete('/resource/repairs/' + repair.id);
    }

    addTask(task: RepairTask) {
        return this._http
            .post('/resource/repairs/save-task', task);
    }

    deleteTask(task: RepairTask) {
        return this._http
            .delete('/resource/repairs/task/' + task.id);
    }

    getRepairTasks(repairId: string) {
        return this._http
            .get('/resource/repairs/' + repairId + '/tasks');
    }
}
