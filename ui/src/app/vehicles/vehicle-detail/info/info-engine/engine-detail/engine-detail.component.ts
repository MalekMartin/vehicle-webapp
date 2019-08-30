import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { VehicleInfo } from '../../../../vehicle-stream/vehicle';
import { EngineFormComponent } from '../engine-form/engine-form.component';

@Component({
    selector: 'va-engine-detail',
    templateUrl: './engine-detail.component.html',
    styleUrls: ['./engine-detail.component.scss']
})
export class EngineDetailComponent implements OnInit {
    @Input() vehicle: VehicleInfo;

    constructor(public dialog: MatDialog) {}

    ngOnInit() {}

    edit() {
        this.dialog.open(EngineFormComponent, {
            width: '400px',
            data: this.vehicle
        });
    }
}
