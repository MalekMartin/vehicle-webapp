import { NgModule } from '@angular/core';
import { SlimBarComponent } from './slim-bar.component';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

@NgModule({
    imports: [MatTooltipModule],
    exports: [SlimBarComponent],
    declarations: [SlimBarComponent],
    providers: [],
})
export class SlimBarModule { }
