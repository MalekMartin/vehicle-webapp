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
import { MatDialogModule } from '@angular/material/dialog';
import { GarageAddComponent } from './garage-add/garage-add.component';
import { MatButtonModule } from '@angular/material/button';

const COMPONENTS = [
    VehicleRepairsComponent,
    CarServiceListComponent,
    CarServiceCardComponent,
    CarServiceDetailComponent,
    GarageFormComponent,
    GarageAddComponent
];

const MODULES = [
    SharedModule,
    RouterModule,
    GarageModule,
    MatDialogModule,
    MatButtonModule,
];

@NgModule({
    imports: [...MODULES],
    exports: [...COMPONENTS],
    declarations: [...COMPONENTS],
    providers: [CarServiceService, GarageService],
})
export class CarServiceModule { }
