import { NgModule } from '@angular/core';
import { VehicleDetailComponent } from './vehicle-detail.component';
import { DetailHeaderComponent } from './detail-header/detail-header.component';
import { RouterModule } from '@angular/router';
import { VehicleSettingsModule } from './vehicle-settings/vehicle-settings.module';
import { ManualsModule } from './manuals/manuals.module';
import { VehicleNotFoundComponent } from './vehicle-not-found/vehicle-not-found.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from '../../shared/components/spinner/spinner.module';
import { InitialsModule } from '../../shared/components/initials/initials.module';
import { VehicleDetailMenuModule } from './vehicle-detail-menu/vehilce-detail-menu.module';

@NgModule({
    imports: [
        CommonModule,
        SpinnerModule,
        InitialsModule,
        RouterModule,
        VehicleSettingsModule,
        ManualsModule,
        MatTooltipModule,
        VehicleDetailMenuModule,
    ],
    declarations: [
        VehicleDetailComponent,
        DetailHeaderComponent,
        VehicleNotFoundComponent,
    ]
})
export class VehicleDetailModule {}
