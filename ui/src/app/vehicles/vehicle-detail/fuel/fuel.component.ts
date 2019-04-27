import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { forkJoin, Observable, Subscription, Subject } from 'rxjs';
import { Fuel } from '../../../shared/api/fuel/fuel';
import { FuelService } from '../../../shared/api/fuel/fuel.service';
import { MultiStatsModel } from '../../../shared/api/stats.interface';
import { Page, Pageable } from '../../../utils/pageable';
import { VehicleService } from '../../../core/stores/vehicle/vehicle.service';
import { MatDialog } from '@angular/material';
import { FuelAddComponent } from './fuel-add/fuel-add.component';
import { takeUntil } from 'rxjs/operators';
import { FuelEditComponent } from './fuel-edit/fuel-edit.component';

@Component({
    selector: 'va-fuel',
    templateUrl: './fuel.component.html',
    styleUrls: ['./fuel.component.scss']
})
export class FuelComponent implements OnInit, OnDestroy {
    vehicleId: string;

    selectedFueling: Fuel;

    fuels: Observable<Page<Fuel>>;
    stats: Observable<any>;
    mileageStats: Observable<MultiStatsModel[]>;
    statistics: any;

    mileages: any;

    private _fuelings: Fuel[];
    private _onDestroy$ = new Subject();

    constructor(
        private _service: FuelService,
        private _toastr: ToastsManager,
        private _vehicles: VehicleService,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        this.vehicleId = this._vehicles.vehicleId;
        this._service.id = this.vehicleId;

        this.fuels = this._service.fetchCurrentPage();
        this.stats = this._service.stats(this.vehicleId);
        this.mileageStats = this._service.mileageStats(this.vehicleId);

        this.refresh();
    }

    ngOnDestroy() {
        this._service.resetPage();
        this._onDestroy$.next();
    }

    refresh() {
        forkJoin(this.fuels, this.stats, this.mileageStats)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(([fuel, stats, mileageStats]) => {
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
        this._service
            .fetchPage(page)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._handleNewContent);
    }

    delete(fueling) {
        this._service
            .delete(fueling)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => {
                this._toastr.success('Tankování bylo úspěšně smazáno.', 'Smazáno!');
                this.refresh();
            });
    }

    add() {
        this.dialog
            .open(FuelAddComponent, {
                width: '500px'
            })
            .afterClosed()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(val => {
                if (!!val) {
                    this.refresh();
                }
            });
    }

    edit(fuel: Fuel) {
        this.dialog
            .open(FuelEditComponent, {
                width: '500px',
                data: fuel
            })
            .afterClosed()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(val => {
                if (!!val) {
                    this.refresh();
                }
            });
    }

    private _handleNewContent = (page: Page<Fuel>) => {
        this._fuelings = page.content;
    };
}
