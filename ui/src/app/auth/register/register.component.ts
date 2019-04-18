import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { VValidators } from '../../shared/forms/validators';
import { AuthService } from '../../core/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'va-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnDestroy {
    loading = false;
    form = this._fb.group({
        email: ['', [Validators.required, VValidators.validateEmail]]
    });

    registered = false;
    error = false;

    private _onDestroy$ = new Subject();

    constructor(private _fb: FormBuilder, private _auth: AuthService) {}

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    register() {
        this.loading = true;
        this.error = false;
        this._auth.register(this.form.get('email').value)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onSuccess, this._onError);
    }

    private _onSuccess = () => {
        this.registered = true;
        this.loading = false;
    };

    private _onError = error => {
        if (error.status === 409) {
            this.error = true;
        }
        this.loading = false;
    };
}
