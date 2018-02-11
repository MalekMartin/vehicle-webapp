import { Routes, RouterModule } from '@angular/router';
import { VehicleDetailComponent } from './vehicle-detail.component';
import { InfoComponent } from './info/info.component';
import { TechnicalInspectionComponent } from './technical-inspection/technical-inspection.component';
import { VehicleSettingsComponent } from './vehicle-settings/vehicle-settings.component';
import { ManualsComponent } from './manuals/manuals.component';
import { RoutedModalComponent } from '../../shared/components/routed-modal/routed-modal.component';
import { VehicleNotFoundComponent } from './vehicle-not-found/vehicle-not-found.component';

export const vehicleDetailRoutes: Routes = [
    {
        path: 'vehicle/not-found',
        component: VehicleNotFoundComponent
    },
    {
        path: 'vehicle/:id',
        component: VehicleDetailComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadChildren: 'app/vehicles/vehicle-detail/dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'info',
                loadChildren: 'app/vehicles/vehicle-detail/info/info.module#InfoModule'
            },
            {
                path: 'fuel',
                loadChildren: 'app/vehicles/vehicle-detail/fuel/fuel.module#FuelModule',
            },
            {
                path: 'tires',
                loadChildren: 'app/vehicles/vehicle-detail/tires/tires.module#TiresModule',
            },
            {
                path: 'costs',
                loadChildren: 'app/vehicles/vehicle-detail/costs/costs.module#CostsModule'
            },
            {
                path: 'maintenance',
                loadChildren: 'app/vehicles/vehicle-detail/maintenance/maintenance.module#MaintenanceModule'
            },
            {
                path: 'repairs',
                loadChildren: 'app/vehicles/vehicle-detail/repair/repair.module#RepairModule'
            },
            {
                path: 'technical',
                loadChildren: 'app/vehicles/vehicle-detail/technical-inspection/technical-inspection.module#TechnicalInspectionModule'
            },
            { path: 'settings', component: VehicleSettingsComponent},
            { path: 'manuals', component: ManualsComponent}
        ]
    }
];
