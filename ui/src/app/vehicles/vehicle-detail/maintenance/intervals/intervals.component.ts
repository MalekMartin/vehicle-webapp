import { Component, OnInit, ViewChild, EventEmitter, Output, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { Subscription } from 'rxjs';
import { VehicleService } from '../../../vehicle-stream/vehicle.service';
import { Interval } from '../../../../shared/api/maintenance/interval.interface';
import { MaintenanceService } from '../../../../shared/api/maintenance/maintenance.service';

@Component({
    selector: 'va-intervals',
    templateUrl: './intervals.component.html',
    styleUrls: ['./intervals.component.scss']
})
export class IntervalsComponent implements OnInit, OnDestroy {

    @ViewChild('modal') modal: ModalDirective;

    @Output() intervalsUpdated = new EventEmitter();

    vehicleId: string;

    selected: Interval;

    private _intervalsSubs: Subscription;
    private _intervals: Interval[];

    constructor(private _route: ActivatedRoute,
                private _maintenanceService: MaintenanceService,
                private _toastr: ToastsManager,
                private _vehicles: VehicleService) {

        this.vehicleId = this._vehicles.vehicleId;
    }

    ngOnInit() {
        this._intervalsSubs = this._maintenanceService.intervalsSubject.subscribe(i => {
            this._intervals = i;
        });
    }

    ngOnDestroy() {
        if (this._intervalsSubs) {
            this._intervalsSubs.unsubscribe();
        }
    }

    get runningIntervals() {
        if (!this.intervals) return 0;

        return this.intervals
            .filter((i) => {
                return !!i.inProgress;
            })
            .length;
    }

    get intervals(): Interval[] {
        return this._intervals;
    }

    edit(interval: Interval) {
        this._maintenanceService.intervalSubject.next(interval);
        this.modal.show();
    }

    delete(id: string) {
        this._maintenanceService
            .deleteInterval(id)
            .subscribe(this._onDeleteSuccess,this._onDeleteError);
    }

    cancel() {
        this.selected = null;
        this.modal.hide();
    }

    saved() {
        this.selected = null;
        this.modal.hide();
        this.intervalsUpdated.emit(this.vehicleId);
    }

    private _onDeleteSuccess = () => {
        this._toastr.success('Interval byl smazán.');
        this.intervalsUpdated.emit(this.vehicleId);
    }

    private _onDeleteError = () => {
        this._toastr.error('Chyba při mazání intervalu!');
    }
}
