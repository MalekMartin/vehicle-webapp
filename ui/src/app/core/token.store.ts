import { Injectable } from '@angular/core';
import { Jwt } from './jwt';

@Injectable({providedIn: 'root'})
export class TokenStore {

    constructor() { }

    private get storage():any {
        return !!this.rememberMe
            ? localStorage
            : sessionStorage;
    }

    public get token():Jwt {
        return JSON.parse(this.storage.getItem('vehicle.token'));
    }

    public set token(value:Jwt) {
        this.storage.setItem('vehicle.token', JSON.stringify(value));
    }

    public set rememberMe(value:boolean) {
        localStorage.setItem('vehicle.rememberMe', JSON.stringify(value));
    }

    public get rememberMe():boolean {
        return <boolean>JSON.parse(localStorage.getItem('vehicle.rememberMe'));
    }

    public get expiresDate():string {
        return this.storage.getItem('vehicle.expiresDate');
    }

    public set expiresDate(value:string) {
        this.storage.setItem('vehicle.expiresDate', value.toString());
    }

    public clearStorage() {
        localStorage.removeItem('vehicle.expiresDate');
        localStorage.removeItem('vehicle.token');
        sessionStorage.removeItem('vehicle.expiresDate');
        sessionStorage.removeItem('vehicle.token');
    }
}
