import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: "va-confirm",
    templateUrl: "confirm.component.html",
    styleUrls: ["./confirm.component.scss"],
})
export class ConfirmComponent {
    constructor(
        private _dialogRef: MatDialogRef<ConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
    ) {}

    confirm() {
        this._dialogRef.close("YES");
    }
}

export interface ConfirmDialogData {
    title: string;
    message: string;
    yes: string;
    no: string;
}
