import { NgModule } from '@angular/core';
import { TopMenuComponent } from './top-menu.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { MaintenanceService } from '../../api/maintenance/maintenance.service';
import { InitialsModule } from '../initials/initials.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule, RouterModule, InitialsModule],
    exports: [TopMenuComponent],
    declarations: [TopMenuComponent],
    providers: [AuthService, MaintenanceService]
})
export class TopMenuModule {}
