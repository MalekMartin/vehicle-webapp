import { NgModule } from '@angular/core';
import { SectionHeadingComponent, SectionHeadingTitleComponent, SectionHeadingControlsComponent } from './section-heading.component';

const COMPONENTS = [
    SectionHeadingComponent,
    SectionHeadingTitleComponent,
    SectionHeadingControlsComponent
];

@NgModule({
    imports: [],
    exports: [...COMPONENTS],
    declarations: [...COMPONENTS],
    providers: [],
})
export class SectionHeadingModule { }
