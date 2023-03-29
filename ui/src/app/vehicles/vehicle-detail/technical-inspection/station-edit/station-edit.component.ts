import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { TechnicalInspectionService } from '../technical-inspection.service';
import { StationFormComponent } from '../station-form/station-form.component';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Station } from '../station.interface';

@Component({
    selector: 'va-station-edit',
    templateUrl: 'station-edit.component.html',
    styleUrls: ['./station-edit.component.scss']
})
export class StationEditComponent implements OnInit, OnDestroy {
    @ViewChild(StationFormComponent) stationFormRef: StationFormComponent;

    private _onDestroy$ = new Subject();

    constructor(
        private _dialogRef: MatDialogRef<StationEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Station,
        private _tkService: TechnicalInspectionService,
        private _toastr: ToastrService
    ) {}

    ngOnInit() {
        this.stationFormRef.form.setValue(this.data);
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    save() {
        this._tkService
            .saveStation(this.stationFormRef.form.value)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._success, this._error);
    }

    private _success = res => {
        this._dialogRef.close(res);
        this._toastr.success(`Stanice ${res.name} byla úspěšně upravena`, 'Hotovo');
    };

    private _error = () => {
        this._toastr.error('Stanice TK nebyla upravena', 'Chyba!');
    };
}
