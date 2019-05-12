import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';
import { SharedModule } from '../../../../shared/shared.module';
import { RepairFormComponent } from './repair-form.component';
import { DatepickerModule } from '../../../../shared/components/datepicker/datepicker.module';
import { MatCheckboxModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import {
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule
    ],
    exports: [RepairFormComponent],
    declarations: [RepairFormComponent],
})
export class RepairFormModule {}
