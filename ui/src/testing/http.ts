import { MockConnection } from '@angular/http/testing';
import { Response, ResponseOptions } from '@angular/http';

export const mockBackendResponse = (connection: MockConnection, response: string) => {
    connection.mockRespond(new Response(new ResponseOptions({ body: response })));
};

export const apiBaseUrl = 'http://192.168.1.102:4200';
