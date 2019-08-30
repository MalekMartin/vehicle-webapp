import { Component, OnInit, Input } from '@angular/core';
import { Trade } from '../../../../../shared/api/trade/trade';
import { MatDialog } from '@angular/material';
import { TradeFormComponent } from '../trade-form/trade-form.component';
import { VehicleInfo } from '../../../../vehicle-stream/vehicle';

@Component({
    selector: 'va-trade-detail',
    templateUrl: './trade-detail.component.html',
    styleUrls: ['./trade-detail.component.scss']
})
export class TradeDetailComponent implements OnInit {
    @Input() vehicle: VehicleInfo;
    @Input() type: 'buyer' | 'seller';
    expanded = false;
    trade: Trade;
    title: string;

    constructor(public dialog: MatDialog) {}

    ngOnInit() {
        this.trade = this.type === 'seller' ? this.vehicle.seller : this.vehicle.buyer;
        this.title = this.type === 'seller' ? 'Prodávající' : 'Kupující';
    }

    toggleContent() {
        this.expanded = !this.expanded;
    }

    edit() {
        this.dialog.open(TradeFormComponent, {
            width: '400px',
            data: {
                vehicle: this.vehicle,
                type: this.type
            }
        });
    }
}
