import { NgModule } from '@angular/core';
import { ManualsComponent } from './manuals.component';
import { SharedModule } from '../../../shared/shared.module';

const COMPONENTS = [
    ManualsComponent
];

const MODULES = [
    SharedModule,
];

@NgModule({
    imports: [
        ...MODULES
    ],
    exports: [ManualsComponent],
    declarations: [
        ...COMPONENTS
    ],
    providers: [],
})
export class ManualsModule { }
