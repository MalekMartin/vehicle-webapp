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
import { TiresService } from './core/tires.service';
import {
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatMenuModule
} from '@angular/material';
import { TirePropertiesModule } from './tire-properties/tire-properties.module';
import { TireStatusFilterPipe } from './core/tire-status-filter.pipe';
import { TirePropertiesService } from './core/tire-properties.service';
import { TireAddComponent } from './tire-add/tire-add.component';
import { ConfirmModule } from '../../../shared/components/confirm/confirm.module';
import { TireEditComponent } from './tire-edit/tire-edit.component';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';

@NgModule({
    imports: [
        SharedModule,
        TooltipModule,
        ModalModule,
        TireStatusFormModule,
        TirePropertiesModule,
        RouterModule.forChild(tiresRoutes),
        DatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatButtonModule,
        MatTooltipModule,
        MatMenuModule,
        ConfirmModule,
        SpinnerModule
    ],
    exports: [TiresComponent],
    declarations: [
        TiresComponent,
        TiresFormComponent,
        TirePreviewComponent,
        TireCardComponent,
        TireStatusFilterPipe,
        TireAddComponent,
        TireEditComponent
        // TireStatusFormComponent,
    ],
    providers: [TiresService, TirePropertiesService],
    entryComponents: [TireAddComponent, TireEditComponent, TirePreviewComponent]
})
export class TiresModule {}
