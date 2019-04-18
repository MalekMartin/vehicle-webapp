import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStore } from './token.store';
import { Http, Headers, RequestOptionsArgs, Response } from '@angular/http';
import { Subscription, Observable } from 'rxjs';
import { Jwt } from './jwt';
import * as moment from 'moment';

import { StorageService } from '../shared/api/storage.service';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
    private _timeout: any = null;
    private _user: any;
    private _subscription: Subscription = null;
    private _saveBorder = 60;

    constructor(
        private http: Http,
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

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (!!this.accessToken) {
            headers.append('Authorization', 'Bearer ' + this.accessToken);
        }

        this._subscription = this.http
            .get(buildUrl('/auth/account'), { headers: headers })
            .pipe(map((response: Response) => response.json()))
            .subscribe(user => (this._user = user));
    }

    login(username: string, password: string, rememberMe = false): Observable<void> {
        const creds = 'username=' + username + '&password=' + password + '&grant_type=password';
        this._tokenStore.rememberMe = rememberMe;
        return this.http
            .post(buildUrl('/auth/token'), creds, this._loginOptions)
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

    private mapLoginResponse = (response: Response) => {
        const jwt = <Jwt>response.json();
        this._tokenStore.token = jwt;
        this.scheduleRefresh(jwt.expires_in);
    };

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
            .post(buildUrl('/auth/token_refresh'), creds, this._loginOptions)
            .subscribe(this.mapLoginResponse, this._invalidToken);
    };

    private _invalidToken = () => {
        this._user = null;
        this._subscription = null;
        this._tokenStore.clearStorage();
        this._router.navigate(['/login', { invalid_token: true }]);
    };

    private get _loginOptions(): RequestOptionsArgs {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Basic d2ViX2FwcDo=');
        return { headers: headers };
    }
}

function buildUrl(url: string): string {
    let u = '';
    if (url.startsWith('/')) {
        u = url.substr(1);
    } else {
        u = url;
    }
    return environment.baseUrl + '/' + u;
}
