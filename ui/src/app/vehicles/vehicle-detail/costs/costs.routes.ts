import { CostsComponent } from './costs.component';

export const costsRoutes = [
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
