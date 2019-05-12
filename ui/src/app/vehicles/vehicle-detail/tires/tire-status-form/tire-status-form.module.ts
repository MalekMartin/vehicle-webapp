import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatTooltipModule
} from '@angular/material';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { TireStatusFormComponent } from './tire-status-form.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PipesModule,
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
