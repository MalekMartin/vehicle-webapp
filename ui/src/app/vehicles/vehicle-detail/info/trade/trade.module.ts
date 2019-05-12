import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule
} from '@angular/material';
import { TooltipModule } from 'ngx-bootstrap';
import { DatepickerModule } from '../../../../shared/components/datepicker/datepicker.module';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { InfoDetailItemModule } from '../info-detail-item/info-detail-item.module';
import { TradeDetailComponent } from './trade-detail/trade-detail.component';
import { TradeFormComponent } from './trade-form/trade-form.component';

@NgModule({
    imports: [
        CommonModule,
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
        InfoDetailItemModule,
        PipesModule
    ],
    exports: [TradeDetailComponent],
    declarations: [TradeFormComponent, TradeDetailComponent],
    providers: [],
    entryComponents: [TradeFormComponent]
})
export class TradeModule {}
