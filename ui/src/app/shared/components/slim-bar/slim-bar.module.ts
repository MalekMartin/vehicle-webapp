import { NgModule } from '@angular/core';
import { SlimBarComponent } from './slim-bar.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
    imports: [TooltipModule],
    exports: [SlimBarComponent],
    declarations: [SlimBarComponent],
    providers: [],
})
export class SlimBarModule { }
