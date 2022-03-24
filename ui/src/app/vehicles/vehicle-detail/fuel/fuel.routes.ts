import { Routes } from '@angular/router';
import { FuelComponent } from './fuel.component';

export const fuelRoutes: Routes = [
    {
        path: '',
        redirectTo: 'detail',
        pathMatch: 'full,'
    },
    {
        path: 'detail',
        component: FuelComponent
    }
];
