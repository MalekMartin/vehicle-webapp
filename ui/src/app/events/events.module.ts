import { NgModule } from '@angular/core';
import { EventsComponent } from './events.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../core/auth.guard';
import { HttpService } from '../core/http.service';
import { EventComponent } from './event/event.component';

const MODULES = [
    CoreModule.forRoot(),
    SharedModule,
    RouterModule,
];

const COMPONENTS = [
    EventsComponent,
    EventComponent,
];

@NgModule({
    imports: [
        ...MODULES
    ],
    exports: [...COMPONENTS],
    declarations: [
        ...COMPONENTS
    ],
    providers: [
        AuthGuard,
        HttpService
    ],
})
export class EventsModule { }
