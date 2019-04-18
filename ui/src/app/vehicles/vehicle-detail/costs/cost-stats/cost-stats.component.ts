import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Cost } from '../cost.interface';
import { NumberStat } from '../../../../shared/components/number-stats/number-stats.component';
import { Subscription } from 'rxjs';
import { CostsService, Category } from '../../../../shared/api/costs/costs.service';
import { SingleStatsModel } from '../../../../shared/api/stats.interface';

@Component({
    selector: 'va-cost-stats',
    templateUrl: './cost-stats.component.html',
    styleUrls: ['./cost-stats.component.scss']
})

export class CostStatsComponent implements OnInit, OnDestroy {

    @Input() set vehicleId(id: string) {
        this._vehicleId = id;
        this.getStats();
        this.getCostsByCategory();
    }

    @Input() set categories(c: Category[]) {
        if (c) {
            this.customScheme = [];
            c.forEach((cat) => {
                this.customScheme.push({
                    name: cat.title,
                    value: '#' + cat.color
                });
            });
        }
    }

    stats: NumberStat[];
    data: SingleStatsModel[];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Kategorie';
    showYAxisLabel = true;
    yAxisLabel = 'Cena';
    customScheme: any;

    // colorScheme = {
    //     domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    // };

    loading = false;

    private _vehicleId: string;
    private _statsSubs: Subscription;
    private _categorySubs: Subscription;

    constructor(private _costs: CostsService) { }

    ngOnInit() {
    }

    ngOnDestroy() {
        if (this._statsSubs) {
            this._statsSubs.unsubscribe();
        }
        if (this._categorySubs) {
            this._categorySubs.unsubscribe();
        }
    }

    get vehicleId(): string {
        return this._vehicleId;
    }

    getStats() {
        this.loading = true;
        this._statsSubs = this._costs
            .getStats(this.vehicleId)
            .subscribe((s: NumberStat[]) => {
                this.stats = s;
                this.loading = false;
            });
    }

    getCostsByCategory() {
        this._categorySubs = this._costs.getCostsByCategory(this.vehicleId)
            .subscribe(d => {
                this.data = d;
            });
    }
}
