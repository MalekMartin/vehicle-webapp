import { NgModule } from '@angular/core';
import { CardRightComponent } from './card.component';
import {
    CardComponent,
    CardTitleComponent, CardContentComponent, CardFooterComponent, CardMenuComponent, CardLeftComponent } from './card.component';

const COMPONENTS = [
    CardComponent,
    CardTitleComponent,
    CardContentComponent,
    CardMenuComponent,
    CardFooterComponent,
    CardLeftComponent,
    CardRightComponent,
];

@NgModule({
    imports: [],
    exports: [...COMPONENTS],
    declarations: [
       ...COMPONENTS
    ],
    providers: [],
})
export class CardModule { }
