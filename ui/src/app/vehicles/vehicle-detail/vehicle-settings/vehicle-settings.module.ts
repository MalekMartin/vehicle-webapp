import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileUploadModule } from 'ng2-file-upload';
import { ModalModule } from 'ngx-bootstrap';
import { SectionHeadingModule } from '../../../shared/components/section-heading/section-heading.module';
import { FormItemModule } from '../../../shared/forms/form-item/form-item.module';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import { SettingsService } from './settings.service';
import { VehicleSettingsComponent } from './vehicle-settings.component';

const COMPONENTS = [VehicleSettingsComponent, SettingsFormComponent];

const MAT_MODULES = [MatFormFieldModule, MatDialogModule, MatInputModule, MatButtonModule];

@NgModule({
    imports: [
        CommonModule,
        SectionHeadingModule,
        ModalModule,
        ReactiveFormsModule,
        FormItemModule,
        FileUploadModule,
        ...MAT_MODULES
    ],
    exports: [...COMPONENTS],
    declarations: [...COMPONENTS],
    providers: [SettingsService],
    entryComponents: [SettingsFormComponent]
})
export class VehicleSettingsModule {}
