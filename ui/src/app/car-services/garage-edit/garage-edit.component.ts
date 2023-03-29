import { Component, Inject, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from "@angular/material/legacy-dialog";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Garage, GarageFormComponent } from "../garage-form/garage-form.component";
import { GarageService } from "../garage/garage.service";

@Component({
    selector: "va-garage-edit",
    styleUrls: ["./garage-edit.component.scss"],
    template: `
        <h3 mat-dialog-title>Přidate servis</h3>
        <mat-dialog-content>
            <va-garage-form [garage]="data"></va-garage-form>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-flat-button type="button" mat-dialog-close>
                Zavřít
            </button>
            <button
                mat-flat-button
                type="button"
                color="primary"
                (click)="save()"
            >
                Uložit
            </button>
        </mat-dialog-actions>
    `,
})
export class GarageEditComponent implements OnInit, OnDestroy {
    @ViewChild(GarageFormComponent) form: GarageFormComponent;

    private onDestroy$ = new Subject();

    constructor(
        private garageService: GarageService,
        private dialogRef: MatDialogRef<GarageEditComponent>,
        private toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: Garage,
    ) {}

    ngOnInit() {}
    ngOnDestroy(): void {
        this.onDestroy$.next();
    }

    save() {
        const value = this.form.form.value;
        this.garageService
            .updateGarage(value)
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(
                () => {
                    this.dialogRef.close(true);
                },
                () => {
                    this.toastr.error(
                        "Nepodařilo se upravit servis " + this.data.name,
                        "Chyba!"
                    );
                }
            );
    }
}
