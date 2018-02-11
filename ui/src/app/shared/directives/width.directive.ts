import { Directive, ElementRef, HostListener, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[vaWidth]'
})
export class WidthDirective implements OnChanges {

    @Input('vaWidth') vaWidth;

    constructor(private el: ElementRef) {
    }

    ngOnChanges() {
        this.vaWidth = !!this.vaWidth ? this.vaWidth : '0';
        this.el.nativeElement.style.width = this.vaWidth + '%';
    }
}
