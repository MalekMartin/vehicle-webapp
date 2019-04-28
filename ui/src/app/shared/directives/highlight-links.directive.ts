import { Directive, Input, ElementRef } from '@angular/core';

@Directive({ selector: '[vaMatchLinks]' })
export class MatchLinksDirective {
    // tslint:disable-next-line: no-input-rename
    @Input('vaMatchLinks') set vaMatchLinks(text: string) {
        this.match(text);
    }

    constructor(private _elRef: ElementRef) {}

    match(text: string) {
        const links = text.match(/\bhttps?:\/\/\S+/gim);

        let result = text;
        if (!!links && links.length > 0) {
            for (let i = 0; i < links.length; i++) {
                result = result.replace(
                    links[i],
                    `<a href="${links[i]}" target="_blank">${links[i]}</a>`
                );
            }
        }
        this._elRef.nativeElement.innerHTML = result;
    }
}
