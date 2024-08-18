import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';


@Injectable()
export class DataResolver  {
  constructor() {

  }
  resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    return of({ res: 'I am data'});
  }
}

// an array of services to resolve routes with data
export const APP_RESOLVER_PROVIDERS = [
  DataResolver
];
