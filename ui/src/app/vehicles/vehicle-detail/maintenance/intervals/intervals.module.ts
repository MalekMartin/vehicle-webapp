import { NgModule } from '@angular/core';

import { IntervalsComponent } from './intervals.component';
import { IntervalFormComponent } from './interval-form/interval-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntervalCardComponent } from './intervals-card/interval-card.component';
import { TooltipModule } from 'ngx-bootstrap';
import {
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule
} from '@angular/material';
import { IntervalAddComponent } from './interval-add/interval-add.component';
import { CommonModule } from '@angular/common';
import { InitialsModule } from '../../../../shared/components/initials/initials.module';
import { MileageModule } from '../../../../shared/components/mileage/mileage.module';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { CardModule } from '../../../../shared/components/card/card.module';

const MODULES = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    InitialsModule,
    MileageModule,
    PipesModule,
    CardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
];

const COMPONENTS = [
    IntervalsComponent,
    IntervalFormComponent,
    IntervalCardComponent,
    IntervalAddComponent
];

@NgModule({
    imports: [...MODULES],
    exports: [...COMPONENTS],
    declarations: [...COMPONENTS],
    entryComponents: [IntervalAddComponent]
})
export class IntervalsModule {}
