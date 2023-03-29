import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatLegacyDialogRef as MatDialogRef } from "@angular/material/legacy-dialog";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { GarageFormComponent } from "../garage-form/garage-form.component";
import { GarageService } from "../garage/garage.service";

@Component({
    selector: "va-garage-add",
    styleUrls: ["./garage-add.component.scss"],
    template: `
        <h3 mat-dialog-title>Přidate servis</h3>
        <mat-dialog-content>
            <va-garage-form></va-garage-form>
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
export class GarageAddComponent implements OnInit, OnDestroy {
    @ViewChild(GarageFormComponent) form: GarageFormComponent;

    private onDestroy$ = new Subject();

    constructor(
        private garageService: GarageService,
        private dialogRef: MatDialogRef<GarageAddComponent>,
        private toastr: ToastrService
    ) {}

    ngOnInit() {}
    ngOnDestroy(): void {
        this.onDestroy$.next();
    }

    save() {
        const value = this.form.form.value;
        this.garageService
            .addGarage(value)
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(
                () => {
                    this.dialogRef.close(true);
                },
                () => {
                    this.toastr.error(
                        "Nepodařilo se vytvořit nový záznam",
                        "Chyba!"
                    );
                }
            );
    }
}
