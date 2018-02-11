import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../../../core/http.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Trade } from '../../../../shared/api/trade/trade';

@Component({
    selector: 'va-trade',
    templateUrl: './trade.component.html',
    styleUrls: ['./trade.component.scss']
})
export class TradeComponent {

    @Input() trade: any;

    @Input() set type(t: string) {
        this.title = t === 'buyer' ? 'Kupující' : 'Prodejce';
        this.url = t === 'buyer'
                    ? '/resource/buyer/'
                    : '/resource/seller/';
    }

    title: string;

    showForm = false;
    url: string;

    constructor(private _http:HttpService,
                private _toastr:ToastsManager) { }

    save(trade: Trade) {
        this._http
            .post(this.url + trade.vehicleId, trade)
            .subscribe((t: Trade) => {
                this.trade = t;
                this.showForm = false;
                this._toastr.success(this.title + ' úspěšně upraven','Uloženo');
            });
    }

    cancel() {
        this.showForm = false;
    }
}
