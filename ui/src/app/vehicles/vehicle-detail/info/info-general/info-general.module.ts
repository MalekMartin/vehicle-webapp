import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';
import { InfoGeneralComponent } from './info-general.component';
import { InfoDetailComponent } from './infoDetail/info-detail.component';
import { InfoFormComponent } from './infoForm/info-form.component';
import { InfoService } from './info.service';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        TooltipModule
    ],
    exports: [InfoGeneralComponent],
    declarations: [
        InfoGeneralComponent,
        InfoFormComponent,
        InfoDetailComponent
    ],
    providers: [InfoService],
})
export class InfoGeneralModule { }
