import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from '../shared/api/storage.service';
import { buildUrl, HttpResponseType } from './http-fns';
import { Jwt } from './jwt';
import { TokenStore } from './token.store';

@Injectable({providedIn: 'root'})
export class AuthService {
    private _timeout: any = null;
    private _user: any;
    private _subscription: Subscription = null;
    private _saveBorder = 60;

    constructor(
        private http: HttpClient,
        @Inject(TokenStore) private _tokenStore: TokenStore,
        private _router: Router,
        private _storage: StorageService
    ) {}

    get isLoggedIn(): boolean {
        const jwt: Jwt = this._tokenStore.token;
        if (!jwt) {
            this._user = null;
            this._subscription = null;
            return false;
        }
        if (moment(this._tokenStore.expiresDate).isBefore(moment())) {
            this._refreshToken();
        } else {
            const endTime = moment(this._tokenStore.expiresDate);
            const refreshIn = moment.duration(endTime.diff(moment())).asSeconds();
            this.scheduleRefresh(refreshIn);
        }

        return true;
    }

    get accessToken(): string {
        const jwt: Jwt = this._tokenStore.token;
        return !!jwt ? jwt.access_token : null;
    }

    // public get isAdmin():boolean {
    //     let jwt:Jwt = this._tokenStore.token;
    //     return jwt.authorities.indexOf("ROLE_ADMIN") > -1;
    // }

    // public get isContentCoordinator(): boolean {
    //     let jwt: Jwt = this._tokenStore.token;
    //     return jwt.authorities.indexOf("ROLE_CONTENT_COORDINATOR") > -1;
    // }

    get userId(): string {
        if (!this._user) {
            this.refreshUserInfo();
        }
        return !!this._user ? this._user.id : '';
    }

    get user(): any {
        if (!this._user) {
            this.refreshUserInfo();
        }
        return !!this._user ? this._user : null;
    }

    refreshUserInfo() {
        if (!!this._subscription) {
            return;
        }

        const headers = {
            'Content-Type': 'application/json'
        };
        if (!!this.accessToken) {
            headers['Authorization'] = 'Bearer ' + this.accessToken;
        }

        this._subscription = this.http
            .get(buildUrl('/auth/account'), { headers: new HttpHeaders(headers) })
            .pipe(map((response: Response) => response))
            .subscribe(user => (this._user = user));
    }

    login(username: string, password: string, rememberMe = false): Observable<void> {
        const creds = 'username=' + username + '&password=' + password + '&grant_type=password';
        this._tokenStore.rememberMe = rememberMe;
        return this.http
            .post(buildUrl('/auth/token'), creds, this._loginOptions())
            .pipe(map(this.mapLoginResponse));
    }

    logout() {
        this._subscription = null;
        this._user = null;
        if (this._timeout != null) {
            clearTimeout(this._timeout);
        }
        this._tokenStore.clearStorage();
        this._router.navigate(['/login']);
        this._storage.clearStorage();
    }

    register(mail: string) {
        return this.http.post(buildUrl('/auth/register'), { mail });
    }

    getAtivationCodeStatus(code: string) {
        return this.http.get(buildUrl('/auth/validate_activation/') + code);
    }

    finishRegistration(value) {
        return this.http.post(buildUrl('/auth/finish_registration'), value);
    }

    private scheduleRefresh(expiresIn: number) {
        const expiresDate = moment().add(expiresIn - this._saveBorder, 'seconds');
        this._tokenStore.expiresDate = moment(expiresDate).format();
        if (this._timeout != null) {
            clearTimeout(this._timeout);
        }
        // this._timeout = setTimeout(this._refreshToken, expiresIn * 1000);
        this._timeout = setTimeout(this._refreshToken, (expiresIn - this._saveBorder) * 1000);
    }

    private _refreshToken = () => {
        const creds =
            'client_id=web_app&refresh_token=' +
            this._tokenStore.token.refresh_token +
            '&grant_type=refresh_token';
        this.http
            .post(buildUrl('/auth/token_refresh'), creds, this._loginOptions())
            .subscribe(this.mapLoginResponse, this._invalidToken);
    };

    private _invalidToken = () => {
        this._user = null;
        this._subscription = null;
        this._tokenStore.clearStorage();
        this._router.navigate(['/login', { invalid_token: true }]);
    };

    private _loginOptions(responseType: HttpResponseType = 'json'): any {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        // headers['Authorization'] = 'Basic d2ViX2FwcDo=';
        return { headers: new HttpHeaders(headers), responseType };
    }

    private mapLoginResponse = response => {
        // const jwt = <Jwt>response.json();
        const jwt = response;
        this._tokenStore.token = jwt;
        this.scheduleRefresh(jwt.expires_in);
    };
}
