import { NgModule } from '@angular/core';

import { VehicleSettingsComponent } from './vehicle-settings.component';
import { FileUploadModule } from 'ng2-file-upload';
import { SharedModule } from '../../../shared/shared.module';
import { SettingsService } from './settings.service';
import { CommonModule } from '@angular/common';
import { SettingsFormComponent } from './settings-form/settings-form.component';

const COMPONENTS = [
    VehicleSettingsComponent,
    SettingsFormComponent
];

@NgModule({
    imports: [SharedModule],
    exports: [...COMPONENTS],
    declarations: [...COMPONENTS],
    providers: [SettingsService],
})
export class VehicleSettingsModule { }
