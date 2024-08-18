import { Routes } from '@angular/router';
import { ManualsComponent } from './manuals/manuals.component';
import { VehicleDetailComponent } from './vehicle-detail.component';
import { VehicleNotFoundComponent } from './vehicle-not-found/vehicle-not-found.component';
import { VehicleSettingsComponent } from './vehicle-settings/vehicle-settings.component';

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
                redirectTo: 'fuel',
                pathMatch: 'full'
            },
            // {
            //     path: 'dashboard',
            //     loadChildren: () =>
            //         import('./dashboard/dashboard.module').then(m => m.DashboardModule)
            // },
            {
                path: 'info',
                loadChildren: () => import('./info/info.module').then(m => m.InfoModule)
            },
            {
                path: 'fuel',
                loadChildren: () => import('./fuel/fuel.module').then(m => m.FuelModule)
            },
            {
                path: 'tires',
                loadChildren: () => import('./tires/tires.module').then(m => m.TiresModule)
            },
            {
                path: 'costs',
                loadChildren: () => import('./costs/costs.module').then(m => m.CostsModule)
            },
            {
                path: 'maintenance',
                loadChildren: () =>
                    import('./maintenance/maintenance.module').then(m => m.MaintenanceModule)
            },
            {
                path: 'repairs',
                loadChildren: () => import('./repair/repair.module').then(m => m.RepairModule)
            },
            {
                path: 'technical',
                loadChildren: () =>
                    import('./technical-inspection/technical-inspection.module').then(
                        m => m.TechnicalInspectionModule
                    )
            },
            { path: 'settings', component: VehicleSettingsComponent },
            { path: 'manuals', component: ManualsComponent }
        ]
    }
];
