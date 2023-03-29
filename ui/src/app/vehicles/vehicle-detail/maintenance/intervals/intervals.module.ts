import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MaintenanceService } from '../../../../shared/api/maintenance/maintenance.service';
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
    providers: [MaintenanceService]
})
export class IntervalsModule {}
