import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { InfoDetailItemModule } from './info-detail-item/info-detail-item.module';
import { EngineModule } from './info-engine/engine.module';
import { InfoDetailComponent } from './info-general/info-detail/info-detail.component';
import { InfoFormComponent } from './info-general/info-form/info-form.component';
import { InfoComponent } from './info.component';
import { infoRoutes } from './info.routes';
import { TradeModule } from './trade/trade.module';

const MODULES = [
    EngineModule,
    TradeModule,
    RouterModule.forChild(infoRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    InfoDetailItemModule
];

const COMPONENTS = [InfoComponent, InfoDetailComponent, InfoFormComponent];

@NgModule({
    imports: [...MODULES],
    exports: [InfoComponent],
    declarations: [...COMPONENTS],
    providers: [],
    entryComponents: [InfoFormComponent]
})
export class InfoModule {}
