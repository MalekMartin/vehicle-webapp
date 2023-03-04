import { Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FORM_ITEMS_ERRORS } from './form-items.errors';

@Component({
    selector: 'va-form-item',
    template: `
        <span *ngIf="isRequired" class="error-message">*</span>
        <ng-content></ng-content>
        <div *ngFor="let error of errors" class="error-message">
            {{ error }}
        </div>
    `,
    styleUrls: ['./form-item.component.scss']
})
export class FormItemComponent {
    @Input() control: UntypedFormControl;

    get errors() {
        const errorMessages = [];

        if (!!this.control) {
            for (const propertyName in this.control.errors) {
                if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                    const message = FORM_ITEMS_ERRORS.hasOwnProperty(propertyName)
                        ? FORM_ITEMS_ERRORS[propertyName]
                        : 'Chybně vyplněno.';
                    errorMessages.push(message);
                }
            }
        }

        return errorMessages;
    }

    get isRequired() {
        if (!!this.control) {
            for (const propertyName in this.control.errors) {
                if (
                    this.control.errors.hasOwnProperty(propertyName) &&
                    propertyName === 'required'
                ) {
                    return true;
                }
            }
        }
        return false;
    }
}
