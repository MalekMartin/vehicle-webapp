import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InfoDetailItemModule } from '../info-detail-item/info-detail-item.module';
import { EngineDetailComponent } from './engine-detail/engine-detail.component';
import { EngineFormComponent } from './engine-form/engine-form.component';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
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
    providers: [],
    entryComponents: [EngineFormComponent]
})
export class EngineModule {}
