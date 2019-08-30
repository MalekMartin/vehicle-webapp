import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatCardModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CardModule } from '../../../shared/components/card/card.module';
import { NumberStatsModule } from '../../../shared/components/number-stats/number-stats.module';
import { PaginatorModule } from '../../../shared/components/paginator/paginator.module';
import { SectionHeadingModule } from '../../../shared/components/section-heading/section-heading.module';
import { SlimBarModule } from '../../../shared/components/slim-bar/slim-bar.module';
import { MomentPipe } from '../../../shared/pipes/moment.pipe';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { FuelAddComponent } from './fuel-add/fuel-add.component';
import { FuelCardComponent } from './fuel-card/fuel-card.component';
import { FuelEditComponent } from './fuel-edit/fuel-edit.component';
import { FuelFormComponent } from './fuel-form/fuel-form.component';
import { FuelStatsComponent } from './fuel-stats/fuel-stats.component';
import { FuelComponent } from './fuel.component';
import { fuelRoutes } from './fuel.routes';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxChartsModule,
        RouterModule.forChild(fuelRoutes),
        MatTooltipModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatCardModule,
        PipesModule,
        NumberStatsModule,
        PaginatorModule,
        SectionHeadingModule,
        CardModule,
        SlimBarModule,
        SpinnerModule
    ],
    exports: [FuelComponent],
    declarations: [
        FuelComponent,
        FuelFormComponent,
        FuelCardComponent,
        FuelStatsComponent,
        FuelAddComponent,
        FuelEditComponent
    ],
    providers: [MomentPipe],
    entryComponents: [FuelAddComponent, FuelEditComponent]
})
export class FuelModule {}
