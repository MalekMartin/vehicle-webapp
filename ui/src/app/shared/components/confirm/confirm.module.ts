import { NgModule } from "@angular/core";
import { ConfirmComponent } from "./confirm.component";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { ConfirmService } from "./confirm.service";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [CommonModule, MatDialogModule, MatButtonModule],
    exports: [ConfirmComponent],
    declarations: [ConfirmComponent],
    providers: [ConfirmService]
})
export class ConfirmModule {}
