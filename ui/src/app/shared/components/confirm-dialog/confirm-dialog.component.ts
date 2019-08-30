import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
    selector: 'va-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnDestroy, AfterViewInit {
    @ViewChild('dialog', {static: false}) dialog: ModalDirective;
    @ViewChild('btnCancel', {static: false}) btnCancel: ElementRef;
    @ViewChild('btnOk', {static: false}) btnOk: ElementRef;
    modalSubscription: Subscription;

    title: string;
    message: string;

    ok: string;
    cancel: string;

    constructor() {}

    subscribeToDialog(): Observable<boolean> {
        return Observable.create(observer => {
            const cancel$ = fromEvent(this.btnCancel.nativeElement, 'click');
            const ok$ = fromEvent(this.btnOk.nativeElement, 'click');

            this.modalSubscription = merge(
                cancel$.pipe(mapTo(false)),
                ok$.pipe(mapTo(true)),
                this.dialog.onHidden.pipe(mapTo(false))
            ).subscribe(result => {
                this.dialog.hide();
                observer.next(result);
            });
        });
    }

    ngAfterViewInit() {
        this.dialog.show();
    }

    ngOnDestroy() {
        if (this.modalSubscription) {
            this.modalSubscription.unsubscribe();
        }
    }
}
