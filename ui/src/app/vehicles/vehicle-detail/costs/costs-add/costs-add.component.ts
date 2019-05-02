import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CostsFormComponent } from '../costs-form/costs-form.component';
import { Subject } from 'rxjs';
import { CostsService } from '../../../../shared/api/costs/costs.service';
import { takeUntil } from 'rxjs/operators';
import { ToastsManager } from 'ng6-toastr';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'va-costs-add',
    templateUrl: 'costs-add.component.html',
    styleUrls: ['./costs-add.component.scss']
})
export class CostsAddComponent implements OnInit, OnDestroy {
    @ViewChild(CostsFormComponent) costsRef: CostsFormComponent;

    private _onDestroy$ = new Subject();

    constructor(
        private _costsService: CostsService,
        private _toastr: ToastsManager,
        private _dialogRef: MatDialogRef<CostsAddComponent>
    ) {}

    ngOnInit() {
        this.costsRef.form.get('date').setValue(new Date());
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    save() {
        this._costsService
            .saveCost(this.costsRef.form.value)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onSaveSuccess, this._onSaveError);
    }

    private _onSaveSuccess = () => {
        this._toastr.success('Byla přidána nová položka do nákladů.', 'Hotovo');
        this._dialogRef.close('DONE');
    };

    private _onSaveError = () => {
        this._toastr.success('Nová položka nebyla přidána', 'Chyba!');
    };
}