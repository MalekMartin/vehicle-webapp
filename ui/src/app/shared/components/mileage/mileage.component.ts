import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'va-mileage',
    template: `
    <div>
        <i [class]="icon"></i>
        <span *ngIf="unit !== 'date'">{{(value || '0') | formatNumber}} {{unit}}</span>
        <span *ngIf="unit === 'date'">{{value | moment: 'DD.MM.YYYY'}}</span>
    </div>`,
    styleUrls: ['./mileage.component.scss']
})
export class MileageComponent {

    @Input() value = 0;
    @Input() unit:string;

    constructor() { }

    get icon() {
        if (this.unit === 'km') return 'icon-meter';
        if (this.unit === 'mh') return 'icon-stopwatch';
        if (this.unit === 'date') return 'icon-calendar';
        return '';
    }
}
