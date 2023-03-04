import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { CardModule } from '../../../shared/components/card/card.module';
import { ConfirmModule } from '../../../shared/components/confirm/confirm.module';
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
    providers: [TechnicalInspectionService]
})
export class TechnicalInspectionModule {}
