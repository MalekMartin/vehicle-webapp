import { NgModule } from '@angular/core';
import { ColorFormStringDirective } from './color-from-string.directive';
import { HighlightDirective } from './highlight.directive';
import { WidthDirective } from './width.directive';
import { MatchLinksDirective } from './highlight-links.directive';

const DIRECTIVES = [
    ColorFormStringDirective,
    HighlightDirective,
    WidthDirective,
    MatchLinksDirective
]

@NgModule({
    imports: [],
    exports: [...DIRECTIVES],
    declarations: [...DIRECTIVES],
    providers: [],
})
export class DirectivesModule { }
