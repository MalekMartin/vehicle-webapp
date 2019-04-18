import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageScrollService } from 'ng2-page-scroll';
import { GarageModule } from '../../../car-services/garage/garage.module';
import { GarageService } from '../../../car-services/garage/garage.service';
import { SharedModule } from '../../../shared/shared.module';
import { RepairCardComponent } from './repair-card/repair-card.component';
import { RepairDetailComponent } from './repair-detail/repair-detail.component';
import { RepairFormModule } from './repair-form/repair-form.module';
import { RepairTaskFormComponent } from './repair-task-form/repair-task-form.component';
import { RepairTasksComponent } from './repair-tasks/repair-tasks.component';
import { RepairComponent } from './repair.component';
import { repairRoutes } from './repair.routes';
import { RepairService } from './repair.service';
import { TooltipModule } from 'ngx-bootstrap';


const COMPONENTS = [
    RepairComponent,
    RepairCardComponent,
    RepairTaskFormComponent,
    RepairDetailComponent,
    RepairTasksComponent
];

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        RepairFormModule,
        GarageModule,
        TooltipModule,
        RouterModule.forChild(repairRoutes),
    ],
    exports: [],
    declarations: [
        ...COMPONENTS
    ],
    providers: [
        RepairService,
        PageScrollService,
        GarageService
    ],
})
export class RepairModule { }
