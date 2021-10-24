import { NgModule } from '@angular/core';
import { VehiclesComponent } from './vehicles.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpService } from '../core/http.service';
import { ModalModule } from 'ngx-bootstrap';
import { VehicleDetailModule } from './vehicle-detail/vehicle-detail.module';
import { VehicleStreamModule } from './vehicle-stream/vehicle-stream.module';
import { AuthService } from '../core/auth.service';
import { TokenStore } from '../core/token.store';
import { AuthGuard } from '../core/auth.guard';

const MODULES = [
    SharedModule,
    CommonModule,
    RouterModule,
    ModalModule,
    VehicleDetailModule,
    VehicleStreamModule
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
    exports: [SharedModule]
})
export class VehiclesModule { }
