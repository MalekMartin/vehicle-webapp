import { NgModule } from '@angular/core';
import { TirePropertiesComponent } from './tire-properties.component';
import { TirePropertyFormComponent } from './tire-property-form/tire-property-form.component';
import { TirePropertyAddComponent } from './tire-property-add/tire-property-add.component';
import { TirePropertyEditComponent } from './tire-property-edit/tire-property-edit.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmModule } from '../../../../shared/components/confirm/confirm.module';
import {
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
} from '@angular/material';
import { SpinnerModule } from '../../../../shared/components/spinner/spinner.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        ConfirmModule,
        SpinnerModule
    ],
    exports: [TirePropertiesComponent, TirePropertyAddComponent, TirePropertyEditComponent],
    declarations: [
        TirePropertiesComponent,
        TirePropertyAddComponent,
        TirePropertyEditComponent,
        TirePropertyFormComponent
    ],
    providers: [],
    entryComponents: [TirePropertyAddComponent, TirePropertyEditComponent]
})
export class TirePropertiesModule {}
