import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, forkJoin, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { VehicleService } from '../../../core/stores/vehicle/vehicle.service';
import { Fuel } from '../../../shared/api/fuel/fuel';
import { FuelService } from '../../../shared/api/fuel/fuel.service';
import { MultiStatsModel } from '../../../shared/api/stats.interface';
import { Page, Pageable } from '../../../utils/pageable';
import { FuelAddComponent } from './fuel-add/fuel-add.component';
import { FuelEditComponent } from './fuel-edit/fuel-edit.component';
import { BreakpointService } from '../../../core/breakpoint.service';

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

    private _contentEl: HTMLElement;

    constructor(
        private _service: FuelService,
        private _toastr: ToastrService,
        private _vehicles: VehicleService,
        public dialog: MatDialog,
        private _bpService: BreakpointService,
    ) {
        this._service.pageSize = 20;

        this._contentEl = document.querySelector('.content-panel');
    }

    ngOnInit() {
        this.vehicleId = this._vehicles.snapshot.info.id;
        this._service.id = this.vehicleId;

        this.refresh().pipe(takeUntil(this._onDestroy$)).subscribe();
    }

    ngOnDestroy() {
        this._service.resetPage();
        this._onDestroy$.next();
    }

    get isMobile() {
        return this._bpService.isMobile();
    }

    refresh() {
        this.isLoading = true;
        return forkJoin([
            this._service.fetchCurrentPage(),
            this._service.stats(this.vehicleId),
            this._service.mileageStats(this.vehicleId),
            this._service.fuelStats(this.vehicleId, 12)
        ])
            .pipe(
                tap(
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
                ),
            );
    }

    get fuelService(): Pageable<Fuel> {
        return this._service;
    }

    fetchPage(page: number) {
        if (this._contentEl) {
            this._contentEl.scrollTo({top: 0, behavior: 'smooth'});
        }
        this._service
            .fetchPage(page)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._handleNewContent);
    }

    delete(fueling) {
        this._service
            .delete(fueling)
            .pipe(
                tap(() => this._toastr.success('Tankování bylo úspěšně smazáno.', 'Smazáno!')),
                switchMap(() => this.refresh()),
                takeUntil(this._onDestroy$)
            )
            .subscribe();
    }

    add(e: MouseEvent) {
        e.preventDefault();

        this.dialog
            .open(FuelAddComponent, {
                data: this.fuelings?.length > 0 ? this.fuelings[0] : null,
                panelClass: this.isMobile ? 'va-mobile-dialog' : null,
            })
            .afterClosed()
            .pipe(
                switchMap(res => res ? this.refresh() : EMPTY),
                takeUntil(this._onDestroy$)
            )
            .subscribe();
    }

    edit(fuel: Fuel) {
        this.dialog
            .open(FuelEditComponent, {
                data: fuel
            })
            .afterClosed()
            .pipe(
                switchMap(res => res ? this.refresh() : EMPTY),
                takeUntil(this._onDestroy$)
            )
            .subscribe();
    }

    private _handleNewContent = (page: Page<Fuel>) => {
        this.fuelings = page.content;
    };
}
