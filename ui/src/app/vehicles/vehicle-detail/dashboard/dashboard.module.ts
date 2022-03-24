import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { CostsCardCellComponent } from './costs-card/costs-card-cell/costs-card-cell.component';
import { CostsCardComponent } from './costs-card/costs-card.component';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
import { StatusCardComponent } from './status-card/status-card.component';

const COMPONENTS = [StatusCardComponent, CostsCardComponent, CostsCardCellComponent];

@NgModule({
    imports: [CommonModule, NgxChartsModule, RouterModule.forChild(dashboardRoutes), PipesModule],
    exports: [DashboardComponent],
    declarations: [DashboardComponent, ...COMPONENTS],
    providers: []
})
export class DashboardModule {}
