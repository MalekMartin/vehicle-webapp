import { Routes } from '@angular/router';
import { MaintenanceWrapperComponent } from './/maintenance-wrapper.component';

export const maintenanceRoutes: Routes = [
    {
        path: '',
        component: MaintenanceWrapperComponent
    },
    {
        path: 'print',
        loadChildren: () =>
            import('./maintenances/maintenances-print/maintenances-print.module').then(
                m => m.MaintenancesPrintModule
            )
    }
];
