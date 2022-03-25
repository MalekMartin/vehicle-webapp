import { NgModule } from '@angular/core';
import { SlimBarComponent } from './slim-bar.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    imports: [MatTooltipModule],
    exports: [SlimBarComponent],
    declarations: [SlimBarComponent],
    providers: [],
})
export class SlimBarModule { }
