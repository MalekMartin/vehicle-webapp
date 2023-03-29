import { Component, Inject, OnDestroy } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { VehicleStreamService } from '../../../core/stores/vehicle/vehicle-stream.service';

@Component({
    selector: 'va-vehicle-delete-confirm',
    template: `
        <h1 mat-dialog-title>Samazat vozidlo</h1>
        <div mat-dialog-content>
            <p>Opravdu chceš smazat {{ data.name }}?</p>
        </div>
        <div mat-dialog-actions>
            <button mat-button mat-dialog-close cdkFocusInitial>Ne</button>
            <button mat-button color="warn" (click)="delete(data.id)">Smazat</button>
        </div>
    `
})
export class VehicleDeleteConfirmComponent implements OnDestroy {
    private _onDestroy$ = new Subject();

    constructor(
        public dialogRef: MatDialogRef<VehicleDeleteConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { name: string; id: string },
        private _vehicleStreamService: VehicleStreamService,
        private _toastr: ToastrService
    ) {}

    ngOnDestroy() {}

    delete(id: string) {
        this._vehicleStreamService
            .deleteVehicle(id)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onDeleteSuccess, this._onDeleteError);
    }

    private _onDeleteSuccess = () => {
        this._toastr.success('Vozidlo bylo smazáno');
        this._vehicleStreamService.updateVehicleStream(this._vehicleStreamService.vehicles.filter(v => v.id === this.data.id));
        this.dialogRef.close(this.data.id);
    };

    private _onDeleteError = () => {
        this._toastr.error('Nepodařilo se smazat vybrané vozidlo');
    };
}
