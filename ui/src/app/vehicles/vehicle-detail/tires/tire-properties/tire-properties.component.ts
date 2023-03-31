import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { TireProperty } from '../tires.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../../../shared/components/confirm/confirm.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TirePropertiesState } from '../core/tire-properties.state';

@Component({
    selector: 'va-tire-properties',
    templateUrl: './tire-properties.component.html',
    styleUrls: ['./tire-properties.component.scss'],
    animations: [
        trigger('delete', [
            state('active', style({ transform: 'translateX(0)' })),
            state('deleted', style({ transform: 'translateX(-100%)', display: 'none' })),
            transition('active => deleted', animate('200ms ease-in'))
        ]),
        trigger('add', [
            state('hidden', style({ transform: 'translateX(-100%)' })),
            state('active', style({ transform: 'translateX(0)' })),
            transition('hidden => active', animate('200ms ease'))
        ])
    ]
})
export class TirePropertiesComponent implements OnDestroy {
    @Input() state: TirePropertiesState;

    @Output() changed = new EventEmitter();
    @Output() edit = new EventEmitter<TireProperty>();
    @Output() delete = new EventEmitter<TireProperty>();

    private _onDestroy$ = new Subject();

    constructor(private _dialog: MatDialog) {}

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    deleteConfirm(prop: TireProperty) {
        this._dialog
            .open(ConfirmComponent, {
                width: '400px',
                data: {
                    title: 'Smazat parametr',
                    message: `Opravdu chceš smazat <b>${prop.name}</b>?`,
                    yes: 'Smazat',
                    no: 'Ne'
                }
            })
            .afterClosed()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(val => {
                if (!!val) {
                    this.delete.emit(prop);
                }
            });
    }
}
