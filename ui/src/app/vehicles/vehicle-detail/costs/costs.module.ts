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
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DirectivesModule } from '../../../shared/directives/directives.module';
import { CostsEditComponent } from './costs-edit/costs-edit.component';
import { SectionHeadingModule } from '../../../shared/components/section-heading/section-heading.module';
import { PaginatorModule } from '../../../shared/components/paginator/paginator.module';
import { NumberStatsModule } from '../../../shared/components/number-stats/number-stats.module';
import { CardModule } from '../../../shared/components/card/card.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { ConfirmModule } from '../../../shared/components/confirm/confirm.module';
import { FilterModule } from '../../../shared/components/filter/filter.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CostsService } from '../../../shared/api/costs/costs.service';
import { CommonModule } from '@angular/common';

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
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // NgxChartsModule,
        RouterModule.forChild(costsRoutes),
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
        PipesModule,
        ConfirmModule,
        FilterModule
    ],
    exports: [],
    declarations: [...COMPONENTS, ...PIPES],
    providers: [CostsService]
})
export class CostsModule {}
