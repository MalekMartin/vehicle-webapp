import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { InfoFormComponent } from '../info-form/info-form.component';

@Component({
    selector: 'va-info-detail',
    templateUrl: './info-detail.component.html',
    styleUrls: ['./info-detail.component.scss']
})
export class InfoDetailComponent implements OnDestroy {
    @Input() info: any;

    owners: number[];

    private _onDestroy$ = new Subject();

    constructor(public dialog: MatDialog) {}

    ngOnDestroy(): void {
        this._onDestroy$.next();
    }

    edit() {
        this.dialog.open(InfoFormComponent, {
            width: '400px',
            data: this.info
        });
    }
}
