import { Component, OnInit, Input } from '@angular/core';
import { RepairTask } from '../_core/repair-task.interface';

@Component({
    selector: 'va-repair-task',
    template: `
        <div>
            {{task.title}}
            {{task.quntity}}
            {{task.price}}
        </div>
    `,
    styleUrls: ['./repair-task.component.scss']
})

export class RepairTaskComponent implements OnInit {

    @Input() task: RepairTask;

    constructor() { }

    ngOnInit() { }
}
