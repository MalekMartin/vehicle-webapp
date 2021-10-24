import { NgModule } from '@angular/core';
import { ManualsComponent } from './manuals.component';
import { SharedModule } from '../../../shared/shared.module';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { ManualsListComponent } from './manuals-list/manuals-list.component';
import { ManualService } from './manual.service';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from 'ng2-file-upload';

const COMPONENTS = [
    ManualsComponent,
    ManualsListComponent
];

const MODULES = [
    SharedModule,
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
