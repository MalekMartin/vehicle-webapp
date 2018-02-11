import { NgModule } from '@angular/core';
import { RepairComponent } from './repair.component';
import { SharedModule } from '../../../shared/shared.module';
import { RepairService } from './repair.service';
import { RepairFormComponent } from './repair-form/repair-form.component';
import { CommonModule } from '@angular/common';
import { RepairCardComponent } from './repair-card/repair-card.component';
import { RepairTaskComponent } from './repair-task/repair-task.component';
import { RepairTaskFormComponent } from './repair-task-form/repair-task-form.component';
import { RepairFormModule } from './repair-form/repair-form.module';
import { PageScrollService } from 'ng2-page-scroll';
import { RepairDetailComponent } from './repair-detail/repair-detail.component';
import { GarageModule } from '../../../car-services/garage/garage.module';
import { GarageService } from '../../../car-services/garage/garage.service';
import { RepairTasksComponent } from './repair-tasks/repair-tasks.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip/tooltip.module';
import { RouterModule } from '@angular/router';
import { repairRoutes } from './repair.routes';


const COMPONENTS = [
    RepairComponent,
    RepairCardComponent,
    RepairTaskComponent,
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
