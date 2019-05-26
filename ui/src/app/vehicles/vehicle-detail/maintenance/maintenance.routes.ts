import { Routes } from '@angular/router';
import { MaintenanceWrapperComponent } from './/maintenance-wrapper.component';

export const maintenanceRoutes: Routes = [
    {
        path: '',
        component: MaintenanceWrapperComponent
    },
    {
        path: 'print',
        loadChildren:
            'app/vehicles/vehicle-detail/maintenance/maintenances/maintenances-print/maintenances-print.module#MaintenancesPrintModule'
            
    }
];
