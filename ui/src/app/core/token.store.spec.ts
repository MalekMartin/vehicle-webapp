import { CoreModule } from './core.module';
import { AppState } from '../app.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { TokenStore } from './token.store';
import { ToastModule, ToastsManager, ToastOptions } from 'ng6-toastr/ng2-toastr';

describe('TokenStore', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ToastModule,
                CoreModule.forRoot()
            ],
            providers: [
                ToastsManager,
                ToastOptions,
                TokenStore,
                AppState
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
    });

    it('Should set rememberMe to TRUE', inject([TokenStore], (store: TokenStore) => {

        store.rememberMe = true;

        expect(localStorage.getItem('vehicle.rememberMe')).toBeTruthy();
    }));

    it('Should set rememberMe to FALSE', inject([TokenStore], (store: TokenStore) => {

        store.rememberMe = false;

        expect(store.rememberMe).toBeFalsy();
    }));

    it('Should return localStorage', inject([TokenStore], (store: TokenStore) => {

        store.rememberMe = true;

        expect((<any>store).storage).toEqual(localStorage);
    }));

    it('Should return sessionStorage', inject([TokenStore], (store: TokenStore) => {

        store.rememberMe = false;

        expect((<any>store).storage).toEqual(sessionStorage);
    }));

    it('Should set token', inject([TokenStore], (store: TokenStore) => {

        store.rememberMe = false;
        store.token = jwtMock;

        expect(sessionStorage.getItem('vehicle.token')).toEqual(JSON.stringify(jwtMock));
    }));

    it('Should get token', inject([TokenStore], (store: TokenStore) => {

        store.rememberMe = false;
        store.token = jwtMock;

        expect(store.token).toEqual(jwtMock);
    }));

    it('Should set expiresDate', inject([TokenStore], (store: TokenStore) => {

        store.rememberMe = false;
        store.expiresDate = '123456';

        expect(sessionStorage.getItem('vehicle.expiresDate')).toEqual('123456');
    }));

    it('Should get expiresDate', inject([TokenStore], (store: TokenStore) => {

        store.rememberMe = false;
        store.expiresDate = '123456';

        expect(store.expiresDate).toEqual('123456');
    }));

    it('Should clear storage', inject([TokenStore], (store: TokenStore) => {

        store.rememberMe = false;
        store.expiresDate = '123466';
        store.token = jwtMock;

        store.rememberMe = true;
        store.expiresDate = '123466';
        store.token = jwtMock;

        store.clearStorage();

        expect(localStorage.getItem('expiresDate')).toBeNull();
        expect(localStorage.getItem('vehicle.token')).toBeNull();
        expect(sessionStorage.getItem('expiresDate')).toBeNull();
        expect(sessionStorage.getItem('vehicle.token')).toBeNull();
    }));

});

export const jwtMock = {
    user_id: 'test-user-1',
    access_token: '123',
    token_type: 'bearer',
    refresh_token: 'abc',
    expires_in: 0,
    scope: '',
    authorities: ['a-1'],
    jti: 'xxx'
};
