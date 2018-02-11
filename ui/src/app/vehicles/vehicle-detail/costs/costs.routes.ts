import { CostsComponent } from './costs.component';
import { RoutedModalComponent } from '../../../shared/components/routed-modal/routed-modal.component';
import { CostsFormComponent } from './costs-form/costs-form.component';

export const costsRoutes = [
    {
        path: '',
        redirectTo: 'detail',
        pathMatch: 'full,'
    },
    {
        path: 'detail',
        component: CostsComponent,
        children: [
            {
                path: 'm',
                component: RoutedModalComponent,
                outlet: 'popup',
                children: [
                    {
                        path: 'add/:vehicleId',
                        component: CostsFormComponent,
                    },
                    {
                        path: 'edit/:id',
                        component: CostsFormComponent,
                    }
                ]
            }
        ]
    }
];
