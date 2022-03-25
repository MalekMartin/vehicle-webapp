import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { AppComponent } from "./app.component";
import { APP_RESOLVER_PROVIDERS } from "./app.resolver";
import { ROUTES } from "./app.routes";
import { AuthModule } from "./auth/auth.module";
import { VehiclesModule } from "./vehicles/vehicles.module";
import { CarServiceModule } from "./car-services/vehicle-repairs.module";
import { EventsModule } from "./events/events.module";
import { NotFoundComponent } from "./not-found/not-found.component";
// import { MAT_DATE_LOCALE } from '@angular/material/core';
// import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent, NotFoundComponent],
    imports: [
        BrowserModule,
        ToastrModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(ROUTES, { useHash: false }),
        VehiclesModule,
        CarServiceModule,
        BrowserAnimationsModule,
        EventsModule,
        AuthModule,
    ],
    providers: [
        ...APP_RESOLVER_PROVIDERS,
        // { provide: MAT_DATE_LOCALE, useValue: 'cs-CZ' },
        // {
        //     provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
        //     useValue: { useUtc: true },
        // },
    ],
})
export class AppModule {}
