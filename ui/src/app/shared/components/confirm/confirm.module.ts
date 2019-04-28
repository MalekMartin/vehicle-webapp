import { NgModule } from '@angular/core';
import { ConfirmComponent } from './confirm.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
    imports: [MatDialogModule, MatButtonModule],
    exports: [ConfirmComponent],
    declarations: [ConfirmComponent],
    providers: [],
    entryComponents: [ConfirmComponent]
})
export class ConfirmModule {}
