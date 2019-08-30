import { TestBed, inject } from '@angular/core/testing';
import { XHRBackend } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from './core/core.module';
import { ToastsManager, ToastModule, ToastOptions } from 'ng6-toastr/ng2-toastr';
import { AppState } from './app.service';
import { MockBackend } from '@angular/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('AppState', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                RouterTestingModule,
                CoreModule.forRoot(),
                ToastModule,
            ],
            providers: [
                ToastsManager,
                ToastOptions,
                AppState,
                { provide: XHRBackend, useClass: MockBackend },
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
    });

    it('should init values', inject([AppState],
        (service: AppState) => {

        expect((<any>service)._state).toEqual({ });

    }));

    it('Should return state', inject([AppState],
        (service: AppState) => {

        expect(service.state).toEqual({ });

    }));

    // it('Should throw exception when setting state', inject([AppState]
    //     , (service: AppState) => {

    //     service.state = 'test';

    //     expect(function(){ service.state = 'test';}).toThrowError('do not mutate the `.state` directly');

    // }));

    it('Should return epty state for not existing property', inject([AppState],
        (service: AppState) => {

        expect(service.get('test')).toEqual({ });

    }));

    it('Should return state for existing property', inject([AppState],
        (service: AppState) => {

        (<any>service)._state = {
            test: 'test value'
        };

        expect(service.get('test')).toEqual('test value');

    }));

    it('Should set state property', inject([AppState],
        (service: AppState) => {

        service.set('test', 'blah');

        expect(service.get('test')).toEqual('blah');

    }));

});
