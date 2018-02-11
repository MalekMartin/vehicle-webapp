import { NgModule } from '@angular/core';

import { VehicleRepairsComponent } from './vehicle-repairs.component';
import { CarServiceService } from './vehicle-repairs.service';
import { CarServiceListComponent } from './car-service-list/car-service-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { GarageService } from './garage/garage.service';
import { GarageModule } from './garage/garage.module';
import { CarServiceCardComponent } from './car-service-card/car-service-card.component';
import { CarServiceDetailComponent } from './car-service-detail/car-service-detail.component';
import { GarageFormComponent } from './garage-form/garage-form.component';

const COMPONENTS = [
    VehicleRepairsComponent,
    CarServiceListComponent,
    CarServiceCardComponent,
    CarServiceDetailComponent,
    GarageFormComponent
];

const MODULES = [
    SharedModule,
    RouterModule,
    GarageModule
];

@NgModule({
    imports: [...MODULES],
    exports: [...COMPONENTS],
    declarations: [...COMPONENTS],
    providers: [CarServiceService, GarageService],
})
export class CarServiceModule { }
