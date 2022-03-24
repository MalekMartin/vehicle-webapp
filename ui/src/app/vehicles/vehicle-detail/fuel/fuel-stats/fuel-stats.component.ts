import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Fuel } from '../../../../shared/api/fuel/fuel';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MultiStatsModel } from '../../../../shared/api/stats.interface';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';

@Component({
    selector: 'va-fuel-stats',
    templateUrl: './fuel-stats.component.html',
    styleUrls: ['./fuel-stats.component.scss']
})
export class FuelStatsComponent implements OnInit, OnDestroy {

    loading = true;
    loadingError = false;

    chart: FuelChartType = 'FUEL';

    @Input() set stats(value: any) {
        this._stats = value;
    }

    @Input() set mileages(value: MultiStatsModel[]) {
        this.mileageData = !!value ? value : null;
    }

    @Input() set fuelStats(value: MultiStatsModel) {
        this.fuelData = !!value ? value : null;
    }

    view: any[] = [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Datum';
    showYAxisLabel = true;
    yAxisLabel = this._vehicle.snapshot.info.units;

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    // line, area
    autoScale = true;

    fuelData: MultiStatsModel;
    mileageData: MultiStatsModel[];

    private _stats: any;
    private _fuelings: Fuel[] = [];

    private _vehicleId: string;
    private _statsSubs: Subscription;

    constructor(private _vehicle: VehicleService) { }

    ngOnInit() {
    }

    ngOnDestroy() {
        if (this._statsSubs) {
            this._statsSubs.unsubscribe();
        }
    }

    get stats() {
        return this._stats;
    }

    changeChart(type: FuelChartType) {
        this.chart = type;
    }
}

type FuelChartType = 'FUEL' | 'MILEAGE';
