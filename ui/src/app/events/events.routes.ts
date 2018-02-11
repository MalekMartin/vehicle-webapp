import { Routes } from '@angular/router';
import { EventsComponent } from './events.component';
import { AuthGuard } from '../core/auth.guard';

export const eventsRoutes: Routes = [
    {
        path: 'events',
        component: EventsComponent,
        canActivate: [AuthGuard]
    }
];
