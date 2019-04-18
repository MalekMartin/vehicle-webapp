import { NgModule } from '@angular/core';
import { NumberStatsComponent } from './number-stats.component';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
    imports: [CommonModule, PipesModule],
    exports: [NumberStatsComponent],
    declarations: [NumberStatsComponent],
    providers: []
})
export class NumberStatsModule {}
