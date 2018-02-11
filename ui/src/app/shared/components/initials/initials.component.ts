import { Component, Input } from '@angular/core';

@Component({
    selector: 'va-initials',
    template: `
    <!--<div class="icon" [title]="text">-->
        <div *ngIf="!color && !image"
            class="letter"
            [ngClass]="'size-' + size"
            [vaColorFromString]="text">{{letters}}</div>
        <div *ngIf="color && !image"
            class="letter"
            [ngClass]="'size-' + size"
            [style.backgroundColor]="'#' + color">{{letters}}</div>
        <img *ngIf="!!image" [src]="image" [ngClass]="'size-' + size">
    <!--</div>-->`,
    styleUrls: ['./initials.component.scss']
})
export class InitialsComponent {

    @Input() set text(t:string) {
        this._text = !!t ? t : '?';
    }

    @Input() size = 'l';

    @Input() set color(c:string) {
        if (c) {
            this._color = c;
        }
    }

    @Input() set charSize(s: number) {
        this._charSize = !!s && s > 0 && s < 3 ? s : 2;
    }

    @Input() image;

    letter = '?';

    private _charSize: number;
    private _color: string;
    private _text: string;

    constructor() { }

    get color(): string {
        return this._color;
    }

    get text(): string {
        return this._text;
    }

    get charSize(): number {
        return this._charSize;
    }

    get letters() {

        if (!this.text) return '?';

        const splittedText = this._text.split(' ');

        if (this.charSize === 1) return this._text.charAt(0).toUpperCase();

        if (splittedText.length > 1) {
            return splittedText[0].charAt(0).toUpperCase()
                    + splittedText[splittedText.length - 1].charAt(0);
        } else {
            return  splittedText[0].charAt(0).toUpperCase()
                    + splittedText[0].charAt(1);
        }
    }
}
