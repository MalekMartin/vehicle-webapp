import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'va-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})

export class ConfirmDialogComponent implements OnDestroy, AfterViewInit {

    @ViewChild('dialog') dialog: ModalDirective;
    // @ViewChild('btnClose') btnClose: ElementRef;
    @ViewChild('btnCancel') btnCancel: ElementRef;
    @ViewChild('btnOk') btnOk: ElementRef;
    modalSubscription: Subscription;

    title: string;
    message: string;

    ok: string;
    cancel: string;

    constructor() { }

    subscribeToDialog(): Observable<boolean> {

        return Observable.create(observer => {
            // const close$ = Observable.fromEvent(this.btnClose.nativeElement, 'click');
            const cancel$ = Observable.fromEvent(this.btnCancel.nativeElement, 'click');
            const ok$ = Observable.fromEvent(this.btnOk.nativeElement, 'click');

            this.modalSubscription = Observable.merge(
                // close$.mapTo(false),
                cancel$.mapTo(false),
                ok$.mapTo(true),
                this.dialog.onHidden.asObservable().mapTo(false)
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
