import { NgModule } from '@angular/core';
import { ConfirmComponent } from './confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmService } from './confirm.service';

@NgModule({
    imports: [MatDialogModule, MatButtonModule],
    exports: [ConfirmComponent],
    declarations: [ConfirmComponent],
    providers: [ConfirmService],
    entryComponents: [ConfirmComponent]
})
export class ConfirmModule {}
