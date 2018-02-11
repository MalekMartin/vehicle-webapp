import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'va-activation-status',
    styleUrls: ['activation-status.component.scss'],
    template: `
        <h3>{{header}}</h3>
        <div>{{message}}</div>

        <a [routerLink]="['/login']">Zpět na přihlášní</a>
    `
})

export class ActivationStatusComponent implements OnInit {

    @Input() status: 'NOT_FOUND' | 'EXPIRED' | 'ERROR' | null;

    header: string;
    message: string;

    constructor() { }

    ngOnInit() {
        this.header = STATUSES[this.status].header;
        this.message = STATUSES[this.status].message;
    }
}

const STATUSES = {
    'NOT_FOUND': {
        header: 'Aktivační kód neexistuje',
        message: 'Tento aktivační kód nebyl nalezen. Prosím otevřete odkaz v aktivačním emailu.'
    },
    'EXPIRED': {
        header: 'Aktivační kód je neplatný',
        message: 'Pro obdržení nového aktivačního kódu se musíte znovu zaregistrovat'
    },
    'ERROR': {
        header: 'Chyba',
        message: 'Nastala nečekaná chyba. Zkuste aktivaci později'
    }
};
