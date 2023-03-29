import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { RouterModule } from '@angular/router';
import { CardModule } from '../../../shared/components/card/card.module';
import { ConfirmModule } from '../../../shared/components/confirm/confirm.module';
import { SectionHeadingModule } from '../../../shared/components/section-heading/section-heading.module';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { TirePropertiesService } from './core/tire-properties.service';
import { TireStatusFilterPipe } from './core/tire-status-filter.pipe';
import { TiresService } from './core/tires.service';
import { TireAddComponent } from './tire-add/tire-add.component';
import { TireCardComponent } from './tire-card/tire-card.component';
import { TireEditComponent } from './tire-edit/tire-edit.component';
import { TirePreviewComponent } from './tire-preview/tire-preview.component';
import { TirePropertiesModule } from './tire-properties/tire-properties.module';
import { TireStatusFormModule } from './tire-status-form/tire-status-form.module';
import { TiresFormComponent } from './tires-form/tires-form.component';
import { TiresComponent } from './tires.component';
import { tiresRoutes } from './tires.routes';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TireStatusFormModule,
        TirePropertiesModule,
        RouterModule.forChild(tiresRoutes),
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatButtonModule,
        MatTooltipModule,
        MatMenuModule,
        ConfirmModule,
        SpinnerModule,
        SectionHeadingModule,
        PipesModule,
        CardModule
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
    ],
    providers: [TiresService, TirePropertiesService]
})
export class TiresModule {}
