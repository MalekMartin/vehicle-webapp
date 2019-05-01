import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tire, TireStatus } from '../tires.interface';

@Component({
    selector: 'va-tire-card',
    templateUrl: './tire-card.component.html',
    styleUrls: ['./tire-card.component.scss']
})
export class TireCardComponent {

    @Input() tire: Tire;
    @Output() selected = new EventEmitter();
    @Output() showDetail = new EventEmitter();
    @Output() updateStatus = new EventEmitter();
    @Output() changeTire = new EventEmitter();
    @Output() edit = new EventEmitter<Tire>();
    @Output() delete = new EventEmitter<Tire>();

    marked = false;

    select(tire: Tire) {
        this.selected.emit(tire);
    }

    show() {
        this.showDetail.emit(this.tire);
    }

    newStatus(status: TireStatus) {
        this.updateStatus.emit({ tire: this.tire, status });
    }

    changeTireClicked(status: TireStatus) {
        this.changeTire.emit({ tire: this.tire, status: status });
    }
}
