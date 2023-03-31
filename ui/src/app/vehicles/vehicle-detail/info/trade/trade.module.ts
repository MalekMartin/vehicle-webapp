import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { InfoDetailItemModule } from '../info-detail-item/info-detail-item.module';
import { TradeDetailComponent } from './trade-detail/trade-detail.component';
import { TradeFormComponent } from './trade-form/trade-form.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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
    providers: []
})
export class TradeModule {}
