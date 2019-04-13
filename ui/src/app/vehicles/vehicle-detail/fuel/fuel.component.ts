import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { Fuel } from '../../../shared/api/fuel/fuel';
import { FuelService } from '../../../shared/api/fuel/fuel.service';
import { MultiStatsModel } from '../../../shared/api/stats.interface';
import { Page, Pageable } from '../../../utils/pageable';
import { VehicleService } from '../../vehicle-stream/vehicle.service';

@Component({
    selector: 'va-fuel',
    templateUrl: './fuel.component.html',
    styleUrls: ['./fuel.component.scss']
})
export class FuelComponent implements OnInit, OnDestroy {

    vehicleId:string;

    selectedFueling:Fuel;

    fuels: Observable<Page<Fuel>>;
    stats: Observable<any>;
    mileageStats: Observable<MultiStatsModel[]>;
    statistics: any;

    mileages: any;

    private _fuelings: Fuel[];
    private _routerSubs: Subscription;
    private _fetchPageSubs: Subscription;
    private _loadValuesSubs: Subscription;

    constructor(private _service: FuelService,
                private _route: ActivatedRoute,
                private _router: Router,
                private _toastr: ToastsManager,
                private _vehicles: VehicleService) {
    }

    ngOnInit() {
        this.vehicleId = this._vehicles.vehicleId;
        this._service.id = this.vehicleId;

        this.fuels = this._service.fetchCurrentPage();
        this.stats = this._service.stats(this.vehicleId);
        this.mileageStats = this._service.mileageStats(this.vehicleId);


        this.refresh();
    }

    ngOnDestroy() {
        if (this._routerSubs) {
            this._routerSubs.unsubscribe();
        }
        if (this._fetchPageSubs) {
            this._fetchPageSubs.unsubscribe();
        }
        if (this._loadValuesSubs) {
            this._loadValuesSubs.unsubscribe();
        }
        this._service.resetPage();
    }

    refresh() {
        this._loadValuesSubs = forkJoin(
            this.fuels,
            this.stats,
            this.mileageStats
        ).subscribe(([fuel, stats, mileageStats]) => {
            this._fuelings = fuel.content;
            this.statistics = stats;
            this.mileages = mileageStats;
            this._service.resetPage();
        });
    }

    get fuelings(): Fuel[] {
        return this._fuelings;
    }

    get isLoading(): boolean {
        return this._service.loading;
    }

    get fuelService(): Pageable<Fuel> {
        return this._service;
    }

    fetchPage(page: number) {
        this._fetchPageSubs = this._service.fetchPage(page)
            .subscribe(this._handleNewContent);
    }

    delete(fueling) {
        this._service.delete(fueling)
            .subscribe(() => {
                this._toastr.success('Tankování bylo úspěšně smazáno.','Smazáno!');
                this.refresh();
            });
    }

    private _handleNewContent = (page: Page<Fuel>) => {
        this._fuelings = page.content;
    }

}
