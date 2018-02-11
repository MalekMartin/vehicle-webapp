import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../../shared/shared.module';
import { dashboardRoutes } from './dashboard.routes';
import { RouterModule } from '@angular/router';
import { StatusCardComponent } from './status-card/status-card.component';
import { CostsCardComponent } from './costs-card/costs-card.component';
import { CostsCardCellComponent } from './costs-card/costs-card-cell/costs-card-cell.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const COMPONENTS = [
    StatusCardComponent,
    CostsCardComponent,
    CostsCardCellComponent,
];

@NgModule({
    imports: [
        SharedModule,
        NgxChartsModule,
        RouterModule.forChild(dashboardRoutes),
    ],
    exports: [DashboardComponent],
    declarations: [
        DashboardComponent,
        ...COMPONENTS
    ],
    providers: [],
})
export class DashboardModule { }
