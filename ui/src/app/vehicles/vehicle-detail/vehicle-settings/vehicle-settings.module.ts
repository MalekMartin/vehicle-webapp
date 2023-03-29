import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { FileUploadModule } from 'ng2-file-upload';
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
        ReactiveFormsModule,
        FormItemModule,
        FileUploadModule,
        ...MAT_MODULES
    ],
    exports: [...COMPONENTS],
    declarations: [...COMPONENTS],
    providers: [SettingsService]
})
export class VehicleSettingsModule {}
