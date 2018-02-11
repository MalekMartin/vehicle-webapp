import { Routes } from '@angular/router';
import { RepairComponent } from './repair.component';
import { RepairDetailComponent } from './repair-detail/repair-detail.component';

export const repairRoutes: Routes = [
    { path: '', component: RepairComponent },
    { path: ':id', component: RepairDetailComponent},
];
