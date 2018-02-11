import { Component, OnInit, Input } from '@angular/core';
import { Trade } from '../../../../../shared/api/trade/trade';

@Component({
    selector: 'va-trade-detail',
    templateUrl: './trade-detail.component.html',
    styleUrls: ['./trade-detail.component.scss']
})
export class TradeDetailComponent implements OnInit {

    @Input() trade: Trade;

    constructor() { }

    ngOnInit() { }
}
