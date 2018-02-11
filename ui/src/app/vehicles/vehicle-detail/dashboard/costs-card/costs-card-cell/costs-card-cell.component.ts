import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'va-costs-card-cell',
    template: `
    <div class="cell" [class.total]="isTotal">
        <div class="flex-1">
            <div class="title">{{title}}</div>
            <div class="value">{{value | formatNumber: 'Kč'}}</div>
        </div>
        <div *ngIf="!isTotal" class="percentage">
            {{percentage | formatNumber: '%'}}
        </div>
    </div>`,
    styleUrls: ['costs-card-cell.component.scss']
})

export class CostsCardCellComponent implements OnInit {

    @Input() total: number;
    @Input() value: number;
    @Input() isTotal = false;
    @Input() title: string;

    percentage = 0;

    constructor() { }

    ngOnInit() {
        this.percentage = this.total > 0
                            ? Math.round((this.value / this.total) * 100)
                            : 0;
    }
}
