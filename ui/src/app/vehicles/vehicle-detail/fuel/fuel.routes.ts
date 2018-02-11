import { Routes } from '@angular/router';
import { FuelComponent } from './fuel.component';
import { RoutedModalComponent } from '../../../shared/components/routed-modal/routed-modal.component';
import { FuelFormComponent } from './fuel-form/fuel-form.component';

export const fuelRoutes: Routes = [
    {
        path: '',
        redirectTo: 'detail',
        pathMatch: 'full,'
    },
    {
        path: 'detail',
        component: FuelComponent,
        children: [
            {
                path: 'm',
                component: RoutedModalComponent,
                outlet: 'popup',
                children: [
                    {
                        path: 'add/:vehicleId',
                        component: FuelFormComponent,
                    },
                    {
                        path: 'edit/:id',
                        component: FuelFormComponent,
                    }
                ]
            }
        ]
    }
];
