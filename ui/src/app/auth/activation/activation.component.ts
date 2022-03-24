import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
    selector: 'va-activation',
    templateUrl: 'activation.component.html',
    styleUrls: ['activation.component.scss']
})
export class ActivationComponent implements OnInit {
    activationCode = this._route.snapshot.params['code'];
    status: 'VALID' | 'NOT_FOUND' | 'EXPIRED' | 'ERROR' | null = null;
    loading = true;

    constructor(private _route: ActivatedRoute, private _auth: AuthService) {}

    ngOnInit() {
        if (!!this.activationCode) {
            this._auth
                .getAtivationCodeStatus(this.activationCode)
                .subscribe(this._onSuccess, this._onError);
        }
    }

    private _onSuccess = u => {
        this.loading = false;
        this.status = 'VALID';
    };

    private _onError = e => {
        this.status = CODES[e.status];
        this.loading = false;
    };
}

const CODES = {
    '404': 'NOT_FOUND',
    '403': 'EXPIRED',
    '200': 'VALID'
};
