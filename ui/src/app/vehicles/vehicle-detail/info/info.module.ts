import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InfoDetailItemModule } from './info-detail-item/info-detail-item.module';
import { EngineModule } from './info-engine/engine.module';
import { InfoDetailComponent } from './info-general/info-detail/info-detail.component';
import { InfoFormComponent } from './info-general/info-form/info-form.component';
import { InfoComponent } from './info.component';
import { infoRoutes } from './info.routes';
import { TradeModule } from './trade/trade.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';

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
    providers: []
})
export class InfoModule {}
