import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subject, of } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';
import { FuelService } from '../../../../shared/api/fuel/fuel.service';

@Component({
    selector: 'va-status-card',
    templateUrl: 'status-card.component.html',
    styleUrls: ['status-card.component.scss']
})
export class StatusCardComponent implements OnInit, OnDestroy {
    odo: number;
    odo2: number;

    originalOdo: number;
    originalOdo2: number;

    units: string;
    units2: string;

    annualMileages: any;

    data: any = [];

    colorScheme = {
        domain: ['#0056d8', '#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    private _onDestroy$ = new Subject();

    constructor(private _vehicles: VehicleService, private _fuel: FuelService) {}

    ngOnInit() {
        this._vehicles.state
            .select(s => s.vehicle.info)
            .pipe(
                switchMap(info => {
                    return forkJoin(
                        this._fuel.annualMileages(info.id),
                        this._fuel.currentMileage(info.id),
                        of(info)
                    )
                }),
                takeUntil(this._onDestroy$)
            )
            .subscribe(this._onSuccess);
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    private _onSuccess = ([annutalMielages, currentMileage, info]) => {
        this.units = info.units;
        this.units2 = info.subUnits;
        this.odo = currentMileage.odo;
        this.odo2 = currentMileage.odo2;
        this.originalOdo = currentMileage.originalOdo;
        this.originalOdo2 = currentMileage.originalOdo2;

        this.annualMileages = annutalMielages;

        this.data = !!this.units2
            ? this._buildDataForAllUnits(this.annualMileages)
            : this._buildDataForMainUnit(this.annualMileages);
    };

    private _buildDataForAllUnits(data) {
        data.reverse();
        return data.map(v => {
            return {
                name: v.year,
                series: [
                    {
                        name: this.units,
                        value: v.odo
                    },
                    {
                        name: this.units2,
                        value: v.odo2
                    }
                ]
            };
        });
    }

    private _buildDataForMainUnit(data) {
        data.reverse();
        return data.map(v => {
            return {
                name: v.year,
                series: [
                    {
                        name: this.units,
                        value: v.odo
                    }
                ]
            };
        });
    }
}
