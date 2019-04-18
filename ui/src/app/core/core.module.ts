import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';
import { TokenStore } from './token.store';
import { AuthGuard } from './auth.guard';
import { AppState } from '../app.service';
import { DialogService } from './dialog.service';
import { VehicleService } from './stores/vehicle/vehicle.service';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [],
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                AuthService,
                HttpService,
                TokenStore,
                AuthGuard,
                AppState,
                DialogService,
                VehicleService
            ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
