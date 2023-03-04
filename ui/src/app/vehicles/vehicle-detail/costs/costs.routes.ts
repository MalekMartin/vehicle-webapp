import { CostsComponent } from './costs.component';
import { Routes } from "@angular/router";

export const costsRoutes: Routes = [
    {
        path: '',
        redirectTo: 'detail',
        pathMatch: 'full,'
    },
    {
        path: 'detail',
        component: CostsComponent
    }
];
