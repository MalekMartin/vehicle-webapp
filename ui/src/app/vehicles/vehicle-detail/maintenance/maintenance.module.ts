import { NgModule } from '@angular/core';
import { MaintenanceComponent } from './maintenances/maintenance.component';
import { IntervalsModule } from './intervals/intervals.module';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaintenaceFormComponent } from './maintenances/maintenance-form/maintenance-form.component';
import { MaintenanceCardComponent } from './maintenances/maintenance-card/maintenance-card.component';
import { TooltipModule, ProgressbarModule } from 'ngx-bootstrap';
import { MaintenanceDoneComponent } from './maintenances/maintenance-done/maintenance-done.component';
import { MaintenancePipe } from './maintenance.pipe';
import { GarageModule } from '../../../car-services/garage/garage.module';
import { GarageService } from '../../../car-services/garage/garage.service';
import { RouterModule } from '@angular/router';
import { maintenanceRoutes } from './maintenance.routes';
import { RepairService } from '../repair/repair.service';
import { MaintenanceWrapperComponent } from './maintenance-wrapper.component';

const MODULES = [
    SharedModule,
    IntervalsModule,
    TooltipModule,
    ProgressbarModule,
    GarageModule,
    RouterModule.forChild(maintenanceRoutes)
];

const COMPONENTS = [
    MaintenanceComponent,
    MaintenaceFormComponent,
    MaintenanceCardComponent,
    MaintenanceDoneComponent,
    MaintenanceWrapperComponent
];

const PIPES = [
    MaintenancePipe
];

@NgModule({
    imports: [
        ...MODULES
    ],
    exports: [
        MaintenanceWrapperComponent
    ],
    declarations: [
        ...COMPONENTS,
        ...PIPES
    ],
    providers: [
        RepairService
    ],
})
export class MaintenanceModule { }
