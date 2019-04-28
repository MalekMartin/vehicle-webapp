import { NgModule } from '@angular/core';

import { CostsComponent } from './costs.component';
import { CostsFormComponent } from './costs-form/costs-form.component';
import { CostsAddComponent } from './costs-add/costs-add.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CostsPipe } from './costs.pipe';
import { CostCategoryFormComponent } from './cost-category-form/cost-category-form.component';
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
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule
} from '@angular/material';
import { DirectivesModule } from '../../../shared/directives/directives.module';
import { CostsEditComponent } from './costs-edit/costs-edit.component';
import { SectionHeadingModule } from '../../../shared/components/section-heading/section-heading.module';
import { PaginatorModule } from '../../../shared/components/paginator/paginator.module';
import { NumberStatsModule } from '../../../shared/components/number-stats/number-stats.module';
import { CardModule } from '../../../shared/components/card/card.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';

const PIPES = [CostsPipe];

const COMPONENTS = [
    CostsComponent,
    CostsFormComponent,
    CostCategoryFormComponent,
    CostStatsComponent,
    CostCardComponent,
    CostsAddComponent,
    CostsEditComponent
];

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxChartsModule,
        RouterModule.forChild(costsRoutes),
        DatepickerModule,
        DirectivesModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatDialogModule,
        MatButtonModule,
        SectionHeadingModule,
        PaginatorModule,
        NumberStatsModule,
        CardModule,
        PipesModule
    ],
    exports: [],
    declarations: [...COMPONENTS, ...PIPES],
    providers: [],
    entryComponents: [CostsAddComponent, CostsEditComponent, CostCategoryFormComponent]
})
export class CostsModule {}
