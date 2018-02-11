import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { VValidators } from '../../../shared/forms/validators';
import { AuthService } from '../../../core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'va-activation-form',
    templateUrl: 'activation-form.component.html',
    styleUrls: ['activation-form.component.scss']
})

export class ActivationFormComponent implements OnInit {

    form = this._fb.group({
        code: this._route.snapshot.params['code'],
        firstName: ['', Validators.required],
        lastName: '',
        pwds: this._fb.group({
            pwd: ['', [Validators.required, VValidators.validatePassword, Validators.minLength(6), Validators.maxLength(16)]],
            pwdCheck: ['', Validators.required]
        }, {validator: VValidators.passwordMatches})
    });

    constructor(private _fb: FormBuilder,
                private _auth: AuthService,
                private _router: Router,
                private _toastr: ToastsManager,
                private _route: ActivatedRoute) { }

    ngOnInit() { }

    finishRegistration() {
        this._auth.finishRegistration(this.form.value)
            .subscribe(this._onSuccess, this._onError);
    }

    private _onSuccess = () => {
        this._router.navigate(['/login']);
    }

    private _onError = () => {
        this._toastr.error('Nepodařilo se dokončit registraci.');
    }
}
