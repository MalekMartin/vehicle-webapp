import { NgModule } from '@angular/core';
import { VehiclesComponent } from './vehicles.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpService } from '../core/http.service';
import { ModalModule } from 'ngx-bootstrap';
import { VehicleDetailModule } from './vehicle-detail/vehicle-detail.module';
import { VehicleStreamModule } from './vehicle-stream/vehicle-stream.module';
import { AuthService } from '../core/auth.service';
import { TokenStore } from '../core/token.store';
import { AuthGuard } from '../core/auth.guard';
import { TopMenuModule } from '../shared/components/top-menu/top-menu.module';

const MODULES = [
    CommonModule,
    RouterModule,
    ModalModule,
    VehicleDetailModule,
    VehicleStreamModule,
    TopMenuModule,
];

const COMPONENTS = [
    VehiclesComponent
];

@NgModule({
    imports: [
        ...MODULES
    ],
    declarations: [
        ...COMPONENTS
    ],
    providers: [
        HttpService,
        AuthService,
        TokenStore,
        AuthGuard,
    ],
    exports: []
})
export class VehiclesModule { }
