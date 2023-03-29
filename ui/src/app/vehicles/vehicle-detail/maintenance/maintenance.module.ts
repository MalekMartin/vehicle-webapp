import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { RouterModule } from '@angular/router';
import { GarageModule } from '../../../car-services/garage/garage.module';
import { CardModule } from '../../../shared/components/card/card.module';
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
import { MaintenanceDoneComponent } from './maintenances/maintenance-done/maintenance-done.component';
import { MaintenanceEditComponent } from './maintenances/maintenance-edit/maintenance-edit.component';
import { MaintenaceFormComponent } from './maintenances/maintenance-form/maintenance-form.component';
import { MaintenanceComponent } from './maintenances/maintenance.component';
import { MaintenanceCardModule } from './maintenances/maintenance-card/maintenance-card.module';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { ConfirmModule } from '../../../shared/components/confirm/confirm.module';
import { MaintenanceService } from '../../../shared/api/maintenance/maintenance.service';

const MODULES = [
    CommonModule,
    ReactiveFormsModule,
    PipesModule,
    CardModule,
    PaginatorModule,
    IntervalsModule,
    ProgressModule,
    SectionHeadingModule,
    DirectivesModule,
    GarageModule,
    RouterModule.forChild(maintenanceRoutes),
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    FilterModule,
    MaintenanceCardModule,
    ConfirmModule,
];

const COMPONENTS = [
    MaintenanceComponent,
    MaintenaceFormComponent,
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
    providers: [RepairService, MaintenanceService]
})
export class MaintenanceModule {}
