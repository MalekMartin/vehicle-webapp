import { Component, Input } from '@angular/core';

@Component({
    selector: 'va-info-detail-item',
    styleUrls: ['./info-detail-item.component.scss'],
    template: `
        <div class="info" [class.wrap]="wrap">
            <div class="info-text">{{ label }}</div>
            <div class="info-value">{{ value }}</div>
        </div>
    `
})
export class InfoDetailItemComponent {
    @Input() label: string;
    @Input() value: string;
    @Input() wrap = false;
}
