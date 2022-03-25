import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { buildUrl, HttpOptions, securityHeaders } from './http-fns';

@Injectable({providedIn: 'root'})
export class HttpService {
    // private _baseUrl = 'http://localhost/moto';
    // private _baseUrl = 'http://192.168.1.102:4200';

    constructor(private _http: HttpClient, private _auth: AuthService) {}

    post<IN, OUT>(url: string, body: IN, options?: HttpOptions): Observable<OUT> {
        return (this._http.post(
            buildUrl(url),
            body,
            this._securityOptions(options)
        ) as any) as Observable<OUT>;
    }

    get<T>(url: string, options?: HttpOptions): Observable<T> {
        return (this._http.get(buildUrl(url), this._securityOptions(options)) as any) as Observable<
            T
        >;
    }

    delete<T>(url: string, options?: HttpOptions): Observable<T> {
        return (this._http.delete(
            buildUrl(url),
            this._securityOptions(options)
        ) as any) as Observable<T>;
    }

    private _securityOptions(options?: HttpOptions): any {
        const headers = options ? options.headers : undefined;
        return securityHeaders(
            this._auth.accessToken,
            headers,
            !!options && !!options.responseType ? options.responseType : undefined
        );
    }
}
