import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { EngineModule } from './info-engine/engine.module';
import { InfoGeneralComponent } from './info-general/info-general.component';
import { TradeComponent } from './trade/trade.component';
import { InfoComponent } from './info.component';
import { InfoGeneralModule } from './info-general/info-general.module';
import { TradeModule } from './trade/trade.module';
import { RouterModule } from '@angular/router';
import { infoRoutes } from './info.routes';

const MODULES = [
    SharedModule,
    EngineModule,
    InfoGeneralModule,
    TradeModule,
    RouterModule.forChild(infoRoutes),
];

const COMPONENTS = [
    InfoComponent,
];

@NgModule({
    imports: [
        ...MODULES
    ],
    exports: [
        InfoComponent,
        SharedModule
    ],
    declarations: [
        ...COMPONENTS
    ],
    providers: [],
})
export class InfoModule { }
