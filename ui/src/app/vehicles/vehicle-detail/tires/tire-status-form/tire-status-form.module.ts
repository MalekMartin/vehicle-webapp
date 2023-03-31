import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
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
    declarations: [TireStatusFormComponent]
})
export class TireStatusFormModule {}
