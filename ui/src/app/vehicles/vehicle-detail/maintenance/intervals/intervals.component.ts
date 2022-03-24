import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';
import { Interval } from '../../../../shared/api/maintenance/interval.interface';
import { MaintenanceService } from '../../../../shared/api/maintenance/maintenance.service';
import { MatDialog } from '@angular/material/dialog';
import { IntervalEditComponent } from './interval-edit/interval-edit.component';

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
        private _toastr: ToastrService,
        private _vehicles: VehicleService,
        private _dialog: MatDialog
    ) {
        this.vehicleId = this._vehicles.snapshot.info.id;
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
        this._dialog
            .open(IntervalEditComponent, {
                width: '600px',
                data: interval
            })
            .afterClosed()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(res => {
                if (res) {
                    this.intervalsUpdated.emit();
                }
            });
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
