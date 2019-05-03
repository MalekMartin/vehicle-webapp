import { NgModule } from '@angular/core';
import { TechnicalInspectionComponent } from './technical-inspection.component';
import { InspectionFormComponent } from './inspection-form/inspection-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { StationFormComponent } from './station-form/station-form.component';
import { StationCardComponent } from './station-card/station-card.component';
import { InspectionCardComponent } from './inspection-card/inspection-card.component';
import { ProgressbarModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { technicalRoutes } from './technical-inspection.routes';
import { TechnicalInspectionService } from './technical-inspection.service';
import { DatepickerModule } from '../../../shared/components/datepicker/datepicker.module';
import { InspectionAddComponent } from './inspection-add/inspection-add.component';
import { InspectionEditComponent } from './inspection-edit/inspection-edit.component';
import {
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule
} from '@angular/material';
import { ConfirmModule } from '../../../shared/components/confirm/confirm.module';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';

@NgModule({
    imports: [
        SharedModule,
        ProgressbarModule,
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
        InspectionEditComponent
    ],
    providers: [TechnicalInspectionService],
    entryComponents: [InspectionAddComponent, InspectionEditComponent]
})
export class TechnicalInspectionModule {}
