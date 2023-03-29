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
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { ConfirmModule } from '../../../shared/components/confirm/confirm.module';
import { FuelService } from '../../../shared/api/fuel/fuel.service';

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
        SpinnerModule,
        ConfirmModule,
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
    providers: [MomentPipe, FuelService]
})
export class FuelModule {}
