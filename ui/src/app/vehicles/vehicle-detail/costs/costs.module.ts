import { NgModule } from '@angular/core';

import { CostsComponent } from './costs.component';
import { CostsFormComponent } from './costs-form/costs-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CostsPipe } from './costs.pipe';
import { CostCategoryComponent } from './cost-category-form/cost-category-form.component';
import { CostStatsComponent } from './cost-stats/cost-stats.component';
import { CostCardComponent } from './cost-card/cost-card.component';
import { costsRoutes } from './costs.routes';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DatepickerModule } from '../../../shared/components/datepicker/datepicker.module';
import {
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
} from '@angular/material';

const PIPES = [CostsPipe];

const COMPONENTS = [
    CostsComponent,
    CostsFormComponent,
    CostCategoryComponent,
    CostStatsComponent,
    CostCardComponent
];

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgxChartsModule,
        RouterModule.forChild(costsRoutes),
        DatepickerModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule
    ],
    exports: [],
    declarations: [...COMPONENTS, ...PIPES],
    providers: []
})
export class CostsModule {}
