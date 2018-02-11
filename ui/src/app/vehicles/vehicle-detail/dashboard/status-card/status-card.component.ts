import { Component, OnInit, OnDestroy } from '@angular/core';
import { VehicleService } from '../../../vehicle-stream/vehicle.service';
import { FuelService } from '../../../../shared/api/fuel/fuel.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

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

    annualMileages: any;

    annual = this._fuel.annualMileages(this._vehicles.vehicleId);
    current = this._fuel.currentMileage(this._vehicles.vehicleId);

    data: any = [];

    colorScheme = {
        domain: ['#0056d8', '#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    private _subs: Subscription;

    constructor(private _vehicles: VehicleService,
                private _fuel: FuelService) { }

    ngOnInit() {
        this._subs = Observable.forkJoin(
            this.annual,
            this.current
        ).subscribe(this._onSuccess);
    }

    ngOnDestroy() {
        if (this._subs) {
            this._subs.unsubscribe();
        }
    }

    get units(): string {
        return this._vehicles.units;
    }

    get units2(): string {
        return this._vehicles.Units2;
    }

    private _onSuccess = (val) => {
        this.odo = val[1].odo;
        this.odo2 = val[1].odo2;
        this.originalOdo = val[1].originalOdo;
        this.originalOdo2 = val[1].originalOdo2;

        this.annualMileages = val[0];

        if (!!this.units2) {
            this._buildDataForAllUnits(this.annualMileages);
        } else {
            this._buildDataForMainUnit(this.annualMileages);
        }
    }

    private _buildDataForAllUnits(data) {
        data.reverse();
        this.data = data.map(v => {
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
        this.data = data.map(v => {
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
