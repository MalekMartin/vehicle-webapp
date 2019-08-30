import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface HttpOptions {
    headers?: { [header: string]: string };
    responseType?: HttpResponseType;
}

export type HttpResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';

@Injectable()
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

    /**
     * Http Headers
     * - application/json
     * - Bearer token
     */
    securityHeaders(
        accessToken?: string,
        extraHeaders?: HttpOptions['headers'],
        responseType?: HttpOptions['responseType']
    ) {
        const headers = {
            'Content-Type': 'application/json'
        };
        if (!!accessToken) {
            headers['Authorization'] = 'Bearer ' + accessToken;
        }
        // extend by extra headers
        if (extraHeaders) {
            // NOTE: intentionally mutate headers object
            Object.assign(headers, extraHeaders);
        }
        return { headers: new HttpHeaders(headers), responseType };
    }

    private _securityOptions(options?: HttpOptions): any {
        const headers = options ? options.headers : undefined;
        return this.securityHeaders(
            this._auth.accessToken,
            headers,
            !!options && !!options.responseType ? options.responseType : undefined
        );
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
