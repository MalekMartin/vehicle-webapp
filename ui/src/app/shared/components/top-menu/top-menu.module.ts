import { NgModule } from '@angular/core';
import { TopMenuComponent } from './top-menu.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { MaintenanceService } from '../../api/maintenance/maintenance.service';
import { InitialsModule } from '../initials/initials.module';
import { CommonModule } from '@angular/common';
import { VehicleDetailMenuModule } from '../../../vehicles/vehicle-detail/vehicle-detail-menu/vehilce-detail-menu.module';

@NgModule({
    imports: [CommonModule, RouterModule, InitialsModule, VehicleDetailMenuModule],
    exports: [TopMenuComponent],
    declarations: [TopMenuComponent],
    providers: [AuthService, MaintenanceService]
})
export class TopMenuModule {}
