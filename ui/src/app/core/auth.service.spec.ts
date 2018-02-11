import { TestBed, inject } from '@angular/core/testing';
import {
    HttpModule,
    XHRBackend,
    ResponseOptions,
    Response
} from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from './core.module';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TokenStore } from './token.store';
import { Router } from '@angular/router';
import { jwtMock } from './token.store.spec';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { mockBackendResponse } from '../../testing/http';
import { ToastModule, ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';

describe('AuthService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                RouterTestingModule,
                CoreModule.forRoot(),
                ToastModule,
            ],
            providers: [
                ToastsManager,
                ToastOptions,
                AuthService,
                HttpService,
                TokenStore,
                { provide: XHRBackend, useClass: MockBackend },
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
        // service = new AuthService();
    });

    it('should return TRUE for isLoggedIn', inject([AuthService], (auth: AuthService) => {

        Object.defineProperty(
            (<any>auth)
                ._tokenStore, 'token', { get: () => jwtMock });

        expect(auth.isLoggedIn).toBeTruthy();

    }));

    it('should return FALSE for isLoggedIn', inject([AuthService], (auth: AuthService) => {

        Object.defineProperty(
            (<any>auth)
                ._tokenStore, 'token', { get: () => null });

        expect(auth.isLoggedIn).toBeFalsy();

    }));

    it('should call refreshToken', inject([AuthService], (auth: AuthService) => {

        const spy = spyOn((<any>auth), '_refreshToken');

        Object.defineProperty(
            (<any>auth)
                ._tokenStore, 'expiresDate', { get: () => '2015-07-16T22:00:00.000Z' });

        Object.defineProperty(
            (<any>auth)
                ._tokenStore, 'token', { get: () => jwtMock });

        const result = auth.isLoggedIn;
        expect(spy).toHaveBeenCalled();
    }));

    it('should return string for accessToken', inject([AuthService], (auth: AuthService) => {

        Object.defineProperty(
            (<any>auth)
                ._tokenStore, 'token', { get: () => jwtMock });

        expect(auth.accessToken).not.toBeNull();

    }));

    it('should return null for accessToken', inject([AuthService], (auth: AuthService) => {

        Object.defineProperty(
            (<any>auth)
                ._tokenStore, 'token', { get: () => null });

        expect(auth.accessToken).toBeNull();

    }));

    it('should return id for userId', inject([AuthService], (auth: AuthService) => {

        (<any>auth)._user = {id: 'user-1'};

        expect(auth.userId).toBe('user-1');

    }));

    it('should call refreshUserInfo', inject([AuthService], (auth: AuthService) => {

        const spy = spyOn(auth, 'refreshUserInfo');

        (<any>auth)._user = null;

        const userId = auth.userId;

        expect(spy).toHaveBeenCalled();
    }));

    it('should return empty string for userId', inject([AuthService], (auth: AuthService) => {

        (<any>auth)._user = null;

        expect(auth.userId).toBe('');
    }));

    it('should call refreshUserInfo when user is empty', inject([AuthService], (auth: AuthService) => {

        const spy = spyOn(auth, 'refreshUserInfo');

        (<any>auth)._user = null;

        const user = auth.user;

        expect(spy).toHaveBeenCalled();

    }));

    it('should return null when user is empty', inject([AuthService], (auth: AuthService) => {
        (<any>auth)._user = null;

        expect(auth.user).toBeNull();
    }));

    it('should return user when user is not empty', inject([AuthService], (auth: AuthService) => {

        const userMock = {
            id: 'user-1'
        };

        (<any>auth)._user = userMock;

        const user = auth.user;

        expect(user).toEqual(userMock);
    }));

    it('refreshUserInfo - should set subscription', inject([AuthService], (auth: AuthService) => {

        (<any>auth)._subscription = null;

        auth.refreshUserInfo();

        expect((<any>auth)._subscription).not.toBeNull();

    }));

    it('refreshUserInfo - should set subscription with headers', inject([AuthService], (auth: AuthService) => {

        (<any>auth)._subscription = null;

        Object.defineProperty(
            (<any>auth)
                ._tokenStore, 'token', { get: () => jwtMock });

        auth.refreshUserInfo();

        expect((<any>auth)._subscription).not.toBeNull();

    }));

    it('refreshUserInfo - should set user info', inject([AuthService], (auth: AuthService) => {

        const userMock = {id: 'user-1'};

        const backend: MockBackend = TestBed.get(XHRBackend);
        backend.connections
            .subscribe((connection: MockConnection) => {
                const url = connection.request.url;

                if (url === '/auth/account') {
                    mockBackendResponse(connection, JSON.stringify(userMock));
                    // connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                }
            });

        auth.refreshUserInfo();
        expect(auth.user).toEqual(userMock);
    }));

    it('refreshUserInfo - should set user info skip another subscription', inject([AuthService], (auth: AuthService) => {

        const userMock = {id: 'user-1'};

        const backend: MockBackend = TestBed.get(XHRBackend);
        backend.connections
            .subscribe((connection: MockConnection) => {
                const url = connection.request.url;
                if (url === '/auth/account') {
                    mockBackendResponse(connection, JSON.stringify(userMock));
                    // connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                }
            });

        auth.refreshUserInfo();
        auth.refreshUserInfo();
        expect(auth.user).toEqual(userMock);
    }));

    it('login - should set login request with falsy remember me', inject([AuthService], (auth: AuthService) => {

        const loginObservable = auth.login('user', 'pwd');
        expect(loginObservable).not.toBeNull();
    }));

    it('login - should set login request with truthy remember me', inject([AuthService], (auth: AuthService) => {

        const loginObservable = auth.login('user', 'pwd', true);
        expect(loginObservable).not.toBeNull();
    }));

    it('logout - should set subscription to null', inject([AuthService], (auth: AuthService) => {

        spyOn((<any>auth)._router, 'navigate');

        auth.logout();

        expect((<any>auth)._subscription).toBeNull();
    }));

    it('logout - should set user to null', inject([AuthService], (auth: AuthService) => {

        spyOn((<any>auth)._router, 'navigate');

        auth.logout();

        expect((<any>auth)._user).toBeNull();
    }));

    it('logout - should clear timeout', inject([AuthService], (auth: AuthService) => {

        spyOn((<any>auth)._router, 'navigate');

        const spy = spyOn(window, 'clearTimeout');

        (<any>auth)._timeout = setTimeout(function() {}, 100);

        auth.logout();

        expect(spy).toHaveBeenCalled();
    }));

    it('logout - should call clear storage', inject([AuthService], (auth: AuthService) => {

        spyOn((<any>auth)._router, 'navigate');

        const spy = spyOn((<any>auth)._tokenStore, 'clearStorage');

        auth.logout();

        expect(spy).toHaveBeenCalled();
    }));

    it('logout - should navigate', inject([AuthService], (auth: AuthService) => {

        const spy = spyOn((<any>auth)._router, 'navigate');

        auth.logout();

        expect(spy).toHaveBeenCalledWith(['/login']);
    }));

    it('mapLoginResponse - should set jwt', inject([AuthService], (auth: AuthService) => {

        const responseMock = new Response(new ResponseOptions(<any>jwtMock));

        const backend: MockBackend = TestBed.get(XHRBackend);
        backend.connections
            .subscribe((connection: MockConnection) => {
                const url = connection.request.url;
                if (url === '/auth/token') {
                    mockBackendResponse(connection, JSON.stringify(<any>jwtMock));
                    // connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                }
            });

        auth.login('test', 'pwd').subscribe();
        expect((<any>auth)._tokenStore.token).toEqual(jwtMock);

    }));

    it('mapLoginResponse - should set jwt', inject([AuthService], (auth: AuthService) => {

        const spy = spyOn((<any>auth), 'scheduleRefresh');

        const responseMock = new Response(new ResponseOptions(<any>jwtMock));

        const backend: MockBackend = TestBed.get(XHRBackend);
        backend.connections
            .subscribe((connection: MockConnection) => {
                const url = connection.request.url;
                if (url === '/auth/token') {
                    mockBackendResponse(connection, JSON.stringify(jwtMock));
                    // connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                }
            });

        auth.login('test', 'pwd').subscribe();
        expect(spy).toHaveBeenCalled();

    }));

    it('isLoggedIn - should call _invalidToken', inject([AuthService], (auth: AuthService) => {

        const spy = spyOn((<any>auth), '_invalidToken');

         Object.defineProperty(
            (<any>auth)
                ._tokenStore, 'expiresDate', { get: () => '2015-07-16T22:00:00.000Z' });

        const responseMock = new Response(new ResponseOptions(<any>jwtMock));

        const backend: MockBackend = TestBed.get(XHRBackend);
        backend.connections
            .subscribe((connection: MockConnection) => {
                const url = connection.request.url;
                if (url === '/auth/token_refresh') {
                    connection.mockError(new Error('error'));
                }
            });

        const result = auth.isLoggedIn;
        expect(spy).toHaveBeenCalled();

    }));

    it('isLoggedIn - should call clearStorage', inject([AuthService], (auth: AuthService) => {

        spyOn((<any>auth)._router, 'navigate');

        const spy = spyOn((<any>auth)._tokenStore, 'clearStorage');

         Object.defineProperty(
            (<any>auth)
                ._tokenStore, 'expiresDate', { get: () => '2015-07-16T22:00:00.000Z' });

        const responseMock = new Response(new ResponseOptions(<any>jwtMock));

        const backend: MockBackend = TestBed.get(XHRBackend);
        backend.connections
            .subscribe((connection: MockConnection) => {
                const url = connection.request.url;
                if (url === '/auth/token_refresh') {
                    connection.mockError(new Error('error'));
                }
            });

        const result = auth.isLoggedIn;
        expect(spy).toHaveBeenCalled();

    }));

    // it('isLoggedIn - should navigate to /login', inject([AuthService], (auth: AuthService) => {

    //     const spy = spyOn((<any>auth)._router, 'navigate');

    //     Object.defineProperty(
    //         (<any>auth)
    //             ._tokenStore, 'token', { get: () => jwtMock });

    //      Object.defineProperty(
    //         (<any>auth)
    //             ._tokenStore, 'expiresDate', { get: () => '2015-07-16T22:00:00.000Z' });

    //     const backend: MockBackend = TestBed.get(XHRBackend);
    //     backend.connections
    //         .subscribe((connection: MockConnection) => {
    //             const url = connection.request.url;
    //             if (url === '/auth/token_refresh') {
    //                 connection.mockError(new Error('error'));
    //             }
    //         });

    //     const result = auth.isLoggedIn;
    //     expect(spy).toHaveBeenCalled();

    // }));

    it('sheduleRefresh - should call clearTimeout when timeout is set', inject([AuthService], (auth: AuthService) => {

        const spy = spyOn(window, 'clearTimeout');

        (<any>auth)._timeout = setTimeout(function() { }, 123);

        (<any>auth).scheduleRefresh(123456);

        expect(spy).toHaveBeenCalled();
    }));

});
