import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PageScrollInstance, PageScrollService } from 'ng2-page-scroll';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { Subscription } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { GarageService } from '../../../car-services/garage/garage.service';
import { ConfirmDialogService } from '../../../shared/components/confirm-dialog/confirm-dialog.service';
import { NumberStat } from '../../../shared/components/number-stats/number-stats.component';
import { Page } from '../../../utils/pageable';
import { VehicleService } from '../../vehicle-stream/vehicle.service';
import { RepairFormService } from './repair-form/repair-form.service';
import { RepairService } from './repair.service';
import { Repair } from './_core/repair.interface';

@Component({
    selector: 'va-repair',
    templateUrl: './repair.component.html',
    styleUrls: ['./repair.component.scss']
})
export class RepairComponent implements OnInit, OnDestroy {

    // selected: Repair;

    repairToScroll: string;

    scrolled = false;

    services: any;

    stats: NumberStat[];

    form = this._fb.group({
        query: [''],
        garage: ['']
    });

    private _repairs: Repair[];
    private _vehicleId: string;

    private _currentSubs: Subscription;
    private _formSubs: Subscription;
    private _pageSubs: Subscription;
    private _servicesSubs: Subscription;
    private _statsSubs: Subscription;

    constructor(private _route: ActivatedRoute,
                private _service: RepairService,
                private _toastr: ToastsManager,
                private _repairForm: RepairFormService,
                private _confirm: ConfirmDialogService,
                private _scroll: PageScrollService,
                private _fb: FormBuilder,
                private _services: GarageService,
                private _vehicleService: VehicleService,
                @Inject(DOCUMENT) private document: any) { }

    ngOnInit() {
        this._service.pageSize = 5;
        this.vehicleId = this._vehicleService.vehicleId;
        this._service.reset();
        this._service.vehicleId = this.vehicleId;
        this.setFilter();
        this.fetchCurrentPage();

        this.getServices();

        this._formSubs = this.form.valueChanges
            .pipe(
                debounceTime(300),
                switchMap(val => {
                    const q = !!val ? val.query : '';
                    this.setFilter(q);
                    this._service.reset();
                    return this._service.fetchCurrentPage();
                })
            )
            .subscribe(this._handleNewContent);

        this._route.queryParams.subscribe((par) => {
            if (par['repairId']) {
                this.repairToScroll = par['repairId'];
            }
        });
    }

    ngOnDestroy() {
        if (!!this._formSubs) {
            this._formSubs.unsubscribe();
        }
        if (this._pageSubs) {
            this._pageSubs.unsubscribe();
        }
        if (this._currentSubs) {
            this._currentSubs.unsubscribe();
        }
        if (this._servicesSubs) {
            this._servicesSubs.unsubscribe();
        }
        if (this._statsSubs) {
            this._statsSubs.unsubscribe();
        }
    }

    get repairs(): Repair[] {
        return this._repairs;
    }

    get isLoading(): boolean {
        return this._service.isLoading;
    }

    get repairService(): RepairService {
        return this._service;
    }

    get vehicleId(): string {
        return this._vehicleId;
    }

    set vehicleId(id: string) {
        this._vehicleId = id;
        this.getStats();
    }

    getServices() {
        this._servicesSubs = this._services.getGarages()
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
        this._currentSubs = this._service
            .fetchCurrentPage()
            .subscribe(this._handleNewContent);
    }

    fetchPage(p: number) {
        this._pageSubs = this._service
            .fetchPage(p)
            .subscribe(this._handleNewContent);
    }

    scrollToRepair() {
        const pageScrollInstance: PageScrollInstance = PageScrollInstance
                .simpleInstance(this.document, 'repair-' + this.repairToScroll);
        this._scroll.start(pageScrollInstance);
    }

    addNewRepair() {
        this._repairForm.dialog
            .repair(this._buildEmptyRepair)
            .title('Nová oprava')
            .subscribe((res) => {
                if (res) {
                    this._onSaveSuccess();
                }
            });
    }

    getStats() {
        this._statsSubs = this._service
            .getStats(this.vehicleId)
            .subscribe((s: NumberStat[]) => {
                this.stats = s;
            });
    }

    delete(repair: Repair) {
        this._service.delete(repair)
            .subscribe(this._onDeleteSuccess, this._onDeleteError);
    }

    private _onDeleteSuccess = () => {
        this._toastr.success('Oprava byla smazána.');

        if (!this._service.hasNext && this._service.elements === 1) {
            this.fetchPage(this._service.currentPage - 1);
        } else {
            this.fetchCurrentPage();
        }
        this.getStats();
    }

    private _onDeleteError = () => {
        this._toastr.error('Chyba při mazání opravy.');
    }

    private _onSaveSuccess() {
        this.fetchCurrentPage();
        this.getStats();
    }

    private _handleNewContent = (p: Page<Repair>) => {
        this._repairs = p.content;
    }

    private get _buildEmptyRepair(): Repair {
        return {
            id: '',
            vehicleId: this.vehicleId,
            title: '',
            odo: 0,
            odo2: 0,
            garageId: '',
            garageName: '',
            date: '',
            totalPrice: 0,
            notes: '',
            tasks: [],
            tax: 0
        };
    }
}
