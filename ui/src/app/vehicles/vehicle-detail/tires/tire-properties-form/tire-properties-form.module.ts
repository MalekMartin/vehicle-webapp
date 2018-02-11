import { NgModule } from '@angular/core';
import { TirePropertiesFormComponent } from './tire-properties-form.component';
import { ModalModule } from 'ngx-bootstrap';
import { SharedModule } from '../../../../shared/shared.module';
import { TirePropertiesFormService } from './tire-properties-form.service';

@NgModule({
    imports: [ModalModule, SharedModule],
    exports: [TirePropertiesFormComponent],
    declarations: [TirePropertiesFormComponent],
    providers: [TirePropertiesFormService],
    entryComponents: [TirePropertiesFormComponent]
})
export class TirePropertyFormModule { }
