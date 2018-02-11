import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { EngineComponent } from './engine.component';
import { EngineDetailComponent } from './engine-detail/engine-detail.component';
import { EngineFormComponent } from './engineForm/engine-form.component';
import { TooltipModule } from 'ngx-bootstrap';


@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        // TooltipModule
    ],
    exports: [
        EngineComponent
    ],
    declarations: [
        EngineDetailComponent,
        EngineFormComponent,
        EngineComponent
    ],
    providers: [],
})
export class EngineModule { }
