import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { mockBackendResponse } from '../../../testing/http';
import { AuthService } from '../../core/auth.service';
import { CoreModule } from '../../core/core.module';
import { jwtMock } from '../../core/token.store.spec';
import { LoginComponent } from './login.component';

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
                ToastrModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [LoginComponent],
            providers: [
                ToastrService,
                AuthService,
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
    });

    it('should define component', () => {
        expect(component).toBeDefined();
    });

    it('should init form on component creation', () => {
        expect(component.form.get('email')).toBeDefined();
        expect(component.form.get('password')).toBeDefined();
        expect(component.form.get('remember')).toBeDefined();
    });

    // it('should navigate on success login', inject([Router], (router: Router) => {
    //     const spy = spyOn(router, 'navigate');
    //     spyOn((<any>component)._toastr, 'error');

    //     const backend: MockBackend = TestBed.get(XHRBackend);
    //     backend.connections.subscribe((connection: MockConnection) => {
    //         const url = connection.request.url;
    //         if (url === '/auth/token') {
    //             mockBackendResponse(connection, JSON.stringify(<any>jwtMock));
    //             // connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
    //         }
    //     });

    //     component.form.setValue({
    //         email: 'test',
    //         password: 'pwd',
    //         remember: false
    //     });

    //     fixture.detectChanges();

    //     component.logUser();

    //     expect(spy).toHaveBeenCalledWith(['/']);
    // }));

    // it('should show error toastr on login error', () => {
    //     const spy = spyOn((<any>component)._toastr, 'error');

    //     const backend: MockBackend = TestBed.get(XHRBackend);
    //     backend.connections.subscribe((connection: MockConnection) => {
    //         const url = connection.request.url;

    //         if (url === '/auth/token') {
    //             connection.mockError(new Error('error'));
    //         }
    //     });

    //     component.logUser();

    //     expect(spy).toHaveBeenCalled();
    // });
});
