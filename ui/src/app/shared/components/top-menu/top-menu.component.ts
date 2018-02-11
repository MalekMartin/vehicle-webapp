import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'va-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.scss'],
    animations: [
        trigger('toggle', [
            state('closed', style({right: '100%' })),
            state('opened', style({right: '0'})),
            transition('closed <=> opened', animate('200ms ease-in')),
        ]),
        trigger('toggleFog', [
            state('closed', style({display: 'none', opacity: 0})),
            state('opened', style({display: 'block', opacity: 0.5})),
            transition('closed <=> opened', animate('200ms ease-in')),
        ])
    ]
})
export class TopMenuComponent implements OnInit {

    menuState = 'closed';

    constructor(private _auth: AuthService,) { }

    ngOnInit() { }

    get user() {
        return this._auth.user;
    }

    logout() {
        this._auth.logout();
    }

    toggleMenu() {
        this.menuState = this.menuState === 'closed' ? 'opened' : 'closed';
    }

    hide() {
        this.menuState = 'closed';
    }
}
