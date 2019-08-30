import { HttpClientModule } from '@angular/common/http';
import { ApplicationRef, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import { ComponentsHelper } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
// import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { ToastModule, ToastOptions } from 'ng6-toastr/ng2-toastr';
import {
    BsDropdownModule,
    DatepickerModule,
    ModalModule,
    ProgressbarModule,
    TooltipModule,
    TypeaheadModule
} from 'ngx-bootstrap';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
/*
 * Platform and Environment providers/directives/pipes
 */
// import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { AppState, InternalStateType } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CarServiceModule } from './car-services/vehicle-repairs.module';
import { CoreModule } from './core/core.module';
import { ToastCustomOption } from './core/toast-custom.options';
import { EventsModule } from './events/events.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from './shared/shared.module';
import { VehiclesModule } from './vehicles/vehicles.module';

// Application wide providers
const APP_PROVIDERS = [...APP_RESOLVER_PROVIDERS, AppState];

const MODULES = [
    BrowserModule,
    ToastModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { useHash: false }),
    ModalModule,
    BsDropdownModule.forRoot(),
    DatepickerModule.forRoot(),
    ProgressbarModule.forRoot(),
    TypeaheadModule,
    TooltipModule.forRoot(),
    SharedModule,
    VehiclesModule,
    CarServiceModule,
    Ng2PageScrollModule,
    CoreModule.forRoot(),
    BrowserAnimationsModule,
    EventsModule,
    AuthModule
];

type StoreType = {
    state: InternalStateType;
    restoreInputValues: () => void;
    disposeOldHosts: () => void;
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent, NotFoundComponent],
    imports: [...MODULES],
    providers: [APP_PROVIDERS, { provide: ToastOptions, useClass: ToastCustomOption }]
})
export class AppModule {
    constructor(public appRef: ApplicationRef, public appState: AppState) {}

    hmrOnInit(store: StoreType) {
        if (!store || !store.state) return;
        // set state
        this.appState._state = store.state;
        // set input values
        if ('restoreInputValues' in store) {
            const restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }

        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }

    hmrOnDestroy(store: StoreType) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // save state
        const state = this.appState._state;
        store.state = state;
    }

    hmrAfterDestroy(store: StoreType) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
