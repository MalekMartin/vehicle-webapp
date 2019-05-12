import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
// import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { ToastModule, ToastOptions } from 'ng6-toastr/ng2-toastr';
// import { ComponentsHelper } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    ModalModule,
    BsDropdownModule,
    TypeaheadModule,
    DatepickerModule,
    TooltipModule,
    ProgressbarModule
} from 'ngx-bootstrap';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { CarServiceModule } from './car-services/vehicle-repairs.module';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { NotFoundComponent } from './not-found/not-found.component';
import { CoreModule } from './core/core.module';
import { ToastCustomOption } from './core/toast-custom.options';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';
// Application wide providers
const APP_PROVIDERS = [...APP_RESOLVER_PROVIDERS, AppState];

const MODULES = [
    BrowserModule,
    ToastModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: false }),
    ModalModule,
    BsDropdownModule.forRoot(),
    DatepickerModule.forRoot(),
    ProgressbarModule.forRoot(),
    TypeaheadModule,
    TooltipModule.forRoot(),
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
    imports: [
        // import Angular's modules
        ...MODULES
    ],
    providers: [
        // expose our Services and Providers into Angular's dependency injection
        // ENV_PROVIDERS,
        APP_PROVIDERS,
        { provide: ToastOptions, useClass: ToastCustomOption }
        // {provide: ComponentsHelper, useClass: ComponentsHelper}
    ]
})
export class AppModule {
    constructor(public appRef: ApplicationRef, public appState: AppState) {}

    hmrOnInit(store: StoreType) {
        if (!store || !store.state) return;
        // console.log('HMR store', JSON.stringify(store, null, 2));
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
        // recreate root elements
        // store.disposeOldHosts = createNewHosts(cmpLocation);
        // save input values
        // store.restoreInputValues  = createInputTransfer();
        // remove styles
        // removeNgStyles();
    }

    hmrAfterDestroy(store: StoreType) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
