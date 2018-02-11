import { NgModule } from '@angular/core';

import { TireStatusFormComponent } from './tire-status-form.component';
import { ModalModule } from 'ngx-bootstrap';
import { SharedModule } from '../../../../shared/shared.module';
import { TireStatusDialogService } from './tire-status-form.service';

@NgModule({
    imports: [ModalModule, SharedModule],
    exports: [TireStatusFormComponent],
    declarations: [TireStatusFormComponent],
    providers: [TireStatusDialogService],
    entryComponents: [TireStatusFormComponent]
})
export class TireStatusFormModule { }
