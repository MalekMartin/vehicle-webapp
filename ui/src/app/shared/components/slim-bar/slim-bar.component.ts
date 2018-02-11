import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
    selector: 'va-slim-bar',
    template: `
        <div class="main" [tooltip]="showTooltip ? width.toFixed(0) + '% objemu nádrže' : ''" [placement]="vaPlacement">
            <div class="bar" [style.width]="width + '%'"></div>
        </div>
    `,
    styleUrls: ['./slim-bar.component.scss']
})

export class SlimBarComponent implements OnInit {

    @Input() max: number;
    @Input() value: number;
    @Input() showTooltip = false;
    @Input() vaPlacement = 'bottom';

    width = 0;

    constructor() { }

    ngOnInit() {
        const computedWidth = (this.value / this.max) * 100;
        this.width = computedWidth > 100 ? 100 : computedWidth;
    }
}
