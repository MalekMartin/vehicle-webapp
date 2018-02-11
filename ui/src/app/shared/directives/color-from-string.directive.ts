import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[vaColorFromString]'
})
export class ColorFormStringDirective {

    @Input('vaColorFromString') set s(s:string) {
        const color = s ? this.intToRGB(this.hashCode(s)) : 'CCCCCC';
        this.el.nativeElement.style.backgroundColor = '#' + color;
    }

    constructor(private el: ElementRef) {
    }

    hashCode(str): any { // java String#hashCode
        if (!str) return '';
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    }

    intToRGB(i) {
        if (!i) return 'CCCCCC';
        const c = (i & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();

        return '00000'.substring(0, 6 - c.length) + c;
    }

}
