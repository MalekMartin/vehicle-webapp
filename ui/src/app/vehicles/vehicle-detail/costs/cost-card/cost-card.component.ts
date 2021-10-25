import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';
import { Cost } from '../cost.interface';

@Component({
    selector: 'va-cost-card',
    templateUrl: './cost-card.component.html',
    styleUrls: ['./cost-card.component.scss']
})
export class CostCardComponent implements OnInit, OnDestroy {
    @Input() cost: Cost;
    @Output() edit = new EventEmitter<Cost>();
    @Output() delete = new EventEmitter();

    units: string;
    units2: string;

    private _onDestroy$ = new Subject();

    constructor(private _vehicles: VehicleService) {}

    ngOnInit() {
        this._vehicles.vehicle
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(vehicle => {
                this.units = vehicle.info.units;
                this.units2 = vehicle.info.subUnits;
            });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }
}
