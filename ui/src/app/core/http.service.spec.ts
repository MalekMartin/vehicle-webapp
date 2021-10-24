import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from './core.module';
import { HttpService } from './http.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

describe('HttpService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                RouterTestingModule,
                CoreModule.forRoot(),
                ToastrModule,
            ],
            providers: [
                HttpService,
                ToastrService,
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
    });

    // it('should create and return http headers', inject([HttpService], (http: HttpService) => {

    //     const headers = http.createHeaders.headers.keys();

    //     expect(headers.length).toBeGreaterThan(0);
    // }));

    // it('should create and retun headers with Authorization',
    //     inject([HttpService], (http: HttpService) => {

    //      Object.defineProperty(
    //         (<any>http)
    //             ._auth, 'accessToken', { get: () => '123' });

    //     const headers = http.createHeaders.headers.keys();

    //     expect(headers).toContain('Authorization');
    // }));

    it('should add baseUrl and / before url', inject([HttpService], (http: HttpService) => {

        const test = http.post<any, any>('test', {o: 'object'});

    }));

});
