import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProgressbarModule, TooltipModule } from 'ngx-bootstrap';
import { GarageModule } from '../../../car-services/garage/garage.module';
import { DatepickerModule } from '../../../shared/components/datepicker/datepicker.module';
import { SharedModule } from '../../../shared/shared.module';
import { RepairService } from '../repair/repair.service';
import { IntervalsModule } from './intervals/intervals.module';
import { MaintenanceWrapperComponent } from './maintenance-wrapper.component';
import { MaintenancePipe } from './maintenance.pipe';
import { maintenanceRoutes } from './maintenance.routes';
import { MaintenanceCardComponent } from './maintenances/maintenance-card/maintenance-card.component';
import { MaintenanceDoneComponent } from './maintenances/maintenance-done/maintenance-done.component';
import { MaintenaceFormComponent } from './maintenances/maintenance-form/maintenance-form.component';
import { MaintenanceComponent } from './maintenances/maintenance.component';
import {
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule
} from '@angular/material';
import { MaintenanceAddComponent } from './maintenances/maintenance-add/maintenance-add.component';
import { MaintenanceEditComponent } from './maintenances/maintenance-edit/maintenance-edit.component';
import { MatTooltipModule } from '@angular/material';

const MODULES = [
    SharedModule,
    IntervalsModule,
    TooltipModule,
    ProgressbarModule,
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
    MatTooltipModule
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
