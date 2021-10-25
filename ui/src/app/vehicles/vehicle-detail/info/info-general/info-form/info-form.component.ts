import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Info } from "../../../../vehicle-stream/vehicle";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { VehicleService } from "../../../../../core/stores/vehicle/vehicle.service";
import { VehicleInfoFormModel } from "../../../../../core/stores/vehicle/vehicle.interface";

@Component({
    selector: "va-info-form",
    templateUrl: "./info-form.component.html",
    styleUrls: ["./info-form.component.scss"],
})
export class InfoFormComponent implements OnInit, OnDestroy {
    form = this._form.group({
        id: ["", Validators.required],
        brand: ["", [Validators.required, Validators.maxLength(128)]],
        model: ["", [Validators.required, Validators.maxLength(128)]],
        manufactureYear: [
            "",
            [Validators.required, Validators.pattern("[0-9]{4}")],
        ],
        spz: ["", [Validators.maxLength(16)]],
        previousOwners: ["", [Validators.pattern("[0-9]*")]],
        type: ["", [Validators.required]],
        notes: [""],
    });

    private _onDestroy$ = new Subject();

    constructor(
        private _form: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: Info,
        public dialogRef: MatDialogRef<InfoFormComponent>,
        private _toastr: ToastrService,
        private _vehicleService: VehicleService
    ) {}

    ngOnInit() {
        this.form.setValue({
            id: this.data.id,
            brand: this.data.brand,
            model: this.data.model,
            manufactureYear: this.data.manufactureYear,
            spz: this.data.spz,
            previousOwners: this.data.previousOwners,
            type: this.data.type,
            notes: this.data.notes,
        });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    save() {
        this._vehicleService
            .updateVehicleInfo(this.form.value)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onUpdateSuccess, this._onUpdateError);
    }

    cancel() {
        this.dialogRef.close();
    }

    private _onUpdateSuccess = (res: VehicleInfoFormModel) => {
        this._toastr.success("Informace o vozidle byly úspěšně aktualizovány.");
        this._vehicleService.updateVehicleSubject({
            ...this._vehicleService.snapshot,
            info: {
                ...this._vehicleService.snapshot.info,
                ...res,
            },
        });
        this.dialogRef.close();
    };

    private _onUpdateError = () => {
        this._toastr.error("Info nebylo aktualizováno.");
    };
}
