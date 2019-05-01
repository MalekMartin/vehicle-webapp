import { NgModule } from '@angular/core';

import { TireStatusFormComponent } from './tire-status-form.component';
import { ModalModule } from 'ngx-bootstrap';
import { SharedModule } from '../../../../shared/shared.module';
import { DatepickerModule } from '../../../../shared/components/datepicker/datepicker.module';
import { MatDatepickerModule, MatNativeDateModule, MatTooltipModule } from '@angular/material';
import {
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
} from '@angular/material';

@NgModule({
    imports: [
        ModalModule,
        SharedModule,
        DatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTooltipModule
    ],
    exports: [TireStatusFormComponent],
    declarations: [TireStatusFormComponent],
    entryComponents: [TireStatusFormComponent]
})
export class TireStatusFormModule {}
