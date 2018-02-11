import { VehicleRepairsComponent } from './vehicle-repairs.component';
import { Routes } from '@angular/router';
import { CarServiceListComponent } from './car-service-list/car-service-list.component';
import { CarServiceDetailComponent } from './car-service-detail/car-service-detail.component';

export const carServiceRoutes: Routes = [
    {
        path: 'services',
        component: VehicleRepairsComponent,
        children: [
            // {path: '', redirectTo: 'list', pathMatch: 'full'},
            // {path: 'list', component: CarServiceListComponent},

            {path: '', component: CarServiceListComponent},
            {path: ':id', component: CarServiceDetailComponent},
        ]
    }
];
