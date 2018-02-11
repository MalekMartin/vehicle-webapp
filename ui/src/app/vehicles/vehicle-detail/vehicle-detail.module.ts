import { NgModule } from '@angular/core';
import { VehicleDetailComponent } from './vehicle-detail.component';
import { FuelComponent } from './fuel/fuel.component';
import { SharedModule } from '../../shared/shared.module';
// import { InfoModule } from './info/info.module';
import { ModalModule } from 'ngx-bootstrap';
import { DetailHeaderComponent } from './detail-header/detail-header.component';
import { RouterModule } from '@angular/router';
import { VehicleSettingsComponent } from './vehicle-settings/vehicle-settings.component';
import { VehicleSettingsModule } from './vehicle-settings/vehicle-settings.module';
import { ManualsModule } from './manuals/manuals.module';
import { VehicleNotFoundComponent } from './vehicle-not-found/vehicle-not-found.component';

@NgModule({
    imports: [
        SharedModule,
        // InfoModule,
        ModalModule,
        RouterModule,
        VehicleSettingsModule,
        ManualsModule,
    ],
    exports: [],
    declarations: [
        VehicleDetailComponent,
        DetailHeaderComponent,
        VehicleNotFoundComponent
    ],
    providers: [
    ],
})
export class VehicleDetailModule { }
