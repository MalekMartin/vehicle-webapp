import { NgModule } from '@angular/core';
import { ConfirmComponent } from './confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [MatDialogModule, MatButtonModule],
    exports: [ConfirmComponent],
    declarations: [ConfirmComponent],
    providers: [],
    entryComponents: [ConfirmComponent]
})
export class ConfirmModule {}
