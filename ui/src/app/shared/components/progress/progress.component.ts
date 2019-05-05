import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'va-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
    @Input() start: number;
    @Input() end: number;
    @Input() now: number;

    width = 100;
    error = false;

    constructor() {}

    ngOnInit() {
        if (this.end > this.start && this.now >= this.start) {
            const full = this.end - this.start;
            const result = ((this.now - this.start) / full) * 100;
            this.width = result > 100 ? 100 : result;
        } else if (this.end > this.start && this.now < this.start) {
            const full = this.end - this.start;
            this.width = 0
        } else {
            this.error = true;
        }
    }
}
