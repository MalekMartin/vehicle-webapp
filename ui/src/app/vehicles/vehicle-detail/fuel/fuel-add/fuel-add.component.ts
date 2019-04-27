import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FuelFormComponent } from '../fuel-form/fuel-form.component';
import { FuelService } from '../../../../shared/api/fuel/fuel.service';
import { MatDialogRef } from '@angular/material';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'va-fuel-add',
    templateUrl: 'fuel-add.component.html',
    styleUrls: ['./fuel-add.component.scss']
})
export class FuelAddComponent implements OnInit, OnDestroy {
    @ViewChild(FuelFormComponent) fuelForm: FuelFormComponent;

    private _onDestroy$ = new Subject();

    constructor(
        private _fuelService: FuelService,
        public dialogRef: MatDialogRef<FuelAddComponent>,
        private _toastr: ToastsManager
    ) {}

    ngOnInit() {
        this.fuelForm.form.get('date').setValue(new Date());
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    save() {
        this._fuelService
            .addFueling(this.fuelForm.form.value)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onSuccess, this._onError);
    }
    private _onSuccess = () => {
        this._toastr.success('Tankování bylo uloženo', 'Hotovo');
        this.dialogRef.close('DONE');
    }

    private _onError = () => {
        this._toastr.error('Tankování se nepodařilo uložit', 'Chyba');
    }
}
