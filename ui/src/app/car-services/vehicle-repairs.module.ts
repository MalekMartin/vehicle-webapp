import { NgModule } from '@angular/core';

import { VehicleRepairsComponent } from './vehicle-repairs.component';
import { CarServiceService } from './vehicle-repairs.service';
import { CarServiceListComponent } from './car-service-list/car-service-list.component';
import { RouterModule } from '@angular/router';
import { GarageService } from './garage/garage.service';
import { GarageModule } from './garage/garage.module';
import { CarServiceCardComponent } from './car-service-card/car-service-card.component';
import { CarServiceDetailComponent } from './car-service-detail/car-service-detail.component';
import { GarageFormComponent } from './garage-form/garage-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GarageAddComponent } from './garage-add/garage-add.component';
import { MatButtonModule } from '@angular/material/button';
import { FormItemModule } from '../shared/forms/form-item/form-item.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from '../shared/components/card/card.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { GarageEditComponent } from './garage-edit/garage-edit.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

const COMPONENTS = [
    VehicleRepairsComponent,
    CarServiceListComponent,
    CarServiceCardComponent,
    CarServiceDetailComponent,
    GarageFormComponent,
    GarageAddComponent,
    GarageEditComponent,
];

const MODULES = [
    CommonModule,
    RouterModule,
    GarageModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FormItemModule,
    ReactiveFormsModule,
    CardModule,
    PipesModule,
];

@NgModule({
    imports: [...MODULES],
    exports: [...COMPONENTS],
    declarations: [...COMPONENTS],
    providers: [CarServiceService, GarageService],
})
export class CarServiceModule { }
