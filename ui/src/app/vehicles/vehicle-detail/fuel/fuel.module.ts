import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuelComponent } from './fuel.component';
import { FuelFormComponent } from './fuel-form/fuel-form.component';
import { FuelCardComponent } from './fuel-card/fuel-card.component';
import { TooltipModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { FuelStatsComponent } from './fuel-stats/fuel-stats.component';
import { RoutedModalModule } from '../../../shared/components/routed-modal/routed-modal.module';
import { RouterModule } from '@angular/router';
import { fuelRoutes } from './fuel.routes';
import { MomentPipe } from '../../../shared/pipes/moment.pipe';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DatepickerModule } from '../../../shared/components/datepicker/datepicker.module';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        TooltipModule,
        ModalModule,
        RoutedModalModule,
        NgxChartsModule,
        RouterModule.forChild(fuelRoutes),
        DatepickerModule
    ],
    exports: [FuelComponent],
    declarations: [
        FuelComponent,
        FuelFormComponent,
        FuelCardComponent,
        FuelStatsComponent
    ],
    providers: [MomentPipe],
})
export class FuelModule { }
