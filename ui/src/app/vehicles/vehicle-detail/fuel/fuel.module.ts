import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
