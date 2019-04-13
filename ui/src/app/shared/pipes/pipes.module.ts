import { NgModule } from '@angular/core';
import { FromNowPipe } from './from-now.pipe';
import { LimitPipe } from './limit.pipe';
import { MomentPipe } from './moment.pipe';
import { NumberFormatPipe } from './number-format.pipe';
import { OrderByDatePipe } from './order-by-date.pipe';
import { PricePipe } from './price.pipe';
import { ToHPPipe } from './to-hp.pipe';
import { VehicleFilterPipe } from './vehicle-filter.pipe';

const PIPES = [
    FromNowPipe,
    LimitPipe,
    MomentPipe,
    NumberFormatPipe,
    OrderByDatePipe,
    PricePipe,
    ToHPPipe,
    VehicleFilterPipe
];

@NgModule({
    imports: [],
    exports: [...PIPES],
    declarations: [...PIPES],
    providers: []
})
export class PipesModule {}
