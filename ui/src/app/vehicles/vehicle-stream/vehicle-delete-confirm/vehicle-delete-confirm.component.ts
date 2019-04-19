import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { VehicleService } from '../../../core/stores/vehicle/vehicle.service';
import { takeUntil } from 'rxjs/operators';
import { ToastsManager } from 'ng6-toastr';

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
        private _vehicleService: VehicleService,
        private _toastr: ToastsManager
    ) {}

    ngOnDestroy() {}

    delete(id: string) {
        this._vehicleService
            .deleteVehicle(id)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onDeleteSuccess, this._onDeleteError);
    }

    private _onDeleteSuccess = () => {
        this._toastr.success('Vozidlo bylo smazáno');
        this.dialogRef.close(this.data.id);
    };

    private _onDeleteError = () => {
        this._toastr.error('Nepodařilo se smazat vybrané vozidlo');
    };
}
