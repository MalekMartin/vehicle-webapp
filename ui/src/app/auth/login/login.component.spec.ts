import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastModule, ToastsManager, ToastOptions } from 'ng6-toastr/ng2-toastr';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Router } from '@angular/router';
import { CoreModule } from '../../core/core.module';
import { jwtMock } from '../../core/token.store.spec';
import { mockBackendResponse } from '../../../testing/http';
import { HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {

    let fixture: ComponentFixture<LoginComponent>;
    let component: LoginComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule,
                CoreModule.forRoot(),
                RouterTestingModule,
                ToastModule,
            ],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                LoginComponent
            ],
            providers: [
                ToastsManager,
                ToastOptions,
                AuthService,
                { provide: XHRBackend, useClass: MockBackend },
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
    });

    it ('should define component', () => {
        expect(component).toBeDefined();
    });

    it('should init form on component creation', () => {
        expect(component.form.get('email')).toBeDefined();
        expect(component.form.get('password')).toBeDefined();
        expect(component.form.get('remember')).toBeDefined();
    });

    it('should navigate on success login', inject([Router], (router: Router) => {

        const spy = spyOn(router, 'navigate');
        spyOn((<any>component)._toastr,'error');

        const backend: MockBackend = TestBed.get(XHRBackend);
        backend.connections
            .subscribe((connection: MockConnection) => {
                const url = connection.request.url;
                if (url === '/auth/token') {
                    mockBackendResponse(connection, JSON.stringify(<any>jwtMock));
                    // connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                }
            });

        component.form.setValue({
            email: 'test',
            password: 'pwd',
            remember: false
        });

        fixture.detectChanges();

        component.logUser();

        expect(spy).toHaveBeenCalledWith(['/']);
    }));

    it('should show error toastr on login error', () => {

        const spy = spyOn((<any>component)._toastr,'error');

        const backend: MockBackend = TestBed.get(XHRBackend);
        backend.connections
            .subscribe((connection: MockConnection) => {
                const url = connection.request.url;

                if (url === '/auth/token') {
                    connection.mockError(new Error('error'));
                }
            });

        component.logUser();

        expect(spy).toHaveBeenCalled();
    });
});
