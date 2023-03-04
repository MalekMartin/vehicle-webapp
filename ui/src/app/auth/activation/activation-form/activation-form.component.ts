import { Component, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../core/auth.service';
import { VValidators } from '../../../shared/forms/validators';

@Component({
    selector: 'va-activation-form',
    templateUrl: 'activation-form.component.html',
    styleUrls: ['activation-form.component.scss']
})
export class ActivationFormComponent implements OnDestroy {
    form = this._fb.group({
        code: this._route.snapshot.params['code'],
        firstName: ['', Validators.required],
        lastName: '',
        pwds: this._fb.group(
            {
                pwd: [
                    '',
                    [
                        Validators.required,
                        VValidators.validatePassword,
                        Validators.minLength(6),
                        Validators.maxLength(16)
                    ]
                ],
                pwdCheck: ['', Validators.required]
            },
            { validator: VValidators.passwordMatches }
        )
    });

    private _onDestroy$ = new Subject();

    constructor(
        private _fb: UntypedFormBuilder,
        private _auth: AuthService,
        private _router: Router,
        private _toastr: ToastrService,
        private _route: ActivatedRoute
    ) {}

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    finishRegistration() {
        this._auth
            .finishRegistration(this.form.value)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onSuccess, this._onError);
    }

    private _onSuccess = () => {
        this._router.navigate(['/login']);
    };

    private _onError = () => {
        this._toastr.error('Nepodařilo se dokončit registraci.');
    };
}
