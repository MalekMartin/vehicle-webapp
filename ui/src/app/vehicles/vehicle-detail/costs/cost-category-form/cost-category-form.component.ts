import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category, CostsService } from '../../../../shared/api/costs/costs.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'va-cost-category-form',
    templateUrl: './cost-category-form.component.html',
    styleUrls: ['./cost-category-form.component.scss']
})
export class CostCategoryFormComponent implements OnInit, OnDestroy {

    loading = false;
    loadingError = false;

    form = this._form.group({
        id: [''],
        title: ['', [Validators.required, Validators.maxLength(64)]],
        description: [''],
        color: ['']
    });

    categories: Category[];
    private _onDestroy$ = new Subject();

    constructor(
        private _form: UntypedFormBuilder,
        private costs: CostsService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.findCategories();
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    save() {
        this.costs
            .addCategory(this.form.value)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this.saveSuccess, this.saveError);
    }

    findCategories() {
        this.loading = true;
        this.costs
            .getCategories()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._hadleCategories, this._loadingError);
    }

    selectCategory(c: Category) {
        this.form.setValue({
            id: c.id,
            title: c.title,
            description: c.description,
            color: c.color
        });
    }

    delete(c: Category) {
        this.costs
            .deleteCategory(c)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onDeleteSuccess, this._onDeleteError);
    }

    private saveSuccess = () => {
        this.form.reset();
        this.findCategories();
        this.toastr.success('Kategorie uložena.', 'Uloženo');
    };

    private saveError = () => {
        this.toastr.error('Chyba při ukládání.', 'Chyba');
    };

    private _onDeleteSuccess = () => {
        this.toastr.success('Kategorie byla úspěšně odstraněna.', 'Hotovo!');
        this.findCategories();
    };

    private _onDeleteError = e => {
        this.toastr.error('Kategorie nelze odstranit pokud je používána.', 'Chyba!');
    };

    private _hadleCategories = (c: Category[]) => {
        this.categories = c;
        this.loading = false;
        this.loadingError = false;
    };

    private _loadingError = () => {
        this.loading = false;
        this.loadingError = true;
    };
}
