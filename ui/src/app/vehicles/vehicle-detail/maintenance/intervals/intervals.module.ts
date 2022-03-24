import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TooltipModule } from 'ngx-bootstrap';
import { CardModule } from '../../../../shared/components/card/card.module';
import { InitialsModule } from '../../../../shared/components/initials/initials.module';
import { MileageModule } from '../../../../shared/components/mileage/mileage.module';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { IntervalAddComponent } from './interval-add/interval-add.component';
import { IntervalEditComponent } from './interval-edit/interval-edit.component';
import { IntervalFormComponent } from './interval-form/interval-form.component';
import { IntervalCardComponent } from './intervals-card/interval-card.component';
import { IntervalsComponent } from './intervals.component';

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

const COMPONENTS = [IntervalsComponent, IntervalFormComponent, IntervalCardComponent];

@NgModule({
    imports: [...MODULES],
    exports: [...COMPONENTS],
    declarations: [...COMPONENTS, IntervalAddComponent, IntervalEditComponent],
    entryComponents: [IntervalAddComponent, IntervalEditComponent]
})
export class IntervalsModule {}
