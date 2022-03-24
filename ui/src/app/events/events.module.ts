import { NgModule } from '@angular/core';
import { EventsComponent } from './events.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { HttpService } from '../core/http.service';
import { EventComponent } from './event/event.component';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../shared/pipes/pipes.module';
import { CardModule } from '../shared/components/card/card.module';

const MODULES = [
    CommonModule,
    CoreModule.forRoot(),
    RouterModule,
    PipesModule,
    CardModule,
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
