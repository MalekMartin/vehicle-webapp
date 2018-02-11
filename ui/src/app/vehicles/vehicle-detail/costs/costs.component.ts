import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as _ from 'lodash';
import { ModalDirective } from 'ngx-bootstrap';
import {
    ConfirmDialogService
} from '../../../shared/components/confirm-dialog/confirm-dialog.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Cost, CostsCategory } from './cost.interface';
import { Page, Pageable } from '../../../utils/pageable';
import { Observable } from 'rxjs/Rx';
import { FormControl, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { VehicleService } from '../../vehicle-stream/vehicle.service';
import { CostsService } from '../../../shared/api/costs/costs.service';

@Component({
    selector: 'va-costs',
    templateUrl: './costs.component.html',
    styleUrls: ['./costs.component.scss']
})
export class CostsComponent implements OnInit, OnDestroy {

    @ViewChild('formModal') modal: ModalDirective;

    vehicleId: string;
    selectedCost: Cost = null;
    modalTitle:string;
    modalBody:string;
    // query = new FormControl('');

    form = this._fb.group({
        query: [''],
        category: ['']
    });

    private _filter: string[] = [];
    private _costs: Cost[];
    private _categories: any[];

    private _querySubs: Subscription;
    private _currentSubs: Subscription;
    private _routerSubs: Subscription;
    private _filterSubs: Subscription;
    private _pageSubs: Subscription;
    private _categorySubs: Subscription;

    constructor(private _service:CostsService,
                private _route:ActivatedRoute,
                private _toastr:ToastsManager,
                private _confirm: ConfirmDialogService,
                private _router: Router,
                private _fb: FormBuilder,
                private _vehicles: VehicleService) {

        this._service.pageSize = 5;
    }

    ngOnInit() {
        this.vehicleId = this._vehicles.vehicleId;
        this._service.id = this.vehicleId;
        this.fetchCurrentPage();
        this.findCategories();

        this._querySubs = this.form.valueChanges
            .debounceTime(300)
            .switchMap(val => {
                this._service.query = !!val ? val.query : '';
                this.setFilter();
                this._service.reset();
                return this._service.fetchCurrentPage();
            })
            .subscribe(this._handleNewContent);
    }

    setFilter() {
        this._service.filter = {category: this.form.get('category').value};
    }

    ngOnDestroy() {
        if (this._querySubs) {
            this._querySubs.unsubscribe();
        }
        if (this._currentSubs) {
            this._currentSubs.unsubscribe();
        }
        if (this._routerSubs) {
            this._routerSubs.unsubscribe();
        }
        if (this._pageSubs) {
            this._pageSubs.unsubscribe();
        }
        if (this._categorySubs) {
            this._categorySubs.unsubscribe();
        }
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

    get loading(): boolean {
        return this._service.loading;
    }

    get costService(): Pageable<Cost> {
        return this._service;
    }

    get costs() {
        return this._costs;
    }

    get filter() {
        return this._filter;
    }

    get categories() {
        return this._categories;
    }

    private _handleNewContent = (p: Page<Cost>) => {
        this._costs = p.content;
    }

    findCategories() {
        this._categorySubs = this._service
            .getCategories()
            .subscribe((c:any) => {
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
            f.splice(i,1);
        }
        this._filter = f;

        this._service.filter = f;

        this.fetchCurrentPage();
    }

    edit(c:Cost) {
        this.selectedCost = c;
        this.newCosts();
    }

    newCosts() {
        this.modalBody = 'costs';
        this.modalTitle = 'Náklady';
        this.modal.show();
    }

    categorySettings() {
        this.modalBody = 'category';
        this.modalTitle = 'Správa kategorií';
        this.modal.show();
    }

    costsSaved() {
        this.modal.hide();
        this.selectedCost = null;
        // this.findCosts();
        this.fetchCurrentPage();
        this._toastr.success('Náklady úspěšně uloženy.','Uloženo!');
    }

    onDeleted() {
        // this.findCosts();
        this.fetchCurrentPage();
    }

    costsCanceled() {
        this.modal.hide();
        this.selectedCost = null;
    }

    close() {
        this.modal.hide();
        this.findCategories();
        this.fetchCurrentPage();
        this.modalBody = null;
    }
}
