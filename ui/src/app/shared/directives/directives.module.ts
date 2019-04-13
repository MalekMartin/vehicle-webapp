import { NgModule } from '@angular/core';
import { ColorFormStringDirective } from './color-from-string.directive';
import { HighlightDirective } from './highlight.directive';
import { WidthDirective } from './width.directive';

const DIRECTIVES = [
    ColorFormStringDirective,
    HighlightDirective,
    WidthDirective
]

@NgModule({
    imports: [],
    exports: [...DIRECTIVES],
    declarations: [...DIRECTIVES],
    providers: [],
})
export class DirectivesModule { }
