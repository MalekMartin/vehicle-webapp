import { NgModule } from "@angular/core";
import { ConfirmComponent } from "./confirm.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { ConfirmService } from "./confirm.service";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [CommonModule, MatDialogModule, MatButtonModule],
    exports: [ConfirmComponent],
    declarations: [ConfirmComponent],
    providers: [ConfirmService]
})
export class ConfirmModule {}
