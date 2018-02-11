import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { HttpService } from '../../core/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'va-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    form = this._form.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        remember: [false]
    });

    loading = false;
    invalidToken = this._route.snapshot.params['invalid_token'];

    constructor(private _form:FormBuilder,
                private _auth:AuthService,
                private _router:Router,
                private _toastr:ToastsManager,
                private _route: ActivatedRoute) {
    }

    logUser() {
        this.loading = true;
        this._auth
            .login(this.form.value.email, this.form.value.password, this.form.value.remember)
            .subscribe(this._onLoginSuccess, this._onLoginError);
    }

    private _onLoginSuccess = () => {
        this.loading = false;
        this._router.navigate(['/']);
    }

    private _onLoginError = (e) => {
        this.loading = false;
        if (e.status === 504) {
            this._toastr.error('Server je dočasně nedostupný, zkus se přihlísit později');
        } else if (e.status === 400) {
            this._toastr.error('Chybné přihlašovací údaje');
        } else {
            this._toastr.error('Nelze se přihlísit!');
        }
    }
}
