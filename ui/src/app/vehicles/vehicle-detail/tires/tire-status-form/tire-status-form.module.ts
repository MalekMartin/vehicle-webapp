import { NgModule } from '@angular/core';

import { TireStatusFormComponent } from './tire-status-form.component';
import { ModalModule } from 'ngx-bootstrap';
import { SharedModule } from '../../../../shared/shared.module';
import { TireStatusDialogService } from './tire-status-form.service';
import { DatepickerModule } from '../../../../shared/components/datepicker/datepicker.module';

@NgModule({
    imports: [ModalModule, SharedModule, DatepickerModule],
    exports: [TireStatusFormComponent],
    declarations: [TireStatusFormComponent],
    providers: [TireStatusDialogService],
    entryComponents: [TireStatusFormComponent]
})
export class TireStatusFormModule {}
