import { Component, Input } from '@angular/core';

@Component({
    selector: 'va-card-title',
    template: '<ng-content></ng-content>'
})
export class CardTitleComponent {}

@Component({
    selector: 'va-card-content',
    template: '<ng-content></ng-content>'
})
export class CardContentComponent {}

@Component({
    selector: 'va-card-menu',
    template: '<ng-content></ng-content>',
})
export class CardMenuComponent {}

@Component({
    selector: 'va-card-footer',
    template: '<ng-content></ng-content>'
})
export class CardFooterComponent {}

@Component({
    selector: 'va-card-left',
    template: '<ng-content></ng-content>'
})
export class CardLeftComponent {}

@Component({
    selector: 'va-card-right',
    template: '<ng-content></ng-content>'
})
export class CardRightComponent {}

@Component({
    selector: 'va-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})

export class CardComponent {
    @Input() hasShadow = true;
}
