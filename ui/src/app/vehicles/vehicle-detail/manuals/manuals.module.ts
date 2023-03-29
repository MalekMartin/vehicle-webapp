import { NgModule } from '@angular/core';
import { ManualsComponent } from './manuals.component';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { ManualsListComponent } from './manuals-list/manuals-list.component';
import { ManualService } from './manual.service';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { FileUploadModule } from 'ng2-file-upload';
import { CommonModule } from '@angular/common';

const COMPONENTS = [
    ManualsComponent,
    ManualsListComponent
];

const MODULES = [
    CommonModule,
    MatButtonModule,
    SpinnerModule,
    FileUploadModule,
];

@NgModule({
    imports: [
        ...MODULES
    ],
    exports: [ManualsComponent],
    declarations: [
        ...COMPONENTS
    ],
    providers: [ManualService],
})
export class ManualsModule { }
