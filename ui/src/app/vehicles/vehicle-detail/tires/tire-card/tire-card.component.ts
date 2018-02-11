import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tire } from '../tires.interface';

@Component({
    selector: 'va-tire-card',
    templateUrl: './tire-card.component.html',
    styleUrls: ['./tire-card.component.scss']
})
export class TireCardComponent implements OnInit {

    @Input() tire: Tire;
    @Output() selected = new EventEmitter();
    @Output() showDetail = new EventEmitter();
    @Output() updateStatus = new EventEmitter();
    @Output() tireChanged = new EventEmitter();
    @Output() edited = new EventEmitter();
    @Output() deleted = new EventEmitter();

    marked = false;

    constructor() { }

    ngOnInit() { }

    select(tire: Tire) {
        this.selected.emit(tire);
    }

    show() {
        this.showDetail.emit(this.tire);
    }

    newStatus(status: string) {
        this.updateStatus.emit({tire: this.tire, status: status});
    }

    changeTire(status: string) {
        this.tireChanged.emit({tire: this.tire, status: status});
    }

    edit() {
        this.edited.emit(this.tire);
    }

    delete() {
        this.deleted.emit(this.tire);
    }
}
