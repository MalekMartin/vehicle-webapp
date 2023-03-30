import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MaintenanceService } from '../../api/maintenance/maintenance.service';
import { Observable, Subject } from 'rxjs';
import { VehicleService } from '../../../core/stores/vehicle/vehicle.service';
import { takeUntil } from 'rxjs/operators';
import { VehicleInfo } from '../../../vehicles/vehicle-stream/vehicle';

@Component({
    selector: 'va-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.scss'],
    animations: [
        trigger('toggle', [
            state('void, closed', style({ right: '100%' })),
            state('opened', style({ right: '0' })),
            transition('closed <=> opened', animate('300ms ease-in'))
        ]),
        trigger('toggleFog', [
            state('void, closed', style({ display: 'none', opacity: 0 })),
            state('opened', style({ display: 'block', opacity: 0.5 })),
            transition('closed <=> opened', animate('300ms ease-in'))
        ])
    ]
})
export class TopMenuComponent implements OnInit, OnDestroy {
    menuState = 'closed';
    count: number;

    expired: Observable<{ count: number }>;

    vehicle?: VehicleInfo;

    private _onDestroy$ = new Subject<void>();

    constructor(private _auth: AuthService, private _maintenance: MaintenanceService, private _vehicleService: VehicleService) {}

    ngOnInit() {
        this.expired = <any>this._maintenance.expiredSubject.asObservable();

        this._vehicleService.vehicle.pipe(takeUntil(this._onDestroy$)).subscribe(v => {
            this.vehicle = v;
        });
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
    }

    get user() {
        return this._auth.user;
    }

    logout() {
        this._auth.logout();
    }

    toggleMenu() {
        this.menuState = this.menuState === 'closed' ? 'opened' : 'closed';
    }

    hide() {
        this.menuState = 'closed';
    }
}
