import { ViewChild, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Component,	Directive } from '@angular/core';

@Component({
    selector: 'va-routed-modal-content',
    templateUrl: 'routed-modal-content.component.html',
    styleUrls: ['routed-modal-content.component.scss'],
})
export class RoutedModalContentComponent implements OnInit, AfterViewInit {

    @Input() size = 'modal-lg';
    @Input() backdrop: boolean | 'static' = false;
    @Output() cancel = new EventEmitter();

    @ViewChild('routedModal', {static: false}) dialog: ModalDirective;

    keyboard = true;

    ngOnInit() {
        if (this.backdrop === 'static') {
            this.keyboard = false;
        }
    }

    ngAfterViewInit() {
        this.show();
    }

    show() {
        this.dialog.show();
    }

    back() {
        if (this.backdrop !== 'static') {
            this.dialog.hide();
        }
        this.cancel.emit();
    }
}

@Directive({
    selector: '[vaRoutedModalContentTitle]'
})
export class RoutedModalContentTitleSelectorDirective {}

@Directive({
    selector: '[vaRoutedModalContentBody]'
})
export class RoutedModalContentBodySelectorDirective {}

@Directive({
    selector: '[vaRoutedModalContentFooter]'
})
export class RoutedModalContentFooterSelectorDirective {}
