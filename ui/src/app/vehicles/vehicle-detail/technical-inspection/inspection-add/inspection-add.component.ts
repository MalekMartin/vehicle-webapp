import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { VehicleService } from '../../../../core/stores/vehicle/vehicle.service';
import { InspectionFormComponent } from '../inspection-form/inspection-form.component';
import { takeUntil } from 'rxjs/operators';
import { TechnicalInspectionService } from '../technical-inspection.service';
import { ToastsManager } from 'ng6-toastr';
import { Inspection } from '../inspection.interface';

@Component({
    selector: 'va-inspection-add',
    templateUrl: 'inspection-add.component.html',
    styleUrls: ['./inspection-add.component.scss']
})
export class InspectionAddComponent implements OnInit, OnDestroy {
    @ViewChild(InspectionFormComponent, {static: false}) formCmp: InspectionFormComponent;

    private _onDestroy$ = new Subject();

    constructor(
        private _dialogRef: MatDialogRef<InspectionAddComponent>,
        private _inspectionService: TechnicalInspectionService,
        private _vehicleService: VehicleService,
        private _toastr: ToastsManager
    ) {}

    ngOnInit() {}

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    save() {
        this._inspectionService
            .saveInspection({
                ...this.formCmp.form.value,
                vehicleId: this._vehicleService.state.snapshot.vehicle.info.id
            })
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._success, this._error);
    }

    private _success = (i: Inspection) => {
        this._dialogRef.close(i);
        this._toastr.success('Technická kontrola byla úspěšně uložena', 'Hotovo');
    };

    private _error = () => {
        this._toastr.error('Technická kontrola nebyla uložena', 'Chyba');
    };
}
