import { NgModule } from '@angular/core';

import { VehicleSettingsComponent } from './vehicle-settings.component';
import { FileUploadModule } from 'ng2-file-upload';
import { SettingsService } from './settings.service';
import { CommonModule } from '@angular/common';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import { SectionHeadingModule } from '../../../shared/components/section-heading/section-heading.module';
import { ModalModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormItemModule } from '../../../shared/forms/form-item/form-item.module';
import {
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule
} from '@angular/material';

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
