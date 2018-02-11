import { Component, OnChanges, Input } from '@angular/core';
import { Tire } from '../tires.interface';
import { TiresService } from '../tires.service';

@Component({
    selector: 'va-tire-preview',
    templateUrl: './tire-preview.component.html',
    styleUrls: ['./tire-preview.component.scss']
})
export class TirePreviewComponent implements OnChanges {

    @Input() tire: Tire;
    tireHistory: TireHistory[];

    constructor(private _service: TiresService) { }

    ngOnChanges() {
        if (this.tire) {
            this._service
                .getHistory(this.tire)
                .subscribe((h: TireHistory[]) => {
                    this.tireHistory = h;
                });
        }
    }
}

export interface TireHistory {
    id: string;
    date: string;
    odo: number;
    odo2: number;
    status: string;
}
