import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { VValidators } from '../../shared/forms/validators';
import { AuthService } from '../../core/auth.service';

@Component({
    selector: 'va-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.scss']
})

export class RegisterComponent implements OnInit {

    loading = false;
    form = this._fb.group({
        email: ['@', [Validators.required, VValidators.validateEmail]]
    });

    registered = false;
    error = false;

    constructor(private _fb: FormBuilder,
                private _auth: AuthService) { }

    ngOnInit() { }

    register() {
        this.loading = true;
        this.error = false;
        this._auth.register(this.form.get('email').value)
            .subscribe(this._onSuccess, this._onError);
    }

    private _onSuccess = () => {
        this.registered = true;
        this.loading = false;
    }

    private _onError = (error) => {
        if (error.status === 409) {
            this.error = true;
        }
        this.loading = false;
    }
}
