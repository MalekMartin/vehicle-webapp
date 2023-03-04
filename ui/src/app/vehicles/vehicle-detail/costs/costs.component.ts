import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { CostsService } from '../../../shared/api/costs/costs.service';
import { Page, Pageable } from '../../../utils/pageable';
import { VehicleService } from '../../../core/stores/vehicle/vehicle.service';
import { Cost, CostsCategory } from './cost.interface';
import { MatDialog } from '@angular/material/dialog';
import { CostsAddComponent } from './costs-add/costs-add.component';
import { CostsEditComponent } from './costs-edit/costs-edit.component';
import { CostCategoryFormComponent } from './cost-category-form/cost-category-form.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';

@Component({
    selector: 'va-costs',
    templateUrl: './costs.component.html',
    styleUrls: ['./costs.component.scss']
})
export class CostsComponent implements OnInit, OnDestroy {

    vehicleId: string;
    costs: Page<Cost>;

    form = this._fb.group({
        query: [''],
        category: ['']
    });

    private _filter: string[] = [];
    private _categories: any[];

    private _onDestroy$ = new Subject();

    constructor(
        private _service: CostsService,
        private _fb: UntypedFormBuilder,
        private _vehicles: VehicleService,
        private _dialog: MatDialog,
        private _toastr: ToastrService,
    ) {
        this._service.pageSize = 5;
    }

    ngOnInit() {
        this.vehicleId = this._vehicles.snapshot.info.id;
        this._service.id = this.vehicleId;
        this.fetchCurrentPage();
        this.findCategories();

        this.form.valueChanges
            .pipe(
                debounceTime(300),
                switchMap(val => {
                    this._service.query = !!val ? val.query : '';
                    this.setFilter();
                    this._service.reset();
                    return this._service.fetchCurrentPage();
                }),
                takeUntil(this._onDestroy$)
            )
            .subscribe(this._handleNewContent);
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    get loading(): boolean {
        return this._service.loading;
    }

    get costService(): Pageable<Cost> {
        return this._service;
    }

    get filter() {
        return this._filter;
    }

    get categories() {
        return this._categories;
    }

    setFilter() {
        this._service.filter = { category: this.form.get('category').value };
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

    addCosts(e: MouseEvent) {
        e.preventDefault();

        this._dialog
            .open(CostsAddComponent, {
                width: '600px'
            })
            .afterClosed()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(v => {
                if (!!v) {
                    this.fetchCurrentPage();
                }
            });
    }

    editCosts(cost: Cost) {
        this._dialog
            .open(CostsEditComponent, {
                width: '600px',
                data: cost
            })
            .afterClosed()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(v => {
                if (!!v) {
                    this.fetchCurrentPage();
                }
            });
    }

    findCategories() {
        this._service
            .getCategories()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((c: any) => {
                this._categories = c.map((s: CostsCategory) => {
                    return {
                        id: s.id,
                        title: s.title,
                        color: s.color
                    };
                });
            });
    }

    toggleFilter(v, category) {
        const f = _.clone(this._filter);
        this._filter = null;

        category.selected = !category.selected;

        if (!!v.checked) {
            f.push(v.value);
        } else {
            const i = f.indexOf(v.value);
            f.splice(i, 1);
        }
        this._filter = f;

        this._service.filter = f;

        this.fetchCurrentPage();
    }

    categorySettings() {
        this._dialog.open(CostCategoryFormComponent, {
            width: '400px'
        });
    }

    onDeleted() {
        this.fetchCurrentPage();
    }

    close() {
        this.findCategories();
        this.fetchCurrentPage();
    }

    confirmDelete(cost: Cost) {
        this._dialog
            .open(ConfirmComponent, {
                width: '500px',
                data: {
                    title: 'Smazat náklady',
                    message: `Opravdu chceš smazat záznam <b>${cost.title}</b>?`,
                    yes: 'Samzat',
                    no: 'Ne'
                }
            })
            .afterClosed()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(res => {
                if (!!res) {
                    this.delete(cost);
                }
            });
    }

    delete(cost: Cost) {
        this._service
            .deleteCost(cost)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onDeleteSuccess, this._onDeleteError);
    }

    private _handleNewContent = (p: Page<Cost>) => {
        this.costs = p;
    };

    private _onDeleteSuccess = () => {
        this._toastr.success('Náklad byl úspěšně smazán', 'Vymazáno!');
        this.fetchCurrentPage();
    };

    private _onDeleteError = () => {
        this._toastr.error('Náklad nebyl smazán', 'Chyba!');
    };
}
