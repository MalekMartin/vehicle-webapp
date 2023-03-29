import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleInfo } from '../../../vehicle-stream/vehicle';
import { Settings, SettingsService } from '../settings.service';

@Component({
    selector: 'va-settings-form',
    templateUrl: 'settings-form.component.html',
    styleUrls: ['./settings-form.component.scss']
})
export class SettingsFormComponent implements OnInit, OnDestroy {
    @Output() saved = new EventEmitter();
    @Output() canceled = new EventEmitter();

    form = this._fb.group({
        vehicleId: ['', Validators.required],
        units: ['', Validators.required],
        subUnits: [''],
        tankCapacity: ['']
    });

    private _onDestroy$ = new Subject();

    constructor(
        private _fb: UntypedFormBuilder,
        private _settingsService: SettingsService,
        private _toastr: ToastrService,
        private _dialogRef: MatDialogRef<SettingsFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: VehicleInfo
    ) {}

    ngOnInit() {
        this.form.setValue({
            vehicleId: this.data.info.id,
            units: this.data.info.units,
            subUnits: this.data.info.subUnits,
            tankCapacity: this.data.info.tankCapacity
        });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    save() {
        this._settingsService
            .saveSettings(this.form.value)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onSettingsSuccess, this._onSettingsError);
    }

    private _onSettingsSuccess = (res: Settings) => {
        this._toastr.success('Nastavení bylo uloženo', 'Hotovo');
        this._dialogRef.close(res);
    };

    private _onSettingsError = () => {
        this._toastr.error('Nastavení nebylo uloženo', 'Chyba!');
    };
}
