import { NgModule } from '@angular/core';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ModalModule } from 'ngx-bootstrap';
import { ConfirmDialogService } from './confirm-dialog.service';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [ModalModule, CommonModule],
    exports: [ConfirmDialogComponent],
    declarations: [ConfirmDialogComponent],
    providers: [ConfirmDialogService],
    entryComponents: [ConfirmDialogComponent]
})
export class ConfirmDialogModule {}
