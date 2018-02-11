import { Routes, RouterModule } from '@angular/router';

// import { NoContentComponent } from './no-content';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { vehiclesRoutes } from './vehicles/vehicles.routes';
import { authRoutes } from './auth/auth.routes';

export const ROUTES: Routes = [
  ...vehiclesRoutes,
  ...authRoutes
  // { path: '**',    component: NoContentComponent },
];
