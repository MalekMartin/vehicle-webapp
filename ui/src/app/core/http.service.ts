import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class HttpService {

    // private _baseUrl = 'http://localhost/moto';
    // private _baseUrl = 'http://192.168.1.102:4200';

    constructor(private _http:Http, private _auth: AuthService) { }

    post<IN, OUT>(url: string, body: IN): Observable<OUT> {
        return this._http
            .post(this.buildUrl(url), JSON.stringify(body), this.createHeaders)
            .map((response) => <OUT>response.json());
    }

    get<T>(url: string): Observable<T> {
        return this._http
            .get(this.buildUrl(url), this.createHeaders)
            .map((response) => <T>response.json());
    }

    delete<T>(url: string): Observable<T> {
        return this._http
            .delete(this.buildUrl(url), this.createHeaders)
            .map((response) => <T>response.json());
    }

    get createHeaders(): RequestOptionsArgs {
        const headers = new Headers();
        headers.append('Content-Type', 'text/plain;charset=UTF-8');
        // headers.append("Content-Type", "application/json");
        if (!!this._auth.accessToken) {
            headers.append('Authorization', 'Bearer ' + this._auth.accessToken);
        }
        return {headers: headers};
    }

    private buildUrl(url:string) {
        if (url.startsWith('/')) {
            return url.substr(1);
        } else {
            return url;
        }
    }
}
