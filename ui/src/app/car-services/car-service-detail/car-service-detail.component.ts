import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GarageService } from '../garage/garage.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'va-car-service-detail',
    templateUrl: './car-service-detail.component.html',
    styleUrls: ['./car-service-detail.component.scss']
})

export class CarServiceDetailComponent implements OnInit, OnDestroy {

    service: any;
    repairs: any;

    private _serviceId: string;
    private _garageSubs: Subscription;
    private _repairsSubs: Subscription;

    constructor(private _route: ActivatedRoute,
                private _garages: GarageService,
                private _toastr: ToastrService) { }

    ngOnInit() {
        this._route.params
            .subscribe(p => {
                this._serviceId = p['id'];
                this.getGarage();
                this.getRepairs();
            });
    }

    ngOnDestroy() {
        if (this._garageSubs) {
            this._garageSubs.unsubscribe();
        }
    }

    getGarage() {
        this._garageSubs = this._garages
            .getGarage(this._serviceId)
            .subscribe(this._onGarageSuccess, this._onGarageError);
    }

    getRepairs() {
        this._repairsSubs = this._garages
            .getGarageRepairs(this._serviceId)
            .subscribe(this._onRepairsSuccess, this._onRepairsError);
    }

    private _onGarageSuccess = (s) => {
        this.service = s;
    }

    private _onGarageError = () => {
        this._toastr.error('Nepodařilo se načíst data');
    }

    private _onRepairsSuccess = (r) => {
        this.repairs = r;
    }

    private _onRepairsError = () => {
        this._toastr.error('Nepodařilo se načíst data');
    }
}
