import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'va-form-item',
    template: `
    <span *ngIf="isRequired" class="error-message">*</span>
    <ng-content></ng-content>
    <div *ngFor="let error of errors" class="error-message">
        {{error}}
    </div>`,
    styleUrls: ['./form-item.component.scss']
})
export class FormItemComponent implements OnInit {

    @Input() control:FormControl;

    constructor() { }

    ngOnInit() { }

    get errors() {
        const errorMessages = [];

        if (!!this.control) {
            for (const propertyName in this.control.errors) {
                if (this.control.errors.hasOwnProperty(propertyName)
                        && this.control.touched) {
                    const message = ERRORS.hasOwnProperty(propertyName)
                                    ? ERRORS[propertyName]
                                    : 'Chybně vyplněno.';
                    // if (ERRORS.hasOwnProperty(propertyName))
                    errorMessages.push(message);
                }
            }
        }

        return errorMessages;
    }

    get isRequired() {

        if (!!this.control) {
            for (const propertyName in this.control.errors) {
                if (this.control.errors.hasOwnProperty(propertyName)
                    && propertyName === 'required') {
                    return true;
                }
            }
        }
        return false;
    }
}

export const ERRORS = {
    required: 'Toto pole je povinné.',
    maxlength: 'Byla překročena maximální délka.',
    minlength: 'Nemá minimální délku.',
    pattern: 'Není zadáno ve správném formátu.',
    invalidNumber: 'Musí být vyplněno číslo.',
    invalidEmail: 'Nesprávný formát emailu.',
    invalidPassword: 'Heslo může obsahovat velká a malá písmena, čísla a znaky $@!%*?&"#()+,-./:;',
    passwordMatch: 'Zadaná hesla se neshodují'
};
