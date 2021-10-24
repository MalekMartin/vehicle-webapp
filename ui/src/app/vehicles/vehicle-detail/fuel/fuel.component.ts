import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../core/stores/vehicle/vehicle.service';
import { Fuel } from '../../../shared/api/fuel/fuel';
import { FuelService } from '../../../shared/api/fuel/fuel.service';
import { MultiStatsModel } from '../../../shared/api/stats.interface';
import { Page, Pageable } from '../../../utils/pageable';
import { FuelAddComponent } from './fuel-add/fuel-add.component';
import { FuelEditComponent } from './fuel-edit/fuel-edit.component';

@Component({
    selector: 'va-fuel',
    templateUrl: './fuel.component.html',
    styleUrls: ['./fuel.component.scss']
})
export class FuelComponent implements OnInit, OnDestroy {
    vehicleId: string;
    selectedFueling: Fuel;
    statistics: any;
    mileages: MultiStatsModel[];
    fuelStats: MultiStatsModel[];

    fuelings: Fuel[];
    isLoading = false;
    private _onDestroy$ = new Subject();

    constructor(
        private _service: FuelService,
        private _toastr: ToastrService,
        private _vehicles: VehicleService,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        this.vehicleId = this._vehicles.state.snapshot.vehicle.info.id;
        this._service.id = this.vehicleId;

        this.refresh();
    }

    ngOnDestroy() {
        this._service.resetPage();
        this._onDestroy$.next();
    }

    refresh() {
        this.isLoading = true;
        forkJoin(
            this._service.fetchCurrentPage(),
            this._service.stats(this.vehicleId),
            this._service.mileageStats(this.vehicleId),
            this._service.fuelStats(this.vehicleId, 12)
        )
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(
                ([fuel, stats, mileageStats, fuelStats]) => {
                    this.fuelings = fuel.content;
                    this.statistics = stats;
                    this.mileages = mileageStats;
                    this.fuelStats = fuelStats;
                    this._service.resetPage();
                    this.isLoading = false;
                },
                () => {
                    this.isLoading = false;
                }
            );
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

    add(e: MouseEvent) {
        e.preventDefault();

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
        this.fuelings = page.content;
    };
}
