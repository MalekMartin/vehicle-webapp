import { Routes } from '@angular/router';
import { TechnicalInspectionComponent } from './technical-inspection.component';

export const technicalRoutes: Routes = [
    {
        path: '',
        redirectTo: 'detail',
        pathMatch: 'full'
    },
    {
        path: 'detail',
        component: TechnicalInspectionComponent
    },
];
