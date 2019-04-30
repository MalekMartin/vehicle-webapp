import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalModule, TooltipModule } from 'ngx-bootstrap';
import { DatepickerModule } from '../../../shared/components/datepicker/datepicker.module';
import { SharedModule } from '../../../shared/shared.module';
import { TireCardComponent } from './tire-card/tire-card.component';
import { TirePreviewComponent } from './tire-preview/tire-preview.component';
import { TireStatusFormModule } from './tire-status-form/tire-status-form.module';
import { TiresFormComponent } from './tires-form/tires-form.component';
import { TiresComponent } from './tires.component';
import { tiresRoutes } from './tires.routes';
import { TiresService } from './tires.service';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { TirePropertiesModule } from './tire-properties/tire-properties.module';

@NgModule({
    imports: [
        SharedModule,
        TooltipModule,
        ModalModule,
        TireStatusFormModule,
        TirePropertiesModule,
        RouterModule.forChild(tiresRoutes),
        DatepickerModule,
        MatDialogModule,
        MatButtonModule
    ],
    exports: [TiresComponent],
    declarations: [
        TiresComponent,
        TiresFormComponent,
        TirePreviewComponent,
        TireCardComponent,
        // TireStatusFormComponent,
    ],
    providers: [TiresService]
})
export class TiresModule {}
