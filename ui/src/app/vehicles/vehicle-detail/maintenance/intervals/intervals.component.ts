import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';
import { Interval } from '../../../../shared/api/maintenance/interval.interface';
import { MaintenanceService } from '../../../../shared/api/maintenance/maintenance.service';

@Component({
    selector: 'va-intervals',
    templateUrl: './intervals.component.html',
    styleUrls: ['./intervals.component.scss']
})
export class IntervalsComponent implements OnInit, OnDestroy {
    @Output() intervalsUpdated = new EventEmitter();

    vehicleId: string;

    selected: Interval;
    private _intervals: Interval[];
    private _onDestroy$ = new Subject();

    constructor(
        private _maintenanceService: MaintenanceService,
        private _toastr: ToastsManager,
        private _vehicles: VehicleService
    ) {
        this.vehicleId = this._vehicles.state.snapshot.vehicle.info.id;
    }

    ngOnInit() {
        this._maintenanceService.intervalsSubject.pipe(takeUntil(this._onDestroy$)).subscribe(i => {
            this._intervals = i;
        });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    get runningIntervals() {
        if (!this.intervals) return 0;

        return this.intervals.filter(i => {
            return !!i.inProgress;
        }).length;
    }

    get intervals(): Interval[] {
        return this._intervals;
    }

    edit(interval: Interval) {
        this._maintenanceService.intervalSubject.next(interval);
    }

    delete(id: string) {
        this._maintenanceService
            .deleteInterval(id)
            .subscribe(this._onDeleteSuccess, this._onDeleteError);
    }

    private _onDeleteSuccess = () => {
        this._toastr.success('Interval byl smazán.');
        this.intervalsUpdated.emit(this.vehicleId);
    };

    private _onDeleteError = () => {
        this._toastr.error('Chyba při mazání intervalu!');
    };
}
