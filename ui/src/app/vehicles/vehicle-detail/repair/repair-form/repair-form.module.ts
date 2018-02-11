import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';
import { SharedModule } from '../../../../shared/shared.module';
import { RepairFormService } from './repair-form.service';
import { RepairFormComponent } from './repair-form.component';

@NgModule({
    imports: [ModalModule, SharedModule],
    exports: [RepairFormComponent],
    declarations: [RepairFormComponent],
    providers: [RepairFormService],
    entryComponents: [RepairFormComponent]
})
export class RepairFormModule { }
