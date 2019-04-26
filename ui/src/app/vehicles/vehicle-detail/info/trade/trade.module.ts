import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { TradeFormComponent } from './trade-form/trade-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';
import { TradeDetailComponent } from './trade-detail/trade-detail.component';
import { DatepickerModule } from '../../../../shared/components/datepicker/datepicker.module';
import {
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
} from '@angular/material';
// import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { InfoDetailItemModule } from '../info-detail-item/info-detail-item.module';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        TooltipModule,
        DatepickerModule,
        MatDialogModule,
        MatCardModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        InfoDetailItemModule
    ],
    exports: [TradeDetailComponent],
    declarations: [TradeFormComponent, TradeDetailComponent],
    providers: [],
    entryComponents: [TradeFormComponent]
})
export class TradeModule {}
