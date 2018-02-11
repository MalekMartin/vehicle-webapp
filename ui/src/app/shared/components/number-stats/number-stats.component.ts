import { Component, Input } from '@angular/core';

@Component({
    selector: 'va-number-stats',
    styleUrls: ['./number-stats.component.scss'],
    template: `
        <div class="stats">
            <ng-container *ngFor="let stat of stats">
                <div class="card">
                    <div class="numbers">{{(stat.value | formatNumber) || 0}} {{stat.unit}}</div>
                    <div class="description">{{stat.label}}</div>
                </div>
            </ng-container>
        </div>
    `
})

export class NumberStatsComponent {

    @Input()
    set stats(s: NumberStat[]) {
        this._stats = s;
    }

    private _stats: NumberStat[];

    constructor() { }

    get stats(): NumberStat[] {
        return this._stats;
    }
}

export interface NumberStat {
    value: number;
    label: string;
    unit: string;
}
