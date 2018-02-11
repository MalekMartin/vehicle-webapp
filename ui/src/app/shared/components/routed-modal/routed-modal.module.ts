import { NgModule } from '@angular/core';
import { RoutedModalComponent } from './routed-modal.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';

import {
    RoutedModalContentComponent,
    RoutedModalContentTitleSelectorDirective,
    RoutedModalContentBodySelectorDirective,
    RoutedModalContentFooterSelectorDirective
} from './routed-modal-content.component';

const COMPONENTS = [
    RoutedModalComponent,
    RoutedModalContentComponent,
    RoutedModalContentTitleSelectorDirective,
    RoutedModalContentBodySelectorDirective,
    RoutedModalContentFooterSelectorDirective
];

@NgModule({
    imports: [RouterModule, ModalModule, CommonModule],
    exports: [...COMPONENTS],
    declarations: [
        ...COMPONENTS
    ],
    providers: [],
})
export class RoutedModalModule { }
