import { NgControl, Validators, FormGroup } from '@angular/forms';

export class VValidators {
    static validateNumber = (c: NgControl) => {
        const NUMBER_REGEXP = /^\d*\.?\d*$/i;

        return NUMBER_REGEXP.test(c.value) ? null : { invalidNumber: true };
    };

    static validateEmail = (mail: NgControl) => {
        const EMAIL_REGEXP = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/i;

        return EMAIL_REGEXP.test(mail.value) ? null : { invalidEmail: true };
    };

    static validatePassword = (c: NgControl) => {
        const PWD_REGEXP = /^[A-Za-z\d$@!%*?&\s"#'()+,-.\/:;]+$/i;

        return PWD_REGEXP.test(c.value) ? null : { invalidPassword: true };
    };

    static passwordMatches = (g: any) => {
        return g.controls.pwd.value === g.controls.pwdCheck.value ? null : { passwordMatch: true };
    };

    static maintenanceStartValue = (g: FormGroup) => {
        return !!g.get('odo').value ||
            g.get('odo').value === 0 ||
            !!g.get('odo2').value ||
            g.get('odo2').value === 0 ||
            !!g.get('date').value
            ? null
            : { startPoint: true };
    };
}
