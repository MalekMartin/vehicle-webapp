import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
    selector: 'va-slim-bar',
    styleUrls: ['./slim-bar.component.scss'],
    template: `
        <div class="main"
            [matTooltip]="showTooltip ? width.toFixed(0) + '% objemu nádrže' : ''">
            <div class="bar" [style.width]="width + '%'"></div>
        </div>
    `
})
export class SlimBarComponent implements OnInit {
    @Input() max: number;
    @Input() value: number;
    @Input() showTooltip = false;

    width = 0;

    constructor() {}

    ngOnInit() {
        const computedWidth = (this.value / this.max) * 100;
        this.width = computedWidth > 100 ? 100 : computedWidth;
    }
}
