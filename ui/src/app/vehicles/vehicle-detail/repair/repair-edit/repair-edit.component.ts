import { Component, OnInit, ViewChild, OnDestroy, Inject } from "@angular/core";
import { RepairFormComponent } from "../repair-form/repair-form.component";
import { RepairService } from "../repair.service";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from "@angular/material/legacy-dialog";
import { Repair } from "../_core/repair.interface";

@Component({
    selector: "va-repair-edit",
    templateUrl: "repair-edit.component.html",
})
export class RepairEditComponent implements OnInit, OnDestroy {
    @ViewChild(RepairFormComponent) formRef: RepairFormComponent;

    private _onDestroy$ = new Subject();

    constructor(
        private _repairService: RepairService,
        private _toastr: ToastrService,
        private _dialogRef: MatDialogRef<RepairEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Repair
    ) {}

    ngOnInit() {}

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    save() {
        const repair = this.formRef.form.value;
        repair.garageId = !!repair.garageId ? repair.garageId : null;
        this._repairService
            .update(repair)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onSaveSuccess, this._onSaveError);
    }

    close() {
        this._dialogRef.close();
    }

    private _onSaveSuccess = (r) => {
        this._toastr.success("Oprava byla úspěšně uložena", "Hotovo!");
        this._dialogRef.close(r);
    };

    private _onSaveError = () => {
        this._toastr.error("Servisní práci se nepodařilo uložit", "Chyba!");
    };
}
