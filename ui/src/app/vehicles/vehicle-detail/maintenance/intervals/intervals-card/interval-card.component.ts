import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { VehicleService } from '../../../../../core/stores/vehicle/vehicle.service';
import { Interval } from '../../../../../shared/api/maintenance/interval.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'va-interval-card',
    templateUrl: './interval-card.component.html',
    styleUrls: ['./interval-card.component.scss']
})
export class IntervalCardComponent implements OnInit, OnDestroy {
    @Input() interval: Interval;

    @Output() editClicked = new EventEmitter();

    @Output() deleteClicked = new EventEmitter();

    units: string;
    units2: string;

    private _onDestroy$ = new Subject();

    constructor(private _vehicles: VehicleService) {}

    ngOnInit() {
        this._vehicles.state
            .select(s => s.vehicle.info)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(i => {
                this.units = i.units;
                this.units2 = i.subUnits;
            });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    edit() {
        this.editClicked.emit(this.interval);
    }

    delete() {
        this.deleteClicked.emit(this.interval.id);
    }
}
