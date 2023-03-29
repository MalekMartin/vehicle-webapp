import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CostsFormComponent } from '../costs-form/costs-form.component';
import { Subject } from 'rxjs';
import { CostsService } from '../../../../shared/api/costs/costs.service';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

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
        private _toastr: ToastrService,
        private _dialogRef: MatDialogRef<CostsAddComponent>
    ) {}

    ngOnInit() {}

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
