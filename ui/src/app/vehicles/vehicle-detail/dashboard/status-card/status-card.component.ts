import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
        forkJoin(
            this._fuel.annualMileages(this._vehicles.state.snapshot.vehicle.info.id),
            this._fuel.currentMileage(this._vehicles.state.snapshot.vehicle.info.id)
        )
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onSuccess);

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

    onSelect(data: any) {
        // TODO
    }

    private _onSuccess = val => {
        this.odo = val[1].odo;
        this.odo2 = val[1].odo2;
        this.originalOdo = val[1].originalOdo;
        this.originalOdo2 = val[1].originalOdo2;

        this.annualMileages = val[0];

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
