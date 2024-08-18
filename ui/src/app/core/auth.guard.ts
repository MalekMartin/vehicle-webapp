import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard  {
    constructor(private authService:AuthService, private router:Router) {
    }

    canActivate(// Not using but worth knowing about
                next:ActivatedRouteSnapshot,
                state:RouterStateSnapshot) {

        if (this.authService.isLoggedIn) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
