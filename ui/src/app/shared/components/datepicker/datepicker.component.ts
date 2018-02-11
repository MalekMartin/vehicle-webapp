import { Component, OnInit, forwardRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor } from '@angular/forms';
import { BsDropdownDirective, DatePickerComponent } from 'ngx-bootstrap';

import * as moment from 'moment';
import { BsDropdownModule } from 'ngx-bootstrap';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
};

@Component({
    selector: 'va-date-picker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DatepickerComponent implements OnInit, ControlValueAccessor {

    dt: Date;

    @ViewChild(BsDropdownDirective) dropdown: BsDropdownDirective;
    @ViewChild(DatePickerComponent) datepicker: DatePickerComponent;

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    constructor() {
    }

    ngOnInit() {
    }

    get isOpen(): boolean {
        return !this.dropdown || this.dropdown.isOpen;
    }

    set isOpen(value: boolean) {
        if (!!this.dropdown) {
            this.dropdown.isOpen = value;
        }
    }

    clear() {
        this.isOpen = false;
        this.dt = undefined;
        this.onChangeCallback(null);
    }



    onToggle(isOpen: boolean) {
        this.onTouchedCallback();
        if (!isOpen && !!this.dt) {
            // this.onChangeCallback(moment(this.dt).set('hour', 12).set('minute', 0).toISOString());
            this.onChangeCallback(moment(this.dt).toDate());
        }
    }

    // From ControlValueAccessor interface
    writeValue(value: any) {
        if (!!value) {
            this.dt = moment(value).toDate();
        }
    }

    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    // dt: Date;

    // private onTouchedCallback: () => void = noop;
    // private onChangeCallback: (_: any) => void = noop;

    // constructor() {
    // }

    // ngOnInit() {
    // }

    // onToggle(isOpen: boolean) {
    //     if (!isOpen) {
    //         this.onChangeCallback(moment.utc(this.dt).toISOString());
    //     }
    // }

    // // From ControlValueAccessor interface
    // writeValue(value: any) {
    //     if (!!value) {
    //         this.dt = moment.utc(value).toDate();
    //     }
    // }

    // // From ControlValueAccessor interface
    // registerOnChange(fn: any) {
    //     this.onChangeCallback = fn;
    // }

    // // From ControlValueAccessor interface
    // registerOnTouched(fn: any) {
    //     this.onTouchedCallback = fn;
    // }

    // // Placeholders for the callbacks which are later provided
    // // by the Control Value Accessor
}
