import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TiresService } from '../core/tires.service';
import { Tire } from '../tires.interface';

@Component({
    selector: 'va-tire-preview',
    templateUrl: './tire-preview.component.html',
    styleUrls: ['./tire-preview.component.scss']
})
export class TirePreviewComponent implements OnInit, OnDestroy {
    tire: Tire;
    tireHistory: TireHistory[];
    loading = false;

    private _onDestroy$ = new Subject();

    constructor(private _service: TiresService, @Inject(MAT_DIALOG_DATA) public data: Tire) {}

    ngOnInit() {
        if (!!this.data) {
            this.tire = this.data;
            this.getTireHistory(this.tire);
        }
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    getTireHistory(tire: Tire) {
        this.loading = true;
        this._service
            .getHistory(tire)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(
                (h: TireHistory[]) => {
                    this.tireHistory = h;
                    this.loading = false;
                },
                () => {
                    this.loading = false;
                }
            );
    }
}

export interface TireHistory {
    id: string;
    date: string;
    odo: number;
    odo2: number;
    status: string;
}
