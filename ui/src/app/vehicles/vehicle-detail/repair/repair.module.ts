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
import { RepairItemFormComponent } from './repair-item-form/repair-item-form.component';
import { RepairItemsComponent } from './repair-items/repair-items.component';
import { RepairComponent } from './repair.component';
import { repairRoutes } from './repair.routes';
import { RepairService } from './repair.service';
import { TooltipModule } from 'ngx-bootstrap';
import { RepairAddComponent } from './repair-add/repair-add.component';
import {
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
} from '@angular/material';
import { RepairEditComponent } from './repair-edit/repair-edit.component';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { RepairItemAddComponent } from './repair-item-add/repair-item-add.component';
import { RepairItemEditComponent } from './repair-item-edit/repair-item-edit.component';
import { FilterModule } from '../../../shared/components/filter/filter.module';

const COMPONENTS = [
    RepairComponent,
    RepairCardComponent,
    RepairItemFormComponent,
    RepairDetailComponent,
    RepairItemsComponent,
    RepairAddComponent,
    RepairEditComponent,
    RepairItemAddComponent,
    RepairItemEditComponent
];

const MAT_MODULES = [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
];

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        RepairFormModule,
        GarageModule,
        TooltipModule,
        RouterModule.forChild(repairRoutes),
        SpinnerModule,
        FilterModule,
        ...MAT_MODULES
    ],
    exports: [],
    declarations: [...COMPONENTS],
    providers: [RepairService, PageScrollService, GarageService],
    entryComponents: [
        RepairAddComponent,
        RepairEditComponent,
        RepairItemAddComponent,
        RepairItemEditComponent
    ]
})
export class RepairModule {}
