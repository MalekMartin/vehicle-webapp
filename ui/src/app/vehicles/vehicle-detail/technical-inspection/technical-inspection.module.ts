import { NgModule } from '@angular/core';
import { TechnicalInspectionComponent } from './technical-inspection.component';
import { TechnicalFormComponent } from './technical-form/technical-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { StationFormComponent } from './station-form/station-form.component';
import { StationCardComponent } from './station-card/station-card.component';
import { InspectionCardComponent } from './inspection-card/inspection-card.component';
import { ProgressbarModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { technicalRoutes } from './technical-inspection.routes';
import { TechnicalInspectionService } from './technical-inspection.service';

@NgModule({
    imports: [
        SharedModule,
        ProgressbarModule,
        RouterModule.forChild(technicalRoutes),
    ],
    exports: [TechnicalInspectionComponent],
    declarations: [
        TechnicalInspectionComponent,
        TechnicalFormComponent,
        StationFormComponent,
        StationCardComponent,
        InspectionCardComponent
    ],
    providers: [
        TechnicalInspectionService
    ],
})
export class TechnicalInspectionModule { }
