import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { GarageService } from '../../../car-services/garage/garage.service';
import { VehicleService } from '../../../core/stores/vehicle/vehicle.service';
import { NumberStat } from '../../../shared/components/number-stats/number-stats.component';
import { Page } from '../../../utils/pageable';
import { RepairAddComponent } from './repair-add/repair-add.component';
import { RepairService } from './repair.service';
import { Repair } from './_core/repair.interface';

@Component({
    selector: 'va-repair',
    templateUrl: './repair.component.html',
    styleUrls: ['./repair.component.scss']
})
export class RepairComponent implements OnInit, OnDestroy {
    repairToScroll: string;
    scrolled = false;
    services: any;
    stats: NumberStat[];
    repairs: Repair[];
    vehicleId: string;

    form = this._fb.group({
        query: [''],
        garage: ['']
    });

    private _onDestroy$ = new Subject();

    constructor(
        private _route: ActivatedRoute,
        private _service: RepairService,
        private _toastr: ToastrService,
        private _fb: UntypedFormBuilder,
        private _services: GarageService,
        private _vehicleService: VehicleService,
        private _dialog: MatDialog,
        @Inject(DOCUMENT) private document: any
    ) {}

    ngOnInit() {
        this._service.pageSize = 5;
        this.vehicleId = this._vehicleService.snapshot.info.id;
        this._service.reset();
        this._service.vehicleId = this.vehicleId;
        this.setFilter();
        this.fetchCurrentPage();
        this.getStats();

        this.getServices();

        this.form.valueChanges
            .pipe(
                debounceTime(300),
                switchMap(val => {
                    const q = !!val ? val.query : '';
                    this.setFilter(q);
                    this._service.reset();
                    return this._service.fetchCurrentPage();
                }),
                takeUntil(this._onDestroy$)
            )
            .subscribe(this._handleNewContent);

        this._route.queryParams.pipe(takeUntil(this._onDestroy$)).subscribe(par => {
            if (par['repairId']) {
                this.repairToScroll = par['repairId'];
            }
        });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    get isLoading(): boolean {
        return this._service.isLoading;
    }

    get repairService(): RepairService {
        return this._service;
    }

    getServices() {
        this._services
            .getGarages()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(g => {
                this.services = g;
            });
    }

    onUpdate() {
        this.fetchCurrentPage();
    }

    setFilter(q = '') {
        this._service.query = q;
        this._service.filter = {
            garageId: this.form.get('garage').value
        };
    }

    fetchCurrentPage() {
        this._service
            .fetchCurrentPage()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._handleNewContent);
    }

    fetchPage(p: number) {
        this._service
            .fetchPage(p)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._handleNewContent);
    }

    addNewRepair() {
        this._dialog
            .open(RepairAddComponent, {
                width: '600px'
            })
            .afterClosed()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(res => {
                if (res) {
                    this._onSaveSuccess();
                }
            });
    }

    getStats() {
        this._service
            .getStats(this.vehicleId)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((s: NumberStat[]) => {
                this.stats = s;
            });
    }

    delete(repair: Repair) {
        this._service
            .delete(repair)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onDeleteSuccess, this._onDeleteError);
    }

    private _onDeleteSuccess = () => {
        this._toastr.success('Oprava byla smazána.');

        if (
            this._service.currentPage > 0 &&
            !this._service.hasNext &&
            this._service.elements === 1
        ) {
            this.fetchPage(this._service.currentPage - 1);
        } else {
            this.fetchCurrentPage();
        }
        this.getStats();
    };

    private _onDeleteError = () => {
        this._toastr.error('Chyba při mazání opravy.');
    };

    private _onSaveSuccess() {
        this.fetchCurrentPage();
        this.getStats();
    }

    private _handleNewContent = (p: Page<Repair>) => {
        this.repairs = p.content;
    };
}
