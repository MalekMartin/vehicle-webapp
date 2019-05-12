import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { CardModule } from '../../../shared/components/card/card.module';
import { ConfirmModule } from '../../../shared/components/confirm/confirm.module';
import { DatepickerModule } from '../../../shared/components/datepicker/datepicker.module';
import { PaginatorModule } from '../../../shared/components/paginator/paginator.module';
import { ProgressModule } from '../../../shared/components/progress/progress.module';
import { SectionHeadingModule } from '../../../shared/components/section-heading/section-heading.module';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { InspectionAddComponent } from './inspection-add/inspection-add.component';
import { InspectionCardComponent } from './inspection-card/inspection-card.component';
import { InspectionEditComponent } from './inspection-edit/inspection-edit.component';
import { InspectionFormComponent } from './inspection-form/inspection-form.component';
import { StationAddComponent } from './station-add/station-add.component';
import { StationCardComponent } from './station-card/station-card.component';
import { StationEditComponent } from './station-edit/station-edit.component';
import { StationFormComponent } from './station-form/station-form.component';
import { TechnicalInspectionComponent } from './technical-inspection.component';
import { technicalRoutes } from './technical-inspection.routes';
import { TechnicalInspectionService } from './technical-inspection.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SectionHeadingModule,
        PaginatorModule,
        CardModule,
        PipesModule,
        ProgressModule,
        RouterModule.forChild(technicalRoutes),
        DatepickerModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatCheckboxModule,
        ConfirmModule,
        SpinnerModule
    ],
    exports: [TechnicalInspectionComponent],
    declarations: [
        TechnicalInspectionComponent,
        InspectionFormComponent,
        StationFormComponent,
        StationCardComponent,
        InspectionCardComponent,
        InspectionAddComponent,
        InspectionEditComponent,
        StationAddComponent,
        StationEditComponent
    ],
    providers: [TechnicalInspectionService],
    entryComponents: [
        InspectionAddComponent,
        InspectionEditComponent,
        StationAddComponent,
        StationEditComponent
    ]
})
export class TechnicalInspectionModule {}
