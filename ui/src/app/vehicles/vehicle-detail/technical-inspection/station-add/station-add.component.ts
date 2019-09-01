import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { TechnicalInspectionService } from '../technical-inspection.service';
import { StationFormComponent } from '../station-form/station-form.component';
import { takeUntil } from 'rxjs/operators';
import { ToastsManager } from 'ng6-toastr';

@Component({
    selector: 'va-station-add',
    templateUrl: 'station-add.component.html',
    styleUrls: ['./station-add.component.scss']
})
export class StationAddComponent implements OnInit, OnDestroy {
    @ViewChild(StationFormComponent, { static: false }) stationFormRef: StationFormComponent;

    private _onDestroy$ = new Subject();

    constructor(
        private _dialogRef: MatDialogRef<StationAddComponent>,
        private _tkService: TechnicalInspectionService,
        private _toastr: ToastsManager
    ) {}

    ngOnInit() {}

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
        this._toastr.success(`Stanice ${res.name} byla úspěšně uložena`, 'Hotovo');
    };

    private _error = () => {
        this._toastr.error('Stanice TK nebyla uložena', 'Chyba!');
    };
}
