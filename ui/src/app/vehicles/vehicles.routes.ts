import { Routes } from '@angular/router';
import { VehiclesComponent } from './vehicles.component';
import { VehicleStreamComponent } from './vehicle-stream/vehicle-stream.component';
import { vehicleDetailRoutes } from './vehicle-detail/vehicle-detail.routes';
import { carServiceRoutes } from '../car-services/vehicle-repairs.routes';
import { AuthGuard } from '../core/auth.guard';
import { NotFoundComponent } from '../not-found/not-found.component';
import { eventsRoutes } from '../events/events.routes';

export const vehiclesRoutes: Routes = [
    {
        path: '',
        component: VehiclesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: VehicleStreamComponent},
            { path: 'vehicles', redirectTo: '', pathMatch: 'full'},
            ...vehicleDetailRoutes,
            ...eventsRoutes,
            ...carServiceRoutes,
            // { path: '**', component: NotFoundComponent}
        ]
    }
];
