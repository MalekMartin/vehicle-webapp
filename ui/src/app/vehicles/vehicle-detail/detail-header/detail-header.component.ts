import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from '../../vehicle-stream/vehicle';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { VehicleService } from '../../vehicle-stream/vehicle.service';
import { VehicleImageService } from '../../vehicle-stream/vehicle-images.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'va-detail-header',
    templateUrl: './detail-header.component.html',
    styleUrls: ['./detail-header.component.scss']
})
export class DetailHeaderComponent implements OnInit {

    vehicles: Vehicle[];

    @Input()
    set vehicle(v: Vehicle) {
        if (v) {
            this._vehicle = v;
            // this.vehicleIcon = this._images.getImage(v.id);
        }
    }

    page: string;
    id: string;

    path: string;

    private _vehicle: Vehicle;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _vehicles: VehicleService,
                private _images: VehicleImageService) {

        this._router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.path = this.parseUrl(this._router.url);
            }
        });
    }

    ngOnInit() {
        this._route
            .params
            .pipe(map(par => par))
            .subscribe(p => {
                this.page = p['page'];
                // this.id = p['id']
            });
    }

    get allVehicles() {
        return this._vehicles.allVehicles || [];
    }

    get vehicle() {
        return this._vehicle;
    }

    get vehicleIcon(): string | null {
        return !!this.vehicle ? this._images.getImage(this.vehicle.id) : null;
    }

    parseUrl(url: string) {
        const parsedUrl = url.split('/');
        return parsedUrl[3];
    }

    get myVehicles() {
        return this._vehicles.allVehicles;
    }

    get selected() {

        const self = this;

        if (!this.myVehicles || !this.vehicle) return;

        const sel = this.myVehicles.filter(v => {
            return v.id === self.vehicle.id;
        });

        return sel ? sel[0] : null;
    }

    setVehicleId(id: string) {
        this._vehicles.vehicleId = id;
    }
}
