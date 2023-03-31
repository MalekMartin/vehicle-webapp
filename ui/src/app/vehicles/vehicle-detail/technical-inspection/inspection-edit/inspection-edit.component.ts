import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { InspectionFormComponent } from '../inspection-form/inspection-form.component';
import { takeUntil } from 'rxjs/operators';
import { TechnicalInspectionService } from '../technical-inspection.service';
import { ToastrService } from 'ngx-toastr';
import { Inspection } from '../inspection.interface';

@Component({
    selector: 'va-inspection-edit',
    templateUrl: 'inspection-edit.component.html',
    styleUrls: ['./inspection-edit.component.scss']
})
export class InspectionEditComponent implements OnInit, OnDestroy {
    @ViewChild(InspectionFormComponent) formCmp: InspectionFormComponent;

    private _onDestroy$ = new Subject();

    constructor(
        private _dialogRef: MatDialogRef<InspectionEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Inspection,
        private _inspectionService: TechnicalInspectionService,
        private _toastr: ToastrService
    ) {}

    ngOnInit() {
        this.formCmp.form.setValue({
            id: this.data.id,
            vehicleId: this.data.vehicleId,
            date: this.data.date,
            expirationDate: this.data.expirationDate,
            repeated: this.data.repeated,
            note: this.data.note,
            stationId: this.data.stationId,
            price: this.data.price,
            odo: this.data.odo,
            odo2: this.data.odo2
        });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    save() {
        this._inspectionService
            .saveInspection(this.formCmp.form.value)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._success, this._error);
    }

    private _success = (i: Inspection) => {
        this._dialogRef.close(i);
        this._toastr.success('Technická kontrola byla úspěšně upravena.', 'Hotovo');
    };

    private _error = () => {
        this._toastr.error('Technická kontrola nebyla upravena.', 'Chyba');
    };
}
