import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { stringify } from 'querystring';
import { ConfirmComponent, ConfirmDialogData } from './confirm.component';

@Injectable()
export class ConfirmService {
    constructor(private dialog: MatDialog) { }
    
    open(message: string, title?: string, yes?: string, no?: string) {
        return this.dialog.open(ConfirmComponent, {
            data: {
                title: title || '',
                message,
                yes: yes || 'Ano',
                no: no || 'Ne',
            }
        }).afterClosed();
    }
}