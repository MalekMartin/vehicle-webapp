import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'va-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

    @Input() start:number;
    @Input() end:number;
    @Input() now:number;

    width = 100;
    error = false;

    constructor() { }

    ngOnInit() {

        if (this.end > this.start && this.now >= this.start) {
            const full = this.end - this.start;
            this.width = (((this.now - this.start) / full) * 100);
        } else {
            this.error = true;
        }
    }

}
