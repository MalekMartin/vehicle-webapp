import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpService {
    // private _baseUrl = 'http://localhost/moto';
    // private _baseUrl = 'http://192.168.1.102:4200';

    constructor(private _http: Http, private _auth: AuthService) {}

    post<IN, OUT>(url: string, body: IN): Observable<OUT> {
        return this._http
            .post(buildUrl(url), JSON.stringify(body), this.createHeaders)
            .pipe(map(response => <OUT>response.json()));
    }

    get<T>(url: string): Observable<T> {
        return this._http
            .get(buildUrl(url), this.createHeaders)
            .pipe(map(response => <T>response.json()));
    }

    delete<T>(url: string): Observable<T> {
        return this._http
            .delete(buildUrl(url), this.createHeaders)
            .pipe(map(response => <T>response.json()));
    }

    get createHeaders(): RequestOptionsArgs {
        const headers = new Headers();
        headers.append('Content-Type', 'text/plain;charset=UTF-8');
        // headers.append("Content-Type", "application/json");
        if (!!this._auth.accessToken) {
            headers.append('Authorization', 'Bearer ' + this._auth.accessToken);
        }
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
