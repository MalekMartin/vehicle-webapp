import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { TiresService } from '../core/tires.service';
import { TiresFormComponent } from '../tires-form/tires-form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';
import { Tire } from '../tires.interface';

@Component({
    selector: 'va-tire-edit',
    templateUrl: 'tire-edit.component.html',
    styleUrls: ['./tire-edit.component.scss']
})
export class TireEditComponent implements OnInit, OnDestroy {
    @ViewChild(TiresFormComponent) formRef: TiresFormComponent;

    private _onDestroy$ = new Subject();

    constructor(
        private _tireService: TiresService,
        private _dialogRef: MatDialogRef<TireEditComponent>,
        private _toastr: ToastrService,
        private _vehicleService: VehicleService,
        @Inject(MAT_DIALOG_DATA) public data: Tire
    ) {}

    ngOnInit() {
        this.formRef.form.setValue(this.data);
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    save() {
        this._tireService
            .saveTire(this.formRef.form.value)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onSuccess, this._onError);
    }

    private _onSuccess = t => {
        this._tireService.state.update(f => f.updateTire, t);
        this._toastr.success('Pneumatika byla úspěšně změněna', 'Hotovo');
        this._dialogRef.close('DONE');
    };

    private _onError = () => {
        this._toastr.success('Pneumatika nebyla změněna', 'Chyba');
    };
}
