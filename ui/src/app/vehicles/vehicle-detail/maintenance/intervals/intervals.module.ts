import { NgModule } from '@angular/core';

import { IntervalsComponent } from './intervals.component';
import { IntervalFormComponent } from './interval-form/interval-form.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntervalCardComponent } from './intervals-card/interval-card.component';
import { TooltipModule } from 'ngx-bootstrap';

const MODULES = [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule
];

const COMPONENTS = [
    IntervalsComponent,
    IntervalFormComponent,
    IntervalCardComponent
];

@NgModule({
    imports: [
        ...MODULES
    ],
    exports: [...COMPONENTS],
    declarations: [...COMPONENTS],
    providers: [],
})
export class IntervalsModule { }
