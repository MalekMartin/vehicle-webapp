import { NgModule } from '@angular/core';
import { TiresService } from './tires.service';
import { TiresComponent } from './tires.component';
import { SharedModule } from '../../../shared/shared.module';
import { TiresFormComponent } from './tires-form/tires-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';
import { TirePreviewComponent } from './tire-preview/tire-preview.component';
import { TireCardComponent } from './tire-card/tire-card.component';
import { ModalModule } from 'ngx-bootstrap';
import { TireStatusFormComponent } from './tire-status-form/tire-status-form.component';
import { TirePropertiesComponent } from './tire-properties/tire-properties.component';
import { TireStatusFormModule } from './tire-status-form/tire-status-form.module';
import { TirePropertyFormModule } from './tire-properties-form/tire-properties-form.module';
import { RouterModule } from '@angular/router';
import { tiresRoutes } from './tires.routes';

@NgModule({
    imports: [
        SharedModule,
        TooltipModule,
        ModalModule,
        TireStatusFormModule,
        TirePropertyFormModule,
        RouterModule.forChild(tiresRoutes)
    ],
    exports: [TiresComponent],
    declarations: [
        TiresComponent,
        TiresFormComponent,
        TirePreviewComponent,
        TireCardComponent,
        // TireStatusFormComponent,
        TirePropertiesComponent
    ],
    providers: [TiresService],
})
export class TiresModule { }
