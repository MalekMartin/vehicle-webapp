import { Component, OnChanges, Input } from '@angular/core';

@Component({
    selector: 'va-info-detail',
    templateUrl: './info-detail.component.html',
    styleUrls: ['./info-detail.component.scss']
})
export class InfoDetailComponent implements OnChanges {

    @Input() info: any;

    owners: number[];

    constructor() { }

    ngOnChanges() {
        this.owners = this.arrayFromNumber(this.info.previousOwners);
    }

    arrayFromNumber(j: number): number[] {

        if (!j) return [];

        const a = [];
        for (let i = 0; i < j; i++) {
            a.push(i);
        }
        return a;
    }
}
