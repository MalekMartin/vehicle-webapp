import { Component, OnInit, OnDestroy } from '@angular/core';
import { CostsService } from '../../../../shared/api/costs/costs.service';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'va-costs-card',
    templateUrl: 'costs-card.component.html',
    styleUrls: ['costs-card.component.scss']
})

export class CostsCardComponent implements OnInit, OnDestroy {

    vehicleId = null;
    costs = null;

    data: any = [];
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Country';
    showYAxisLabel = true;
    yAxisLabel = 'Population';

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#000099']
    };

    // pie
    showLabels = true;
    explodeSlices = false;
    doughnut = false;

    private _costsSubs: Subscription;

    constructor(private _costs: CostsService,
                private _route: ActivatedRoute,
                private _vehicles: VehicleService) { }

    ngOnInit() {
        this.vehicleId = this._vehicles.snapshot.info.id;
        this._costsSubs = this._costs.getAllCosts(this.vehicleId)
            .subscribe(this._onSuccess);
    }

    ngOnDestroy() {
        if (this._costsSubs) {
            this._costsSubs.unsubscribe();
        }
    }

    getPercentage(value: number): string {
        return ((value / this.costs.total) * 100).toFixed(1);
    }

    private _onSuccess = (val) => {
        this.costs = val;

        this.data = [
            {
                name: 'Tankování',
                value: val.fuel
            },
            {
                name: 'Ostatní náklady',
                value: val.costs
            },
            {
                name: 'Pneumatiky',
                value: val.tires
            },
            {
                name: 'TK',
                value: val.tks
            },
            {
                name: 'Údržba a servis',
                value: val.maintenance
            }
        ];
    }
}

