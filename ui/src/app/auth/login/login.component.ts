import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { AuthService } from '../../core/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'va-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
    form = this._form.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        remember: [false]
    });

    loading = false;
    invalidToken = this._route.snapshot.params['invalid_token'];

    private _onDestroy$ = new Subject();

    constructor(
        private _form: FormBuilder,
        private _auth: AuthService,
        private _router: Router,
        private _toastr: ToastsManager,
        private _route: ActivatedRoute
    ) {}

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    logUser() {
        this.loading = true;
        this._auth
            .login(this.form.value.email, this.form.value.password, this.form.value.remember)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onLoginSuccess, this._onLoginError);
    }

    private _onLoginSuccess = () => {
        this.loading = false;
        this._router.navigate(['/']);
    };

    private _onLoginError = e => {
        this.loading = false;
        if (e.status === 504) {
            this._toastr.error('Server je dočasně nedostupný, zkus se přihlísit později');
        } else if (e.status === 400) {
            this._toastr.error('Chybné přihlašovací údaje');
        } else {
            this._toastr.error('Nelze se přihlásit!');
        }
    };
}
