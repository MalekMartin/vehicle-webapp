import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GarageService } from '../../../../../car-services/garage/garage.service';
import { VehicleService } from '../../../../../core/stores/vehicle/vehicle.service';
import { Maintenance } from '../../../../../shared/api/maintenance/maintenance.interface';
import { MaintenanceService } from '../../../../../shared/api/maintenance/maintenance.service';
import { RepairService } from '../../../repair/repair.service';

@Component({
    selector: 'va-maintenance-done',
    templateUrl: './maintenance-done.component.html',
    styleUrls: ['./maintenance-done.component.scss']
})
export class MaintenanceDoneComponent implements OnInit, OnDestroy {
    units: string;
    units2: string;

    form = this._form.group({
        ids: [[], Validators.required],
        vehicleId: [''],
        odo: [0, Validators.required],
        odo2: [0],
        date: [new Date(), Validators.required],
        price: [0],
        notes: [''],
        repeat: [true],
        garageId: ['', Validators.required],
        repairTitle: ['', Validators.required]
    });

    private _id: string;
    private _vehicleId: string;

    private _onDestroy$ = new Subject();

    constructor(
        private _form: UntypedFormBuilder,
        private _service: MaintenanceService,
        private _toastr: ToastrService,
        private _garages: GarageService,
        private _repairs: RepairService,
        private _vehicleService: VehicleService,
        private _dialogRef: MatDialogRef<MaintenanceDoneComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Maintenance[]
    ) {}

    ngOnInit() {
        this.units = this._vehicleService.snapshot.info.units;
        this.units2 = this._vehicleService.snapshot.info.subUnits;

        const intervalNames = this.data.map(m => m.interval.name);

        this.form.get('ids').setValue(this.data.map(i => i.id));
        this.form.get('vehicleId').setValue(this._vehicleService.snapshot.info.id);
        this.form.get('repairTitle').setValue(intervalNames.join(', '));

        this._garages.refresh();
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    get id(): string {
        return this._id;
    }

    get garages() {
        return this._garages.garages;
    }

    get vehicleId(): string {
        return this._vehicleId;
    }

    resetForm() {
        this.form.reset({
            repeat: true
        });
    }

    finish() {
        this._service
            .finishMaintenance(this.form.value)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onSaveSuccess, this._onSaveError);
    }

    private _onSaveSuccess = repairId => {
        this._toastr.success('Dokončeno!');
        this._dialogRef.close(repairId);
    };

    private _onSaveError = () => {
        this._toastr.error('Chyba!');
    };
}
