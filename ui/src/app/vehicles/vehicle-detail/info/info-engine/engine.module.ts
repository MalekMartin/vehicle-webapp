import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule
} from '@angular/material';
import { InfoDetailItemModule } from '../info-detail-item/info-detail-item.module';
import { EngineDetailComponent } from './engine-detail/engine-detail.component';
import { EngineFormComponent } from './engine-form/engine-form.component';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { CommonModule } from '@angular/common';

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
