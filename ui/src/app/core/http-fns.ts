import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

export interface HttpOptions {
    headers?: { [header: string]: string };
    responseType?: HttpResponseType;
}

export type HttpResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';

/**
 * Http Headers
 * - application/json
 * - Bearer token
 */
export function securityHeaders(
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

export function buildUrl(url: string): string {
    let u = '';
    if (url.startsWith('/')) {
        u = url.substr(1);
    } else {
        u = url;
    }
    return environment.baseUrl + '/' + u;
}
