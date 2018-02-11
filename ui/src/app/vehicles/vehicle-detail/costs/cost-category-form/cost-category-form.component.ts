import { Component, OnInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Category, CostsService } from '../../../../shared/api/costs/costs.service';

@Component({
    selector: 'va-cost-category-form',
    templateUrl: './cost-category-form.component.html',
    styleUrls: ['./cost-category-form.component.scss']
})
export class CostCategoryComponent implements OnInit {

    @Output() closeClicked = new EventEmitter();

    loading = false;
    loadingError = false;

    form = this._form.group({
        id: [''],
        title: ['', [Validators.required, Validators.maxLength(64)]],
        description: [''],
        color: ['']
    });

    private categories: Category[];
    private category: Category = null;

    constructor(private _form: FormBuilder,
                private costs: CostsService,
                private toastr: ToastsManager) {
    }

    ngOnInit() {
        this.findCategories();
    }

    save() {
        this.costs
            .addCategory(this.form.value)
            .subscribe(this.saveSuccess, this.saveError);
    }

    close() {
        this.form.reset();
        this.closeClicked.emit();
    }


    findCategories() {
        this.loading = true;
        this.costs.getCategories()
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
        this.costs.deleteCategory(c)
            .subscribe(this._onDeleteSuccess, this._onDeleteError);
    }

    private saveSuccess = () => {
        this.form.reset();
        this.findCategories();
        this.toastr.success('Kategorie uložena.', 'Uloženo');
    }

    private saveError = () => {
        this.toastr.error('Chyba při ukládání.', 'Chyba');
    }

    private _onDeleteSuccess = () => {
        this.toastr.success('Kategorie byla úspěšně odstraněna.', 'Hotovo!');
        this.findCategories();
    }

    private _onDeleteError = (e) => {
        this.toastr.error('Kategorie nelze odstranit pokud je používána.', 'Chyba!');
    }

    private _hadleCategories = (c: Category[]) => {
        this.categories = c;
        this.loading = false;
        this.loadingError = false;
    }

    private _loadingError = () => {
        this.loading = false;
        this.loadingError = true;
    }


}
