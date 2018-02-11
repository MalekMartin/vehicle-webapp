import { Routes } from '@angular/router';
import { TechnicalInspectionComponent } from './technical-inspection.component';
import { RoutedModalComponent } from '../../../shared/components/routed-modal/routed-modal.component';
import { TechnicalFormComponent } from './technical-form/technical-form.component';

export const technicalRoutes: Routes = [
    {
        path: '',
        redirectTo: 'detail',
        pathMatch: 'full,'
    },
    {
        path: 'detail',
        component: TechnicalInspectionComponent,
        children: [
            {
                path: 'm',
                component: RoutedModalComponent,
                outlet: 'modal',
                children: [
                    {
                        path: 'add/:vehicleId',
                        component: TechnicalFormComponent,
                    },
                    {
                        path: 'edit/:id',
                        component: TechnicalFormComponent,
                    }
                ]
            }
        ]
    },
];
