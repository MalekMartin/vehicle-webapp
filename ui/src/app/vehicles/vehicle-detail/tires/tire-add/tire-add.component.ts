import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { TiresService } from '../core/tires.service';
import { TiresFormComponent } from '../tires-form/tires-form.component';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';

@Component({
    selector: 'va-tire-add',
    templateUrl: 'tire-add.component.html',
    styleUrls: ['./tire-add.component.scss']
})
export class TireAddComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(TiresFormComponent) formRef: TiresFormComponent;

    private _onDestroy$ = new Subject();

    constructor(
        private _tireService: TiresService,
        private _dialogRef: MatDialogRef<TireAddComponent>,
        private _toastr: ToastrService,
        private _vehicleService: VehicleService
    ) {}

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.formRef.form.patchValue({
            vehicleId: this._vehicleService.snapshot.info.id,
            status: 'STOCK'
        });
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
        this._toastr.success('Pneumatika byla úspěšně uložena', 'Hotovo');
        this._dialogRef.close('DONE');
        this._tireService.state.update(f => f.addTire, t);
    };

    get formValid() {
        return this.formRef;
    }

    private _onError = () => {
        this._toastr.success('Pneumatika nebyla uložena', 'Chyba');
    };
}
