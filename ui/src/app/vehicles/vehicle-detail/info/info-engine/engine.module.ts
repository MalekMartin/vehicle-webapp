import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InfoDetailItemModule } from '../info-detail-item/info-detail-item.module';
import { EngineDetailComponent } from './engine-detail/engine-detail.component';
import { EngineFormComponent } from './engine-form/engine-form.component';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatButtonModule } from '@angular/material/button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        InfoDetailItemModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTooltipModule,
        PipesModule
    ],
    exports: [EngineDetailComponent],
    declarations: [EngineDetailComponent, EngineFormComponent],
    providers: []
})
export class EngineModule {}
