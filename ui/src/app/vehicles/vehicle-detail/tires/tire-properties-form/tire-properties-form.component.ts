import { Component, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Subscription ,  Observable, fromEvent, merge } from 'rxjs';
import { Validators, FormBuilder } from '@angular/forms';
import { mapTo } from 'rxjs/operators';

@Component({
    selector: 'va-tire-properties-form',
    templateUrl: './tire-properties-form.component.html',
    styleUrls: ['./tire-properties-form.component.scss']
})

export class TirePropertiesFormComponent implements OnDestroy, AfterViewInit {

    @ViewChild('dialog') dialog: ModalDirective;
    @ViewChild('btnClose') btnClose: ElementRef;
    @ViewChild('btnCancel') btnCancel: ElementRef;
    @ViewChild('btnSave') btnSave: ElementRef;
    modalSubscription: Subscription;
    title: string;

    form = this._form.group({
        id: [''],
        vehicleId: ['', Validators.required],
        name: ['', Validators.required],
        value: ['', Validators.required],
        tooltip: ['']
    });

    constructor(private _form: FormBuilder) { }

    subscribeToDialog(): Observable<any> {

        return Observable.create(observer => {
            const close$ = fromEvent(this.btnClose.nativeElement, 'click');
            const cancel$ = fromEvent(this.btnCancel.nativeElement, 'click');
            const save$ = fromEvent(this.btnSave.nativeElement, 'click');

            this.modalSubscription = merge(
                close$.pipe(mapTo(false)),
                cancel$.pipe(mapTo(false)),
                save$.pipe(mapTo(true)),
                this.dialog.onHidden.asObservable().pipe(mapTo(false))
            ).subscribe(result => {
                this.dialog.hide();
                observer.next({ form: this.form.value, result});
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
