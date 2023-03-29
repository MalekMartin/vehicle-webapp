import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GarageModule } from '../../../car-services/garage/garage.module';
import { GarageService } from '../../../car-services/garage/garage.service';
import { CardModule } from '../../../shared/components/card/card.module';
import { FilterModule } from '../../../shared/components/filter/filter.module';
import { SectionHeadingModule } from '../../../shared/components/section-heading/section-heading.module';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { RepairAddComponent } from './repair-add/repair-add.component';
import { RepairCardComponent } from './repair-card/repair-card.component';
import { RepairDetailComponent } from './repair-detail/repair-detail.component';
import { RepairEditComponent } from './repair-edit/repair-edit.component';
import { RepairFormModule } from './repair-form/repair-form.module';
import { RepairItemAddComponent } from './repair-item-add/repair-item-add.component';
import { RepairItemEditComponent } from './repair-item-edit/repair-item-edit.component';
import { RepairItemFormComponent } from './repair-item-form/repair-item-form.component';
import { RepairItemsComponent } from './repair-items/repair-items.component';
import { RepairComponent } from './repair.component';
import { repairRoutes } from './repair.routes';
import { RepairService } from './repair.service';
import { PaginatorModule } from '../../../shared/components/paginator/paginator.module';
import { NumberStatsModule } from '../../../shared/components/number-stats/number-stats.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { ConfirmModule } from '../../../shared/components/confirm/confirm.module';

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
        CommonModule,
        ReactiveFormsModule,
        CardModule,
        SectionHeadingModule,
        RepairFormModule,
        GarageModule,
        RouterModule.forChild(repairRoutes),
        SpinnerModule,
        FilterModule,
        PaginatorModule,
        NumberStatsModule,
        PipesModule,
        ConfirmModule,
        ...MAT_MODULES
    ],
    exports: [],
    declarations: [...COMPONENTS],
    providers: [RepairService, GarageService]
})
export class RepairModule {}
