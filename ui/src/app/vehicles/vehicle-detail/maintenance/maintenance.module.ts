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
    MatSelectModule,
    MatTooltipModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap';
import { GarageModule } from '../../../car-services/garage/garage.module';
import { CardModule } from '../../../shared/components/card/card.module';
import { DatepickerModule } from '../../../shared/components/datepicker/datepicker.module';
import { FilterModule } from '../../../shared/components/filter/filter.module';
import { PaginatorModule } from '../../../shared/components/paginator/paginator.module';
import { ProgressModule } from '../../../shared/components/progress/progress.module';
import { SectionHeadingModule } from '../../../shared/components/section-heading/section-heading.module';
import { DirectivesModule } from '../../../shared/directives/directives.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { RepairService } from '../repair/repair.service';
import { IntervalsModule } from './intervals/intervals.module';
import { MaintenanceWrapperComponent } from './maintenance-wrapper.component';
import { MaintenancePipe } from './maintenance.pipe';
import { maintenanceRoutes } from './maintenance.routes';
import { MaintenanceAddComponent } from './maintenances/maintenance-add/maintenance-add.component';
import { MaintenanceCardComponent } from './maintenances/maintenance-card/maintenance-card.component';
import { MaintenanceDoneComponent } from './maintenances/maintenance-done/maintenance-done.component';
import { MaintenanceEditComponent } from './maintenances/maintenance-edit/maintenance-edit.component';
import { MaintenaceFormComponent } from './maintenances/maintenance-form/maintenance-form.component';
import { MaintenanceComponent } from './maintenances/maintenance.component';

const MODULES = [
    CommonModule,
    ReactiveFormsModule,
    PipesModule,
    CardModule,
    PaginatorModule,
    IntervalsModule,
    TooltipModule,
    ProgressModule,
    SectionHeadingModule,
    DirectivesModule,
    GarageModule,
    RouterModule.forChild(maintenanceRoutes),
    DatepickerModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    FilterModule
];

const COMPONENTS = [
    MaintenanceComponent,
    MaintenaceFormComponent,
    MaintenanceCardComponent,
    MaintenanceDoneComponent,
    MaintenanceWrapperComponent,
    MaintenanceAddComponent,
    MaintenanceEditComponent
];

const PIPES = [MaintenancePipe];

@NgModule({
    imports: [...MODULES],
    exports: [MaintenanceWrapperComponent],
    declarations: [...COMPONENTS, ...PIPES],
    providers: [RepairService],
    entryComponents: [MaintenanceDoneComponent, MaintenanceAddComponent, MaintenanceEditComponent]
})
export class MaintenanceModule {}
