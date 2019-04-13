import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { TradeFormComponent } from './tradeForm/trade-form.component';
import { TradeComponent } from './trade.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';
import { TradeDetailComponent } from './tradeDetail/trade-detail.component';
import { DatepickerModule } from '../../../../shared/components/datepicker/datepicker.module';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        TooltipModule,
        DatepickerModule
    ],
    exports: [
        TradeComponent,
        TradeFormComponent
    ],
    declarations: [
        TradeFormComponent,
        TradeComponent,
        TradeDetailComponent
    ],
    providers: [],
})
export class TradeModule { }
