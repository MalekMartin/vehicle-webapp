import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from '../../../vehicle-stream/vehicle';
import { HttpService } from '../../../../core/http.service';
import { InfoService } from './info.service';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';

@Component({
    selector: 'va-info-general',
    templateUrl: './info-general.component.html',
    styleUrls: ['./info-general.component.scss']
})
export class InfoGeneralComponent implements OnInit {

    @Input() info: Vehicle;

    edited = false;

    constructor(private _info: InfoService,
                private _toastr: ToastsManager) { }

    ngOnInit() { }

    save(data) {
        // this._http
        //     .post('/info', data.vehicleId)
        //     .subscribe((i:any) => {
        //         this.info = i;
        //         this.edited = false;
        //         // this._toastr.success('Motor byl úspěšně editován', 'Uloženo!');
        //     });
        this._info
            .updateInfo(data)
            .subscribe(this._onUpdateSuccess, this._onUpdateError);
    }

    cancel() {
        this.edited = false;
    }

    private _onUpdateSuccess = (res) => {
        this.info = res;
        this._toastr.success('Info bylo úspěšně aktualizováno.');
        this.edited = false;
    }

    private _onUpdateError = () => {
        this._toastr.error('Info nebylo aktualizováno.');
    }
}
