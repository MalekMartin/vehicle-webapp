import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfirmModule } from '../../../../shared/components/confirm/confirm.module';
import { SpinnerModule } from '../../../../shared/components/spinner/spinner.module';
import { TirePropertiesComponent } from './tire-properties.component';
import { TirePropertyAddComponent } from './tire-property-add/tire-property-add.component';
import { TirePropertyEditComponent } from './tire-property-edit/tire-property-edit.component';
import { TirePropertyFormComponent } from './tire-property-form/tire-property-form.component';

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
    providers: []
})
export class TirePropertiesModule {}
