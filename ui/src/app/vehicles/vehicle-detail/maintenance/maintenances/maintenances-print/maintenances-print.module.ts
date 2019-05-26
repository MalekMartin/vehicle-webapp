import { NgModule } from '@angular/core';
import { MaintenancesPrintComponent } from './maintenances-print.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaintenanceService } from '../../../../../shared/api/maintenance/maintenance.service';
import { MaintenanceCardModule } from '../maintenance-card/maintenance-card.module';

const routes: Routes = [
    {
        path: '',
        component: MaintenancesPrintComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        MaintenanceCardModule,
        RouterModule.forChild(routes)
    ],
    exports: [MaintenancesPrintComponent],
    declarations: [MaintenancesPrintComponent],
    providers: [MaintenanceService]
})
export class MaintenancesPrintModule {}
